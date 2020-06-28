// from config.js
declare const CLIENT_ID: string;
declare const AZURE_AD_AUTHORITY: string;
declare const TESTBEFUND_PATIENT_URL: string;

export const environment = {
  production: true,
  testbefundPatientUrl: TESTBEFUND_PATIENT_URL,
  clientId: CLIENT_ID,
  authority: AZURE_AD_AUTHORITY,
};
