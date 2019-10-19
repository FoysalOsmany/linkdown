import request from "request";

export const asyncRequest = (url) => {
  return new Promise(function(resolve, reject) {
    request({url: url, timeout: 10000}, function(error, res, body) {
      if (error) {
        console.log('REQUEST Error: ', error);
        return reject(error);
      } else {
        return resolve(body.toString());
      }
    });
  });
};
