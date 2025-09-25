// pages/api/jobs.ts

import type { NextApiRequest, NextApiResponse } from "next";

/**
 * API handler for fetching job listings from the external Job API.
 *
 * This route acts as a **server-side proxy** to:
 * - Hide sensitive credentials (username & password) from the client.
 * - Handle authentication securely with Basic Auth.
 * - Support pagination via the `page` query param.
 * - Normalize error handling between the frontend and the external API.
 *
 * Usage:
 *   Client requests → `/api/jobs?page=2`
 *   This route → Authenticates with external API → Returns jobs JSON
 *
 * Environment variables required:
 *   - API_URL        → Base URL of the external jobs API (e.g. https://jobs.example.com)
 *   - API_USERNAME   → Username for Basic Auth
 *   - API_PASSWORD   → Password for Basic Auth
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // 1. Prepare Basic Auth header using credentials from env vars
  const username = process.env.API_USERNAME;
  const password = process.env.API_PASSWORD;

  if (!username || !password) {
    return res
      .status(500)
      .json({ error: "Server misconfiguration: Missing API credentials" });
  }

  const authHeader =
    "Basic " + Buffer.from(`${username}:${password}`).toString("base64");

  try {
    // 2. Handle optional query param for pagination
    const { page } = req.query;
    const pageParam = page ? `?page=${page}` : "";

    // 3. Fetch from external API securely
    const response = await fetch(
      `${process.env.API_URL}/api/jobs/${pageParam}`,
      {
        headers: {
          Authorization: authHeader,
          Accept: "application/json",
        },
      }
    );

    // 4. Bubble up API errors (e.g. 401 Unauthorized, 500 Internal Server Error)
    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: `Job API request failed (${response.status})` });
    }

    // 5. Parse and return jobs JSON
    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    // 6. Log unexpected errors (network failures, etc.)
    console.error("Error fetching jobs:", err);
    return res.status(500).json({ error: "Unexpected server error" });
  }
}
