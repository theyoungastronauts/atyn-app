import { google } from 'googleapis';
import { GoogleSpreadsheet, GoogleSpreadsheetRow, ServiceAccountCredentials } from 'google-spreadsheet';
import { Account } from '../interfaces';



async function bootstrap() {
  const SHEET_ID: string = process.env.SPREADSHEET_ID || "";
  const GOOGLE_SHEETS_CLIENT_EMAIL: string = process.env.GOOGLE_SHEETS_CLIENT_EMAIL || "";
  const GOOGLE_SHEETS_PRIVATE_KEY: string = process.env.GOOGLE_SHEETS_PRIVATE_KEY || "";
  const doc = new GoogleSpreadsheet(SHEET_ID);

  let buff = Buffer.from(GOOGLE_SHEETS_PRIVATE_KEY, 'base64');
  let text = buff.toString('ascii').replace(/\\n/g, '\n');

  const credentials: ServiceAccountCredentials = {
    client_email: GOOGLE_SHEETS_CLIENT_EMAIL,
    private_key: text,
  }

  console.log("--------------------------");
  console.log(process.env.HTTPS_PROXY);
  console.log(process.env.HTTP_PROXY);
  console.log("--------------------------");


  await doc.useServiceAccountAuth(credentials);

  await doc.loadInfo();

  return doc;
}


async function list(sheetName: string): Promise<GoogleSpreadsheetRow[]> {
  const doc = await bootstrap();
  const sheet = doc.sheetsByTitle[sheetName];
  const rows: GoogleSpreadsheetRow[] = await sheet.getRows();
  return rows;
}

async function insert(sheetName: string, data: Array<string | number | boolean>): Promise<boolean> {

  try {
    const doc = await bootstrap();
    const sheet = doc.sheetsByTitle[sheetName];
    const rows: GoogleSpreadsheetRow[] = await sheet.getRows();
    sheet.addRow(data);
    return true;
  } catch (e) {
    console.log(e)
    return false;
  }
}


export async function getAccounts(): Promise<Account[]> {
  try {

    const rows = await list('access');

    return rows.map(r => {
      return {
        name: r['name'],
        email: r['email'],
        password: r['password']
      }
    })

  } catch (err) {
    console.log(err);
    return [];
  }
}

export async function createSession(account: Account): Promise<boolean> {

  const dateTime = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })
  return await insert('sessions', [account.email, account.name, dateTime])

}


export async function createDownload(account: Account, type: string): Promise<boolean> {

  const dateTime = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })
  return await insert('downloads', [type, account.email, account.name, dateTime])

}