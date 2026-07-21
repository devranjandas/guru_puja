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
// One object per confirmed booking. The live counter above and the table
// below are both generated from this single array (counter = length).
//
// Shape: { name, area, slot, pandit }
//   - Only NON-SENSITIVE fields are stored here. This repo is public, so
//     full home addresses and mobile numbers must NEVER be put in this file
//     — keep those in the private Google Sheet only. Use just the locality
//     for `area` (blank if unknown).
//   - `slot` is a plain label string; `pandit` empty shows "To be assigned".
const TARGET_COUNT = 108;

const bookings = [
  { name: 'Smita Mukherjee', area: 'Chembur', slot: '11:00 AM – 12:00 PM', pandit: 'J P Nair' },
  { name: 'Radhika Vijay Vaswani', area: 'Chembur', slot: '6:00 PM – 7:00 PM', pandit: 'Ankita Bagade' },
  { name: 'Trupti Patil', area: 'Chembur', slot: '7:00 PM – 8:00 PM', pandit: 'Jyoti Serai' },
  { name: 'Punam Jain', area: 'Anushaktinagar', slot: '4:00 PM – 5:00 PM', pandit: 'Pratima Singh' },
  { name: 'Kawaljit Kalsi', area: 'Govandi', slot: '2:00 PM – 3:00 PM', pandit: 'Vijayalakshmi Chellam' },
  { name: 'Manmeet Kalsi', area: 'Chembur', slot: '11:00 AM – 12:00 PM', pandit: 'N.C.Asha' },
  { name: 'Geeta Bhojwani', area: 'Chembur', slot: '7:00 PM – 8:00 PM', pandit: 'Geeta Naganure' },
  { name: 'Malathi Rao', area: 'Chembur', slot: '7:00 AM – 8:00 AM', pandit: 'Malti Rao' },
  { name: 'Anvi Sawant', area: 'Govandi', slot: '2:00 PM – 3:00 PM', pandit: 'Vijayalakshmi Chellam' },
  { name: 'Samir Kapadia', area: 'Sion', slot: '12:00 PM – 1:00 PM', pandit: 'Koshi G Kothari' },
  { name: 'Anvi Sawant', area: 'Tilaknagar', slot: '7:00 PM – 8:00 PM', pandit: 'Alka Pisal' },
  { name: 'Khushboo Neema', area: 'Chembur', slot: '10:00 AM – 11:00 AM', pandit: 'Seema Wadhwa' },
  { name: 'Nitin Jain', area: 'Chembur', slot: '5:00 PM – 6:00 PM', pandit: 'Jayalakshmi Chandle' },
  { name: 'Aruna deokar', area: 'Tilak Nagar', slot: '6:00 PM – 7:00 PM', pandit: 'Alka Pisal' },
  { name: 'Lata Basak', area: 'Chembur', slot: '5:00 PM – 6:00 PM', pandit: 'Sadashiv Naganure' },
  { name: 'Punam Agaskar', area: 'Chunabhatti', slot: '11:00 AM – 12:00 PM', pandit: 'Koshi G Kothari' },
  { name: 'Reema Thakkar', area: 'Chembur', slot: '10:00 AM – 11:00 AM', pandit: 'Ankita Bagade' },
  { name: 'Bhushan Shelar', area: 'Chunabhatti', slot: '10:00 AM – 11:00 AM', pandit: 'Vidya Murali' },
  { name: 'Vinaya V Shetty', area: 'Tilaknagar', slot: '10:00 AM – 11:00 AM', pandit: 'Vinaya Shetty' },
  { name: 'Madhuri Bhatia', area: 'Tilak Nagar', slot: '12:30 PM – 1:00 PM', pandit: 'Madhuri Bhatia' },
  { name: 'Karuna Patil', area: 'Deonar', slot: '11:00 AM – 12:00 PM', pandit: 'Karuna Patil' },
  { name: 'Vijayalakshmi V', area: 'Chembur', slot: '10:00 AM – 11:00 AM', pandit: 'Vijayalakshmi Chellam' },
  { name: 'Preeta Sehgal', area: 'Deonar', slot: '10:00 AM – 11:00 AM', pandit: 'Preeta Sehgal' },
  { name: 'Lata Nair', area: 'Chembur', slot: '6:00 PM – 7:00 PM', pandit: 'Lata Nair' },
  { name: 'Pooja Pushkar Rakhe', area: 'Deonar', slot: '4:00 PM – 5:00 PM', pandit: 'Dev Ranjan Das' },
  { name: 'Alka Pisal', area: 'Kurla', slot: '10:00 AM – 11:00 AM', pandit: 'Alka Pisal' },
  { name: 'Koshi G Kothari', area: 'Tilak Nagar', slot: '5:00 PM – 6:00 PM', pandit: 'Koshi G Kothari' },
  { name: 'Dev Ranjan Das', area: 'Anushaktinagar', slot: '7:00 AM – 8:00 AM', pandit: 'Dev Ranjan Das' },
  { name: 'Pratima Singh', area: 'Anushaktinagar', slot: '10:00 AM – 11:00 AM', pandit: 'Pratima Singh' },
  { name: 'Bela Mehra', area: 'Chheda Nagar', slot: '6:00 PM – 7:00 PM', pandit: 'Suravi bihani' },
  { name: 'MEENAMBIKA K', area: 'Tilak Nagar', slot: '6:00 PM – 7:00 PM', pandit: 'Ambika Krishnamurthy' },
  { name: 'Vidya murali', area: 'Chembur', slot: '9:00 AM – 10:00 AM', pandit: 'Vidya Murali' },
  { name: 'MR Raghunathan', area: 'Chunnabhatti', slot: '3:00 PM – 4:00 PM', pandit: 'Vidya Murali' },
  { name: 'RAJAM RAJAGOPALAN', area: 'Sion', slot: '7:00 AM – 8:00 AM', pandit: 'Rajam Aunty' },
  { name: 'Shanthi', area: 'Shell Colony', slot: '6:00 PM – 7:00 PM', pandit: 'Shanthi Narayan' },
  { name: 'Mahadev N. Mandavkar', area: 'Tilak Nagar', slot: '5:00 PM – 6:00 PM', pandit: 'Alka Pisal' },
  { name: 'Sunanda Shanbhag', area: 'Chunabhatti', slot: '1:00 PM – 2:00 PM', pandit: 'Koshi G Kothari' },
  { name: 'Khushbu Manek', area: 'Chembur', slot: '4:00 PM – 5:00 PM', pandit: 'Vaishali Gonarkar' },
  { name: 'Deepa rajesh gala', area: 'Chembur', slot: '11:00 AM – 12:00 PM', pandit: 'Anchal Gupta' },
  { name: 'Chachra Bhavna', area: 'Chunabhatti', slot: '1:00 PM – 2:00 PM', pandit: 'Koshi G Kothari' },
  { name: 'Ninad Bhonsle', area: 'Chembur', slot: '11:00 AM – 12:00 PM', pandit: 'Rani Nayyar' },
  { name: 'Charu Sharma', area: 'HPCL Colony', slot: '5:00 PM – 6:00 PM', pandit: 'Jayalakshmi Chandle' },
  { name: 'Geeta Naganure', area: 'Chembur', slot: '3:00 PM – 4:00 PM', pandit: 'Geeta Naganure' },
  { name: 'Pragati Bhardwaj', area: 'Chembur', slot: '9:00 AM – 10:00 AM', pandit: 'Ankita Bagade' },
  { name: 'Shweta Ajwani', area: 'Chembur', slot: '12:00 PM – 1:00 PM', pandit: 'Shanti Subramanium' },
  { name: 'Satish Kumar', area: 'Chembur', slot: '11:00 AM – 12:00 PM', pandit: 'Shanti Subramanium' },
  { name: 'Kamini', area: 'Chembur', slot: '12:00 PM – 1:00 PM', pandit: 'Shanti Subramanium' },
  { name: 'Lajpat Tawermalani', area: 'Chembur', slot: '5:00 PM – 6:00 PM', pandit: 'Mahi Hiranandani' },
  { name: 'Meghna Chanbria', area: 'Chembur', slot: '6:00 PM – 7:00 PM', pandit: 'Mahi Hiranandani' },
  { name: 'T Vijaylakshmi', area: 'Tilaknagar', slot: '11:00 AM – 12:00 PM', pandit: 'Malti Rao' },
  { name: 'Surekha Shetty', area: 'Tilak Nagar', slot: '10:00 AM – 11:00 AM', pandit: 'Surekha Shetty' },
  { name: 'Renu', area: 'Chembur', slot: '4:00 PM – 5:00 PM', pandit: 'Renu Deva' },
  { name: 'Smita Havnur', area: 'Chembur', slot: '7:00 PM – 8:00 PM', pandit: 'Pooja Chaurasia' },
  { name: 'Smita Gupta', area: 'Shell Colony', slot: '10:00 AM – 11:00 AM', pandit: 'Rani Nayyar' },
  { name: 'Kiran R', area: 'Chembur', slot: '12:00 PM – 1:00 PM', pandit: 'Renu Deva' },
  { name: 'Sulakshana Vijay Mulik', area: 'Tilaknagar', slot: '7:00 PM – 8:00 PM', pandit: 'Koshi G Kothari' },
  { name: 'Ankit Hundia', area: 'Chunnabhatti', slot: '7:00 PM – 8:00 PM', pandit: 'Sadashiv Naganure' },
  { name: 'J P Nair', area: 'Anushaktinagar', slot: '8:00 AM – 9:00 AM', pandit: 'J P Nair' },
  { name: 'Radhika Ravishekhar', area: 'Chembur', slot: '5:00 PM – 6:00 PM', pandit: 'Kavita Kejriwal' },
  { name: 'Radhika Chandle', area: 'RCF Colony', slot: '10:00 AM – 11:00 AM', pandit: 'Jayalakshmi Chandle' },
  { name: 'Ritu Kolte', area: 'IOCL Colony', slot: '12:00 PM – 1:00 PM', pandit: 'Madhuri Bhatia' },
  { name: 'Manju Singhal', area: 'Chembur', slot: '11:00 AM – 12:00 PM', pandit: 'Jayalakshmi Chandle' },
  { name: 'Sheetal Ramkrishnani', area: 'Chembur', slot: '5:00 PM – 6:00 PM', pandit: 'Mahi Hiranandani' },
  { name: 'Ankita Bagade', area: 'Shell Colony', slot: '7:00 AM – 8:00 AM', pandit: 'Ankita Bagade' },
  { name: 'Pushpaji', area: 'Chembur', slot: '6:00 PM – 7:00 PM', pandit: 'Geeta Naganure' },
  { name: 'Aparna Pasalwar', area: 'Chembur', slot: '5:00 PM – 6:00 PM', pandit: 'Geeta Naganure' },
  { name: 'Kavita pille', area: 'Chembur', slot: '4:00 PM – 5:00 PM', pandit: 'Geeta Naganure' },
  { name: 'Vaidehi kadu', area: 'Chembur', slot: '8:00 PM – 9:00 PM', pandit: 'Sadashiv Naganure' },
  { name: 'Suveni srikanta', area: 'Chheda Nagar', slot: '4:00 PM – 5:00 PM', pandit: 'Suravi bihani' },
  { name: 'Chanchal Bhatia', area: 'Chembur', slot: '12:00 PM – 1:00 PM', pandit: 'Ankita Bagade' },
  { name: 'Madhava Rao Murari', area: 'Chembur', slot: '6:00 PM – 7:00 PM', pandit: 'Sadashiv Naganure' },
  { name: 'Shweta Iyer', area: 'Chembur', slot: '6:00 PM – 7:00 PM', pandit: 'Dev Ranjan Das' },
  { name: 'Anju Bareja', area: 'Chembur', slot: '5:00 PM – 6:00 PM', pandit: 'Seema Wadhwa' },
  { name: 'Devraj Lalla', area: 'Tilak Nagar', slot: '4:00 PM – 5:00 PM', pandit: 'Madhuri Bhatia' },
  { name: 'Madhavi Rajput', area: 'Govandi', slot: '10:00 AM – 11:00 AM', pandit: 'Karuna Patil' },
  { name: 'Haresh Hiranandani', area: 'Chembur', slot: '10:00 AM – 11:00 AM', pandit: 'Mahi Hiranandani' },
  { name: 'Seema wadhwa', area: 'Chembur', slot: '1:00 PM – 2:00 PM', pandit: 'Seema Wadhwa' },
  { name: 'Rashmi vidya', area: 'Chembur', slot: '10:00 AM – 11:00 AM', pandit: 'Anchal Gupta' },
  { name: 'Roshni Khanna', area: 'Chembur', slot: '8:00 PM – 9:00 PM', pandit: 'Mahi Hiranandani' },
  { name: 'Meeta Gangwani', area: 'Chembur', slot: '10:00 AM – 11:00 AM', pandit: 'Meeta' },
  { name: 'vaishali Padarkar', area: 'Chembur', slot: '10:00 AM – 11:00 AM', pandit: 'Meeta' },
  { name: 'Vasihali Gonarkar', area: 'Mumbai', slot: '4:00 PM – 5:00 PM', pandit: 'Vaishali Gonarkar' },
  { name: 'Rajeev Narang', area: 'Chembur', slot: '4:30 PM – 5:30 PM', pandit: 'Vaishali Gonarkar' },
  { name: 'Mr G Singh', area: 'Chembur', slot: '10:00 AM – 11:00 AM', pandit: 'Dr. Rajni Singh' },
  { name: 'Jyoti Gupta', area: 'Deonar', slot: '4:00 PM – 5:00 PM', pandit: 'Dev Ranjan Das' },
  { name: 'Saumitra trivedi', area: 'Anushaktinagar', slot: '10:00 AM – 11:00 AM', pandit: 'Saumitra trivedi' },
  { name: 'shweta Tharani', area: 'Anushaktinagar', slot: '4:00 PM – 5:00 PM', pandit: 'Saumitra trivedi' },
  { name: 'Manoj Punjabi', area: 'Deonar', slot: '9:30 AM – 10:30 AM', pandit: 'sandip indap' },
  { name: 'Dimple Parmar', area: 'Chembur', slot: '11:00 AM – 12:00 PM', pandit: 'Renu Deva' },
  { name: 'Amit Singh', area: 'Shell Colony', slot: '12:00 PM – 1:00 PM', pandit: 'Dr. Rajni Singh' },
  { name: 'NIvedita', area: 'Shell Colony', slot: '11:00 AM – 12:00 PM', pandit: 'Dr. Rajni Singh' },
  { name: 'Pooja Chaurasia', area: 'Chembur', slot: '7:00 AM – 8:00 AM', pandit: 'Pooja Chaurasia' },
  { name: 'Jyoti Patil', area: 'Chembur', slot: '5:00 PM – 6:00 PM', pandit: 'Kavita Kejriwal' },
  { name: 'Jairam Athreya', area: 'Govandi', slot: '9:45 AM – 10:30 AM', pandit: 'J P Nair' },
  { name: 'Sanjay Talreja', area: 'Chembur', slot: '10:00 AM – 11:00 AM', pandit: 'sandip indap' },
  { name: 'Jitendra Bane', area: 'Chembur', slot: '11:00 AM – 12:00 PM', pandit: 'Seema Wadhwa' },
  { name: 'Anita Dayal', area: 'Govandi', slot: '4:00 PM – 5:00 PM', pandit: 'Nilay Jasu' },
  { name: 'Ritu Lokhandwala', area: 'Dubai', slot: '10:00 AM – 11:00 AM', pandit: 'Ritu Lokhandwala' },
  { name: 'Mala Bhojwani', area: 'Delhi', slot: '10:00 AM – 11:00 AM', pandit: 'Mala Bhojwani' },
  { name: 'Sonia Bhojwani', area: 'Delhi', slot: '10:00 AM – 11:00 AM', pandit: 'Sonia Bhojwani' },
  { name: 'Surekha Shetty 2', area: 'Tilaknagar', slot: '10:00 AM – 11:00 AM', pandit: 'Surekha Shetty' },
  { name: 'Followup - Shishode garden', area: 'Chembur', slot: '7:00 AM – 8:00 AM', pandit: 'sandip indap' },
  { name: 'Sandip Indap', area: 'Mulund', slot: '', pandit: 'sandip indap' },
  { name: 'Radha', area: 'Chembur', slot: '2:30 PM – 3:30 PM', pandit: 'Vijayalakshmi Chellam' },
  { name: 'South Mumbai 1', area: 'SOBO', slot: '10:00 AM – 11:00 AM', pandit: 'Radhika Kopikar' },
  { name: 'South Mumbai 2', area: 'SOBO', slot: '10:00 AM – 11:00 AM', pandit: 'Radhika Kopikar' },
  { name: 'South Mumbai 3', area: 'SOBO', slot: '10:00 AM – 11:00 AM', pandit: 'Radhika Kopikar' },
  { name: 'South Mumbai 4', area: 'SOBO', slot: '10:00 AM – 11:00 AM', pandit: 'Radhika Kopikar' },
  { name: 'South Mumbai 5', area: 'SOBO', slot: '10:00 AM – 11:00 AM', pandit: 'Radhika Kopikar' },
  { name: 'Chaitali', area: 'Chembur', slot: '10:00 AM – 11:00 AM', pandit: 'Shanthi Narayan' },
  { name: 'sambhaji Shop', area: 'Deonar', slot: '10:00 AM – 11:00 AM', pandit: 'Preeta Sehgal' },
  { name: 'Sambhaji House', area: 'Deonar', slot: '10:00 AM – 11:00 AM', pandit: 'Preeta Sehgal' },
  { name: 'Nilay Jasu', area: 'Anushaktinagar', slot: '', pandit: 'Nilay Jasu' },
  { name: 'Devendra Keny', area: 'Sion', slot: '', pandit: 'Devendra Keny' },
  { name: 'Shanti Subramanuim', area: 'Chembur', slot: '', pandit: 'Shanti Subramanium' },
  { name: 'Jairaj Mothers', area: 'Chembur', slot: '', pandit: 'Seema Wadhwa' },
  { name: 'Pranjali Kulkarni', area: 'RCF Colony', slot: '4:00 PM – 5:00 PM', pandit: 'Radhika Chandle' },
  { name: 'Savitri Raman', area: 'Marol', slot: '', pandit: 'Savitri Raman' },
  { name: 'Asha Mitra', area: 'Marol', slot: '', pandit: 'Asha Mitra' },
  { name: 'Poornima', area: 'Marol', slot: '', pandit: 'Poornima' },
  { name: 'Saroja Venkatraman', area: '', slot: '', pandit: 'Saroja Venkatraman' },
  { name: 'Lalita Narayanan', area: '', slot: '', pandit: 'Lalita Narayanan' },
  { name: 'Kavita Kejriwal', area: '', slot: '', pandit: 'Kavita Kejriwal' },
  { name: 'Shubha Gopal', area: '', slot: '', pandit: 'Shubha Gopal' },
  { name: 'Hemali Bhatia', area: 'Mulund', slot: '', pandit: 'Himali Bhatia' },
  { name: 'Uma Iyer', area: '', slot: '', pandit: 'Uma Iyer' },
];

function uniquePandits() {
  return [...new Set(bookings.map((b) => b.pandit).filter(Boolean))];
}

function renderCounter() {
  document.getElementById('counter-current').textContent = bookings.length;
  document.getElementById('pandit-count').textContent = uniquePandits().length;
}

function renderPanditNames() {
  const el = document.getElementById('pandit-names');
  if (!el) return;
  const names = uniquePandits().sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
  el.textContent = names.join('  ·  ');
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
renderPanditNames();
