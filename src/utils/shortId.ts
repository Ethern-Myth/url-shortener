/**
 * To avoid probability of a collision, we will use sha-256 for hashing and random check on ids generated
 * With further scaling, more implementation is necessary
 */

import * as crypto from "crypto";

const generatedIds = new Set<string>();

export function generateShortId(length: number = 6): string {
	let id = "";
	do {
		const randomString = Math.random().toString();
		const hash = crypto.createHash("sha256").update(randomString).digest("hex");
		id = hash.slice(0, length);
	} while (generatedIds.has(id));
	generatedIds.add(id);
	return id;
}
