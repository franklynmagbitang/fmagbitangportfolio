import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase } from "lucide-react";

const experiences = [
  {
    company: "Acquire Asia Pacific",
    role: "Senior Customer Experience Specialist",
    period: "Recent",
    highlights: ["Data monitoring & reporting", "KPI tracking & performance dashboards", "Workflow improvement initiatives", "Quality assurance & data validation"],
  },
  {
    company: "Accenture",
    role: "Senior Data Analyst",
    period: "Previous",
    highlights: ["Claims analysis & reporting", "Dashboard creation in Power BI", "Data integrity & trend analysis", "Process optimization for healthcare ops"],
  },
  {
    company: "Saviour Medevices",
    role: "Warehouse Clerk",
    period: "Earlier",
    highlights: ["Inventory data management", "Record keeping & documentation", "Data accuracy for supply chain", "Operational reporting"],
  },
];

const ExperienceSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="section-padding" ref={ref}>
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Experience</h2>
          <div className="w-20 h-1 bg-primary rounded mb-10" />

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent" />

            <div className="space-y-10">
              {experiences.map((exp, i) => (
                <motion.div
                  key={exp.company}
                  initial={{ opacity: 0, x: -30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.2 }}
                  className="relative pl-16"
                >
                  {/* Dot */}
                  <div className="absolute left-4 top-2 w-5 h-5 rounded-full border-2 border-primary bg-background flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>

                  <div className="glass-card-hover p-6">
                    <div className="flex items-start justify-between flex-wrap gap-2 mb-3">
                      <div>
                        <h3 className="text-lg font-bold text-foreground">{exp.role}</h3>
                        <p className="text-primary font-mono text-sm flex items-center gap-2">
                          <Briefcase className="w-3.5 h-3.5" />
                          {exp.company}
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground font-mono px-3 py-1 rounded-full border border-glass-border">
                        {exp.period}
                      </span>
                    </div>
                    <ul className="space-y-1.5">
                      {exp.highlights.map((h) => (
                        <li key={h} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-primary mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;
