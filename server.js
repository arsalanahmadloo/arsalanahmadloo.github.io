const express = require('express');
const { exec } = require('child_process');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/ping', (req, res) => {
  const target = req.query.target || 'google.com';
  exec(`ping -c 4 ${target}`, (error, stdout, stderr) => {
    if (error) return res.status(500).send(stderr);
    res.send(stdout);
  });
});

app.get('/portscan', (req, res) => {
  const target = req.query.target || '127.0.0.1';
  const ports = [22, 80, 443, 8080];
  let results = [];
  let completed = 0;

  ports.forEach(port => {
    exec(`nc -zv -w 1 ${target} ${port}`, (error, stdout, stderr) => {
      completed++;
      if (error) results.push(`پورت ${port} بسته است`);
      else results.push(`پورت ${port} باز است`);
      if (completed === ports.length) {
        res.send(results.join('\n'));
      }
    });
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`سرور روی پورت ${PORT} روشن است`);
});
