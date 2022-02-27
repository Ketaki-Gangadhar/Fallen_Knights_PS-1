const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const path = require("path");
const fs = require('fs')
const axios = require('axios')

const Mp32Wav = require('mp3-to-wav')

const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);



// new Mp32Wav('mp3 file absolute dir / .mp3 file').exec()

app.use(cors());

app.use(bodyParser.json({
    limit: '50mb'
}));

app.use(bodyParser.urlencoded({
    limit: '50mb',
    parameterLimit: 1000000,
    extended: true
}));

const sendForOutput = async (res , req) => {
    const file = fs.readFileSync('audio.wav', {encoding: 'base64'});
  
      console.log("Sending file --> \n" + file.length);
      const config = {
          headers: {
          "Content-Type": 'application/json',
          }
      };
  
      const result = await axios.post("http://localhost:5000/predict", { data: file , number : req.body.number}, config);
    //   console.log(result.data);
      res.send(result.data);
  }

const converter = async (cb , res , req) => {
    let track = './audio.mp3';//your path to source file

    await ffmpeg(track)
        .toFormat('wav')
        .on('error', (err) => {
            console.log('An error occurred: ' + err.message);
        })
        .on('progress', (progress) => {
            // console.log(JSON.stringify(progress));
            console.log('Processing: ' + progress.targetSize + ' KB converted');
        })
        .on('end', () => {
            console.log('Processing finished !');
            console.log("Here calling callback");
            cb(res , req);
        })
        .save('./audio.wav')
}




app.post("/", (req, res) => {
    console.log(req.body.number);
    let buff = new Buffer(req.body.data, 'base64');
    fs.writeFileSync('audio.mp3', buff);
    // console.log(__dirname);
    converter(sendForOutput , res , req);
});


const port = process.env.PORT || 5080;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});