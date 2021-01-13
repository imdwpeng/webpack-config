/*
 * @Author: Dong
 * @Date: 2021-01-13 16:22:51
 * @LastEditors: Dong
 * @LastEditTime: 2021-01-13 16:24:01
 */
if (process.env.NODE_ENV === 'production'){
  module.exports = require('./dist/index.min.js');
} else {
  module.exports = require('./dist/index.js');
}