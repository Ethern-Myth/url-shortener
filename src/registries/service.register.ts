export class ServiceRegistry {
	private static services: { [key: string]: any } = {};

	static registerService<T>(
		key: string,
		serviceConstructor: new () => T
	): void {
		if (!this.services[key]) {
			this.services[key] = new serviceConstructor();
		}
	}

	static getService<T>(key: string): T | undefined {
		return this.services[key];
	}

	static getAllServices(): { [key: string]: any } {
		return { ...this.services };
	}

	static clearRegistry() {
		this.services = {};
	}
}
