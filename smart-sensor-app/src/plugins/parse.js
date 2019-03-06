import Parse from "parse";
import { MODULES } from "@/store";

Parse.initialize(
  process.env.VUE_APP_PARSE_SERVER_APPLICATION_ID,
  process.env.VUE_APP_PARSE_SERVER_JAVASCRIPT_KEY
);
Parse.serverURL = process.env.VUE_APP_PARSE_SERVER_URL;
Parse.liveQueryServerURL = process.env.VUE_APP_PARSE_SERVER_LIVE_QUERY_URL;

// declare sub classes
export const BME280 = Parse.Object.extend("BME280");
export const DEVICE = Parse.Object.extend("Device");

export const handleParseError = (store, error) => {
  // eslint-disable-next-line no-console
  console.error("Parse error:", error);
  // eslint-disable-next-line no-console
  console.warn("Force logout.");
  store.dispatch(MODULES.User.actions.logout);
};
