// const BASE_URL_RESERVES = "https://xp41-soundgarden-api.herokuapp.com";
// const reservesList = document.querySelector(".reserves-list");
// const btnReservas = document.querySelector("a .btn .btn-dark");
// btnReservas.href = "./reserves.html";

// async function apiRequisitionGetEvents() {
//   const response = await fetch(`${BASE_URL_RESERVES}/events`, {
//     method: "GET",
//   });
//   const finalResponse = await response.json();

//   console.log(finalResponse);

//   async function apiRequisitionGetBookings(eventId) {
//     const response = await fetch(`${BASE_URL}/bookings/event/${eventId}`, {
//       method: "GET",
//     });
//     const finalResponse = await response.json();

//     for (reserve of finalResponse) {
//       const userReserve = document.createElement("div");
//       userReserve.classList.add("user-reserve");

//       const ownerName = document.createElement("b");
//       ownerName.textContent = "Nome do participante";
//       const ownerNameContent = document.createElement("span");
//       ownerNameContent.textContent = reserve.owner_name;

//       const ownerEmail = document.createElement("b");
//       ownerEmail.textContent = "Email do participante";
//       const ownerEmailContent = document.createElement("span");
//       ownerEmailContent.textContent = reserve.owner_email;

//       const ownerTickets = document.createElement("b");
//       ownerTickets.textContent = "Número de ingressos";
//       const ownerTicketsContent = document.createElement("span");
//       ownerTicketsContent.textContent = `${reserve.number_tickets}`;

//       userReserve.appendChild(
//         ownerName,
//         ownerNameContent,
//         ownerEmail,
//         ownerEmailContent,
//         ownerTickets,
//         ownerTicketsContent
//       );
//       reservesList.appendChild(userReserve);
//     }
//   }
//   btnReservas.addEventListener("click", function () {
//     apiRequisitionGetBookings(finalResponse._id);
//   });
// }

// // apiRequisitionGetEvents();
// // apiRequisitionGetBookings();
