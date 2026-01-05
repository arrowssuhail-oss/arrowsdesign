import React from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

interface StoryViewerProps {
    isOpen: boolean;
    onClose: () => void;
    storyData: { content: string; type: 'image' | 'video'; timestamp: number } | null;
}

const StoryViewer: React.FC<StoryViewerProps> = ({ isOpen, onClose, storyData }) => {
    if (!storyData) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md bg-black border-none text-white p-0 overflow-hidden">
                <div className="relative w-full h-[80vh] flex items-center justify-center">
                    <img
                        src={storyData.content}
                        alt="Story content"
                        className="max-w-full max-h-full object-contain"
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default StoryViewer;
