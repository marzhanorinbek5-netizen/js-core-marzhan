import { describe, test, expect } from "vitest";
import { Store, SortedStore } from "../src/Store.js";

describe("Store", () => {
  test("creates an empty store", () => {
    const store = new Store();

    expect(store.items).toEqual([]);
  });

  test("adds an item", () => {
    const store = new Store();

    store.add({
      name: "Apple",
      price: 500,
      qty: 2
    });

    expect(store.items).toEqual([
      {
        name: "Apple",
        price: 500,
        qty: 2
      }
    ]);
  });

  test("finds an item by name", () => {
    const store = new Store();

    store.add({
      name: "Apple",
      price: 500,
      qty: 2
    });

    expect(store.find("Apple")).toEqual({
      name: "Apple",
      price: 500,
      qty: 2
    });
  });

  test("returns undefined for missing item", () => {
    const store = new Store();

    expect(store.find("Apple")).toBeUndefined();
  });

  test("calculates total", () => {
    const store = new Store();

    store.add({
      name: "Apple",
      price: 500,
      qty: 2
    });

    store.add({
      name: "Milk",
      price: 300,
      qty: 3
    });

    expect(store.total()).toBe(1900);
  });

  test("returns zero total for empty store", () => {
    const store = new Store();

    expect(store.total()).toBe(0);
  });

  test("removes an existing item", () => {
    const store = new Store();

    store.add({
      name: "Apple",
      price: 500,
      qty: 2
    });

    expect(store.remove("Apple")).toBe(true);
    expect(store.items).toEqual([]);
  });

  test("returns false when removing missing item", () => {
    const store = new Store();

    expect(store.remove("Apple")).toBe(false);
  });

  test("rejects invalid item", () => {
    const store = new Store();

    expect(() => store.add("Apple")).toThrow(TypeError);
  });

  test("allows zero quantity", () => {
    const store = new Store();

    store.add({
      name: "Apple",
      price: 500,
      qty: 0
    });

    expect(store.total()).toBe(0);
  });

  test("static create returns a Store", () => {
    const store = Store.create();

    expect(store).toBeInstanceOf(Store);
  });
});

describe("SortedStore", () => {
  test("inherits from Store", () => {
    const store = new SortedStore();

    expect(store).toBeInstanceOf(Store);
  });

  test("sorts items by price", () => {
    const store = new SortedStore();

    store.add({
      name: "Milk",
      price: 300,
      qty: 1
    });

    store.add({
      name: "Phone",
      price: 100000,
      qty: 1
    });

    store.add({
      name: "Apple",
      price: 500,
      qty: 2
    });

    expect(store.items.map(item => item.name)).toEqual([
      "Milk",
      "Apple",
      "Phone"
    ]);
  });
});
