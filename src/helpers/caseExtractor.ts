/**
 * Extract all TestRail case IDs from test title.
 *
 * Supports one or more consecutive IDs at the start of the title:
 * - "C12345 Test description"
 * - "[C12345] Test description"
 * - "C12345 C67890 Test description"
 * - "[C12345] [C67890] Test description"
 * - "C12345 [C67890] Test description"
 *
 * @param title The test title to extract from
 * @returns Array of case IDs found at the start of the title (empty if none)
 */
export function extractCaseIds(title: string): number[] {
	const ids: number[] = [];
	const pattern = /(?:\[C(\d+)\]|C(\d+)) ?/gy;

	while (true) {
		const match = pattern.exec(title);
		if (!match) break;
		ids.push(parseInt(match[1] || match[2], 10));
	}

	return ids;
}

/**
 * Extract all case IDs from a Playwright test title.
 * Only extracts from test title - tests without IDs are skipped.
 *
 * @param title The test title
 * @returns Array of case IDs (empty if none found)
 */
export function extractCaseIdsFromTest(title: string): number[] {
	return extractCaseIds(title);
}
