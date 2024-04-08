import express from "express";
import { urlController } from "../controllers/url.controller";

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
router.delete("/:id", urlController.remove);

export default router;
