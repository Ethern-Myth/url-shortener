/**
 * Validates URLs using a basic pattern.
 * For more comprehensive validation, consider using a library.
 *
 * @param url - The URL to validate.
 * @returns A boolean indicating if the URL is valid.
 */
export function isValidUrl(url: string): boolean {
	const pattern = new RegExp(
		"^(https?:\\/\\/)?" + // protocol
			"((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|" + // domain name and extension
			"((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
			"(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
			"(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
			"(\\#[-a-z\\d_]*)?$",
		"i"
	); // fragment locator
	return !!pattern.test(url);
}

// To Avoid REGEX patterns for purpose of not blocking Event loop 

// export function isValidUrl(url: string): boolean {
//     try {
//         new URL(url);
//         return true;
//     } catch (error) {
//         return false;
//     }
// }
