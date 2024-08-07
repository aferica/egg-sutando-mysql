const { sutando, Model } = require('sutando');
const path = require('path');

module.exports = app => {
  app.addSingleton('sutando', createOneClient);
};

function createOneClient(config, app) {
  const name = config.name || config.connection.database;
  // 创建实例
  sutando.addConnection(config, name);
  const db = sutando.connection(name);
  // 做启动应用前的检查
  app.beforeStart(async () => {
    loadModelToApp(app);

    app[name] = db;

    const rows = await db.table().select(db.raw('now() as currentTime')).first();
    console.log(
      `[egg-sutando-mysql] init ${name} instance success, mysql currentTime: ${rows.currentTime}`
    );
  });

  return sutando;
}

function loadModelToApp(app) {
  const dir = path.join(app.config.baseDir, 'app/model');

  app.loader.loadToApp(dir, 'model', {
    inject: app,
    caseStyle: 'upper',
    filter(model) {
      return typeof model === 'function' && model.prototype instanceof Model;
    },
  });
}
