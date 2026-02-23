import "./style.css";
import axios from "axios";
import Swal from 'sweetalert2';



// ======================HIT BE BATALBOOKING START======================
async function batalBooking(bookingId) {
    try {
        const response = await axios.post("http://localhost:4005/proxy/batalBooking", {
            bookingId,
        });
        // const response = await axios.post("http://175.154.33.223:4005/proxy/batalBooking", {
        //     bookingId,
        // });
        // console.log("Response:", response.data.metadata);
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
// ======================HIT BE BATALBOOKING END======================

// ======================HIT BE BATALANTRIAN START======================
async function cekTaskIdStatus(bookingId) {
    try {
        // const response = await axios.post("http://175.154.33.223:4005/proxy/batalAntrian", {
        //     bookingId,
        // });
        const response = await axios.post("http://localhost:4005/proxy/checkStatus", {
            bookingId,
        });
        // console.log("Response:", response.data.metadata);
        if (response.data.metadata.code == 200) {

            const tasks = response.data.tasks;

            let html = "<ul class='list-group'>";

            tasks.forEach(task => {
                html += `
                    <li class="list-group-item">
                        <strong>Status:</strong> ${task.taskname} <br/>
                        <strong>Task ID:</strong> ${task.taskid} <br/>
                        <strong>Waktu:</strong> ${task.wakturs}
                    </li>
                `;
            });

            html += "</ul>";

            // document.querySelector("#taskStatusResult").innerHTML = html;
            const resultDiv = document.querySelector("#taskStatusResult");
            resultDiv.innerHTML = html;

            // Set height hanya ketika sudah ada data
            resultDiv.style.maxHeight = "400px";
            resultDiv.style.overflowY = "auto";

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


// ======================HIT BE UPDATESTATUS START======================
async function updateStatus(bookingId, taskId, miliSecondsDateTime) {
    try {
        const response = await axios.post("http://localhost:4005/proxy/updateTaskId", {
            bookingId, taskId, miliSecondsDateTime
        });
        console.log("Response:", response.data.metadata);
        if (bookingId) {
            Swal.fire({
                title: "Updated!",
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
// ======================HIT BE UPDATESTATUS END======================


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
                            >Batal Kode Booking MJKN</a
                        >
                        <button
                            class="btn btn-warning"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#multiCollapseExample2"
                            aria-expanded="false"
                            aria-controls="multiCollapseExample2">
                            Status Task ID MJKN
                        </button>
                        <button
                            class="btn btn-success"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#multiCollapseExample3"
                            aria-expanded="false"
                            aria-controls="multiCollapseExample3">
                            Update Task ID MJKN
                        </button>
                    </p>
                </div>
                <div class="row px-5 pb-5">
                    <div class="col">
                        <div class="collapse multi-collapse" id="multiCollapseExample1">
                            <div class="card card-body d-flex flex-column align-items-center">
                                <h2 class="text-center">Batal Kode Booking</h2>
                                <form class="w-100">
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
                            <div class="card card-body d-flex flex-column align-items-center">
                                <h2 class="text-center">Status Task ID MJKN</h2>
                                <form action="" class="w-100">
                                    <input
                                        type="text"
                                        id="statusBookingId"
                                        placeholder="Masukkan Kode Booking..."
                                        class="form-control my-3 py-3" />
                                    <button
                                        type="button"
                                        class="btn btn-warning"
                                        id="checkStatus"
                                        >
                                        Cek Status
                                    </button>
                                    <div id="taskStatusResult" class="mt-3 mx-auto"></div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="collapse multi-collapse" id="multiCollapseExample3">
                            <div class="card card-body d-flex flex-column align-items-center">
                                <h2 class="text-center">Update Waktu Task ID MJKN</h2>
                                <form action="" class="w-100">
                                    <input
                                        type="text"
                                        id="updateTaskIdInput"
                                        placeholder="Masukkan Kode Booking..."
                                        class="form-control my-3 py-3" 
                                    />
                                    <select id="taskId" class="form-select mb-3 p-3" aria-label="Default select example">
                                        <option value="default" selected>Pilih Task ID</option>
                                        <option value="5">Task ID 5</option>
                                        <option value="6">Task ID 6</option>
                                        <option value="7">Task ID 7</option>
                                        <option value="99">Task ID 99</option>
                                    </select>
                                    <input type="datetime-local" id="updateDateTimeInput" class="mb-3 fs-5 p-2" value="2026-01-01T00:00" step="1"/><br>
                                    <button
                                        type="button"
                                        class="btn btn-success"
                                        id="updateTaskId"
                                        >
                                        Update Task ID
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



// ======================HIT CHECK STATUS MJKN START======================
function handleTaskIdChecker() {
    const bookingId = document.querySelector("#statusBookingId").value;
    console.log("🚀 ~ handleTaskIdChecker ~ bookingId:", bookingId)
    if (!bookingId) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Anda belum memasukkan kode Booking",
        });
    } else {
        Swal.fire({
            title: `NOMOR ANTRIAN ANDA ADALAH ${bookingId}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Iya Cek Status",
        }).then((result) => {
            if (result.isConfirmed) {
                console.log(`Kode Antrian adalah ${bookingId}`);
                cekTaskIdStatus(bookingId);
                document.querySelector("#bookingId").value = ""; // Clear the input
            }
        });
    }
}

// Attach the function to the button's click event
document.getElementById("checkStatus").addEventListener("click", handleTaskIdChecker);

// Attach the function to the input's keypress event (for Enter key)
document.querySelector("#statusBookingId").addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        document.getElementById("checkStatus").click();
    }
});
// ======================HIT CHECK STATUS MJKN END======================


// ======================HIT UPDATE STATUS MJKN START======================
function handleUpdateStatusTaskId() {
    const bookingId = document.querySelector("#updateTaskIdInput").value;
    const taskId = document.querySelector("#taskId").value;
    const dateTime = document.querySelector("#updateDateTimeInput").value;
    const miliSecondsDateTime = new Date(dateTime).getTime()
    if (!bookingId) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Anda belum memasukkan kode Booking",
        });
    } else {
        Swal.fire({
            title: `KODE BOOKING ANDA ADALAH ${bookingId}`,
            text: "Anda tidak akan bisa mengulang kembali?!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Iya, Update",
        }).then((result) => {
            if (result.isConfirmed) {
                console.log(`Kode Booking adalah ${bookingId}, nomor task id yang digunakan ${taskId}, pada waktu ${miliSecondsDateTime}`);
                updateStatus(bookingId, taskId, miliSecondsDateTime);
                document.querySelector("#updateTaskIdInput").value = ""; // Clear the input
                document.querySelector("#taskId").value = "default"; // Clear the input
            }
        });
    }
}

// Attach the function to the button's click event
document.getElementById("updateTaskId").addEventListener("click", handleUpdateStatusTaskId);

// Attach the function to the input's keypress event (for Enter key)
document.querySelector("#updateTaskIdInput").addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        document.getElementById("updateTaskId").click();
    }
});
// ======================HIT UPDATE STATUS MJKN END======================





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