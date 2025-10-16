// src/types/index.ts

// =========================
// AUTH TYPES
// =========================
export interface User {
  _id: string;
  username: string;
  email: string;
  name: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

// =========================
// PROJECT TYPES
// =========================
export interface Project {
  _id: string;
  title: string;
  description: string;
  techStack: string[];
  createdBy: User;
  comments: Comment[];
  repoUrl?: string;
  liveUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectData {
  title: string;
  description: string;
  techStack: string[];
  repoUrl?: string;
  liveUrl?: string;
}

// =========================
// COMMENT TYPES
// =========================
export interface Comment {
  _id: string;
  text: string;
  user: User;
  author: User;
  createdAt: string;
}

export interface CreateCommentData {
  text: string;
  projectId: string;
}

// =========================
// API FETCH TYPES
// =========================
export interface RequestOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: unknown;
}
