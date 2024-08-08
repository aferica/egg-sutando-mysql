const { sutando } = require('sutando');
const path = require('path');
const _ = require('lodash/string');

module.exports = app => {
  app.addSingleton('sutando', createOneClient);
};

async function createOneClient(config, app) {
  // 异步获取 mysql 配置
  const sutandoConfig = await app.config.sutando;
  const isMulti = sutandoConfig.client == null;
  const customName = config.name || config.connection.database;
  // 创建实例
  console.log(config);
  sutando.addConnection(config, customName);
  const db = sutando.connection(customName);
  // 做启动应用前的检查
  app.beforeStart(async () => {
    // 如果是多实例，只加载model文件夹中对应db名称的模型
    loadModelToApp(app, isMulti ? customName : null);

    app[customName] = db;

    const rows = await db.table().select(db.raw('now() as currentTime')).first();
    console.log(
      `[egg-sutando-mysql] init ${customName} instance success, mysql currentTime: ${rows.currentTime}`
    );
  });

  return db;
}

function loadModelToApp(app, customName) {
  let dirName = 'app/model';
  if (customName) {
    dirName += '/' + customName;
  }
  let injectName = 'model';
  if (customName) {
    injectName =  _.lowerFirst(customName) + 'Model';
  }
  const dir = path.join(app.config.baseDir, dirName);

  console.log(dir);
  app.loader.loadToApp(dir, injectName);
}
