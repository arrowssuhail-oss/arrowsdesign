'use client';

import { useActionState } from 'react';
import { createStory } from "@/actions/stories";

const initialState = {
    message: '',
};

export default function CreateStoryForm() {
    const [state, formAction, isPending] = useActionState(createStory, initialState);

    return (
        <form action={formAction} className="space-y-4">
            {state?.message && (
                <div className={`p-3 rounded text-sm ${state.message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {state.message}
                </div>
            )}
            <div>
                <label className="block text-sm font-medium mb-1">Media URL</label>
                <input
                    name="mediaUrl"
                    type="url"
                    placeholder="https://..."
                    required
                    className="w-full rounded border p-2"
                />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Type</label>
                    <select name="mediaType" className="w-full rounded border p-2">
                        <option value="image">Image</option>
                        <option value="video">Video</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Caption</label>
                    <input name="caption" type="text" className="w-full rounded border p-2" />
                </div>
            </div>
            <button
                type="submit"
                disabled={isPending}
                className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed"
            >
                {isPending ? 'Posting...' : 'Post Story'}
            </button>
        </form>
    );
}
