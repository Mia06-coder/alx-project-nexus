// pages/api/applications.ts

import type { NextApiRequest, NextApiResponse } from "next";

/**
 * API handler for job applications.
 *
 * Proxies requests to the external Applications API.
 * Supports:
 *   - GET → Fetch list of applications (paginated).
 *   - POST → Submit a new application.
 *
 * Usage:
 *   - GET /api/applications?page=2
 *   - POST /api/applications { job, resume, cover_letter }
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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
    if (req.method === "GET") {
      // Handle pagination
      const { page } = req.query;
      const pageParam = page ? `?page=${page}` : "";

      const response = await fetch(
        `${process.env.API_URL}/api/applications/${pageParam}`,
        {
          headers: {
            Authorization: authHeader,
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        return res.status(response.status).json({
          error: `Applications API request failed (${response.status})`,
        });
      }

      const data = await response.json();
      return res.status(200).json(data);
    }

    if (req.method === "POST") {
      // Forward application payload
      const response = await fetch(`${process.env.API_URL}/api/applications/`, {
        method: "POST",
        headers: {
          Authorization: authHeader,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(req.body),
      });

      if (!response.ok) {
        return res.status(response.status).json({
          error: `Application submission failed (${response.status})`,
        });
      }

      const data = await response.json();
      return res.status(201).json(data);
    }

    // Only GET and POST supported
    return res.setHeader("Allow", ["GET", "POST"]).status(405).end();
  } catch (err) {
    console.error("Error in applications API route:", err);
    return res.status(500).json({ error: "Unexpected server error" });
  }
}
