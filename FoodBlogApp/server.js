var express = require('express');

var app = express();
app.use(express.static('./dist/foodishblog'));

app.get('/*', function(req, res) {
    res.sendFile('index.html', {root: 'dist/foodishblog/'}
  );
});

app.listen(process.env.PORT || 8080,function() {
  console.log("Application started");
});