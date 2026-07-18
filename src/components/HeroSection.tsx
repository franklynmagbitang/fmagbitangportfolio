import { motion } from "framer-motion";
import { ArrowDown, FolderOpen, Mail } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import profilePic from "@/assets/profile-pic.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 md:pt-28">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 container mx-auto px-4 md:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block mb-6 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-mono"
          >
            📊 Data Analyst | Reporting & Insights Specialist
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-8"
          >
            <div className="w-36 h-36 md:w-44 md:h-44 mx-auto rounded-full overflow-hidden border-2 border-primary/40 shadow-[0_0_30px_hsl(var(--primary)/0.3)]">
              <img src={profilePic} alt="Franklyn Magbitang" className="w-full h-full object-cover" />
            </div>
          </motion.div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
            <span className="text-foreground">Hi, I'm </span>
            <span className="gradient-text glow-text">Franklyn</span>
            <br />
            <span className="gradient-text glow-text">Magbitang</span>
          </h1>

          <p className="max-w-2xl mx-auto text-muted-foreground text-lg md:text-xl mb-10 leading-relaxed">
            Transforming raw data into actionable insights. 8+ years specializing in
            reporting, analytics, and process optimization across healthcare & BPO.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#projects"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all duration-200 glow-border"
            >
              <FolderOpen className="w-5 h-5" />
              View Projects
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg border border-glass-border bg-glass/50 text-foreground font-semibold hover:border-primary/50 transition-all duration-200"
            >
              <Mail className="w-5 h-5" />
              Contact Me
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <ArrowDown className="w-5 h-5 text-muted-foreground animate-float" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
