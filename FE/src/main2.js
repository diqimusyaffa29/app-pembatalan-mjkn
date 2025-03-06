import "./style.css";
// import { postData } from "./batalAntrian.js";
import javascriptLogo from "./javascript.svg";
import viteLogo from "/vite.svg";
import { setupCounter } from "./counter.js";
import axios from "axios";

async function postData(bookingId) {
    try {
      const response = await axios.post("http://localhost:5000/proxy/batal", {
        bookingId,
      });
      console.log("Response:", response.data);
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  }

document.querySelector("#app").innerHTML = `
            <img
                src="/images/banner.png"
                alt="RSI Sultan Agung Banjarbaru"
                class="rounded mx-auto d-block mb-3 mt-5" />
            <div class="border shadow-sm rounded">
                <div class="p-3">
                    <p class="d-flex justify-content-around">
                        <a
                            class="btn btn-danger"
                            data-bs-toggle="collapse"
                            href="#multiCollapseExample1"
                            role="button"
                            aria-expanded="false"
                            aria-controls="multiCollapseExample1"
                            >Pembatalan Kode Booking MJKN</a
                        >
                        <button
                            class="btn btn-warning"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#multiCollapseExample2"
                            aria-expanded="false"
                            aria-controls="multiCollapseExample2">
                            Pembatalan Antrian MJKN
                        </button>
                        <button
                            class="btn btn-info"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target=".multi-collapse"
                            aria-expanded="false"
                            aria-controls="multiCollapseExample1 multiCollapseExample2">
                            Buka kedua Pembatalan
                        </button>
                    </p>
                </div>
                <div class="row px-5 pb-5">
                    <div class="col">
                        <div class="collapse multi-collapse" id="multiCollapseExample1">
                            <div class="card card-body">
                                <h2 class="text-center">Pembatalan Kode Booking MJKN</h2>
                                <form action="">
                                    <input
                                        type="text"
                                        id="bookingId"
                                        placeholder="Masukkan Kode Booking..."
                                        class="form-control my-3 py-3" />
                                    <button
                                        type="button"
                                        class="btn btn-danger"
                                        id="bookingButton">
                                        Batalkan
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="collapse multi-collapse" id="multiCollapseExample2">
                            <div class="card card-body">
                                <h2 class="text-center">Pembatalan Antrian MJKN</h2>
                                <form action="">
                                    <input
                                        type="text"
                                        id="kodeantrian"
                                        placeholder="Masukkan Kode Antrian..."
                                        class="form-control my-3 py-3" />
                                    <button
                                        type="button"
                                        class="btn btn-danger"
                                        id="kodeantrianbutton">
                                        Batalkan
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <footer class="mt-5 text-black text-center fs-5 mt-5">
                <p>
                    Copyright @2025 All Right Reserved – IT RSI Sultan Agung Banjarbaru
                </p>
            </footer>
        <!-- LZString CDN -->
        <!-- <script src="https://cdn.jsdelivr.net/npm/lz-string@1.4.4/libs/lz-string.min.js"></script> -->

        <!-- <script type="module">
            import {batalAntrianWeb} from "./batalAntrianWeb.js";
            </script> -->
            
            `;

// setupCounter(document.querySelector('#counter'))
// postData(document.querySelector('#bookingId'));
document
  .getElementById("bookingButton")
  .addEventListener("click", () =>
    postData(document.querySelector("#bookingId").value)
  );
