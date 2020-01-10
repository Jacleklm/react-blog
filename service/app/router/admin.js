'use strict';

module.exports = app => {
  const { router, controller } = app;
  const adminauth = app.middleware.adminauth();
  router.get('/admin/index', controller.admin.main.index);
  router.post('/admin/checkLogin', controller.admin.main.checkLogin);
  router.get('/admin/getTypeInfo', adminauth, controller.admin.main.getTypeInfo)
  ; // 这里多了中间件进行路由守卫，有session才能访问这个接口
  router.post('/admin/addArticle', controller.admin.main.addArticle);
};
