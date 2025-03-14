const path = require('path'); // Importar o módulo path para resolver os caminhos de forma mais confiável
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: 'js/[name].[contenthash].js', // Usando o hash de conteúdo para gerar um nome único
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'img', to: 'img' },
        { from: 'css', to: 'css' },
        { from: 'login', to: 'login' },
        { from: 'js/vendor', to: 'js/vendor' },
        { from: 'icon.svg', to: 'icon.svg' },
        { from: 'favicon.ico', to: 'favicon.ico' },
        { from: 'robots.txt', to: 'robots.txt' },
        { from: 'icon.png', to: 'icon.png' },
        { from: '404.html', to: '404.html' },
        { from: ".", to: ".", globOptions: { ignore: ["**/node_modules/**"] } }, // Copia todos os HTMLs
        { from: 'site.webmanifest', to: 'site.webmanifest' },
      ],
    }),
  ],
});
