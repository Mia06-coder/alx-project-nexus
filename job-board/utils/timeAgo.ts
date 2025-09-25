// utils/timeAgo.ts

/**
 * Converts an ISO timestamp into a human-readable relative time string.
 *
 * Granularity:
 * - "Just now" if less than 1 minute.
 * - "{n} minutes ago" if less than 1 hour.
 * - "{n} hours ago" if less than 24 hours.
 * - "Today" if the date is the same day.
 * - "Yesterday" if 1 day ago.
 * - "{n} days ago" if under 7 days.
 * - "{n} weeks ago" if under 30 days.
 * - "{n} months ago" if under 12 months.
 * - "{n} years ago" otherwise.
 *
 * @param isoDate - A valid ISO 8601 date string (e.g., "2025-09-25T08:00:00Z").
 * @returns A human-friendly relative time string.
 *
 * @example
 * ```ts
 * timeAgo("2025-09-25T09:00:00Z"); // "2 hours ago"
 * timeAgo("2025-09-20T08:00:00Z"); // "5 days ago"
 * timeAgo("2025-08-10T08:00:00Z"); // "1 month ago"
 * timeAgo("2023-09-25T08:00:00Z"); // "2 years ago"
 * ```
 */
export function timeAgo(isoDate: string): string {
  const now = new Date();
  const createdAt = new Date(isoDate);

  const diffMs = now.getTime() - createdAt.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  if (diffMinutes < 1) return "Just now";
  if (diffMinutes < 60)
    return `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffWeeks < 5) return `${diffWeeks} week${diffWeeks > 1 ? "s" : ""} ago`;
  if (diffMonths < 12)
    return `${diffMonths} month${diffMonths > 1 ? "s" : ""} ago`;
  return `${diffYears} year${diffYears > 1 ? "s" : ""} ago`;
}
