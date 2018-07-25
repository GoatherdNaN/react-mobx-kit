const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

fs.readFile('../index.html', 'utf8', (err, data) => {
	if (!err) {
		var dataStr = data.toString(),
		timestamp = (new Date()).getTime();

		dataStr = dataStr
					.replace('bundle.js', 'bundle.js?v='+timestamp)
					.replace('.../dist/Dll.js', './Dll.js?v='+ timestamp);

		fs.writeFile('.../dist/index.html', dataStr, (error) => {
			if (!error) {
				console.log('HTML file copy successfully');
			} else {
				console.log(error);
			}
		});
	} else {
		console.log(err);
	}
});

module.exports = {
  entry: {
    vendor: [
      "mobx",
      "mobx-react",
      "react",
      "react-dom",
      "react-router",
      "react-router-dom"
    ]
  },
  output: {
    path: path.resolve('dll'), //出口路径
    filename: '[name].dll.js',
    library: '[name]_library'
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]_library',
      path: path.resolve('dll', 'manifest.json'),
      context: __dirname
    }),
  ]
};
