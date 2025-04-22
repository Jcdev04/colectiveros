import {
  initializeApp,
  getApps,
  getApp,
  FirebaseOptions,
  FirebaseApp,
} from "firebase/app";
import { getFirestore } from "firebase/firestore";
/* import { getStorage } from "firebase/storage";*/

interface FBOptions {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

const validateOptions = (options: FBOptions, name: string): FirebaseOptions => {
  if (Object.values(options).some((value) => !value)) {
    console.error(`Invalid Firebase configuration for ${name}:`, options);
    throw new Error(`Invalid Firebase configuration for ${name}`);
  }
  return options;
};

const getFbApp = (options: FirebaseOptions, name: string): FirebaseApp => {
  return getApps().some((app) => app.name === name)
    ? getApp(name)
    : initializeApp(options, name);
};

const firebaseMarketConfig: FirebaseOptions = validateOptions(
  {
    apiKey: process.env.NEXT_PUBLIC_MARKET_FIREBASE_APIKEY!,
    authDomain: process.env.NEXT_PUBLIC_MARKET_FIREBASE_AUTHDOMAIN!,
    projectId: process.env.NEXT_PUBLIC_MARKET_FIREBASE_PROJECTID!,
    storageBucket: process.env.NEXT_PUBLIC_MARKET_FIREBASE_STORAGEBUCKET!,
    messagingSenderId:
      process.env.NEXT_PUBLIC_MARKET_FIREBASE_MESSAGINGSENDERID!,
    appId: process.env.NEXT_PUBLIC_MARKET_FIREBASE_APPID!,
  },
  "colectiveros"
);

export const appColectivero = getFbApp(firebaseMarketConfig, "colectiveros");
export const dbColectivero = getFirestore(appColectivero);
/* export const storageMarket = getStorage(appMarket); */
