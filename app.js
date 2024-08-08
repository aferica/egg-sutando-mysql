const { sutando, Model } = require('sutando');
const path = require('path');
const fs = require('fs');
const _ = require('lodash/string');

module.exports = app => {
  app.addSingleton('sutando', createOneClient);
};

function createOneClient(config, app) {
  console.log(config)
  const customName = config.name || config.connection.database;
  console.log(customName)
  // 创建实例
  sutando.addConnection(config, customName);
  const db = sutando.connection(customName);
  // 做启动应用前的检查
  app.beforeStart(async () => {
    loadModelToApp(app, customName);

    app[customName] = db;

    const rows = await db.table().select(db.raw('now() as currentTime')).first();
    console.log(
      `[egg-sutando-mysql] init ${customName} instance success, mysql currentTime: ${rows.currentTime}`
    );
  });

  return sutando;
}

function loadModelToApp(app, customName) {
  const dir = path.join(app.config.baseDir, 'app/model');

  app.loader.loadToApp(dir, 'model', {
    inject: app,
    caseStyle: 'upper',
    filter(model) {
      return typeof model === 'function' && model.prototype instanceof Model;
    },
  });

  // const customDir = path.join(app.config.baseDir, 'app/model/' + customName);
  // app.loader.loadToApp(customDir, _.lowerFirst(customName) + 'Model', {
  //   inject: app,
  //   caseStyle: 'upper',
  //   filter(model) {
  //     return typeof model === 'function' && model.prototype instanceof Model;
  //   },
  // });
}
