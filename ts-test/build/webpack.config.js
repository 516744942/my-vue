var htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry:'./index.ts',
  output:{
    filename:'app.js'
  },
  resolve:{
    extensions:['.js','.ts','.tsx']
  },
  devtool:'cheap-module-eval-source-map',
  module:{
    rules:[
      {
        test:/\.tsx?$/i,
        use:[{
          loader:'ts-loader'
        }],
        exclude: /node_modules/
      }
    ]
  },
  plugins:[
    new htmlWebpackPlugin({
      template:'./public/index.html'
    })
  ]

}