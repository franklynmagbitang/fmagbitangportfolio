import { useState, useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { Upload, X, FileText, Image, Award, Trash2, Download } from "lucide-react";

interface Certificate {
  id: string;
  title: string;
  description: string;
  issuer: string;
  preview?: string;
  fileName?: string;
  downloadUrl?: string;
}

const CertificatesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const defaultCertificates: Certificate[] = [
    {
      id: "default-ibm-dev-day-bob",
      title: "IBM Dev Day - Bob Edition",
      description: "Certificate of participation in IBM Dev Day (Bob Edition).",
      issuer: "IBM",
      fileName: "IBM_Dev_Day_Bob_Edition_Certificate_Franklyn_Magbitang.pdf",
      downloadUrl: "/certificates/IBM_Dev_Day_Bob_Edition_Certificate_Franklyn_Magbitang.pdf",
    },
    {
      id: "default-mindluster-excel",
      title: "Excel Certificate",
      description: "Certificate of completion for the Excel course from Mindluster.",
      issuer: "Mindluster",
      fileName: "Mindluster_EXCELCertificate.pdf",
      downloadUrl: "/certificates/Mindluster_EXCELCertificate.pdf",
    },
  ];

  const [certificates, setCertificates] = useState<Certificate[]>(() => {
    const saved = localStorage.getItem("portfolio-certificates");
    if (!saved) return defaultCertificates;
    const parsed: Certificate[] = JSON.parse(saved);
    // Ensure default IBM certificate is always present
    const merged = [...parsed];
    defaultCertificates.forEach((d) => {
      if (!merged.some((c) => c.id === d.id)) merged.unshift(d);
    });
    return merged;
  });
  const [showForm, setShowForm] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", issuer: "" });
  const [previewFile, setPreviewFile] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [fileData, setFileData] = useState<string | null>(null);

  const save = (c: Certificate[]) => {
    setCertificates(c);
    localStorage.setItem("portfolio-certificates", JSON.stringify(c));
  };

  const handleFile = useCallback((file: File) => {
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setFileData(result);
      if (file.type.startsWith("image/")) {
        setPreviewFile(result);
      } else {
        setPreviewFile(null);
      }
    };
    reader.readAsDataURL(file);
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

  const addCertificate = () => {
    if (!form.title.trim()) return;
    const newCertificate: Certificate = {
      id: Date.now().toString(),
      title: form.title,
      description: form.description,
      issuer: form.issuer,
      preview: previewFile || undefined,
      fileName: fileName || undefined,
      downloadUrl: fileData || undefined,
    };
    save([...certificates, newCertificate]);
    setForm({ title: "", description: "", issuer: "" });
    setPreviewFile(null);
    setFileName("");
    setFileData(null);
    setShowForm(false);
  };

  const removeCertificate = (id: string) => {
    save(certificates.filter((c) => c.id !== id));
  };

  return (
    <section id="certificates" className="section-padding bg-secondary/20" ref={ref}>
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between flex-wrap gap-4 mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold gradient-text">Certificates</h2>
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
                <h3 className="text-lg font-bold text-foreground">New Certificate</h3>
                <button onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <input
                  placeholder="Certificate Title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg bg-muted border border-glass-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
                />
                <input
                  placeholder="Issuing Organization"
                  value={form.issuer}
                  onChange={(e) => setForm({ ...form, issuer: e.target.value })}
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
                <p className="text-xs text-muted-foreground mt-1">Images, PDFs, screenshots</p>
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
                onClick={addCertificate}
                className="mt-4 px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all"
              >
                Save Certificate
              </button>
            </motion.div>
          )}

          {/* Certificate cards */}
          {certificates.length === 0 && !showForm && (
            <div className="glass-card p-12 text-center">
              <Award className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No certificates yet. Click "Add Certificate" to showcase your credentials.</p>
            </div>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((certificate, i) => (
              <motion.div
                key={certificate.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card-hover overflow-hidden group"
              >
                {certificate.preview ? (
                  <div className="h-44 overflow-hidden">
                    <img src={certificate.preview} alt={certificate.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                ) : (
                  <div className="h-44 bg-muted flex items-center justify-center">
                    {certificate.fileName?.endsWith(".pdf") ? (
                      <FileText className="w-12 h-12 text-muted-foreground" />
                    ) : (
                      <Award className="w-12 h-12 text-muted-foreground" />
                    )}
                  </div>
                )}
                <div className="p-5">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-foreground mb-1">{certificate.title}</h3>
                    <button
                      onClick={() => removeCertificate(certificate.id)}
                      className="text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  {certificate.description && (
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{certificate.description}</p>
                  )}
                  {certificate.issuer && (
                    <div className="flex flex-wrap gap-1.5">
                      <span className="px-2 py-0.5 text-xs font-mono rounded bg-primary/10 text-primary border border-primary/20">
                        {certificate.issuer}
                      </span>
                    </div>
                  )}
                  {certificate.fileName && (
                    <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                      <Image className="w-3 h-3" />
                      {certificate.fileName}
                    </p>
                  )}
                  {certificate.downloadUrl && (
                    <a
                      href={certificate.downloadUrl}
                      download={certificate.fileName}
                      onClick={(e) => e.stopPropagation()}
                      className="mt-3 inline-flex items-center gap-2 w-full justify-center px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all glow-border"
                    >
                      <Download className="w-4 h-4" />
                      Download Certificate
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

export default CertificatesSection;
