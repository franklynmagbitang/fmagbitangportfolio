import { BarChart3 } from "lucide-react";

const Footer = () => (
  <footer className="py-8 px-4 border-t border-glass-border">
    <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2 text-primary font-bold">
        <BarChart3 className="w-5 h-5" />
        <span>Franklyn Magbitang</span>
      </div>
      <p className="text-xs text-muted-foreground">
        © {new Date().getFullYear()} — Data Analyst Portfolio. Built with insights in mind.
      </p>
    </div>
  </footer>
);

export default Footer;
