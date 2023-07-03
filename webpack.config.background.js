const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "src", "background", "index.ts"),
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [{
          loader: 'ts-loader',
          options: {
              configFile: "tsconfig.background.json"
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
    filename: "background.js",
    path: path.resolve(__dirname, "extension", "js", "dist"),
  },
  mode: "production",
};
