import * as admin from 'firebase-admin';
import { Environment } from 'src/shared/variables/environment';

const serviceAccount = {
  type: Environment.FIREBASE_TYPE,
  project_id: Environment.FIREBASE_PROJECT_ID,
  private_key_id: Environment.FIREBASE_PRIVATE_KEY_ID,
  private_key: Environment.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: Environment.FIREBASE_CLIENT_EMAIL,
  client_id: Environment.FIREBASE_CLIENT_ID,
  auth_uri: Environment.FIREBASE_AUTH_URI,
  token_uri: Environment.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: Environment.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: Environment.FIREBASE_CLIENT_X509_CERT_URL,
  universe_domain: 'googleapis.com',
};

export const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  storageBucket: Environment.FIREBASE_STORAGE_BUCKET,
});

export const bucket = admin.storage().bucket();
