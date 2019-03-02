import Parse from 'parse'

Parse.initialize(
  process.env.VUE_APP_PARSE_SERVER_APPLICATION_ID,
  process.env.VUE_APP_PARSE_SERVER_JAVASCRIPT_KEY
)
Parse.serverURL = process.env.VUE_APP_PARSE_SERVER_URL
Parse.liveQueryServerURL = process.env.VUE_APP_PARSE_SERVER_LIVE_QUERY_URL