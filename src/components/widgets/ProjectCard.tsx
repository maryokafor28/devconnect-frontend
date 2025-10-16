"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="bg-white/10 backdrop-blur-lg border border-white/20 text-white hover:scale-[1.02] transition-transform duration-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{project.title}</CardTitle>
        <p className="text-sm text-gray-300 line-clamp-2">
          {project.description}
        </p>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-2">
          {project.techStack?.map((tech: string, index: number) => (
            <Badge key={index} className="bg-purple-600 hover:bg-purple-700">
              {tech.trim()}
            </Badge>
          ))}
        </div>
        <p className="text-sm text-gray-400">By {project.createdBy.name}</p>
      </CardContent>
    </Card>
  );
}
