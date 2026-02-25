import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { TrendingUp, Users, FileCheck, Clock } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const kpis = [
  { icon: FileCheck, label: "Reports Delivered", value: "2,400+", change: "+12%" },
  { icon: Users, label: "Stakeholders Served", value: "150+", change: "+8%" },
  { icon: TrendingUp, label: "Data Accuracy", value: "99.7%", change: "+0.3%" },
  { icon: Clock, label: "Avg Turnaround", value: "< 4hrs", change: "-15%" },
];

const areaData = [
  { month: "Jan", reports: 180, insights: 45 },
  { month: "Feb", reports: 210, insights: 52 },
  { month: "Mar", reports: 195, insights: 60 },
  { month: "Apr", reports: 240, insights: 58 },
  { month: "May", reports: 260, insights: 72 },
  { month: "Jun", reports: 300, insights: 85 },
];

const barData = [
  { name: "Excel", hours: 35 },
  { name: "Power BI", hours: 28 },
  { name: "Sheets", hours: 15 },
  { name: "Zendesk", hours: 12 },
  { name: "AI Tools", hours: 10 },
];

const pieData = [
  { name: "Reporting", value: 35 },
  { name: "Analysis", value: 30 },
  { name: "Dashboards", value: 20 },
  { name: "Process Opt.", value: 15 },
];

const pieColors = ["hsl(200, 100%, 50%)", "hsl(185, 80%, 55%)", "hsl(200, 80%, 35%)", "hsl(215, 25%, 35%)"];

const DashboardSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="dashboard" className="section-padding" ref={ref}>
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Dashboard Showcase</h2>
          <div className="w-20 h-1 bg-primary rounded mb-10" />

          {/* KPI row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {kpis.map((kpi, i) => (
              <motion.div
                key={kpi.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="glass-card-hover p-5"
              >
                <kpi.icon className="w-6 h-6 text-primary mb-2" />
                <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
                <p className="text-xs text-muted-foreground mb-1">{kpi.label}</p>
                <span className="text-xs font-mono text-accent">{kpi.change}</span>
              </motion.div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
              className="glass-card p-5"
            >
              <h3 className="text-sm font-semibold text-foreground mb-4">Monthly Output</h3>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={areaData}>
                  <defs>
                    <linearGradient id="colorReports" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(200, 100%, 50%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(200, 100%, 50%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(215, 20%, 18%)" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(215, 15%, 55%)" }} />
                  <YAxis tick={{ fontSize: 11, fill: "hsl(215, 15%, 55%)" }} />
                  <Tooltip
                    contentStyle={{ background: "hsl(220, 25%, 10%)", border: "1px solid hsl(215, 20%, 22%)", borderRadius: 8, fontSize: 12 }}
                  />
                  <Area type="monotone" dataKey="reports" stroke="hsl(200, 100%, 50%)" fillOpacity={1} fill="url(#colorReports)" />
                  <Area type="monotone" dataKey="insights" stroke="hsl(185, 80%, 55%)" fillOpacity={0.1} fill="hsl(185, 80%, 55%)" />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="glass-card p-5"
            >
              <h3 className="text-sm font-semibold text-foreground mb-4">Weekly Tool Usage (hrs)</h3>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(215, 20%, 18%)" />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: "hsl(215, 15%, 55%)" }} />
                  <YAxis tick={{ fontSize: 11, fill: "hsl(215, 15%, 55%)" }} />
                  <Tooltip
                    contentStyle={{ background: "hsl(220, 25%, 10%)", border: "1px solid hsl(215, 20%, 22%)", borderRadius: 8, fontSize: 12 }}
                  />
                  <Bar dataKey="hours" fill="hsl(200, 100%, 50%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7 }}
              className="glass-card p-5 md:col-span-2"
            >
              <h3 className="text-sm font-semibold text-foreground mb-4">Time Allocation</h3>
              <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                <ResponsiveContainer width={200} height={200}>
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value">
                      {pieData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={pieColors[index]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ background: "hsl(220, 25%, 10%)", border: "1px solid hsl(215, 20%, 22%)", borderRadius: 8, fontSize: 12 }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-2 gap-3">
                  {pieData.map((item, i) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-sm" style={{ background: pieColors[i] }} />
                      <span className="text-sm text-muted-foreground">{item.name} ({item.value}%)</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DashboardSection;
