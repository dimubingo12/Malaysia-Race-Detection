Race.gs
The "Race.gs" script is a Google Apps Script that uses the Nationalize.io API to infer the race or ethnicity associated with a given name in a Google Sheets document. The script processes rows in a specific column (name) and populates another column (race) with the inferred race or ethnicity based on the first name.

Getting Started
To use the "Race.gs" script, follow these steps:

Open your Google Sheets document.
Click on Extensions in the menu.
Select Apps Script.
Replace the default code with the content of the "race.gs" script file.
Save the script and give it an appropriate name.
Close the Apps Script editor.
Configuration
The script requires the following configuration:

NAME_COLUMN: The column number (starting from 1) where the names are stored. Modify the value of NAME_COLUMN to match your specific column.
RACE_COLUMN: The column number (starting from 1) where the inferred race or ethnicity will be populated. Modify the value of RACE_COLUMN to match your desired column.
START_ROW_RACE: The row number from which to start processing the names. Modify the value of START_ROW_RACE to match your desired starting row.
LAST_ROW_PROPERTY_RACE: The name of the property used to store the last processed row for race. Modify the value of LAST_ROW_PROPERTY_RACE if desired.
MUSLIM_COUNTRY_CODES: An array of country codes representing Muslim majority countries. Modify the values in the MUSLIM_COUNTRY_CODES array if needed.
Usage
Once the script is set up and configured, you can trigger the processing of new rows by creating a time-based trigger. The provided code includes a createTriggerRace function that sets up a trigger to run the processNewRowsRace function every 2 hours. You can modify the trigger settings according to your requirements.

Malaysia's Context
In the context of Malaysia, the "Race.gs" script adapts by identifying names associated with Malay ethnicity, which is the largest ethnic group in the country. The script determines the inferred race or ethnicity based on the first name and checks if the country code of the highest probability assessment corresponds to Malaysia. If a name is associated with Malaysia, the script sets the race column value as "MALAY"; otherwise, it assigns "OTHER".

To ensure accurate results for Malaysia, the script uses the list of Muslim majority country codes and includes Malaysia's country code ("MY") in the MUSLIM_COUNTRY_CODES array. This accounts for the multicultural and multiethnic society of Malaysia, where Islam is the majority religion.

Notes
The script uses the Nationalize.io API to determine the inferred race or ethnicity based on the first name. Make sure you have a stable internet connection and check the API documentation for any rate limits or restrictions.
The script checks if the race cell is already filled out before processing a row. This prevents overwriting existing race values.

Feel free to modify and adapt it to suit your needs. Contributions are welcome!
