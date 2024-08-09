# egg-sutando-mysql

[![NPM version][npm-image]][npm-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-sutando-mysql.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-sutando-mysql
[download-image]: https://img.shields.io/npm/dm/egg-sutando-mysql.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-sutando-mysql


## Install

```bash
$ npm i egg-sutando-mysql --save
```

## Usage

本插件是对[sutando](https://sutando.org/zh_CN/)的封装，用于egg开发
具体的使用文档可以查看[sutando文档](https://sutando.org/zh_CN/)

```js
// {app_root}/config/plugin.js
exports.sutando = {
  enable: true,
  package: 'egg-sutando-mysql',
};
```

## Configuration

### Single Database
```js
// {app_root}/config/config.default.js
exports.sutando = {
  client: {
    // name: 'db1', 如果不传，则使用database的值
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 123456,
    database: 'db1',
  },
};
```

### Multi Databases
``` js
exports.sutando = {
  clients: {
    db1: {
      // name: 'db1', 如果不传，则使用database的值
      host: '127.0.0.1',
      port: 3306,
      user: 'root',
      password: 123456,
      database: 'db1',
    },
    db2: {
      // name: 'db2', 如果不传，则使用database的值
      host: '127.0.0.1',
      port: 3306,
      user: 'root',
      password: 123456,
      database: 'db2',
    },
  },
};
```

## Example

### By Table
app/service/user.js
``` js
await this.app.db1.table('users').first();
```

### By Model

app/model/user.js
``` js
const { Model } = require('sutando');

class User extends Model {
  perPage = 20;
  connection = 'db1';  // 使用config配置中的name
}

module.exports = User;
```
app/service/user.js
``` js
await this.model.User.query();

// 支持多层级，假如user.js目录是 app/model/user/user.js
await this.model.User.User.query(); // 模型名和层级名使用 需要首字母大写
```

## Questions & Suggestions

Please open an issue [here](https://github.com/aferica/egg-sutando-mysql/issues).

## License

[MIT](LICENSE)

