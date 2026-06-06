import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Database, Brain, Bot } from "lucide-react";

const categories = [
  {
    icon: Database,
    title: "Data Tools",
    skills: ["Excel (Advanced)", "Power BI", "Tableau", "Google Sheets", "Zendesk Explore"],
  },
  {
    icon: Brain,
    title: "Core Capabilities",
    skills: ["Data Cleaning", "Reporting", "Dashboard Creation", "Data Validation", "Trend Analysis", "Process Optimization"],
  },
  {
    icon: Bot,
    title: "AI Productivity",
    skills: ["ChatGPT", "Google AI Studio", "Gemini", "Claude"],
  },
];

const SkillsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="section-padding bg-secondary/20" ref={ref}>
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Skills & Tools</h2>
          <div className="w-20 h-1 bg-primary rounded mb-10" />

          <div className="grid md:grid-cols-3 gap-6">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.15 }}
                className="glass-card-hover p-6"
              >
                <cat.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-lg font-bold text-foreground mb-4">{cat.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 text-xs font-mono rounded-md bg-primary/10 text-primary border border-primary/20"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
