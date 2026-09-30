import { describe, test, expect } from "vitest";

import {
  unique,
  groupBy,
  chunk,
  deepClone,
  memoize,
  counter
} from "../src/functions.js";

describe("unique", () => {
  test("removes duplicate values", () => {
    expect(unique([1, 2, 2, 3, 3])).toEqual([1, 2, 3]);
  });

  test("works with empty array", () => {
    expect(unique([])).toEqual([]);
  });
});

describe("groupBy", () => {
  test("groups objects by key", () => {
    const users = [
      { name: "Ali", age: 20 },
      { name: "Dana", age: 21 },
      { name: "Max", age: 20 }
    ];

    expect(groupBy(users, user => user.age)).toEqual({
      20: [
        { name: "Ali", age: 20 },
        { name: "Max", age: 20 }
      ],
      21: [
        { name: "Dana", age: 21 }
      ]
    });
  });

  test("works with empty array", () => {
    expect(groupBy([], item => item)).toEqual({});
  });
});

describe("chunk", () => {
  test("splits array into chunks", () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([
      [1, 2],
      [3, 4],
      [5]
    ]);
  });

  test("works with zero size by throwing an error", () => {
    expect(() => chunk([1, 2, 3], 0)).toThrow();
  });

  test("throws for wrong array type", () => {
    expect(() => chunk("hello", 2)).toThrow(TypeError);
  });
});

describe("deepClone", () => {
  test("clones nested objects", () => {
    const original = {
      name: "Ali",
      address: {
        city: "Almaty"
      }
    };

    const copy = deepClone(original);

    expect(copy).toEqual(original);
    expect(copy).not.toBe(original);
    expect(copy.address).not.toBe(original.address);
  });

  test("clones arrays", () => {
    const original = [1, [2, 3]];
    const copy = deepClone(original);

    expect(copy).toEqual(original);
    expect(copy).not.toBe(original);
    expect(copy[1]).not.toBe(original[1]);
  });

  test("clones Date", () => {
    const original = new Date("2026-01-01");
    const copy = deepClone(original);

    expect(copy).toEqual(original);
    expect(copy).not.toBe(original);
    expect(copy instanceof Date).toBe(true);
  });
});

describe("memoize", () => {
  test("returns the correct result", () => {
    const add = (a, b) => a + b;
    const memoizedAdd = memoize(add);

    expect(memoizedAdd(2, 3)).toBe(5);
  });

  test("uses cached result", () => {
    let calls = 0;

    const multiply = (a, b) => {
      calls++;
      return a * b;
    };

    const memoizedMultiply = memoize(multiply);

    memoizedMultiply(2, 4);
    memoizedMultiply(2, 4);

    expect(calls).toBe(1);
  });
});

describe("counter", () => {
  test("increments and decrements value", () => {
    const c = counter();

    expect(c.value()).toBe(0);
    expect(c.inc()).toBe(1);
    expect(c.inc()).toBe(2);
    expect(c.dec()).toBe(1);
  });

  test("different counters have separate values", () => {
    const first = counter();
    const second = counter();

    first.inc();
    first.inc();

    expect(first.value()).toBe(2);
    expect(second.value()).toBe(0);
  });
});
