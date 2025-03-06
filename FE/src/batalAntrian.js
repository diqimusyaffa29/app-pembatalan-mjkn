// PASIEN SUDAH CHECK IN & LEWAT HARI ANTRIAN BELUM ADA
// import { createHmac, createDecipheriv, createHash } from "crypto";
// import fetch from "node-fetch";
// import LZString from "lz-string";
// import fetch from "node-fetch";
// import  fetch  from 'node-fetch';
import CryptoJS from "crypto-js";
import { LZString } from "lz-string";
import axios from "axios";

// const bookingId = "250205HR9Y89"; // diisi nomor booking yang akan dibatalkan

async function postData(bookingId) {
  console.log("🚀 ~ postData ~ bookingId:", bookingId);
  const consid = "30083";
  const password = "0jWEBC4A21";
  const timestamp = Math.floor(Date.now() / 1000);
  const dataSignature = consid + "&" + timestamp;

  // let dataSignatureHash = createHmac("sha256", password)
  //     .update(dataSignature)
  //     .digest();

  // const signature = new Buffer.from(dataSignatureHash).toString("base64");

  // Use crypto-js for HMAC-SHA256
  const dataSignatureHash = CryptoJS.HmacSHA256(dataSignature, password);
  const signature = CryptoJS.enc.Base64.stringify(dataSignatureHash);

  const passphrase = consid + password + timestamp;

  const url = "https://apijkn.bpjs-kesehatan.go.id/antreanrs/antrean/batal";

  // let valueRequest = {
  //     method: "POST",
  //     headers: {
  //         "Content-type": "application/json;charset=UTF-8",
  //         "X-cons-id": consid,
  //         "X-Timestamp": timestamp,
  //         "X-Signature": signature,
  //         User_Key: "63e8b4496f7c6d94ecb570179aea3cf0",
  //     },
  //     body: JSON.stringify({
  //         kodebooking: bookingId,
  //         keterangan: "Batal",
  //     }),
  // };

  try {
    const response = await axios.post(
      url,
      {
        kodebooking: bookingId,
        keterangan: "Batal",
      },
      {
        headers: {
          "Content-type": "application/json;charset=UTF-8",
          "X-cons-id": consid,
          "X-Timestamp": timestamp,
          "X-Signature": signature,
          User_Key: "63e8b4496f7c6d94ecb570179aea3cf0",
        },
      }
    );
    console.log("Response:", response.data);
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
  }

  // let response = await fetch(url, valueRequest);
  let json = await response.json();
  console.log("Response :" + JSON.stringify(json));

  let jsonObj = JSON.parse(JSON.stringify(json));

  //   const txtenctypted = jsonObj.response;

  //   let txtdecrypted = decrypt(txtenctypted, passphrase);

  //   let txtDecompressed =
  //     LZString.decompressFromEncodedURIComponent(txtdecrypted);
  //   console.log("==============================");
  //   console.log("Decrypted Response : " + txtDecompressed);
}

function decrypt(encrypted, passphrase) {
  let key = createHash("sha256").update(passphrase).digest();
  let iv = key.slice(0, 16);

  let decipher = createDecipheriv(
    "aes-256-cbc",
    Buffer.from(key, "base64"),
    Buffer.from(iv, "base64")
  );
  let decrypted = decipher.update(Buffer.from(encrypted, "base64"));
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString("utf8");
}

export { postData };
