import "./style.css";
// import { postData } from "./batalAntrian.js";
import javascriptLogo from "./javascript.svg";
import viteLogo from "/vite.svg";
import { setupCounter } from "./counter.js";
import axios from "axios";
import Swal from 'sweetalert2';
import LZString from "lz-string"


// ======================HIT BE BATALBOOKING START======================
async function batalBooking(bookingId) {
    try {
        const response = await axios.post("http://localhost:5000/proxy/batalBooking", {
            bookingId,
        });
        console.log("Response:", response.data.metadata);
        if (response.data.metadata.code == 200) {
            Swal.fire({
                title: "Deleted!",
                text: response.data.metadata.message,
                icon: "success",
            });
        } else {
            console.log(response);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: response.data.metadata.message,
            });
        }
    } catch (error) {
        console.error(
            "Error:",
            error.response ? error.response.data : error.message
        );
    }
}
// ======================HIT BE BATALBOOKING END======================

// ======================HIT BE BATALANTRIAN START======================
async function batalAntrian(queueId) {
    try {
        const response = await axios.post("http://localhost:5000/proxy/batalAntrian", {
            queueId,
        });
        console.log("Response:", response.data.metadata);
        if (response.data.metadata.code == 200) {
            Swal.fire({
                title: "Deleted!",
                text: response.data.metadata.message,
                icon: "success",
            });
        } else {
            // console.log(response);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: response.data.metadata.message,
            });
        }
    } catch (error) {
        console.error(
            "Error:",
            error.response ? error.response.data : error.message
        );
    }
}
// ======================HIT BE BATALANTRIAN END======================

// ======================FORM START======================
document.querySelector("#app").innerHTML = `
            <img
                src="/images/banner.png"
                alt="RSI Sultan Agung Banjarbaru"
                class="rounded mx-auto d-block mb-3 mt-4" />
            <div class="border shadow-sm rounded">
                <div class="pt-3">
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
                                        class="form-control my-3 py-3"/>
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
                                        id="queueId"
                                        placeholder="Masukkan Kode Antrian..."
                                        class="form-control my-3 py-3" />
                                    <button
                                        type="button"
                                        class="btn btn-danger"
                                        id="queueButton"
                                        
                                        >
                                        Batalkan
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- LZString CDN -->
        <!-- <script src="https://cdn.jsdelivr.net/npm/lz-string@1.4.4/libs/lz-string.min.js"></script> -->

        <!-- <script type="module">
            import {batalAntrianWeb} from "./batalAntrianWeb.js";
            import { SweetAlert } from './../node_modules/sweetalert2/src/SweetAlert';
        </script>

            
            `;
// ======================FORM END======================


// ======================HIT BATAL BOOKING START======================
function handleBooking() {
    const bookingId = document.querySelector("#bookingId").value;
    if (!bookingId) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Anda belum memasukkan kode Booking",
        });

    } else {
        Swal.fire({
            title: `NOMOR BOOKING ANDA ADALAH ${bookingId}`,
            text: "Anda tidak akan bisa mengulang kembali?!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Iya, batalkan",
        }).then((result) => {
            if (result.isConfirmed) {
                console.log(`Kode Bookingnya adalah ${bookingId}`);
                batalBooking(bookingId);
                document.querySelector("#bookingId").value = ""; // Clear the input
            }
        });
    }
}

// Attach the function to the button's click event
document.getElementById("bookingButton").addEventListener("click", handleBooking);

// Attach the function to the input's keypress event (for Enter key)
document.querySelector("#bookingId").addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        document.getElementById("bookingButton").click();
    }
});
// ======================HIT BATAL BOOKING END======================



// ======================HIT BATAL ANTRIAN START======================
function handleQueue() {
    const queueId = document.querySelector("#queueId").value;
    if (!queueId) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Anda belum memasukkan kode Booking",
        });
    } else {
        Swal.fire({
            title: `NOMOR ANTRIAN ANDA ADALAH ${queueId}`,
            text: "Anda tidak akan bisa mengulang kembali?!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Iya, batalkan",
        }).then((result) => {
            if (result.isConfirmed) {
                console.log(`Kode Antrian adalah ${queueId}`);
                batalAntrian(queueId);
                document.querySelector("#queueId").value = ""; // Clear the input
            }
        });
    }
}

// Attach the function to the button's click event
document.getElementById("queueButton").addEventListener("click", handleQueue);

// Attach the function to the input's keypress event (for Enter key)
document.querySelector("#queueId").addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        document.getElementById("queueButton").click();
    }
});
// ======================HIT BATAL BOOKING END======================





// setupCounter(document.querySelector('#counter'))
// document
//     .getElementById("bookingButton")
//     .addEventListener("click", () =>
//     // postData(document.querySelector("#bookingId").value)
//     {
//         if (!document.querySelector("#bookingId").value) {
//             Swal.fire({
//                 icon: "error",
//                 title: "Oops...",
//                 text: "Anda belum memasukkan kode Booking",
//             });
//         } else {
//             Swal.fire({
//                 title: "NOMOR BOOKING ANDA ADALAH " + " " + document.querySelector("#bookingId").value,
//                 text: "Anda tidak akan bisa mengulang kembali?!",
//                 icon: "warning",
//                 showCancelButton: true,
//                 confirmButtonColor: "#3085d6",
//                 cancelButtonColor: "#d33",
//                 confirmButtonText: "Iya, batalkan"
//             }).then((result) => {
//                 if (result.isConfirmed) {
//                     console.log("Kode Bookingnya adalah" + " " + document.querySelector("#bookingId").value)
//                     Swal.fire({
//                         title: "Deleted!",
//                         text: "Your file has been deleted.",
//                         icon: "success"
//                     });
//                     document.querySelector("#bookingId").value = ""
//                 }
//             });
//         }
//     }
//     );  