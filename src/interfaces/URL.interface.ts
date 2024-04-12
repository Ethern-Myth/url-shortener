/**
 * Summary:
 *
 * This TypeScript interface, IUrlService, defines a contract for handling short URL operations. It declares methods for retrieving all existing short URLs, fetching a short URL by its ID, creating a new short URL entry, and removing a short URL from the database.
 *
 * - The getAllUrls method returns a Promise that resolves to an array of ShortUrl objects representing all existing short URLs in the database.
 * - The getUrlById method takes a short ID as input and returns a Promise that resolves to the corresponding ShortUrl object if found, or null otherwise.
 * - The createUrl method takes an original URL as input, generates a short URL entry, and returns a Promise that resolves to the created ShortUrl object or any if an error occurs during creation.
 * - The removeUrl method takes the ID of a short URL as input and returns a Promise that resolves when the URL is successfully removed from the database.
 *
 * Prerequisites:
 * - This interface assumes the use of the ShortUrl type from the Prisma client for representing short URL entities.
 */

import { ShortUrl } from "@prisma/client";

export interface IUrlService {
	getAllUrls(): Promise<ShortUrl[]>;
	getUrlById(shortId: string): Promise<ShortUrl | null>;
	createUrl(originalUrl: string): Promise<ShortUrl | any>;
	removeUrl(id: string): Promise<void>;
}
