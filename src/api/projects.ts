import { apiFetch } from "@/lib/api";
import { Project, CreateProjectData } from "@/types";

// Define the response type that matches your backend
interface ProjectsResponse {
  projects: Project[];
}

export const ProjectAPI = {
  getAll: async () => {
    const response = await apiFetch<ProjectsResponse>("/api/projects");
    return response.projects; // Extract the projects array
  },
  getById: (id: string) => apiFetch<Project>(`/api/projects/${id}`),
  create: (data: CreateProjectData) =>
    apiFetch<Project>("/api/projects", { method: "POST", body: data }),
};
