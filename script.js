// ---- Time slots: hourly, 7:00 AM to 10:00 PM ----
function formatHour(hour24) {
  const period = hour24 < 12 || hour24 === 24 ? 'AM' : 'PM';
  let hour12 = hour24 % 12;
  if (hour12 === 0) hour12 = 12;
  return `${hour12}:00 ${period}`;
}

const TIME_SLOTS = [];
for (let hour = 7; hour < 22; hour++) {
  TIME_SLOTS.push(`${formatHour(hour)} – ${formatHour(hour + 1)}`);
}

// ---- Confirmed bookings data ----
// Add one object per confirmed booking. The live counter above and the
// table below are both generated from this single array (counter = length).
//
// Shape: { name, area, slot, pandit }
//   - Only NON-SENSITIVE fields are stored here. This repo is public, so
//     full home addresses and mobile numbers must NEVER be put in this file
//     — keep those in the private Google Sheet only. Use just the locality
//     for `area`.
//   - Leave `pandit: ''` until a Guru Puja Pandit is assigned; it then shows
//     as "To be assigned".
const TARGET_COUNT = 108;

const bookings = [
  // { name: 'Devotee Name', area: 'Chembur', slot: TIME_SLOTS[0], pandit: '' },
  { name: 'Sphruti Panchal', area: 'Tilak Nagar', slot: TIME_SLOTS[8], pandit: '' },
  { name: 'Smita Mukherjee', area: 'Chembur', slot: TIME_SLOTS[4], pandit: '' },
];

function renderCounter() {
  document.getElementById('counter-current').textContent = bookings.length;
  document.getElementById('counter-target').textContent = TARGET_COUNT;
}

function renderBookingsTable() {
  const tbody = document.getElementById('bookings-table-body');

  if (bookings.length === 0) {
    const row = document.createElement('tr');
    const cell = document.createElement('td');
    cell.colSpan = 4;
    cell.className = 'bookings-empty';
    cell.textContent = 'No Guru Pujas confirmed yet — check back soon.';
    row.appendChild(cell);
    tbody.appendChild(row);
    return;
  }

  bookings.forEach((booking) => {
    const row = document.createElement('tr');
    [booking.name, booking.area, booking.slot, booking.pandit || 'To be assigned'].forEach((value) => {
      const cell = document.createElement('td');
      cell.textContent = value;
      row.appendChild(cell);
    });
    tbody.appendChild(row);
  });
}

renderCounter();
renderBookingsTable();
