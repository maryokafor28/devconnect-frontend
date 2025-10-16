"use client";

import { useEffect, useState } from "react";
import { Project } from "@/types";
import { ProjectAPI } from "@/api/projects";
import ProjectCard from "@/components/widgets/ProjectCard";
import CreateProjectButton from "@/components/widgets/ProjectButton";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await ProjectAPI.getAll();
        setProjects(data);
      } catch (err) {
        console.error("Failed to load projects", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-black text-white px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Projects</h1>
        </div>

        <CreateProjectButton />

        {loading ? (
          <p className="text-center text-gray-400">Loading projects...</p>
        ) : projects.length === 0 ? (
          <p className="text-center text-gray-400">No projects found.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
