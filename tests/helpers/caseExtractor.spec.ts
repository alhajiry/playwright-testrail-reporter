import { describe, it, expect } from "vitest";
import { extractCaseIds, extractCaseIdsFromTest } from "../../src/helpers/caseExtractor";

describe("caseExtractor", () => {
  describe("extractCaseIds", () => {
    it("should extract a single C-format ID", () => {
      expect(extractCaseIds("C12345 Single ID test")).toEqual([12345]);
    });

    it("should extract a single bracketed ID", () => {
      expect(extractCaseIds("[C12345] Single ID test")).toEqual([12345]);
    });

    it("should extract multiple consecutive C-format IDs", () => {
      expect(extractCaseIds("C165393 C165376 Verify: empty state when group has no members")).toEqual([165393, 165376]);
    });

    it("should extract multiple consecutive bracketed IDs", () => {
      expect(extractCaseIds("[C111] [C222] Some test description")).toEqual([111, 222]);
    });

    it("should extract mixed C-format and bracketed IDs", () => {
      expect(extractCaseIds("C111 [C222] Mixed formats test")).toEqual([111, 222]);
    });

    it("should extract three or more IDs", () => {
      expect(extractCaseIds("C1 C2 C3 Three IDs test")).toEqual([1, 2, 3]);
    });

    it("should return empty array when no IDs present", () => {
      expect(extractCaseIds("No ID here")).toEqual([]);
    });

    it("should return empty array for empty string", () => {
      expect(extractCaseIds("")).toEqual([]);
    });

    it("should not extract IDs that appear in the middle of a title", () => {
      expect(extractCaseIds("Some test C12345 in the middle")).toEqual([]);
    });
  });

  describe("extractCaseIdsFromTest", () => {
    it("should delegate to extractCaseIds and return all case IDs", () => {
      expect(extractCaseIdsFromTest("C165393 C165376 Verify: empty state when group has no members")).toEqual([165393, 165376]);
    });
  });
});
