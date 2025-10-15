import { apiFetch } from "@/lib/api";
import { Project, CreateProjectData } from "@/types";

export const ProjectAPI = {
  getAll: () => apiFetch<Project[]>("/projects"),
  getById: (id: string) => apiFetch<Project>(`/projects/${id}`),
  create: (data: CreateProjectData) =>
    apiFetch<Project>("/projects", { method: "POST", body: data }),
};
