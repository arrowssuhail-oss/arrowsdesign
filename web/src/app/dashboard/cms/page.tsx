
import { getProjects, deleteProject } from "@/actions/projects";
import CreateProjectForm from "./CreateProjectForm";

export const dynamic = 'force-dynamic';

export default async function CMSPage() {
    const projects = await getProjects();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Portfolio CMS</h1>
            </div>

            {/* Create Project Form */}
            <div className="rounded-lg border bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-lg font-semibold">Add New Project</h2>
                <CreateProjectForm />
            </div>

            {/* Projects List */}
            <div className="grid gap-6">
                {projects.map((project: any) => (
                    <div key={project._id} className="flex gap-4 rounded-lg border bg-white p-4 items-start">
                        {project.images && project.images.length > 0 && (
                            <img src={project.images[0]} alt={project.title} className="w-24 h-24 object-cover rounded bg-gray-100" />
                        )}
                        <div className="flex-1">
                            <h3 className="text-xl font-bold">{project.title}</h3>
                            <p className="text-gray-600 text-sm mb-2">{project.description}</p>
                            {project.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-2">
                                    {project.tags.map((tag: string, i: number) => (
                                        <span key={i} className="px-2 py-0.5 bg-gray-100 text-xs rounded text-gray-600">{tag}</span>
                                    ))}
                                </div>
                            )}
                            <a href={project.link} target="_blank" className="text-blue-500 text-sm hover:underline">{project.link}</a>
                        </div>
                        <div className="flex flex-col gap-2">
                            {/* Edit - Ideally a tailored modal/form, for now assuming deletion is primary 'manage' action in this fast pass */}
                            <form action={deleteProject.bind(null, project._id)}>
                                <button className="text-sm bg-red-100 text-red-800 px-3 py-1 rounded hover:bg-red-200">
                                    Delete
                                </button>
                            </form>
                        </div>
                    </div>
                ))}
                {projects.length === 0 && (
                    <p className="text-gray-500 text-center py-10">No projects found.</p>
                )}
            </div>
        </div>
    );
}
