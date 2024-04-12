/**
 * This module sets up and exports URL management components. It registers the UrlService
 * with the ServiceRegistry for centralized management and retrieves it using a service locator pattern,
 * ensuring it is available for application-wide use. Additionally, it instantiates and exports the
 * Create Controller instances, which is responsible for handling all URL-related HTTP requests.
 */

import UrlController from "../controllers/url.controller";
import { IUrlService } from "../interfaces/URL.interface";
import { ServiceRegistry } from "../registries/service.register";
import UrlService from "../services/URL.service";

// Services
ServiceRegistry.registerService("UrlService", UrlService);
export const urlService =
	ServiceRegistry.getService<IUrlService>("UrlService")!;

// Export instances
export const urlController: UrlController = new UrlController();
