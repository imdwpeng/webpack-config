/**
 * Created by Eric on 2018/5/17.
 */

export const data = () => {
    return {
        title: 'webpack介绍',
        subtitle: 'webpack作为一个模块打包器，主要用于前端工程中的依赖梳理和模块打包，将我们开发的具有高可读性和可维护性的代码文件打包成浏览器可以识别并正常运行的压缩代码',
        author: 'eric',
        menu: [
            {id: 1, name: 'entry', url: 'entry'},
            {id: 2, name: 'output', url: 'output'},
            {id: 3, name: 'loader', url: 'loader'},
            {id: 4, name: 'plugins', url: 'plugins'},
            {id: 5, name: 'module', url: 'module'},
            {id: 5, name: 'devServer', url: 'devServer'}
        ]
    }
}