const { sutando } = require('sutando');
const path = require('path');

module.exports = app => {
  loadModelToApp(app);
  app.addSingleton('sutando', createOneClient);
};

async function createOneClient(config, app) {
  const customName = config.name || config.database;
  // 创建实例
  const clientConfig = {
    client: 'mysql2',
    connection: config
  }
  sutando.addConnection(clientConfig, customName);
  const db = sutando.connection(customName);
  // 做启动应用前的检查
  app.beforeStart(async () => {
    app[customName] = db;
    const rows = await db.table().select(db.raw('now() as currentTime')).first();
    console.log(
      `[egg-sutando-mysql] init ${customName} instance success, mysql currentTime: ${rows.currentTime}`
    );
  });

  return db;
}

function loadModelToApp(app) {
  const dir = path.join(app.config.baseDir, 'app/model');
  app.loader.loadToApp(dir, 'model', {
    caseStyle: 'upper',
  });
}
