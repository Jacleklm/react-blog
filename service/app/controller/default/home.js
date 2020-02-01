'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    // 获取用户表的数据
    const result = await this.app.mysql.get('article', {});
    console.log(result);
    this.ctx.body = `我拿到数据库了吗：${result.title}`;
  }
  async test() {
    // 测试
    this.ctx.body = { test: 666 };
  }
  async getArticleList() {
    const sql =
			'SELECT article.id as id,' +
			'article.title as title,' +
			'article.introduce as introduce,' +
			"FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime," +
			'article.view_count as view_count ,' +
			'type.typeName as typeName ' +
			'FROM article LEFT JOIN type ON article.type_id = type.Id ORDER BY article.addTime DESC'; // DESC是逆序的意思

    const results = await this.app.mysql.query(sql);
    this.ctx.body = {
      data: results,
      test: 'I am a test',
    };
  }
  async getArticleById() {
    // 先配置路由的动态传值，然后再接收值
    const id = this.ctx.params.id;
    const sql =
			'SELECT article.id as id,' +
			'article.title as title,' +
			'article.introduce as introduce,' +
			'article.article_content as article_content,' +
			// "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime," +
			"FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime," +
			'article.view_count as view_count ,' +
			'type.typeName as typeName ,' +
			'type.id as typeId ' +
			'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
			'WHERE article.id=' +
			id;

    const result = await this.app.mysql.query(sql);
    this.ctx.body = { data: result };
  }
  // 得到类别名称和编号
  async getTypeInfo() {
    const result = await this.app.mysql.select('type');
    this.ctx.body = { data: result };
  }
  // 根据类别ID获得文章列表
  async getListById() {
    const id = this.ctx.params.id;
    const sql =
			'SELECT article.id as id,' +
			'article.title as title,' +
			'article.introduce as introduce,' +
			"FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime," +
			'article.view_count as view_count ,' +
			'type.typeName as typeName ' +
			'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
			// 'ORDER BY article.addTime DESC' +
			'WHERE type_id=' +
			id;

    const result = await this.app.mysql.query(sql);
    this.ctx.body = { data: result };
  }
  // 根据类别ID获得文章类别名
  // async getTypeName() {
  //   const id = this.ctx.params.id;s
  //   const sql =
  // 		'SELECT article.id as id,' +
  // 		'article.title as title,' +
  // 		'article.introduce as introduce,' +
  // 		"FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime," +
  // 		'article.view_count as view_count ,' +
  // 		'type.typeName as typeName ' +
  // 		'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
  // 		'WHERE type_id=' +
  // 		id;

  //   const result = await this.app.mysql.query(sql);
  //   this.ctx.body = { data: result };
  // }
}

module.exports = HomeController;
