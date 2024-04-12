/**
 * Summary:
 *
 * This code defines an Express router responsible for handling URL-related routes in a URL shortener service.
 * It creates instances of the UrlController and UrlService classes, injects the service into the controller, and defines routes to handle various URL operations.
 *
 * - The "/" route returns a message indicating the URL shortener service.
 * - The "/:shortId" route redirects to the original URL using the short ID.
 * - The "/shorten" route adds a new URL to the service for shortening.
 * - The "/:id" route removes a URL by its ID.
 *
 * Prerequisites:
 * - The code assumes the use of the Express framework for routing and handling HTTP requests.
 * - It relies on the UrlController and UrlService classes for handling URL-related operations.
 */

import express from "express";
import { urlController } from "../initializers/index.initializer";

// Creating an Express router instance
const router = express();

// Defining routes and corresponding controller functions
router.get("/", (_req, res) => {
	res.json("URL shortener service");
});
// Route to get all urls, extra feature
// router.get("/urls", urlController.urls);
router.get("/:shortId", urlController.urlById);
router.post("/shorten", urlController.add);
// Testing Purposes
router.delete("/:id", urlController.remove);

export default router;
