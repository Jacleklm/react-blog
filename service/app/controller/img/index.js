'use strict';

const Controller = require('egg').Controller;

class ImgController extends Controller {
  async index() {
    // 获取用户表的数据
    const result = await this.app.mysql.get('article', {});
    console.log(result);
    this.ctx.body = `我拿到数据库了吗：${result.title}`;
  }
  async img() {
    this.ctx.body = '../../public/Node/EventLoop.png';
  }
}

module.exports = ImgController;
