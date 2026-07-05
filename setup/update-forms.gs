/**
 * 108 Guru Pujas — Chembur  |  Google Forms UPDATER
 * --------------------------------------------------
 * Run this ONCE to fix the two forms that build-forms.gs already created,
 * WITHOUT changing their URLs (so the embeds on the website keep working and
 * any responses already collected are preserved). It:
 *   1. Turns OFF Google's "collect email" (no Google sign-in required to
 *      submit). The typed "Email ID" question stays — so email is asked once.
 *   2. Replaces the pandit "Preferred Slots" checkbox question with THREE
 *      dropdowns: Slot 1 (required), Slot 2 & 3 (optional).
 *
 * HOW TO RUN
 *   1. Go to https://script.google.com and open the same project you used for
 *      build-forms.gs (or a new project — either works).
 *   2. Add a file / paste this in, Save.
 *   3. Pick "updateGuruPujaForms" in the function dropdown and click Run.
 *   4. Authorize if prompted. Open View → Logs to see the confirmation.
 *
 * Safe to run more than once (it removes any existing "Preferred Slot..."
 * questions before re-adding the three dropdowns).
 */

function updateGuruPujaForms() {
  var TIME_SLOTS = [];
  for (var hour = 7; hour < 22; hour++) {
    TIME_SLOTS.push(slotLabel_(hour) + ' – ' + slotLabel_(hour + 1));
  }

  // ---- Devotee form: stop collecting the Google-account email (keep typed "Email ID") ----
  var devotee = openFormByName_('108 Guru Pujas — Devotee Interest Form');
  devotee.setCollectEmail(false);

  // ---- Pandit form: stop auto email-collect + swap checkbox slots for 3 dropdowns ----
  var pandit = openFormByName_('108 Guru Pujas — Guru Puja Pandit Interest Form');
  pandit.setCollectEmail(false);

  // Remove any existing slot question(s) (old checkbox list, or dropdowns from a prior run).
  var items = pandit.getItems();
  for (var i = 0; i < items.length; i++) {
    if (items[i].getTitle().indexOf('Preferred Slot') === 0) {
      pandit.deleteItem(items[i]);
    }
  }

  // Add the three dropdowns.
  pandit.addListItem().setTitle('Preferred Slot 1').setChoiceValues(TIME_SLOTS).setRequired(true);
  pandit.addListItem().setTitle('Preferred Slot 2 (optional)').setChoiceValues(TIME_SLOTS).setRequired(false);
  pandit.addListItem().setTitle('Preferred Slot 3 (optional)').setChoiceValues(TIME_SLOTS).setRequired(false);

  Logger.log('==================== DONE — forms updated, URLs unchanged ====================');
  Logger.log('Devotee live URL : ' + devotee.getPublishedUrl());
  Logger.log('Pandit  live URL : ' + pandit.getPublishedUrl());
  Logger.log('=============================================================================');
}

/** Opens a Form file by its exact title. Throws if not found; uses the first match. */
function openFormByName_(name) {
  var files = DriveApp.getFilesByName(name);
  if (!files.hasNext()) {
    throw new Error('Could not find a form named: ' + name);
  }
  return FormApp.openById(files.next().getId());
}

/** Formats a 24-hour hour as a 12-hour "h:00 AM/PM" label. */
function slotLabel_(hour24) {
  var period = (hour24 < 12 || hour24 === 24) ? 'AM' : 'PM';
  var hour12 = hour24 % 12;
  if (hour12 === 0) hour12 = 12;
  return hour12 + ':00 ' + period;
}
