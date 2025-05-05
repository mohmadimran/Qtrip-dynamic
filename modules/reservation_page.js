import config from "../conf/index.js";

// Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  try {
    const response = await fetch(`${config.backendEndpoint}/reservations`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error fetching reservations:", error);
    return null;
  }
}

function addReservationToTable(reservations) {
  const noReservationBanner = document.getElementById("no-reservation-banner");
  const reservationTableParent = document.getElementById("reservation-table-parent");
  const reservationTable = document.getElementById("reservation-table");


  // Conditionally render the no-reservation-banner and reservation-table-parent
  if (!reservations || reservations.length === 0) {
    noReservationBanner.style.display = "block";
    reservationTableParent.style.display = "none";
    return;
  } else {
    noReservationBanner.style.display = "none";
    reservationTableParent.style.display = "block";
  }

  // Iterating over reservations, adding them to the table
  reservations.forEach((reservation) => {
    console.log("the reservation data",reservation)
    const bookingDate = new Date(reservation.date).toLocaleDateString("en-IN");
    const bookingTime = new Date(reservation.time).toLocaleString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    }).replace(" at ", ", ");
    const link = `detail/?adventure=${reservation.adventure}`;
    const tableRow = `
      <tr>
        <td>${reservation.id}</td>
        <td>${reservation.name}</td>
        <td>${reservation.adventureName}</td>
        <td>${reservation.person}</td>
        <td>${bookingDate}</td>
        <td>${reservation.price}</td>
        <td>${bookingTime}</td>
        <td id="${reservation.id}">
      
          <a href="${link}">
            <button type="button" class="reservation-visit-button">Visit Adventure</button>
          </a>
        </td>
      </tr>
    `;
    reservationTable.innerHTML += tableRow;
  });
}

export { fetchReservations, addReservationToTable };
