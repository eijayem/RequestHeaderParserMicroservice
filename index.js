require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.set('trust proxy', true);

function getClientIp(req) {
  const xff = req.headers['x-forwarded-for'];
  let ip = Array.isArray(xff) ? xff[0] : xff ? xff.split(',')[0] : req.ip;
  if (typeof ip === 'string' && ip.startsWith('::ffff:')) {
    ip = ip.replace('::ffff:', '');
  }
  return ip || '';
}

app.get('/', (req, res) => {
  res
    .type('text')
    .send(
      'Request Header Parser Microservice\n' +
        'Use GET /api/whoami to see parsed headers.'
    );
});

app.get('/api/whoami', (req, res) => {
  const ipaddress = getClientIp(req);
  const language = req.headers['accept-language'] || '';
  const software = req.headers['user-agent'] || '';

  res.json({ ipaddress, language, software });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});