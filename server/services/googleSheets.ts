import { google } from "googleapis";

const auth = new google.auth.GoogleAuth({
  keyFile: "credentials.json",
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({
  version: "v4",
  auth,
});

const SPREADSHEET_ID =
  "1120OSMJP8T2wcIUSq7SLw0zzYIj3s2-c9C3QXGqKECk";

const SHEET_RANGE = "A:M";

export async function getRows() {
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: SHEET_RANGE,
  });

  return response.data.values ?? [];
}

export async function updateTestCell() {
  await sheets.spreadsheets.values.update({
    spreadsheetId: SPREADSHEET_ID,
    range: "Z1",
    valueInputOption: "RAW",
    requestBody: {
      values: [["Baby Stuff ❤️"]],
    },
  });
}

export async function updateCell(
  id: number,
  field: string,
  value: string | number
) {
  const rows = await getRows();

  if (rows.length === 0) {
    throw new Error("Таблица пустая");
  }

  const headers = rows[0];

  const columnIndex = headers.indexOf(field);

  if (columnIndex === -1) {
    throw new Error(`Колонка "${field}" не найдена`);
  }

  const rowIndex = rows.findIndex(
    (row, index) =>
      index > 0 && Number(row[0]) === id
  );

  if (rowIndex === -1) {
    throw new Error(`ID ${id} не найден`);
  }

  const columnLetter = String.fromCharCode(
    65 + columnIndex
  );

  const range = `${columnLetter}${rowIndex + 1}`;

  await sheets.spreadsheets.values.update({
    spreadsheetId: SPREADSHEET_ID,
    range,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[value]],
    },
  });
}

export async function addItem(values: (string | number)[]) {
  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: "A:M",
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [values],
    },
  });
}

export async function deleteRow(id: number) {
  const rows = await getRows();

  const rowIndex = rows.findIndex(
    (row, index) =>
      index > 0 && Number(row[0]) === id
  );

  if (rowIndex === -1) {
    throw new Error(`ID ${id} не найден`);
  }

  await sheets.spreadsheets.batchUpdate({
    spreadsheetId: SPREADSHEET_ID,
    requestBody: {
      requests: [
        {
          deleteDimension: {
            range: {
              sheetId: 0,
              dimension: "ROWS",
              startIndex: rowIndex,
              endIndex: rowIndex + 1,
            },
          },
        },
      ],
    },
  });
}