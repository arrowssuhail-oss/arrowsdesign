
import { getStories, deleteStory, archiveStory } from "@/actions/stories";
import CreateStoryForm from "./CreateStoryForm";
import { Button } from "@/components/ui/button"; // Assuming shadcn or similar exists, else standard html button
import { redirect } from "next/navigation";

// Since I am not sure if shadcn components exist in this specific project (package.json has them), 
// I will use standard HTML/Tailwind for now to be safe, or import if I checked. 
// web/package.json showed @radix-ui/react-*, class-variance-authority, lucide-react. 
// So shadcn is likely present. I'll stick to raw tailwind for speed/compat unless I see components/ui folder.
// I saw components folder but not its content. I'll use standard Tailwind.

export default async function StoriesPage() {
    const stories = await getStories();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Story Manager</h1>
            </div>

            {/* Upload Form - Simple Implementation */}
            <div className="rounded-lg border bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-lg font-semibold">Upload New Story</h2>
                <CreateStoryForm />
            </div>

            {/* Stories List */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {stories.map((story: any) => (
                    <div key={story._id} className="relative overflow-hidden rounded-lg border bg-white shadow-sm">
                        <div className="aspect-[9/16] bg-gray-100 relative group">
                            {/* Media Preview */}
                            {story.mediaType === 'image' ? (
                                <img src={story.mediaUrl} alt="Story" className="h-full w-full object-cover" />
                            ) : (
                                <video src={story.mediaUrl} className="h-full w-full object-cover" controls />
                            )}

                            {/* Overlay Status */}
                            <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                                {story.status.toUpperCase()}
                            </div>
                        </div>

                        <div className="p-4 space-y-2">
                            <p className="text-sm text-gray-600 truncate">{story.caption || "No caption"}</p>
                            <div className="text-xs text-gray-400">
                                Expires: {new Date(story.expiresAt).toLocaleString()}
                            </div>
                            <div className="flex gap-2 mt-2">
                                {story.status === 'active' && (
                                    <form action={archiveStory.bind(null, story._id)}>
                                        <button className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded hover:bg-yellow-200">
                                            Archive
                                        </button>
                                    </form>
                                )}
                                <form action={deleteStory.bind(null, story._id)}>
                                    <button className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded hover:bg-red-200">
                                        Delete
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                ))}
                {stories.length === 0 && (
                    <p className="text-gray-500 col-span-full text-center py-10">No stories found.</p>
                )}
            </div>
        </div>
    );
}
