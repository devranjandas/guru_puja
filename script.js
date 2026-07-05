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

function renderDevoteeSlotOptions() {
  const select = document.getElementById('devotee-slot');
  TIME_SLOTS.forEach((slot) => {
    const option = document.createElement('option');
    option.value = slot;
    option.textContent = slot;
    select.appendChild(option);
  });
}

function renderPanditSlotGrid() {
  const grid = document.getElementById('pandit-slot-grid');
  const countLabel = document.getElementById('slots-selected-count');
  const MAX_SLOTS = 3;

  TIME_SLOTS.forEach((slot, index) => {
    const wrapper = document.createElement('label');
    wrapper.className = 'slot-option';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.name = 'preferred_slots';
    checkbox.value = slot;
    checkbox.id = `pandit-slot-${index}`;

    const span = document.createElement('span');
    span.textContent = slot;

    wrapper.appendChild(checkbox);
    wrapper.appendChild(span);
    grid.appendChild(wrapper);
  });

  grid.addEventListener('change', () => {
    const checkboxes = grid.querySelectorAll('input[type="checkbox"]');
    const checked = grid.querySelectorAll('input[type="checkbox"]:checked');
    countLabel.textContent = checked.length;

    checkboxes.forEach((box) => {
      box.disabled = !box.checked && checked.length >= MAX_SLOTS;
    });
  });
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

renderDevoteeSlotOptions();
renderPanditSlotGrid();
renderCounter();
renderBookingsTable();
