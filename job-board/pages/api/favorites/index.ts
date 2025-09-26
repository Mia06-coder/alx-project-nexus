// pages/api/favorites.index.ts

import type { NextApiRequest, NextApiResponse } from "next";

/**
 * API handler for job favorites.
 *
 * Proxies requests to the external Favorites API.
 * Supports:
 *   - GET → Fetch list of favorites (paginated).
 *   - POST → Add a job to favorites.
 *
 * Usage:
 *   - GET /api/favorites?page=2
 *   - POST /api/favorites { job: <job_id> }
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const username = process.env.API_USERNAME;
  const password = process.env.API_PASSWORD;
  const csrfToken = process.env.API_X_CSRFTOKEN;

  if (!username || !password || !csrfToken) {
    return res
      .status(500)
      .json({ error: "Server misconfiguration: Missing API credentials/CSRF" });
  }

  const authHeader =
    "Basic " + Buffer.from(`${username}:${password}`).toString("base64");

  try {
    if (req.method === "GET") {
      const { page } = req.query;
      const pageParam = page ? `?page=${page}` : "";

      const response = await fetch(
        `${process.env.API_URL}/api/favorites/${pageParam}`,
        {
          headers: {
            Authorization: authHeader,
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        return res.status(response.status).json({
          error: `Favorites API request failed (${response.status})`,
        });
      }

      const data = await response.json();
      return res.status(200).json(data);
    }

    if (req.method === "POST") {
      const response = await fetch(`${process.env.API_URL}/api/favorites/`, {
        method: "POST",
        headers: {
          Authorization: authHeader,
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-CSRFTOKEN": csrfToken,
        },
        body: JSON.stringify(req.body),
      });

      if (!response.ok) {
        return res.status(response.status).json({
          error: `Favorite job addition failed (${response.status})`,
        });
      }

      const data = await response.json();
      return res.status(201).json(data);
    }

    return res.setHeader("Allow", ["GET", "POST"]).status(405).end();
  } catch (err) {
    console.error("Error in favorites API route:", err);
    return res.status(500).json({ error: "Unexpected server error" });
  }
}
