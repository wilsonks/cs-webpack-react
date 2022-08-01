const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

var babelConfig = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: ""
            }
          },
          {
            loader: "css-loader"
          }
        ],
        exclude: /\.module\.css$/
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: true
            }
          }
        ],
        include: /\.module\.css$/
      },
      {
        test: /\.(png|jpg|ico)$/,
        loader: "file-loader",
        options: {
          publicPath: "",
          name: "assets/images/[name].[ext]"
        }
      },
      {
        test: /\.(mp3|wav)$/,
        loader: "file-loader",
        options: {
          publicPath: "",
          name: "assets/sounds/[name].[ext]"
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: "file-loader",
        options: {
          publicPath: "",
          name: "fonts/[name].[ext]"
        }
      },
      {
        test: /\.svg$/,
        loader: "svg-inline-loader"
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"]
  }
};

var appConfig = Object.assign({}, babelConfig, {
  mode: "development",
  target: "web",
  name: "app",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./public"),
    filename: "bundle.js"
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: "./src/index.html" }]
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css"
    })
  ],
  devServer: {
    port: 9000,
    open: true,
    static: {
      directory: path.join(__dirname, "public")
    }
  }
});

module.exports = () => {
  return [appConfig];
};
