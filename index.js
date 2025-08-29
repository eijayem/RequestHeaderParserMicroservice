var express = require('express');
var app = express();

app.get('/', (req, res) => {
  res.send('<h1>Request Header Parser Microservice</h1><p>Use /api/whoami to get your info.</p>');
});

app.get('/api/whoami', (req, res) => {
  var ip = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  var language = req.headers['accept-language'];

  var software = req.headers['user-agent'];

  res.json({
    ipaddress: ip,
    language: language,
    software: software
  });
});

var PORT = process.env.PORT || 3000;
app.listen(PORT, () => {console.log(`Server running on port ${PORT}`);
});