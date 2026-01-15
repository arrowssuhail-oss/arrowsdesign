'use client';
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera, History, Trash2, Smartphone } from "lucide-react";
import ImageUpload from "@/components/ImageUpload";
import { useToast } from "@/components/ui/use-toast";
import { createStory } from "@/actions/stories";
import { format } from "date-fns";

export default function StoryManager() {
    const { toast } = useToast();
    const [storyUrl, setStoryUrl] = useState("");
    const [activeStory, setActiveStory] = useState<{ content: string; active: boolean; timestamp: number } | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [archive, setArchive] = useState<any[]>([]);

    // Load initial story state & Archive
    useEffect(() => {
        try {
            // Load Archive
            const storedArchive = localStorage.getItem("arrows_story_archive");
            if (storedArchive) setArchive(JSON.parse(storedArchive));

            // Load Active Story
            const stored = localStorage.getItem("arrows_story_data");
            if (stored) {
                const parsed = JSON.parse(stored);
                const isExpired = Date.now() - parsed.timestamp > 24 * 60 * 60 * 1000;

                if (parsed.active && !isExpired) {
                    setActiveStory(parsed);
                    setStoryUrl(parsed.content);
                } else if (parsed.active && isExpired) {
                    // Move to archive logic...
                    // For simplicity in this demo, just clear it
                    localStorage.removeItem("arrows_story_data");
                    setActiveStory(null);
                }
            }
        } catch (e) {
            console.error(e);
        }
    }, []);

    const handleUpdateStory = async () => {
        if (!storyUrl) return;
        try {
            setIsSaving(true);
            const formData = new FormData();
            formData.append("mediaUrl", storyUrl);
            formData.append("mediaType", "image");
            formData.append("caption", "Uploaded from Dashboard");

            const result = await createStory(null, formData);

            if (result.message.includes("success")) {
                toast({ title: "Story Live!", description: "Updated on cloud and database." });
                const storyData = {
                    content: storyUrl,
                    type: 'image',
                    timestamp: Date.now(),
                    active: true
                };
                localStorage.setItem("arrows_story_data", JSON.stringify(storyData));
                setActiveStory(storyData as any);
                // window.location.reload(); // Avoid full reload
            } else {
                toast({ title: "Update Failed", description: result.message, variant: "destructive" });
            }
        } catch (error) {
            toast({ title: "Error", description: "Failed to connect to server", variant: "destructive" });
        } finally {
            setIsSaving(false);
        }
    };

    const handleDeleteStory = () => {
        localStorage.removeItem("arrows_story_data");
        setActiveStory(null);
        setStoryUrl("");
        toast({ title: "Story Removed", description: "The story has been removed." });
    };

    return (
        <div className="grid lg:grid-cols-2 gap-8 mb-8 animate-in fade-in zoom-in duration-500 delay-300 fill-mode-backwards">
            {/* Editor Panel */}
            <div className="p-8 rounded-3xl border border-white/5 bg-black/40 backdrop-blur-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />

                <div className="flex items-center gap-3 mb-8">
                    <div className="p-2.5 rounded-xl bg-pink-500/10 text-pink-400 border border-pink-500/20">
                        <Camera className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold tracking-tight">Daily Story</h3>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium mt-1">Status: {activeStory ? 'Live' : 'Inactive'}</p>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="space-y-2">
                        <Label className="text-xs uppercase text-muted-foreground font-bold tracking-widest pl-1">Source Image</Label>
                        <div className="border-2 border-dashed border-white/10 rounded-2xl hover:border-pink-500/50 hover:bg-pink-500/5 transition-all duration-300">
                            <ImageUpload folder="/stories" onSuccess={(url) => setStoryUrl(url)} />
                        </div>
                    </div>

                    {storyUrl && (
                        <div className="space-y-2">
                            <Label className="text-xs uppercase text-muted-foreground font-bold tracking-widest pl-1">Image URL</Label>
                            <Input
                                value={storyUrl}
                                onChange={(e) => setStoryUrl(e.target.value)}
                                className="bg-white/5 border-white/10 focus:border-pink-500/50 rounded-xl font-mono text-xs"
                            />
                        </div>
                    )}

                    <div className="flex gap-3 pt-2">
                        <Button onClick={handleUpdateStory} disabled={isSaving} className="flex-1 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white border-0 shadow-lg shadow-pink-900/20">
                            {isSaving ? "Publishing..." : "Update Story"}
                        </Button>
                        {activeStory && (
                            <Button variant="outline" onClick={handleDeleteStory} className="border-rose-500/20 text-rose-400 hover:bg-rose-500/10">
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            {/* Preview Panel */}
            <div className="p-8 rounded-3xl border border-white/5 bg-black/40 backdrop-blur-xl flex flex-col items-center justify-center relative min-h-[400px]">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 rounded-3xl" />

                <div className="relative z-10 w-[240px] h-[480px] bg-black rounded-[3rem] border-8 border-neutral-900 shadow-2xl overflow-hidden ring-1 ring-white/10">
                    {/* Notch */}
                    <div className="absolute top-0 inset-x-0 h-6 bg-neutral-900 w-1/2 mx-auto rounded-b-xl z-20" />

                    {/* Screen Content */}
                    <div className="w-full h-full bg-neutral-800 relative">
                        {storyUrl || activeStory ? (
                            <img src={storyUrl || activeStory?.content} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground p-6 text-center">
                                <Smartphone className="w-12 h-12 mb-4 opacity-20" />
                                <span className="text-xs">No active story</span>
                            </div>
                        )}

                        {/* UI Overlay Simulation */}
                        <div className="absolute top-4 left-4 right-4 flex justify-between items-center text-white/80 z-10">
                            <div className="w-16 h-1 rounded-full bg-white/30" />
                            <div className="w-16 h-1 rounded-full bg-white/30" />
                        </div>
                    </div>
                </div>

                <p className="absolute bottom-6 text-xs text-muted-foreground uppercase tracking-widest font-medium">Live Mobile Preview</p>
            </div>
        </div>
    );
}
