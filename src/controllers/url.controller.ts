import { prisma } from "../config/prisma.config";
import { Request, Response } from "express";
import { isValidUrl } from "../utils";
import { ShortUrl } from "@prisma/client";
import { randomUUID } from "crypto";

class UrlController {
	// Handler for retrieving all URLs
	async urls(_req: Request, res: Response) {
		try {
			const data = await prisma.shortUrl.findMany({});
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
			const url: ShortUrl | null = await prisma.shortUrl.findUnique({
				where: { shortId: shortId },
			});

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

		if (!originalUrl || !isValidUrl(originalUrl)) {
			return res.status(400).json({ error: "Invalid URL provided." });
		}

		try {
			const shortId = randomUUID();
			const baseUrl =
				process.env.NODE_ENV === "production"
					? process.env.HOST
					: process.env.LOCAL;

			const shortenedUrl = `${baseUrl}/${shortId}`;

			const exists: ShortUrl | null = await prisma.shortUrl.findFirst({
				where: { originalUrl: originalUrl },
			});

			if (exists) {
				return res.json({
					originalUrl: exists.originalUrl,
					shortenedUrl: exists.shortenedUrl,
					shortId: exists.shortId,
				});
			}
			await prisma.shortUrl.create({
				data: {
					originalUrl: originalUrl,
					shortenedUrl: shortenedUrl,
					shortId: shortId,
				},
			});

			return res.json({ originalUrl, shortenedUrl, shortId });
		} catch (error) {
			console.error("Error creating shortened URL:", error);
			return res
				.status(500)
				.json({ error: "Server error while creating shortened URL." });
		}
	}

	// Handler for removing a URL by its ID
	public async remove(req: Request, res: Response) {
		try {
			const id = req.params.id;
			const data = await prisma.shortUrl.findUnique({ where: { id: id } });
			if (!data) {
				return res.status(400).send("Url does not exist");
			}
			await prisma.shortUrl.delete({ where: { id: id } });
			res.status(204).json({ result: `Successfully removed ${id}` });
		} catch (error: any) {
			res.status(500).json({ message: error.message });
		}
	}
}

// Creating an instance of the UrlController class to be exported
export const urlController = new UrlController();
