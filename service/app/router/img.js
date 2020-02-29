'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.get('/img/index', controller.img.index.index);
  router.get('/img', controller.img.index.img);
};
