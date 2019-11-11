const { override, fixBabelImports, addLessLoader } = require('customize-cra');
module.exports = override(
  // 针对antd实现按需加载（babel-plugin-import）
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true
  }),
  // antd less样式覆盖
  addLessLoader({
    javascriptEnabled: true,
    modifyvars: { '@primary-color': '#1DA57A'}
  })
);