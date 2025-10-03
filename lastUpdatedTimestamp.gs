function updateLastUpdatedTimestamp(e) {
  // GET the active sheet
  const sheet = e.source.getActiveSheet();

  // GET the edited range
  const range = e.range


  /**
   * FIND the 'LAST_UPDATED' column
     > CHECK row 1 (the header)
     > LOOP through it
     > FIND which column contains 'LAST_UPDATED'
   */

  // SET the header row number as the value for headerRow
  const headerRow = 1;

  /**
   * SET the range for the 'headers' NamedRange object
     > Formula:
     >> getRange(startRow, startColumn, numRows, numColumns)
   */ 
  const headers = sheet.getRange(headerRow, 1, 1, sheet.getLastColumn()).getValues()[0];

  // FIND the 'LAST_UPDATED' column and SET lastUpdatedCol
  const lastUpdatedCol = headers.indexOf("LAST_UPDATED") + 1; // +1 adjust from 0-based array index to 1-based sheet column number


  // EXIT if the header row is not found
  if (lastUpdatedCol === 0) return;


  /**
   * SPECIFY the editedRow range
   */

  // SET 'editedRow' value as the row(s) from the 'range' object
  const editedRow = range.getRow();

  // RETURN if 'editedRow' is the 'headerRow' or 'lastUpdatedCol'
  if (editedRow === headerRow || range.getColumn() === lastUpdatedCol) return;


  // SET 'now' as a Date object
  const now = new Date();

  /**
   * FORMAT the 'now' Date object
     > Formula:
     >> Utilities.formatDate(date, timeZone, format)
   */
  const formattedDate = Utilities.formatDate(now, Session.getScriptTimeZone(), "yyyy-MM-dd HH:mm");

  // SET the formattedDate for '(editedRow, lastUpdatedCol)'
  sheet.getRange(editedRow, lastUpdatedCol).setValue(formattedDate);
}
