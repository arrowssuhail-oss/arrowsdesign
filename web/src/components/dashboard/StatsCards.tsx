import { LayoutDashboard, FolderLock, Bell, TrendingUp } from "lucide-react";

export default function StatsCards() {
    const stats = [
        { label: "Active Projects", value: "3", icon: LayoutDashboard, color: "text-blue-400", bg: "bg-blue-500/5", border: "border-blue-500/10" },
        { label: "Total Assets", value: "2.4 GB", icon: FolderLock, color: "text-amber-400", bg: "bg-amber-500/5", border: "border-amber-500/10" },
        { label: "Views Today", value: "1,204", icon: TrendingUp, color: "text-emerald-400", bg: "bg-emerald-500/5", border: "border-emerald-500/10" },
        { label: "Notifications", value: "2", icon: Bell, color: "text-rose-400", bg: "bg-rose-500/5", border: "border-rose-500/10" },
    ];

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10 animate-in fade-in zoom-in duration-500 delay-150 fill-mode-backwards">
            {stats.map((stat, i) => (
                <div key={i} className={`p-6 rounded-3xl border ${stat.border} ${stat.bg} backdrop-blur-md flex flex-col justify-between h-36 hover:scale-[1.02] hover:bg-white/5 transition-all duration-300 group`}>
                    <div className="flex justify-between items-start">
                        <span className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest">{stat.label}</span>
                        <div className={`p-2 rounded-xl bg-background/50 border border-white/5 group-hover:border-white/10 transition-colors`}>
                            <stat.icon className={`w-4 h-4 ${stat.color}`} />
                        </div>
                    </div>
                    <span className="text-3xl font-bold text-foreground/90 font-mono tracking-tight">{stat.value}</span>
                </div>
            ))}
        </div>
    );
}
