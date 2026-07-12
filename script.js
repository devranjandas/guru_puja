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
  { name: 'Sphruti Panchal', area: 'Tilak Nagar', slot: TIME_SLOTS[8], pandit: 'Alka Pisal' },
  { name: 'Smita Mukherjee', area: 'Chembur', slot: TIME_SLOTS[4], pandit: '' },
  { name: 'Radhika Vaswani', area: 'Chembur', slot: TIME_SLOTS[11], pandit: 'Ankita Bagade' },
  { name: 'Trupti Patil', area: 'Chembur', slot: TIME_SLOTS[12], pandit: '' },
  { name: 'Punam Jain', area: 'Anushaktinagar', slot: TIME_SLOTS[9], pandit: '' },
  { name: 'Kawaljit Kalsi', area: 'Govandi', slot: TIME_SLOTS[7], pandit: '' },
  { name: 'Manmeet Kalsi', area: 'Chembur', slot: TIME_SLOTS[4], pandit: 'Dev Ranjan Das' },
  { name: 'Geeta Bhojwani', area: 'Chembur', slot: TIME_SLOTS[12], pandit: '' },
  { name: 'Malti Rao', area: 'Chembur', slot: TIME_SLOTS[0], pandit: '' },
  { name: 'Anvi Sawant', area: 'Govandi', slot: TIME_SLOTS[7], pandit: '' },
  { name: 'Samir Kapadia', area: 'Sion', slot: TIME_SLOTS[5], pandit: 'Koshi Kothari' },
  { name: 'Anvi Sawant', area: 'Tilaknagar', slot: TIME_SLOTS[12], pandit: 'Ankita Bagade' },
  { name: 'Khushboo Neema', area: 'Chembur', slot: TIME_SLOTS[3], pandit: '' },
  { name: 'Nitin Jain', area: 'Chembur', slot: TIME_SLOTS[10], pandit: '' },
  { name: 'Aruna Deokar', area: 'Tilak Nagar', slot: TIME_SLOTS[11], pandit: '' },
  { name: 'Lata Basak', area: 'Chembur', slot: TIME_SLOTS[10], pandit: 'Dev Ranjan Das' },
  { name: 'Meenakshi Ghosh', area: 'RCF', slot: TIME_SLOTS[10], pandit: '' },
  { name: 'Punam Agaskar', area: 'Chunabhatti', slot: TIME_SLOTS[4], pandit: '' },
  { name: 'Reema Thakkar', area: 'Chembur', slot: TIME_SLOTS[7], pandit: '' },
  { name: 'Bhushan Shelar', area: 'Chunabhatti', slot: TIME_SLOTS[3], pandit: '' },
  { name: 'Vinaya V Shetty', area: 'Tilaknagar', slot: TIME_SLOTS[3], pandit: '' },
  { name: 'Madhuri Bhatia', area: 'Tilak Nagar', slot: TIME_SLOTS[4], pandit: '' },
  { name: 'Karuna Patil', area: 'Deonar', slot: TIME_SLOTS[4], pandit: 'Karuna Patil' },
  { name: 'Vijayalakshmi V', area: 'Chembur', slot: TIME_SLOTS[3], pandit: '' },
  { name: 'Preeta Sehgal', area: 'Deonar', slot: TIME_SLOTS[11], pandit: '' },
  { name: 'Lata Nair', area: 'Chembur', slot: TIME_SLOTS[11], pandit: 'Lata Nair' },
  { name: 'Pooja Rakhe', area: 'Deonar', slot: TIME_SLOTS[9], pandit: '' },
  { name: 'Alka Pisal', area: 'Kurla', slot: TIME_SLOTS[3], pandit: '' },
  { name: 'Koshi Kothari', area: 'Tilak Nagar', slot: TIME_SLOTS[10], pandit: 'Koshi Kothari' },
  { name: 'Dev Ranjan Das', area: 'Anushaktinagar', slot: TIME_SLOTS[0], pandit: 'Dev Ranjan Das' },
  { name: 'Pratima Singh', area: 'Anushaktinagar', slot: TIME_SLOTS[3], pandit: 'Pratima Singh' },
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
    if (booking.pandit) row.className = 'booking-assigned';
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
