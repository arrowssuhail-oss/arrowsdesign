
"use client";

import { useState } from "react";
import StoryViewer from "./StoryViewer";

const Stories = ({ stories = [] }: { stories: any[] }) => {
    const [selectedStory, setSelectedStory] = useState<any | null>(null);

    const activeStories = stories.filter(s => s.status === 'active');

    if (activeStories.length === 0) return null;

    return (
        <section className="py-8 bg-transparent">
            <div className="max-w-7xl mx-auto px-6 overflow-x-auto">
                <div className="flex gap-4">
                    {activeStories.map((story) => (
                        <button
                            key={story._id}
                            onClick={() => setSelectedStory({ content: story.mediaUrl, type: story.mediaType, timestamp: new Date(story.createdAt).getTime() })}
                            className="flex-shrink-0 flex flex-col items-center gap-2 group"
                        >
                            <div className="w-16 h-16 rounded-full p-[3px] bg-gradient-to-tr from-yellow-400 to-fuchsia-600 group-hover:scale-105 transition-transform">
                                <div className="w-full h-full rounded-full border-2 border-black overflow-hidden bg-gray-900">
                                    {story.mediaType === 'image' ? (
                                        <img src={story.mediaUrl} alt="Story" className="w-full h-full object-cover" />
                                    ) : (
                                        <video src={story.mediaUrl} className="w-full h-full object-cover" />
                                    )}
                                </div>
                            </div>
                            <span className="text-xs text-gray-400 max-w-[70px] truncate">{story.caption || "Story"}</span>
                        </button>
                    ))}
                </div>
            </div>

            <StoryViewer
                isOpen={!!selectedStory}
                onClose={() => setSelectedStory(null)}
                storyData={selectedStory}
            />
        </section>
    );
};

export default Stories;
