import { defineConfig } from 'umi';
import path from 'path';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  chainWebpack: (memo, { env, webpack, createCSSRule }) => {
    // memo.module
    //   .rule('file-loader')
    //   .test(/.(json|obj)/)
    //   .use('file-loader')
    //   .options({
    //     name: '[hash].[ext]',
    //     outputPath: 'assets',
    //   })
    //   .loader('file-loader');

    memo.module
      .rule('file-loader')
      .test(/.(obj)/)
      .exclude.add([
        path.resolve('../src/pages/.umi'),
        path.resolve('node_modules'),
      ])
      .end()
      .use('file-loader')
      .loader('file-loader');
  },
});
