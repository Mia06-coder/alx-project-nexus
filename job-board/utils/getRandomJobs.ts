// utils/getRandomJobs.ts

import { JobProps } from "@/interfaces";

/**
 * Utility: Selects a random subset of jobs from a given list.
 *
 * This function is useful when you want to show "Recommended jobs",
 * "Similar jobs", or any small random sample instead of all results.
 *
 * @param allJobs - Array of job objects (conforming to `JobProps` interface).
 * @param count   - Number of jobs to return.
 * @returns       - A new array containing `count` randomly selected jobs.
 *
 * Notes:
 * - If the total number of jobs is less than or equal to `count`,
 *   the original array is returned (no slicing or shuffling needed).
 * - A shallow copy of `allJobs` is shuffled to avoid mutating the input.
 * - Randomness is achieved by sorting with `Math.random()`, which is
 *   simple but not perfectly uniform (good enough for small UI lists).
 */
export function getRandomJobs(allJobs: JobProps[], count: number): JobProps[] {
  // If there are fewer jobs than requested, just return all of them
  if (allJobs.length <= count) return allJobs;

  // Create a shallow copy, shuffle it randomly, and return the first `count` items
  const shuffled = [...allJobs].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
