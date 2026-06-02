import { useState, useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { Plus, Upload, X, FileText, Image, BarChart3, Trash2, Download } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  tools: string;
  preview?: string;
  fileName?: string;
  downloadUrl?: string;
}

const ProjectsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const defaultProjects: Project[] = [
    {
      id: "default-frankscarsph",
      title: "FrankCarsPh",
      description: "Power BI dashboard project for automotive data analysis and reporting.",
      tools: "Power BI",
      fileName: "FrankCarsPh.pbix",
      downloadUrl: "/projects/FrankCarsPh.pbix",
    },
    {
      id: "default-wfm-dashboard",
      title: "Workforce Management Dashboard",
      description: "Excel-based workforce management dashboard for tracking staffing, schedules, and operational KPIs.",
      tools: "Excel",
      fileName: "WorkForceManagementDashboard.xlsx",
      downloadUrl: "/projects/WorkForceManagementDashboard.xlsx",
    },
    {
      id: "default-ops-performance-intelligence",
      title: "Operations Performance Intelligence Dashboard",
      description:
        "The Operations Performance Intelligence Dashboard delivers an end-to-end view of workforce performance by connecting operational efficiency, employee productivity, leadership effectiveness, and customer experience into a single analytics platform. From the Executive Overview to detailed Agent and Team Leader Analytics, the dashboard empowers organizations to move beyond reporting and toward proactive workforce optimization, enabling leaders to make faster, smarter, and more impactful business decisions.",
      tools: "Power BI",
      fileName: "Operations_Performance_Intelligence_Dashboard.pbix",
      downloadUrl: "/projects/Operations_Performance_Intelligence_Dashboard.pbix",
    },
  ];

  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem("portfolio-projects");
    const parsed: Project[] = saved ? JSON.parse(saved) : [];
    const merged = [...parsed];
    defaultProjects.forEach((d) => {
      if (!merged.some((p) => p.id === d.id)) merged.unshift(d);
    });
    return merged.length ? merged : defaultProjects;
  });
  const [showForm, setShowForm] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", tools: "" });
  const [previewFile, setPreviewFile] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");

  const save = (p: Project[]) => {
    setProjects(p);
    localStorage.setItem("portfolio-projects", JSON.stringify(p));
  };

  const handleFile = useCallback((file: File) => {
    setFileName(file.name);
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => setPreviewFile(e.target?.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreviewFile(null);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const addProject = () => {
    if (!form.title.trim()) return;
    const newProject: Project = {
      id: Date.now().toString(),
      title: form.title,
      description: form.description,
      tools: form.tools,
      preview: previewFile || undefined,
      fileName: fileName || undefined,
    };
    save([...projects, newProject]);
    setForm({ title: "", description: "", tools: "" });
    setPreviewFile(null);
    setFileName("");
    setShowForm(false);
  };

  const removeProject = (id: string) => {
    save(projects.filter((p) => p.id !== id));
  };

  return (
    <section id="projects" className="section-padding bg-secondary/20" ref={ref}>
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between flex-wrap gap-4 mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold gradient-text">Projects</h2>
              <div className="w-20 h-1 bg-primary rounded mt-4" />
            </div>
          </div>

          {/* Upload form */}
          {showForm && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-6 mb-8"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-foreground">New Project</h3>
                <button onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <input
                  placeholder="Project Title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg bg-muted border border-glass-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
                />
                <input
                  placeholder="Tools Used (e.g. Power BI, Excel)"
                  value={form.tools}
                  onChange={(e) => setForm({ ...form, tools: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg bg-muted border border-glass-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
                />
              </div>
              <textarea
                placeholder="Description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2.5 rounded-lg bg-muted border border-glass-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 mb-4 resize-none"
              />

              {/* Drag & drop */}
              <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${
                  dragOver ? "border-primary bg-primary/5" : "border-glass-border hover:border-primary/30"
                }`}
              >
                <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  {fileName ? fileName : "Drag & drop files here, or click to browse"}
                </p>
                <p className="text-xs text-muted-foreground mt-1">Images, PDFs, dashboards, screenshots</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,.pdf,.xlsx,.csv"
                  onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                  className="hidden"
                />
              </div>

              {previewFile && (
                <img src={previewFile} alt="Preview" className="mt-4 max-h-48 rounded-lg border border-glass-border" />
              )}

              <button
                onClick={addProject}
                className="mt-4 px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all"
              >
                Save Project
              </button>
            </motion.div>
          )}

          {/* Project cards */}
          {projects.length === 0 && !showForm && (
            <div className="glass-card p-12 text-center">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No projects yet. Click "Add Project" to showcase your work.</p>
            </div>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card-hover overflow-hidden group"
              >
                {project.preview ? (
                  <div className="h-44 overflow-hidden">
                    <img src={project.preview} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                ) : (
                  <div className="h-44 bg-muted flex items-center justify-center">
                    {project.fileName?.endsWith(".pdf") ? (
                      <FileText className="w-12 h-12 text-muted-foreground" />
                    ) : (
                      <BarChart3 className="w-12 h-12 text-muted-foreground" />
                    )}
                  </div>
                )}
                <div className="p-5">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-foreground mb-1">{project.title}</h3>
                    <button
                      onClick={() => removeProject(project.id)}
                      className="text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  {project.description && (
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{project.description}</p>
                  )}
                  {project.tools && (
                    <div className="flex flex-wrap gap-1.5">
                      {project.tools.split(",").map((t) => (
                        <span key={t} className="px-2 py-0.5 text-xs font-mono rounded bg-primary/10 text-primary border border-primary/20">
                          {t.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                  {project.fileName && (
                    <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                      <Image className="w-3 h-3" />
                      {project.fileName}
                    </p>
                  )}
                  {project.downloadUrl && (
                    <a
                      href={project.downloadUrl}
                      download={project.fileName}
                      onClick={(e) => e.stopPropagation()}
                      className="mt-3 inline-flex items-center gap-2 w-full justify-center px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all glow-border"
                    >
                      <Download className="w-4 h-4" />
                      Download Project
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
