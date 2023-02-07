import axios from "axios";
import config from "@/shared/config";

export const HTTP = axios.create({
  baseURL: config.baseURL,
  params: {
    language: config.langDefault,
    append_to_response: "videos",
  },
  headers: {
    'Authorization': config.KEY,
    'Content-Type': 'application/json; charset=utf-8',
  },
});

export const FIREBASE = axios.create({
  baseURL: config.firebaseDB,
});
