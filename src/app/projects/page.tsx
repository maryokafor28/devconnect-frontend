"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Project } from "@/types";
import { ProjectAPI } from "@/api/projects";
import ProjectCard from "@/components/widgets/ProjectCard";
import CreateProjectButton from "@/components/widgets/ProjectButton";
import { useAuth } from "@/context/AuthProvider";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAuth();
  const router = useRouter();

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
  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="min-h-screen text-white px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Projects</h1>
            {user && (
              <p className="text-sm text-gray-400 mt-1">
                Welcome back, {user.name}
              </p>
            )}
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="bg-red-600/20 hover:bg-red-600/30 border-red-500/50 text-white"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
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
