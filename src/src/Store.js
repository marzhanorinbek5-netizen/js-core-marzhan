export class Store {
  #items = [];

  add(item) {
    if (!item || typeof item !== "object") {
      throw new TypeError("item must be an object");
    }

    if (
      typeof item.name !== "string" ||
      typeof item.price !== "number" ||
      typeof item.qty !== "number"
    ) {
      throw new TypeError("item must have name, price and qty");
    }

    this.#items.push({ ...item });

    return this;
  }

  remove(name) {
    const index = this.#items.findIndex(item => item.name === name);

    if (index === -1) {
      return false;
    }

    this.#items.splice(index, 1);
    return true;
  }

  find(name) {
    return this.#items.find(item => item.name === name);
  }

  total() {
    return this.#items.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );
  }

  get items() {
    return this.#items.map(item => ({ ...item }));
  }

  static create() {
    return new Store();
  }

  _sortByPrice() {
    this.#items.sort((a, b) => a.price - b.price);
  }
}

export class SortedStore extends Store {
  add(item) {
    super.add(item);
    this._sortByPrice();

    return this;
  }
}
