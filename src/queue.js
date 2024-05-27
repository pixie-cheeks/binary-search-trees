class Queue {
  constructor() {
    this.items = {};
    this.frontIndex = 0;
    this.backIndex = 0;
  }

  enqueue(item) {
    this.items[this.backIndex] = item;
    this.backIndex += 1;
  }

  dequeue() {
    if (this.frontIndex === this.backIndex)
      throw new Error("Can't dequeue an empty queue");

    const item = this.items[this.frontIndex];
    delete this.items[this.frontIndex];
    this.frontIndex += 1;
    return item;
  }
}

export default Queue;
