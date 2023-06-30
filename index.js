const express = require('express');
const app = express();
const fs = require('fs');
const { promisify } = require('util');
const gtts = require('gtts');
const cors = require('cors');
app.use(cors());
app.use(express.json());
const writeFileAsync = promisify(fs.writeFile);

app.post('/convert', async (req, res) => {
  console.log(req.body);
  const inputText = req.body.text;
  if (!inputText) {
    res.status(400).send('Bad request');
    return;
  }
  const outputPath = 'output.mp3';
  const speech = new gtts(inputText, 'fr');
  
  await new Promise((resolve, reject) => {
    speech.save(outputPath, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });

  res.sendFile(outputPath, { root: __dirname });
});

app.get('/' , (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, async () => {
  console.log('Le serveur est en écoute sur le port 3000');
  });
