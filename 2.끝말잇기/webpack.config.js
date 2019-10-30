const path = require('path');

module.exports = {
  name: 'word-relay-dev',
  mode: 'development', //배포는 : production
  devtool: 'eval',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  entry: {
    app: './client', //client에서 wordRelay를 불러오기때문에 client만 입력해도 댄다.
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      options: {
        presets: [
          ['@babel/preset-env', {
            targets: {browsers: ['last 2 chrome versions']},
            debug: true,
          }],
          '@babel/preset-react',
        ],
        plugins: ['react-hot-loader/babel'],
      },
      exclude: path.join(__dirname, 'node_modules'),
    }],
  },
  plugins: [],
  output: {
    path: path.join(__dirname, 'dist'),  //__dirname : 현재 폴더
    filename: '[name].js',
    publicPath: '/dist',
  },
};
