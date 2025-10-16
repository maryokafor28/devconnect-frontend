"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ProjectAPI } from "@/api/projects";
import { useRouter } from "next/navigation";

export default function CreateProjectPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    description: "",
    techStack: "",
    repoUrl: "",
    liveUrl: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await ProjectAPI.create({
        title: form.title,
        description: form.description,
        techStack: form.techStack.split(",").map((t) => t.trim()), // converts comma-separated string to array
        repoUrl: form.repoUrl || undefined,
        liveUrl: form.liveUrl || undefined,
      });
      router.push("/projects");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to create project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 text-white flex justify-center items-center p-6">
      <div className="w-full max-w-lg bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-xl">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Create New Project
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="title"
            placeholder="Project Title"
            value={form.title}
            onChange={handleChange}
            className="bg-white/20 border-white/30 text-white placeholder:text-gray-300"
            required
          />
          <Textarea
            name="description"
            placeholder="Project Description"
            value={form.description}
            onChange={handleChange}
            className="bg-white/20 border-white/30 text-white placeholder:text-gray-300"
            required
          />
          <Input
            name="techStack"
            placeholder="Tech Stack (comma separated)"
            value={form.techStack}
            onChange={handleChange}
            className="bg-white/20 border-white/30 text-white placeholder:text-gray-300"
            required
          />
          <Input
            name="repoUrl"
            placeholder="Repository URL (optional)"
            value={form.repoUrl}
            onChange={handleChange}
            className="bg-white/20 border-white/30 text-white placeholder:text-gray-300"
          />
          <Input
            name="liveUrl"
            placeholder="Live Demo URL (optional)"
            value={form.liveUrl}
            onChange={handleChange}
            className="bg-white/20 border-white/30 text-white placeholder:text-gray-300"
          />

          {error && <p className="text-red-300 text-sm">{error}</p>}

          <Button
            type="submit"
            className="w-full bg-blue-800 hover:bg-blue-900"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Project"}
          </Button>
        </form>
      </div>
    </div>
  );
}
