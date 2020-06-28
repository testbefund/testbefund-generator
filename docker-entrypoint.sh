#!/bin/sh
echo "const TESTBEFUND_PATIENT_URL = '$TESTBEFUND_PATIENT_URL'; const TESTBEFUND_API_URL = '$TESTBEFUND_API_URL'; const CLIENT_ID = '$CLIENT_ID'; const AZURE_AD_AUTHORITY = '$AZURE_AD_AUTHORITY';" > /usr/share/nginx/html/assets/config.js
nginx -g "daemon off;"
