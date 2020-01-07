'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
  async test() {
    const { ctx } = this;
    ctx.body = '<h2>I am a test</h2>';
  }
}

module.exports = HomeController;
