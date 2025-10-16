"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthProvider";

export default function CreateProjectButton() {
  const router = useRouter();
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="flex justify-end mb-6">
      <Button
        onClick={() => router.push("/projects/newproject")}
        className="bg-purple-600 hover:bg-purple-700 text-white"
      >
        + Create New Project
      </Button>
    </div>
  );
}
