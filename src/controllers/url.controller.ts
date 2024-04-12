/**
 * Summary:
 *
 * This TypeScript class, UrlController, defines handlers for various URL-related operations in an Express application.
 * It includes methods for retrieving all URLs, redirecting to the original URL using the short ID, adding a new URL, and removing a URL by its ID.
 *
 * - The urls method retrieves all existing URLs.
 * - The urlById method redirects to the original URL using the short ID.
 * - The add method adds a new URL.
 * - The remove method removes a URL by its ID.
 *
 * Prerequisites:
 * - The class assumes the use of the Express framework for routing and handling HTTP requests.
 * - It relies on an implementation of the IUrlService interface for URL-related operations.
 */

import { Request, Response } from "express";
import { ShortUrl } from "@prisma/client";
import { urlService } from "../initializers/index.initializer";

class UrlController {
	// Handler for retrieving all URLs
	async urls(_req: Request, res: Response) {
		try {
			const data = await urlService.getAllUrls();
			res.status(200).json(data);
		} catch (error: any) {
			res.status(500).json({ message: error.message });
			throw error;
		}
	}

	// Handler for redirecting to the original URL using the short ID
	async urlById(req: Request, res: Response) {
		const { shortId } = req.params;
		try {
			const url: ShortUrl | null = await urlService.getUrlById(shortId);
			if (url) {
				return res.redirect(url.originalUrl);
			} else {
				return res.status(404).json({ error: "URL not found." });
			}
		} catch (error) {
			console.error("Error redirecting to URL:", error);
			return res
				.status(500)
				.json({ error: "Server error during URL redirection." });
		}
	}

	// Handler for adding a new URL
	public async add(req: Request, res: Response) {
		const { originalUrl } = req.body;
		try {
			const createdUrl = await urlService.createUrl(originalUrl);
			res.json(createdUrl);
		} catch (error) {
			console.error("Error creating shortened URL:", error);
			return res
				.status(500)
				.json({ error: "Server error while creating shortened URL." });
		}
	}

	// Handler for removing a URL by its ID
	public async remove(req: Request, res: Response) {
		const id = req.params.id;
		try {
			await urlService.removeUrl(id);
			res.status(204).json({ result: `Successfully removed ${id}` });
		} catch (error: any) {
			res.status(500).json({ message: error.message });
		}
	}
}

export default UrlController;
