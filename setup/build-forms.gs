/**
 * 108 Guru Pujas — Chembur  |  Google Forms builder
 * ---------------------------------------------------
 * Run this ONCE to create both interest forms (Devotee + Pandit) and a single
 * Google Sheet that collects the responses from both.
 *
 * HOW TO RUN
 *   1. Go to https://script.google.com and click "New project".
 *   2. Delete whatever is in the editor, paste this whole file in.
 *   3. Click Save (disk icon), then pick "buildGuruPujaForms" in the function
 *      dropdown at the top and click Run.
 *   4. The first run asks you to Authorize — allow it (it's your own account
 *      creating your own forms/sheet).
 *   5. Open View → Logs (or the Execution log). It prints the two EMBED URLs,
 *      the two editor URLs, and the responses spreadsheet URL.
 *   6. Send me the two EMBED URLs and I'll wire them into the landing page.
 *
 * Re-running creates a fresh set of forms/sheet each time, so only run it once.
 */

function buildGuruPujaForms() {
  // 15 one-hour slots, 7:00 AM–8:00 AM … 9:00 PM–10:00 PM (mirrors script.js)
  var TIME_SLOTS = [];
  for (var hour = 7; hour < 22; hour++) {
    TIME_SLOTS.push(formatHour_(hour) + ' – ' + formatHour_(hour + 1));
  }

  // One spreadsheet collects responses from both forms (each form adds its own tab).
  var ss = SpreadsheetApp.create('108 Guru Pujas — Responses');
  var ssId = ss.getId();

  // ---- Devotee Interest Form ----
  var devotee = FormApp.create('108 Guru Pujas — Devotee Interest Form');
  devotee.setDescription(
    'Invite a Guru Puja Pandit to your home for a one-hour slot on Sunday, 19 July 2026, in Chembur.'
  );
  devotee.setCollectEmail(true);
  devotee.addTextItem().setTitle('Full Name').setRequired(true);
  devotee.addTextItem().setTitle('Email ID').setRequired(true);
  devotee.addTextItem().setTitle('Mobile Number').setRequired(true);
  devotee.addParagraphTextItem().setTitle('Address (in Chembur)').setRequired(true);
  devotee.addListItem()
    .setTitle('Preferred Time Slot')
    .setChoiceValues(TIME_SLOTS)
    .setRequired(true);
  devotee.setDestination(FormApp.DestinationType.SPREADSHEET, ssId);

  // ---- Guru Puja Pandit Interest Form ----
  var pandit = FormApp.create('108 Guru Pujas — Guru Puja Pandit Interest Form');
  pandit.setDescription(
    'Offer to conduct Guru Pujas on Sunday, 19 July 2026, in Chembur. Choose up to 3 preferred hourly slots.'
  );
  pandit.setCollectEmail(true);
  pandit.addTextItem().setTitle('Full Name').setRequired(true);
  pandit.addTextItem().setTitle('Email ID').setRequired(true);
  pandit.addTextItem().setTitle('Mobile Number').setRequired(true);

  var slotItem = pandit.addCheckboxItem();
  slotItem.setTitle('Preferred Slots (choose up to 3)')
    .setChoiceValues(TIME_SLOTS)
    .setRequired(true);
  var atMostThree = FormApp.createCheckboxValidation()
    .setHelpText('Please select at most 3 slots.')
    .requireSelectAtMost(3)
    .build();
  slotItem.setValidation(atMostThree);
  pandit.setDestination(FormApp.DestinationType.SPREADSHEET, ssId);

  // ---- Output everything you need ----
  var devoteeEmbed = devotee.getPublishedUrl() + '?embedded=true';
  var panditEmbed = pandit.getPublishedUrl() + '?embedded=true';

  Logger.log('==================== DONE — copy the two EMBED URLs to Claude ====================');
  Logger.log('DEVOTEE embed URL : ' + devoteeEmbed);
  Logger.log('PANDIT  embed URL : ' + panditEmbed);
  Logger.log('---------------------------------------------------------------------------------');
  Logger.log('Devotee live (share) URL : ' + devotee.getPublishedUrl());
  Logger.log('Pandit  live (share) URL : ' + pandit.getPublishedUrl());
  Logger.log('Devotee edit URL         : ' + devotee.getEditUrl());
  Logger.log('Pandit  edit URL         : ' + pandit.getEditUrl());
  Logger.log('Responses spreadsheet    : ' + ss.getUrl());
  Logger.log('=================================================================================');
}

/** Formats a 24-hour hour as a 12-hour "h:00 AM/PM" label. */
function formatHour_(hour24) {
  var period = (hour24 < 12 || hour24 === 24) ? 'AM' : 'PM';
  var hour12 = hour24 % 12;
  if (hour12 === 0) hour12 = 12;
  return hour12 + ':00 ' + period;
}
