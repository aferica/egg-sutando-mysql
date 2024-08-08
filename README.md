# egg-sutando-mysql

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-sutando.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-sutando
[travis-image]: https://img.shields.io/travis/eggjs/egg-sutando.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/egg-sutando
[codecov-image]: https://img.shields.io/codecov/c/github/eggjs/egg-sutando.svg?style=flat-square
[codecov-url]: https://codecov.io/github/eggjs/egg-sutando?branch=master
[david-image]: https://img.shields.io/david/eggjs/egg-sutando.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/egg-sutando
[snyk-image]: https://snyk.io/test/npm/egg-sutando/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-sutando
[download-image]: https://img.shields.io/npm/dm/egg-sutando.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-sutando


## Install

```bash
$ npm i egg-sutando-mysql --save
```

## Usage

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
    client: 'mysql2',
    connection: {
      host: '127.0.0.1',
      port: 3306,
      user: 'root',
      password: 123456,
      database: 'db1',
    },
  },
};
```

### Multi Databases
``` js
exports.sutando = {
  clients: {
    db1: {
      // name: 'db1', 如果不传，则使用database的值
      client: 'mysql2',
      connection: {
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: 123456,
        database: 'db1',
      },
    },
    db2: {
      // name: 'db2', 如果不传，则使用database的值
      client: 'mysql2',
      connection: {
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: 123456,
        database: 'db2',
      },
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
  connection = 'db1';
}

module.exports = User;
```
app/service/user.js
``` js
await this.model.User.query();
```

## Questions & Suggestions

Please open an issue [here](https://github.com/aferica/egg-sutando-mysql/issues).

## License

[MIT](LICENSE)

