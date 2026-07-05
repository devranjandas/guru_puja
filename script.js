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

// ---- Placeholder bookings data ----
// Admins: add one object per confirmed booking. The live counter above
// and the table below are both generated from this single array.
const TARGET_COUNT = 108;

const bookings = [
  {
    name: 'Placeholder Devotee 1',
    address: 'Placeholder Address, Chembur',
    mobile: '9XXXXXXXXX',
    slot: TIME_SLOTS[0],
    pandit: 'Placeholder Pandit Name'
  },
  {
    name: 'Placeholder Devotee 2',
    address: 'Placeholder Address, Chembur',
    mobile: '9XXXXXXXXX',
    slot: TIME_SLOTS[5],
    pandit: 'Placeholder Pandit Name'
  },
  {
    name: 'Placeholder Devotee 3',
    address: 'Placeholder Address, Chembur',
    mobile: '9XXXXXXXXX',
    slot: TIME_SLOTS[10],
    pandit: 'Placeholder Pandit Name'
  }
];

function renderCounter() {
  document.getElementById('counter-current').textContent = bookings.length;
  document.getElementById('counter-target').textContent = TARGET_COUNT;
}

function renderBookingsTable() {
  const tbody = document.getElementById('bookings-table-body');
  bookings.forEach((booking) => {
    const row = document.createElement('tr');
    [booking.name, booking.address, booking.mobile, booking.slot, booking.pandit].forEach((value) => {
      const cell = document.createElement('td');
      cell.textContent = value;
      row.appendChild(cell);
    });
    tbody.appendChild(row);
  });
}

renderCounter();
renderBookingsTable();
