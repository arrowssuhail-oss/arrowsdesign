'use client';

import { useActionState } from 'react';
import { createProject } from "@/actions/projects";

const initialState = {
    message: '',
};

export default function CreateProjectForm() {
    const [state, formAction, isPending] = useActionState(createProject, initialState);

    return (
        <form action={formAction} className="space-y-4">
            {state?.message && (
                <div className={`p-3 rounded text-sm ${state.message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {state.message}
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Project Title</label>
                    <input name="title" type="text" required className="w-full rounded border p-2" />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Project Link (Optional)</label>
                    <input name="link" type="url" className="w-full rounded border p-2" />
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea name="description" rows={3} required className="w-full rounded border p-2"></textarea>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Image URLs (comma separated)</label>
                    <input name="images" type="text" placeholder="https://..., https://..." className="w-full rounded border p-2" />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Tags (comma separated)</label>
                    <input name="tags" type="text" placeholder="Design, React, ..." className="w-full rounded border p-2" />
                </div>
            </div>
            <button
                type="submit"
                disabled={isPending}
                className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed"
            >
                {isPending ? 'Adding...' : 'Add Project'}
            </button>
        </form>
    );
}
