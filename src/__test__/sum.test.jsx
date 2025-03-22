import { test, expect } from "vitest"; // Import test functions from Vitest
import { sum } from "../components/sum"; // Adjust the path if needed

test("sum function should calculate the sum of two numbers", () => {
  const result = sum(3, 4);

  // Assertion
  expect(result).toBe(7);
});

