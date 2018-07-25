var fs = require('fs');

fs.readFile('./dist/index.html', 'utf8', (err, data) => {
  if (!err) {
    const dataStr = data.toString().replace('<!-- dll -->', '<script type="text/javascript" src="/dll/vendor.dll.js"></script>');
    fs.writeFile('./dist/index.html', dataStr, (error) => {
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
