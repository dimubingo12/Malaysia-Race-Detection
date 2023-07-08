// Define which columns in the sheet the data is in. Assuming name in column 4 (D), and race in column 52 (AZ).
var NAME_COLUMN = 4;
var RACE_COLUMN = 52;
// Define the starting row
var START_ROW_RACE = 1789;
// Define the name of the property used to store the last processed row for race.
var LAST_ROW_PROPERTY_RACE = 'lastRowRace';

// List of Muslim majority country codes
var MUSLIM_COUNTRY_CODES = ["AF", "AL", "DZ", "AZ", "BH", "BD", "BN", "BF", "TD", "KM", "DJ", "EG", "GM", "GN", "ID", "IR", "IQ", "JO", "KZ", "XK", "KW", "KG", "LB", "LY", "MY", "MV", "ML", "MR", "MA", "NE", "NG", "OM", "PK", "PS", "QA", "SA", "SN", "SL", "SO", "SD", "SY", "TJ", "TN", "TR", "TM", "AE", "UZ", "YE"];

function createTriggerRace() {
  // Create a new trigger that runs processNewRowsRace every 2 hours.
  ScriptApp.newTrigger('processNewRowsRace')
    .timeBased()
    .everyHours(2)
    .create();
}

function processNewRowsRace() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName('ORDER RAW DATA');
  var lastRowrr = sheet.getLastRow();

  // Get the last processed row from the properties.
  var propertiesrr = PropertiesService.getScriptProperties();
  var lastProcessedRowrr = propertiesrr.getProperty(LAST_ROW_PROPERTY_RACE);
  if (lastProcessedRowrr == null) {
    // If there is no last processed row, start from the start row.
    lastProcessedRowrr = START_ROW_RACE;
  } else {
    // If there is a last processed row, convert it to a number.
    lastProcessedRowrr = Number(lastProcessedRowrr);
  }

  // Process all rows from the last processed row to the last row.
  for (var row = lastProcessedRowrr; row <= lastRowrr; row++) {
    // If the race cell is already filled out, don't do anything.
    if (sheet.getRange(row, RACE_COLUMN).getValue()) continue;

    // Get the first name from the name column.
    var nameCell = sheet.getRange(row, NAME_COLUMN).getValue();

    // If the name cell is empty, stop the execution and save the last processed row.
    if (nameCell === '') {
      propertiesrr.setProperty(LAST_ROW_PROPERTY_RACE, String(row - 1));
      break;
    }

    // Split the name to get the first name.
    var name = nameCell.split(' ')[0];

    // Use the Nationalize.io API to get the nationality probabilities.
    var response = UrlFetchApp.fetch('https://api.nationalize.io/?name=' + name);
    var json = JSON.parse(response.getContentText());

    // Find the country with the highest probability assessment
    var highestProbabilityCountry = json.country.reduce(function(acc, country) {
      if (country.probability > acc.probability) {
        return country;
      }
      return acc;
    }, { probability: 0 }); 
    // Check if any country was found with a non-zero probability
     var isCountryFound = highestProbabilityCountry.probability > 0;

     // Check if the country code of the highest probability assessment is from a Muslim majority country.
    var isMuslimCountry = isCountryFound && MUSLIM_COUNTRY_CODES.includes(highestProbabilityCountry.country_id);

    // Set the race based on whether it's a Muslim majority country or not.
    var race = isMuslimCountry ? 'MALAY' : 'OTHER';

    // Set the race in the race column.
    sheet.getRange(row, RACE_COLUMN).setValue(race);
  }

  // If we've processed all rows, save the last row as the last processed row.
  if (row > lastRowrr) {
    propertiesrr.setProperty(LAST_ROW_PROPERTY_RACE, String(lastRowrr));
  }
}
