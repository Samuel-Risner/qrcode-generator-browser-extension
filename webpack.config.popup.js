const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "src", "popup", "index.ts"),
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [{
          loader: 'ts-loader',
          options: {
              configFile: "tsconfig.popup.json"
          }
      }],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  output: {
    filename: "popup.js",
    path: path.resolve(__dirname, "extension", "js", "dist"),
  },
  mode: "production",
};
