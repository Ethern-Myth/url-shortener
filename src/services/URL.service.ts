/**
 * Summary:
 *
 * This TypeScript class, UrlService, implements the IUrlService interface to handle short URL operations.
 * It includes methods to retrieve all existing URLs, fetch a URL by its ID, create a new short URL entry, and remove a URL from the database.
 *
 * - The getAllUrls method asynchronously retrieves all short URLs from the database.
 * - The getUrlById method asynchronously retrieves a short URL by its short ID from the database.
 * - The createUrl method validates the provided URL, generates a short ID, constructs a shortened URL, and adds it to the database if it doesn't already exist.
 * - The removeUrl method deletes a URL entry from the database by its ID if it exists.
 *
 * Prerequisites:
 * - The code relies on Prisma for database operations.
 * - Error handling is included for invalid URLs and non-existent URL deletions.
 */

import { ShortUrl } from "@prisma/client";
import { prisma } from "../config/prisma.config";
import { IUrlService } from "../interfaces/URL.interface";
import { isValidUrl } from "../utils";
import { randomUUID } from "node:crypto";

class UrlService implements IUrlService {
	constructor() {}
	// Handles getting all short urls
	async getAllUrls(): Promise<ShortUrl[]> {
		return await prisma.shortUrl.findMany({});
	}

	// Handles getting short url by id
	async getUrlById(shortId: string): Promise<ShortUrl | null> {
		return await prisma.shortUrl.findUnique({
			where: { shortId: shortId },
		});
	}

	// Handles creating a new short url
	async createUrl(originalUrl: string): Promise<any> {
		if (!originalUrl || !isValidUrl(originalUrl)) {
			throw new Error("Invalid URL provided.");
		}
		// Get the first 8 digits from the uuid to make it short id
		const shortId = randomUUID().replace(/-/g, "").slice(0, 8);
		const baseUrl =
			process.env.NODE_ENV === "production"
				? process.env.HOST
				: process.env.LOCAL;

		const shortenedUrl = `${baseUrl}/${shortId}`;

		const exists: ShortUrl | null = await prisma.shortUrl.findFirst({
			where: { originalUrl: originalUrl },
		});
		if (exists) {
			return {
				originalUrl: exists.originalUrl,
				shortenedUrl: exists.shortenedUrl,
				shortId: exists.shortId,
			};
		}
		return await prisma.shortUrl.create({
			data: {
				originalUrl: originalUrl,
				shortenedUrl: shortenedUrl,
				shortId: shortId,
			},
		});
	}

	// Handles removing url from db
	async removeUrl(id: string): Promise<void> {
		const data = await prisma.shortUrl.findUnique({ where: { id: id } });
		if (!data) {
			throw new Error("Url does not exist");
		}
		await prisma.shortUrl.delete({ where: { id: id } });
	}
}

// Exports the UrlService class
/**
 * Alternatively, you can create an instance as such
 *
 * export const urlService = new UrlService();
 * This would work if you have not dependencies for the UrlService
 * NOTE: It is important to keep it as default for scalability. if in future a new feature is implemented
 */
export default UrlService;
