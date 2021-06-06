# btForum 前端部分

## 安装

1.  clone 项目

    ```shell
    git@github.com:Leeson63/DBMidTermFrontend.git
    ```

2.  安装依赖包

    ```shell
    yarn install
    ```

3.  设置后端的地址：修改 `src/setupProxy.js` 将文件修改为

    ```javascript
    const { createProxyMiddleware } = require('http-proxy-middleware');
    module.exports = function (app) {
        app.use(
            '/api',
            createProxyMiddleware({
                target: 'BACKEND_ADDRESS', // change BACKEND_ADDRESS to your backend address
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '',
                }
            })
        );
    };
    ```

4.  运行 `yarn start` 启动项目，也可以使用 `npm run build` 指令进行打包部署。

## 后端

*   地址 ：https://github.com/shercoo/DBMidTerm

