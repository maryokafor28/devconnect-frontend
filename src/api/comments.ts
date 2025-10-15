import { apiFetch } from "@/lib/api";
import { Comment, CreateCommentData } from "@/types";

export const CommentAPI = {
  getByProject: (projectId: string) =>
    apiFetch<Comment[]>(`/comments/${projectId}`),
  add: (projectId: string, data: CreateCommentData) =>
    apiFetch<Comment>(`/comments/${projectId}`, {
      method: "POST",
      body: data,
    }),
};
