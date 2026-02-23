const express = require("express");
const path = require("path");
const axios = require("axios");
const cors = require("cors");
const CryptoJS = require("crypto-js");
const LZString = require("lz-string")
const app = express();
app.use(express.json());
app.use(cors()); // Mengizinkan semua origin (bisa diatur lebih spesifik)
const crypto = require("crypto");

// Endpoint proxy batalBooking
app.post("/proxy/batalBooking", async (req, res) => {
  try {
    const { bookingId } = req.body;
    const consid = "30083";
    const password = "0jWEBC4A21";
    const timestamp = Math.floor(Date.now() / 1000);
    const dataSignature = consid + "&" + timestamp;
    const mappedTimeStamp = new Date(timestamp * 1000).toLocaleString(
      "id-ID",
      {
        timeZone: "Asia/Jakarta",
        dateStyle: "full",
        timeStyle: "medium",
      }
    );
    console.log(`🚀 ~ app.post ~ bookingId:, ${bookingId} - ${mappedTimeStamp}`);

    const dataSignatureHash = CryptoJS.HmacSHA256(dataSignature, password);
    const signature = CryptoJS.enc.Base64.stringify(dataSignatureHash);

    const url = "https://apijkn.bpjs-kesehatan.go.id/antreanrs/antrean/batal";

    const response = await axios.post(
      url,
      { kodebooking: bookingId, keterangan: "Batal" },
      {
        headers: {
          "Content-type": "application/json;charset=UTF-8",
          "X-cons-id": consid,
          "X-Timestamp": timestamp,
          "X-Signature": signature,
          "User-Key": "63e8b4496f7c6d94ecb570179aea3cf0",
        },
      }
    );
    console.log("Response:", response.data);
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message });
  }
});


// Endpoint Proxy checkStatus
app.post("/proxy/checkStatus", async (req, res) => {
  try {
    const { bookingId } = req.body;
    const consid = "30083";
    const password = "0jWEBC4A21";
    const timestamp = Math.floor(Date.now() / 1000);
    const dataSignature = consid + "&" + timestamp;
    const passphrase = consid + password + timestamp;
    const mappedTimeStamp = new Date(timestamp * 1000).toLocaleString(
      "id-ID",
      {
        timeZone: "Asia/Jakarta",
        dateStyle: "full",
        timeStyle: "medium",
      }
    );
    console.log(`🚀 ~ app.post ~ queueId:, ${bookingId} - ${mappedTimeStamp}`);

    const dataSignatureHash = CryptoJS.HmacSHA256(dataSignature, password);
    const signature = CryptoJS.enc.Base64.stringify(dataSignatureHash);

    const url = "https://apijkn.bpjs-kesehatan.go.id/antreanrs/antrean/getlisttask";

    const response = await axios.post(
      url,
      { kodebooking: bookingId },
      {
        headers: {
          "Content-type": "application/json;charset=UTF-8",
          "X-cons-id": consid,
          "X-Timestamp": timestamp,
          "X-Signature": signature,
          "User-Key": "63e8b4496f7c6d94ecb570179aea3cf0",
        },
      }
    );
    const key = crypto
      .createHash("sha256")
      .update(passphrase)
      .digest()


    const iv = key.slice(0, 16)

    const decipher = crypto.createDecipheriv(
      "aes-256-cbc",
      key,
      iv
    )

    let decrypted = decipher.update(
      response.data.response,
      "base64",
      "utf8"
    );
    decrypted += decipher.final("utf8")

    const decompressed =
      LZString.decompressFromEncodedURIComponent(decrypted);

    const tasks = JSON.parse(decompressed);

    // Kirim ke FE dalam format rapi
    console.log("Task ID yang sudah dilalui: ", tasks)
    res.json({
      metadata: response.data.metadata,
      tasks: tasks,
    });
  } catch (error) {
    console.log(error.response?.data || error.message);

    res.status(error.response?.status || 500).json({
      error: error.response?.data || error.message,
    });
  }
});


// Endpoint proxy updateTaskId
app.post("/proxy/updateTaskId", async (req, res) => {
  try {
    const { bookingId, taskId, miliSecondsDateTime } = req.body;
    const consid = "30083";
    const password = "0jWEBC4A21";
    const timestamp = Math.floor(Date.now() / 1000);
    const dataSignature = consid + "&" + timestamp;
    const mappedTimeStamp = new Date(timestamp * 1000).toLocaleString(
      "id-ID",
      {
        timeZone: "Asia/Jakarta",
        dateStyle: "full",
        timeStyle: "medium",
      }
    );
    console.log(`🚀 ~ app.post ~ bookingId:, ${bookingId} - ${mappedTimeStamp}`);

    const dataSignatureHash = CryptoJS.HmacSHA256(dataSignature, password);
    const signature = CryptoJS.enc.Base64.stringify(dataSignatureHash);

    const url = "https://apijkn.bpjs-kesehatan.go.id/antreanrs/antrean/updatewaktu";

    const response = await axios.post(
      url,
      { kodebooking: bookingId, taskid: taskId, waktu: miliSecondsDateTime },
      {
        headers: {
          "Content-type": "application/json;charset=UTF-8",
          "X-cons-id": consid,
          "X-Timestamp": timestamp,
          "X-Signature": signature,
          "User-Key": "63e8b4496f7c6d94ecb570179aea3cf0",
        },
      }
    );
    console.log("Response:", response.data);
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message });
  }
});


app.use(express.static(path.join(__dirname, '/dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/dist', 'index.html'));
});

// const HOST = "175.154.33.223"
// const PORT = 4005;
const HOST = "localhost"
const PORT = 4005;
app.listen(PORT, HOST, () =>
  console.log(`Server berjalan di http://localhost:${PORT}`)
);
