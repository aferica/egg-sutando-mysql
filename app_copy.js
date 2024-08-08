// const { sutando } = require('sutando');
// const path = require('path');
// const _ = require('lodash');

// module.exports = app => {
//   // app.addSingleton('sutando', createOneClient);
//   app.beforeStart(async () => {
//     const config = app.config.sutando;
//     console.log(config)
//     const common = config.common;
//     const configs = config.configs;
//     const keys = Object.keys(configs);
//     const isMulti = keys.length > 1;
//     await Promise.all(keys.map(key => {
//       const fullConfig = _.mergeWith(configs[key], common);
//       console.log(fullConfig);
//       return addInstanceAndModel(key, fullConfig, isMulti, app);
//     }));
//   })
// };


// // module.exports = (app, config) => {
// //   console.log(config)
// //   app.addSingleton('sutando', createOneClient);
// // };

// async function addInstanceAndModel(key, config, isMulti, app) {
//   // 创建实例
//   sutando.addConnection(config, key);
//   const db = sutando.connection(key);
//   app[key] = db;
//   loadModelToApp(app, isMulti ? key : null);

//   const rows = await db.table().select(db.raw('now() as currentTime')).first();
//   console.log(
//     `[egg-sutando-mysql] init ${key} instance success, mysql currentTime: ${rows.currentTime}`
//   );

//   return db;
// }

// function loadModelToApp(app, customName) {

//   let dirName = 'app/model';
//   if (customName) {
//     dirName += '/' + customName;
//   }
//   let injectName = 'model';
//   if (customName) {
//     injectName =  _.lowerFirst(customName) + 'Model';
//   }
//   const dir = path.join(app.config.baseDir, dirName);

//   app.loader.loadToApp(dir, injectName);
// }
