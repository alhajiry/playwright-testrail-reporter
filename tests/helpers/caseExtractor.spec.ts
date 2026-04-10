import { describe, it, expect } from "vitest";
import { extractCaseId, extractCaseIdFromTest, extractCaseIds, extractCaseIdsFromTest } from "../../src/helpers/caseExtractor";

describe("caseExtractor", () => {
  describe("extractCaseId", () => {
    it("should extract case ID from format: C12345 Description", () => {
      const result = extractCaseId("C12345 This is a test");
      expect(result).toBe(12345);
    });

    it("should extract case ID from format: [C12345] Description", () => {
      const result = extractCaseId("[C12345] This is a test");
      expect(result).toBe(12345);
    });

    it("should return null for title without case ID", () => {
      const result = extractCaseId("This is a test without ID");
      expect(result).toBeNull();
    });

    it("should return null when no case ID is present", () => {
      expect(extractCaseId("No case ID here")).toBeNull();
    });

    it("should return null when case ID is not at the beginning", () => {
      expect(extractCaseId("This has C12345 in the middle")).toBeNull();
    });

    it("should return null for empty string", () => {
      expect(extractCaseId("")).toBeNull();
    });
  });

  describe("extractCaseIdFromTest", () => {
    it("should extract case ID from test title with C format", () => {
      const result = extractCaseIdFromTest("C11111 delete a user with tenant");
      expect(result).toBe(11111);
    });

    it("should extract case ID from test title with [C] format", () => {
      const result = extractCaseIdFromTest("[C99999] create a user");
      expect(result).toBe(99999);
    });

    it("should return null for test title without case ID", () => {
      const result = extractCaseIdFromTest("create a user without special settings");
      expect(result).toBeNull();
    });

    it("should return null for test title with case ID not at beginning", () => {
      const result = extractCaseIdFromTest("deletes a user with tenant C12345");
      expect(result).toBeNull();
    });
  });

  describe("extractCaseIds", () => {
    it("should extract single bare case ID", () => {
      expect(extractCaseIds("C12345 This is a test")).toEqual([12345]);
    });

    it("should extract single bracketed case ID", () => {
      expect(extractCaseIds("[C12345] This is a test")).toEqual([12345]);
    });

    it("should extract two bare case IDs", () => {
      expect(extractCaseIds("C165393 C165376 Verify: empty state")).toEqual([165393, 165376]);
    });

    it("should extract two bracketed case IDs", () => {
      expect(extractCaseIds("[C12345] [C67890] Test description")).toEqual([12345, 67890]);
    });

    it("should extract mixed format case IDs", () => {
      expect(extractCaseIds("C165393 [C67890] Mixed format test")).toEqual([165393, 67890]);
    });

    it("should extract three or more case IDs", () => {
      expect(extractCaseIds("C1 C2 C3 Many IDs test")).toEqual([1, 2, 3]);
    });

    it("should return empty array for title without case ID", () => {
      expect(extractCaseIds("This is a test without ID")).toEqual([]);
    });

    it("should return empty array when case ID is not at beginning", () => {
      expect(extractCaseIds("This has C12345 in the middle")).toEqual([]);
    });

    it("should return empty array for empty string", () => {
      expect(extractCaseIds("")).toEqual([]);
    });
  });

  describe("extractCaseIdsFromTest", () => {
    it("should extract multiple case IDs from test title", () => {
      expect(extractCaseIdsFromTest("C11111 C22222 delete a user")).toEqual([11111, 22222]);
    });

    it("should extract single bracketed case ID from test title", () => {
      expect(extractCaseIdsFromTest("[C99999] create a user")).toEqual([99999]);
    });

    it("should return empty array for test title without case ID", () => {
      expect(extractCaseIdsFromTest("create a user without special settings")).toEqual([]);
    });
  });
});