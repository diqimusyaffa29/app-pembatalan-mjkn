const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors()); // Mengizinkan semua origin (bisa diatur lebih spesifik)

// Endpoint proxy
app.post("/proxy/batal", async (req, res) => {
  try {
    const { bookingId } = req.body;
    console.log("🚀 ~ app.post ~ bookingId:", bookingId);
    const consid = "30083";
    const password = "0jWEBC4A21";
    const timestamp = Math.floor(Date.now() / 1000);
    const dataSignature = consid + "&" + timestamp;

    const CryptoJS = require("crypto-js");
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

    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message });
  }
});

const PORT = 5000;
app.listen(PORT, () =>
  console.log(`Server berjalan di http://localhost:${PORT}`)
);
