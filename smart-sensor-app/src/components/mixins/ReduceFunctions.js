// eslint-disable-next-line no-unused-vars
export const LIMIT_REDUCE = (series, offsetFromNowInMillis, limit) => {
  let length = series.labels.length;
  return length > limit ? length - limit : 0;
};

// eslint-disable-next-line no-unused-vars
export const TIME_REDUCE = (series, offsetFromNowInMillis, limit) => {
  var millis = Date.now() - offsetFromNowInMillis;
  let i = series.labels.length - 1;
  for (; i > 0; i--) {
    if (millis < new Date(series.labels[i]).getTime()) {
      break;
    }
  }
  return series.labels.length - i - 1;
};
