import { Request, Response } from "express";
import { urlController } from "../src/controllers/url.controller";

// Mocking Prisma functions
jest.mock("../src/config/prisma.config", () => ({
	prisma: {
		shortUrl: {
			findMany: jest.fn(),
			findUnique: jest.fn(),
			create: jest.fn(),
			delete: jest.fn(),
		},
	},
}));

describe("UrlController", () => {
	let mockRequest: Partial<Request>;
	let mockResponse: Partial<Response>;

	beforeEach(() => {
		mockRequest = {};
		mockResponse = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
			redirect: jest.fn(),
		};
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("urls", () => {
		it("should return all URLs", async () => {
			(mockResponse.status as jest.Mock).mockImplementationOnce(
				() => mockResponse
			);
			const mockUrls = [
				{
					originalUrl: "example.com",
					shortenedUrl: "example.com/abcd",
					shortId: "abcd",
				},
			];
			(
				jest.requireMock("../src/config/prisma.config").prisma.shortUrl
					.findMany as jest.Mock
			).mockResolvedValueOnce(mockUrls);

			await urlController.urls(
				mockRequest as Request,
				mockResponse as Response
			);

			expect(mockResponse.status).toHaveBeenCalledWith(200);
			expect(mockResponse.json).toHaveBeenCalledWith(mockUrls);
		});
	});

	describe("urlById", () => {
		it("should redirect to the original URL if found", async () => {
			const mockUrl = {
				originalUrl: "example.com",
				shortenedUrl: "example.com/abcd",
				shortId: "abcd",
			};
			(
				jest.requireMock("../src/config/prisma.config").prisma.shortUrl
					.findUnique as jest.Mock
			).mockResolvedValueOnce(mockUrl);
			mockRequest.params = { shortId: "abcd" };

			await urlController.urlById(
				mockRequest as Request,
				mockResponse as Response
			);

			expect(mockResponse.redirect).toHaveBeenCalledWith(mockUrl.originalUrl);
		});

		it("should handle when URL not found", async () => {
			(
				jest.requireMock("../src/config/prisma.config").prisma.shortUrl
					.findUnique as jest.Mock
			).mockResolvedValueOnce(null);
			mockRequest.params = { shortId: "nonexistent" };

			await urlController.urlById(
				mockRequest as Request,
				mockResponse as Response
			);

			expect(mockResponse.status).toHaveBeenCalledWith(404);
			expect(mockResponse.json).toHaveBeenCalledWith({
				error: "URL not found.",
			});
		});
	});
});
