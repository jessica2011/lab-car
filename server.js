let express = require('express');
let app = express();
let server = app.listen(3030, function() {
  console.log('servidor encendido');
});

app.use(express.static('public'))