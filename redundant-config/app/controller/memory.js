'use strict';

const Controller = require('egg').Controller;

const DEFAULT_OPTIONS = { logger: console };

class SomeClient {
  constructor(options) {
    this.options = options;
  }
  async fetchSomething() {
    return this.options.key;
  }
}

const clients = new Map();

function getClient(options) {
  if (!clients.get(options.key)) {
    clients.set(options.key, new SomeClient(Object.assign({}, DEFAULT_OPTIONS, options)));
  }
  return clients.get(options.key);
}

class MemoryController extends Controller {
  async index() {
    const { ctx } = this;
    const options = { ctx, key: Math.random().toString(16).slice(2) };
    const data = await getClient(options).fetchSomething();
    ctx.body = data;
  }
}

function printMemory() {
  console.log(process.memoryUsage().rss / 1024 / 1024 + 'MB ' + clients.size);
}

printMemory();
setInterval(printMemory, 10000)

module.exports = MemoryController;
