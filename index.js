import express from "express";
import qr from "qr-image";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/generator", (req, res) => {
  const url = req.body["link"];
  var qr_svg = qr.image(url);
  qr_svg.pipe(fs.createWriteStream("qr_img.png"));
  res.sendFile(__dirname + "/qr_img.png");
});

app.listen(port, (req, res) => {
  console.log(`Server is running at http://localhost:${port}`);
});
