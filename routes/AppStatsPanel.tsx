import React, { useState, useMemo } from "react";
import {
  Users,
  MousePointer2,
  TrendingUp,
  Calendar,
  AlertCircle,
  ChevronDown,
  Activity,
  Timer,
  Clock,
  Download,
  BarChart2,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const StatsPanel: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState("Octubre 2024");

  const months = [
    "Octubre 2024",
    "Septiembre 2024",
    "Agosto 2024",
    "Julio 2024",
    "Junio 2024",
  ];

  // Dynamic mock data for the weekly usage chart
  const weeklyUsageData = useMemo(() => {
    const seed = selectedMonth.length;
    const days = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
    return days.map((day, index) => {
      const isWeekend = index > 4;
      const baseValue = isWeekend ? 120 : 65;
      // Variance based on month to simulate interactivity
      const variance = (seed * (index + 1)) % 40;
      return {
        name: day,
        consultas: baseValue + variance,
      };
    });
  }, [selectedMonth]);

  // KPIs as requested by the user
  const kpis = [
    {
      label: "Tiempo de uso total",
      value: "120h 15m",
      icon: Clock,
      color: "text-orange-600",
      bg: "bg-orange-50",
      trend: "+12h vs mes anterior",
    },
    {
      label: "Tiempo de encendido",
      value: "15d 4h 22m",
      icon: Activity,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      trend: "Uptime: 99.9%",
    },
    {
      label: "Media Sesiones Diarias",
      value: "42.5",
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50",
      trend: "+5.2% esta semana",
    },
    {
      label: "Interacciones Totales",
      value: "8.432",
      icon: MousePointer2,
      color: "text-purple-600",
      bg: "bg-purple-50",
      trend: "Pico: Sábados",
    },
  ];

  // Clicks breakdown data
  const buttonInteractions = [
    {
      name: "Turismo Cultural",
      clicks: 2450,
      percentage: 85,
      color: "bg-[#1c6c3e]",
    },
    { name: "Naturaleza", clicks: 1820, percentage: 65, color: "bg-[#d4e11d]" },
    {
      name: "Productos Locales",
      clicks: 1540,
      percentage: 55,
      color: "bg-blue-500",
    },
    {
      name: "Información General",
      clicks: 1100,
      percentage: 40,
      color: "bg-orange-500",
    },
    {
      name: "Mapa Interactivo",
      clicks: 920,
      percentage: 35,
      color: "bg-purple-500",
    },
    { name: "Emergencias", clicks: 102, percentage: 5, color: "bg-red-500" },
  ];

  return (
    <aside className="border-r bg-white overflow-y-auto p-4 h-screen">
      <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-top-4 duration-500 pb-20">
        {/* Upper Dashboard Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
          <div>
            <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tight">
              Panel de Control Administrativo
            </h2>
            <p className="text-slate-500 font-medium">
              Métricas de rendimiento para el Punto de Información Zuheros
            </p>
          </div>

          <div className="flex gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:flex-none">
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="w-full appearance-none bg-slate-50 pl-12 pr-12 py-4 rounded-2xl border border-slate-200 font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-[#1c6c3e]/10 cursor-pointer transition-all hover:bg-white"
              >
                {months.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
              <Calendar
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                size={20}
              />
              <ChevronDown
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                size={20}
              />
            </div>
            <button className="bg-slate-800 text-white p-4 rounded-2xl hover:bg-slate-700 transition-colors shadow-lg active:scale-95">
              <Download size={24} />
            </button>
          </div>
        </div>

        {/* Main KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpis.map((kpi, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col gap-4 group hover:shadow-xl transition-all duration-300"
            >
              <div className="flex justify-between items-start">
                <div
                  className={`${kpi.bg} p-4 rounded-2xl ${kpi.color} group-hover:scale-110 transition-transform`}
                >
                  <kpi.icon size={28} />
                </div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  {kpi.trend}
                </span>
              </div>
              <div>
                <p className="text-slate-400 font-bold uppercase text-xs tracking-widest mb-1">
                  {kpi.label}
                </p>
                <p className="text-3xl font-black text-slate-800 tracking-tighter">
                  {kpi.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Weekly Activity Chart */}
          <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100 flex flex-col h-[550px]">
            <div className="flex justify-between items-center mb-10">
              <div className="flex items-center gap-3">
                <BarChart2 className="text-blue-500" />
                <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tight">
                  Actividad Semanal
                </h3>
              </div>
              <div className="bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
                Nº de Consultas
              </div>
            </div>

            <div className="flex-1 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={weeklyUsageData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#f1f5f9"
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#94a3b8", fontWeight: 700, fontSize: 13 }}
                    dy={15}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#94a3b8", fontWeight: 700, fontSize: 13 }}
                  />
                  <Tooltip
                    cursor={{ fill: "#f8fafc" }}
                    contentStyle={{
                      borderRadius: "20px",
                      border: "none",
                      boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                      padding: "16px",
                      fontWeight: 800,
                      textTransform: "uppercase",
                    }}
                  />
                  <Bar dataKey="consultas" radius={[12, 12, 0, 0]} barSize={55}>
                    {weeklyUsageData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={index > 4 ? "#1c6c3e" : "#3b82f6"}
                        fillOpacity={0.85}
                        className="hover:fill-opacity-100 transition-all duration-300"
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-8 text-slate-400 font-bold text-xs text-center uppercase tracking-[0.2em]">
              Distribución de tráfico por día de la semana
            </p>
          </div>

          {/* Detailed Clicks Breakdown */}
          <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100 flex flex-col h-[550px]">
            <div className="flex items-center gap-3 mb-10">
              <MousePointer2 className="text-purple-500" />
              <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tight">
                Clics por Botón
              </h3>
            </div>

            <div className="flex-1 space-y-6 overflow-y-auto custom-scrollbar pr-4">
              {buttonInteractions.map((btn, idx) => (
                <div key={idx} className="group">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-sm font-black text-slate-600 uppercase tracking-tight group-hover:text-slate-900 transition-colors">
                      {btn.name}
                    </span>
                    <span className="text-sm font-black text-slate-900 bg-slate-100 px-3 py-1 rounded-lg">
                      {btn.clicks.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-slate-50 h-3 rounded-full overflow-hidden shadow-inner border border-slate-100">
                    <div
                      className={`${btn.color} h-full rounded-full transition-all duration-1000 ease-out group-hover:brightness-110`}
                      style={{ width: `${btn.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-slate-50">
              <div className="bg-slate-900 rounded-3xl p-6 text-white relative overflow-hidden group cursor-pointer">
                <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-125 transition-transform duration-700">
                  <TrendingUp size={100} />
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50 mb-1">
                  Tendencia Mes
                </p>
                <p className="text-lg font-black leading-tight">
                  Turismo Cultural lidera con 2.4K clics
                </p>
                <button className="mt-4 text-xs font-black text-[#d4e11d] hover:underline uppercase tracking-widest flex items-center gap-2">
                  Ver reporte detallado{" "}
                  <ChevronDown size={14} className="-rotate-90" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Status & Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100 flex flex-col gap-6">
            <div className="flex items-center gap-3 text-slate-800">
              <AlertCircle className="text-amber-500" />
              <h3 className="text-xl font-black uppercase tracking-tight">
                Estado del Hardware
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 bg-emerald-50/50 rounded-2xl border border-emerald-100 flex justify-between items-center">
                <div>
                  <p className="font-black text-emerald-800 text-xs uppercase tracking-widest mb-1">
                    Conectividad
                  </p>
                  <p className="text-emerald-600 font-bold text-sm">
                    Fibra 600Mb OK
                  </p>
                </div>
                <div className="w-4 h-4 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>
              </div>
              <div className="p-6 bg-blue-50/50 rounded-2xl border border-blue-100 flex justify-between items-center">
                <div>
                  <p className="font-black text-blue-800 text-xs uppercase tracking-widest mb-1">
                    Sistema
                  </p>
                  <p className="text-blue-600 font-bold text-sm">
                    v2.4.0 (Última)
                  </p>
                </div>
                <Activity size={20} className="text-blue-500" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-8">
            <div className="text-center sm:text-left">
              <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tight mb-2">
                Informe Ejecutivo
              </h3>
              <p className="text-slate-500 font-medium">
                Generar resumen de uso en PDF para informes mensuales de
                turismo.
              </p>
            </div>
            <button className="w-full sm:w-auto bg-[#1c6c3e] text-white font-black py-6 px-12 rounded-[2rem] text-sm uppercase tracking-[0.2em] hover:bg-[#1a6138] transition-all shadow-xl shadow-[#1c6c3e]/20 active:scale-95 whitespace-nowrap">
              Exportar PDF
            </button>
          </div>
        </div>

        <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>
      </div>
    </aside>
  );
};

export default StatsPanel;
