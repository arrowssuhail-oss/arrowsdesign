'use client';
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Palette, Plus, LayoutDashboard, Trash2, MoreHorizontal } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";
import { defaultProjects } from "@/components/ProjectsSection";

export default function ProjectManager() {
    const { toast } = useToast();
    const [projects, setProjects] = useState<any[]>([]);
    const [editingProject, setEditingProject] = useState<any | null>(null);
    const [isProjectSheetOpen, setIsProjectSheetOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    // Load Projects
    useEffect(() => {
        const storedProjects = localStorage.getItem("arrows_projects_data");
        if (storedProjects) {
            try {
                setProjects(JSON.parse(storedProjects));
            } catch (e) {
                setProjects(defaultProjects);
            }
        } else {
            setProjects(defaultProjects);
        }
    }, []);

    const handleSaveProject = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            const projectId = editingProject.id || Date.now();
            const projectToSave = { ...editingProject, id: projectId };
            const updatedProjects = editingProject.id
                ? projects.map(p => p.id === editingProject.id ? projectToSave : p)
                : [...projects, projectToSave];

            setProjects(updatedProjects);
            localStorage.setItem("arrows_projects_data", JSON.stringify(updatedProjects));
            window.dispatchEvent(new Event("project-update"));
            setIsProjectSheetOpen(false);
            setEditingProject(null);
            toast({ title: "Success", description: "Project updated." });
        } catch (error) {
            toast({ variant: "destructive", title: "Sync Failed" });
        } finally {
            setIsSaving(false);
        }
    };

    const handleDeleteProject = (id: number, e: React.MouseEvent) => {
        e.stopPropagation();
        const updatedProjects = projects.filter(p => p.id !== id);
        setProjects(updatedProjects);
        localStorage.setItem("arrows_projects_data", JSON.stringify(updatedProjects));
        window.dispatchEvent(new Event("project-update"));
        toast({ title: "Deleted", description: "Project removed." });
    };

    return (
        <div className="mb-20 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500 fill-mode-backwards">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <Palette className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold tracking-tight">Portfolio Grid</h3>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium mt-1">Manage main showcase</p>
                    </div>
                </div>
                <Button
                    onClick={() => {
                        setEditingProject({
                            title: "",
                            category: "",
                            link: "/",
                            iconName: "Palette",
                            color: "from-gray-500/30 to-gray-500/5",
                            shapes: ["rounded-full", "rounded-lg", "rounded-full"]
                        });
                        setIsProjectSheetOpen(true);
                    }}
                    className="rounded-full bg-white text-black hover:bg-white/90 font-semibold"
                >
                    <Plus className="w-4 h-4 mr-2" /> Add Project
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                    <div
                        key={project.id}
                        onClick={() => {
                            setEditingProject(project);
                            setIsProjectSheetOpen(true);
                        }}
                        className="group relative h-48 rounded-3xl border border-white/5 bg-black/40 backdrop-blur-md overflow-hidden cursor-pointer transition-all duration-300 hover:border-white/20 hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-900/20"
                    >
                        {/* Background Gradient */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20 group-hover:opacity-30 transition-opacity`} />

                        <div className="absolute inset-0 p-6 flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/10">
                                    <LayoutDashboard className="w-5 h-5 text-white" />
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-white/40 hover:text-rose-400 hover:bg-rose-500/10"
                                    onClick={(e) => handleDeleteProject(project.id, e)}
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>

                            <div>
                                <span className="text-[10px] uppercase tracking-widest font-bold text-white/50">{project.category}</span>
                                <h4 className="text-xl font-bold text-white mt-1 group-hover:text-emerald-400 transition-colors">{project.title}</h4>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Dashed Add Button Slot */}
                <button
                    onClick={() => {
                        setEditingProject({ title: "", category: "", link: "/", iconName: "Palette", color: "from-gray-500/30 to-gray-500/5", shapes: [] });
                        setIsProjectSheetOpen(true);
                    }}
                    className="h-48 rounded-3xl border-2 border-dashed border-white/5 bg-transparent flex flex-col items-center justify-center text-muted-foreground hover:border-emerald-500/30 hover:text-emerald-400 hover:bg-emerald-500/5 transition-all duration-300 group"
                >
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <Plus className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-medium">Add New Project</span>
                </button>
            </div>

            {/* Edit Sheet */}
            <Sheet open={isProjectSheetOpen} onOpenChange={setIsProjectSheetOpen}>
                <SheetContent className="border-l border-white/10 bg-black/95 backdrop-blur-xl">
                    <SheetHeader>
                        <SheetTitle className="text-2xl font-bold">Edit Project</SheetTitle>
                        <SheetDescription>Update project details.</SheetDescription>
                    </SheetHeader>
                    {editingProject && (
                        <form onSubmit={handleSaveProject} className="space-y-8 mt-8">
                            <div className="space-y-3">
                                <Label className="text-xs uppercase tracking-widest text-muted-foreground">Title</Label>
                                <Input value={editingProject.title} onChange={e => setEditingProject({ ...editingProject, title: e.target.value })} className="bg-white/5 border-white/10 h-12 rounded-xl" required />
                            </div>
                            <div className="space-y-3">
                                <Label className="text-xs uppercase tracking-widest text-muted-foreground">Category</Label>
                                <Input value={editingProject.category} onChange={e => setEditingProject({ ...editingProject, category: e.target.value })} className="bg-white/5 border-white/10 h-12 rounded-xl" required />
                            </div>
                            <Button type="submit" className="w-full h-12 rounded-xl bg-white text-black hover:bg-white/90 font-bold" disabled={isSaving}>
                                {isSaving ? "Saving..." : "Save Changes"}
                            </Button>
                        </form>
                    )}
                </SheetContent>
            </Sheet>
        </div>
    );
}
