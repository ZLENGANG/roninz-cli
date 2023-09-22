// jest是commonjs规范，不能直接使用import，可以使用babel转换
module.exports = {
  presets: [
    ['@babel/preset-env']
  ]
}
