/**
 * Extract all TestRail case IDs from the beginning of a test title.
 *
 * Supports formats (and any mix of them):
 * - "C12345 Test description"
 * - "[C12345] Test description"
 * - "C12345 C67890 Test description"
 * - "[C12345] [C67890] Test description"
 * - "C12345 [C67890] Test description"
 *
 * @param title The test title to extract from
 * @returns Array of case IDs as numbers (empty if none found)
 */
export function extractCaseIds(title: string): number[] {
	// Phase 1: Match the prefix of consecutive case ID tokens at the start
	const prefixMatch = title.match(/^((?:(?:\[C\d+\]|C\d+)\s)+)/);
	if (!prefixMatch) {
		return [];
	}

	// Phase 2: Extract all numeric IDs from the matched prefix
	const ids: number[] = [];
	for (const m of prefixMatch[1].matchAll(/C(\d+)/g)) {
		ids.push(parseInt(m[1], 10));
	}
	return ids;
}

/**
 * Extract a single TestRail case ID from test title.
 * Returns the first case ID found, or null if none.
 *
 * @param title The test title to extract from
 * @returns The case ID as a number, or null if not found
 */
export function extractCaseId(title: string): number | null {
	const ids = extractCaseIds(title);
	return ids.length > 0 ? ids[0] : null;
}

/**
 * Extract all case IDs from a Playwright test title.
 * Tests without TestRail IDs return an empty array.
 *
 * @param title The test title
 * @returns Array of case IDs as numbers
 */
export function extractCaseIdsFromTest(title: string): number[] {
	return extractCaseIds(title);
}

/**
 * Extract case ID from a Playwright test.
 * Only extracts from test title - tests without IDs are skipped.
 *
 * @param title The test title
 * @returns The case ID as a number, or null if not found
 */
export function extractCaseIdFromTest(title: string): number | null {
	return extractCaseId(title);
}
