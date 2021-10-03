const express = require('express');
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });
const cors = require('cors');
require('dotenv').config()

const app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});


app.post('/api/fileanalyse', upload.single('upfile'), async (req, res) => {
  try {
    const file = await req.file;
    res.status(201).json({
      name: file.originalname,
      type: file.mimetype,
      size: file.size
    })
  } catch(err) {
    res.status(500).json({err})
  }
})



const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
