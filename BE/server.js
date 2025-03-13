const express = require("express");
const path = require("path");
const axios = require("axios");
const cors = require("cors");
const CryptoJS = require("crypto-js");
const LZString = require("lz-string")
const app = express();
app.use(express.json());
app.use(cors()); // Mengizinkan semua origin (bisa diatur lebih spesifik)

// Endpoint proxy batalBooking
app.post("/proxy/batalBooking", async (req, res) => {
  try {
    const { bookingId } = req.body;
    console.log("🚀 ~ app.post ~ bookingId:", bookingId);
    const consid = "30083";
    const password = "0jWEBC4A21";
    const timestamp = Math.floor(Date.now() / 1000);
    const dataSignature = consid + "&" + timestamp;

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


// Endpoint Proxy batalAntrian
app.post("/proxy/batalAntrian", async (req, res) => {
  try {
    const { queueId } = req.body;
    console.log("🚀 ~ app.post ~ queueId:", queueId);
    const consid = "30083";
    const password = "0jWEBC4A21";
    const timestamp = Math.floor(Date.now() / 1000);
    const dataSignature = consid + "&" + timestamp;
    const passphrase = consid + password + timestamp;

    const dataSignatureHash = CryptoJS.HmacSHA256(dataSignature, password);
    const signature = CryptoJS.enc.Base64.stringify(dataSignatureHash);

    const url = "https://apijkn.bpjs-kesehatan.go.id/antreanrs/antrean/batal";

    const response = await axios.post(
      url,
      { kodebooking: queueId, },
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
    console.log(response);
    res.json(response.data);
  } catch (error) {
    console.log(error.message)
    res.status(error.response?.status || 500).json({ error: error.message });
  }
});

// let jsonObj = JSON.parse(JSON.stringify(json));
// const txtenctypted = jsonObj.response;
// let txtdecrypted = decrypt(txtenctypted, passphrase);

// let txtDecompressed =
//   LZString.decompressFromEncodedURIComponent(txtdecrypted);

// // Log the decrypted and decompressed response
// console.log("==============================");
// console.log("Decrypted Response : " + JSON.stringify(JSON.parse(txtDecompressed), null, 2)
// );

// function decrypt(encrypted, passphrase) {
//   let key = CryptoJS.SHA256(passphrase);
//   let iv = CryptoJS.lib.WordArray.create(key.words.slice(0, 4));

//   const decrypted = CryptoJS.AES.decrypt(
//     {
//       ciphertext: CryptoJS.enc.Base64.parse(encrypted), // Parse the base64-encoded encrypted data
//     },
//     key,
//     {
//       iv: iv, // Initialization Vector
//       mode: CryptoJS.mode.CBC, // Cipher Block Chaining mode
//       padding: CryptoJS.pad.Pkcs7, // PKCS7 padding
//     }
//   );
//   return decrypted.toString(CryptoJS.enc.Utf8);
// }


app.use(express.static(path.join(__dirname, '/dist')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/dist', 'index.html'));
});

const HOST = "175.154.33.223"
const PORT = 4005;
app.listen(PORT, HOST,  () =>
  console.log(`Server berjalan di http://localhost:${PORT}`)
);
