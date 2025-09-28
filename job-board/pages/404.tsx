import Button from "@/components/Button";
import EmptyState from "@/components/EmptyState";
import { useRouter } from "next/router";
import React from "react";
import { FaArrowLeft } from "react-icons/fa6";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="px-6 py-10 container mx-auto text-center">
      <EmptyState variant="notFound" />
      <Button
        onClick={() => router.push("/jobs")}
        className="mt-6 flex items-center gap-2 bg-blue-600 text-white mx-auto"
      >
        <FaArrowLeft /> Return to Homepage
      </Button>
    </div>
  );
}
