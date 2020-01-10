'use strict';

const Controller = require('egg').Controller;

class MainController extends Controller {
  // 首页的文章列表数据
  async index() {
    this.ctx.body = 'hi api';
    console.log('index');
  }
  // 判断用户名密码是否正确
  async checkLogin() {
    const userName = this.ctx.request.body.userName;
    const password = this.ctx.request.body.password; // 这里也可以进行加密和解密
    const sql = " SELECT userName FROM admin_user WHERE userName = '" + userName + "' AND password = '" + password + "'";

    const res = await this.app.mysql.query(sql);
    if (res.length > 0) {
      // 登录成功,进行session缓存
      const openId = new Date().getTime(); // 传给前端的token，用当前时间的时间戳做token
      this.ctx.session.openId = { openId }; // 并且把这个token放到session中。这里session是？？有什么用？我们似乎用不到吧是直接从数据库拿
      this.ctx.body = { data: '登录成功', openId };
    } else {
      this.ctx.body = { data: '登录失败' };
    }
  }
  // 后台文章分类信息
  async getTypeInfo() {
    const resType = await this.app.mysql.select('type');
    this.ctx.body = { data: resType };
  }
  // 添加文章
  async addArticle() {
    const tmpArticle = this.ctx.request.body;
    // 但其实还没给这个文章加id，我们先找到现有数据库id最大的id，并让新文章等于这个id + 1
    const sql = 'select * from article where id=(select MAX(id) from article )';
    const maxIdArticle = await this.app.mysql.query(sql);
    const maxId = maxIdArticle[0].id;
    tmpArticle.id = maxId + 1;

    const result = await this.app.mysql.insert('article', tmpArticle);
    const insertSuccess = result.affectedRows === 1;
    // 数据库插入成功后result.affectRows会等于1，意思是插入了一行数据
    // const insertId = result.insertId;

    this.ctx.body = {
      isScuccess: insertSuccess,
      insertId: tmpArticle.id,
    };
  }
  // 修改文章
  async updateArticle() {
    const tmpArticle = this.ctx.request.body;

    const result = await this.app.mysql.update('article', tmpArticle);
    const updateSuccess = result.affectedRows === 1;
    console.log(updateSuccess);
    this.ctx.body = {
      isScuccess: updateSuccess,
    };
  }
  // 获得文章列表
  async getArticleList() {
    const sql =
			'SELECT article.id as id,' +
			'article.title as title,' +
			'article.introduce as introduce,' +
			"FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime," +
			'type.typeName as typeName ' +
			'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
			'ORDER BY article.id DESC ';

    const resList = await this.app.mysql.query(sql);
    this.ctx.body = { list: resList };
  }
  // 删除文章
  async delArticle() {
    const id = this.ctx.params.id;
    const res = await this.app.mysql.delete('article', { id });
    this.ctx.body = { data: res };
  }
  // 根据文章ID得到文章详情，用于修改文章
  async getArticleById() {
    const id = this.ctx.params.id;
    const sql =
			'SELECT article.id as id,' +
			'article.title as title,' +
			'article.introduce as introduce,' +
			'article.article_content as article_content,' +
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
}

module.exports = MainController;
