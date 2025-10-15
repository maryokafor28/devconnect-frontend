// src/types/index.ts

// =========================
// AUTH TYPES
// =========================
export interface User {
  _id: string;
  username: string;
  email: string;
  avatar?: string;
  bio?: string;
  createdAt?: string;
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
  techstack: string;
  image?: string;
  author: User;
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectData {
  title: string;
  description: string;
  image?: string;
  techstack: string;
}

// =========================
// COMMENT TYPES
// =========================
export interface Comment {
  _id: string;
  text: string;
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
