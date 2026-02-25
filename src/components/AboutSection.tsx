import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { TrendingUp, ShieldCheck, BarChart3, Zap } from "lucide-react";

const highlights = [
  { icon: TrendingUp, label: "8+ Years Experience", desc: "Data analysis & reporting" },
  { icon: ShieldCheck, label: "Data Integrity", desc: "Accuracy & validation expert" },
  { icon: BarChart3, label: "Trend Analysis", desc: "Identifying patterns & insights" },
  { icon: Zap, label: "Process Optimization", desc: "Streamlining workflows" },
];

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding" ref={ref}>
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">About Me</h2>
          <div className="w-20 h-1 bg-primary rounded mb-10" />

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                I'm a detail-oriented Data Analyst with over 8 years of experience in
                data analysis, reporting, and process optimization across Healthcare
                and BPO environments.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                My expertise lies in Advanced Excel, Power BI, data validation,
                performance tracking, and dashboard reporting. I specialize in ensuring
                data accuracy, identifying trends, and supporting critical business
                decisions through clear, actionable insights.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                I'm passionate about turning complex datasets into stories that drive
                real business value, and I continuously leverage AI tools to enhance
                productivity and uncover deeper analytical perspectives.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {highlights.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="glass-card-hover p-5 text-center"
                >
                  <item.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold text-sm text-foreground mb-1">{item.label}</h3>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
