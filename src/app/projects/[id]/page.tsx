"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ProjectAPI } from "@/api/projects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Project } from "@/types";

export default function ProjectDetailsPage() {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProject() {
      try {
        const project = await ProjectAPI.getById(id as string); // ✅ Returns Project directly
        setProject(project);
      } catch {
        setError("Failed to load project");
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchProject();
  }, [id]);
  if (loading)
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!project)
    return <p className="text-center mt-10 text-gray-500">Project not found</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 text-white py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold mb-2">{project.title}</h1>
        <p className="text-gray-200 mb-6">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.techStack?.map((tech, i) => (
            <Badge key={i} className="bg-blue-800 text-white border-none">
              {tech}
            </Badge>
          ))}
        </div>

        <div className="mb-6">
          <p className="font-semibold">Author:</p>
          <a
            href={`/profile/${project.createdBy?._id}`}
            className="text-blue-300 hover:underline"
          >
            {project.createdBy?.name}
          </a>
        </div>

        <div className="flex gap-4">
          {project.repoUrl && (
            <Button asChild className="bg-blue-800 hover:bg-blue-900">
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub Repo
              </a>
            </Button>
          )}
          {project.liveUrl && (
            <Button asChild className="bg-green-700 hover:bg-green-800">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Live Demo
              </a>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
