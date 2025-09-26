//pages/api/favorites/[id].ts

import type { NextApiRequest, NextApiResponse } from "next";

/**
 * API handler for job favorites.
 *
 * Proxies requests to the external Favorites API.
 * Supports:
 *   - DELETE → Remove a favorite by ID.
 *
 * Usage:
 *   - DELETE /api/favorites/<favorite_id>
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

  const { id } = req.query;
  if (!id || Array.isArray(id)) {
    return res.status(400).json({ error: "Missing favorite ID" });
  }

  try {
    if (req.method === "DELETE") {
      const response = await fetch(
        `${process.env.API_URL}/api/favorites/${id}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: authHeader,
            "X-CSRFTOKEN": csrfToken,
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        return res.status(response.status).json({
          error: `Favorite deletion failed (${response.status})`,
        });
      }

      return res.status(204).end(); // success, no content
    }

    return res.setHeader("Allow", ["DELETE"]).status(405).end();
  } catch (err) {
    console.error("Error in favorites API route:", err);
    return res.status(500).json({ error: "Unexpected server error" });
  }
}
