// services/jobService.ts

import { Job } from "@/interfaces";

const API_URL = "http://localhost:5000/jobs";

export async function fetchJobs(): Promise<Job[]> {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Failed to fetch jobs");
    return await res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function fetchJobById(id: number): Promise<Job> {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) throw new Error("Failed to fetch job");
    return await res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
