import request from "request";
import puppeteer from "puppeteer";
import ping from "ping";

export const pingCheck = (url) => {
  return new Promise(function(resolve, reject) {
    ping.sys.probe(url,  function(isAlive) {
      if (isAlive) {
        return resolve('up');
      } else {
        return resolve('down');
      }
    }, {timeout: 5000, extra: ["-i 2"]});
  });
};

export const asyncRequest = (url) => {
  return new Promise(function(resolve, reject) {
    request({url: url, timeout: 5000}, function(error, res, body) {
      if (error) {
        console.log('REQUEST Error: ', error);
        return resolve(null);
      } else {
        return resolve(res.statusCode);
      }
    });
  });
};

export const asyncBrowse = async (url, browser = null) => {
  try {
    browser = await puppeteer.launch({
      headless: false
    });
  } catch (e) {
    console.error("Browser open issue: ", e);
  }

  let page;

  try {
    console.log("Opening Page ...");
    page = await browser.newPage();
    console.log("Page :) ", typeof page);
  } catch (e) {
    console.error("Page open issue: ", e);
  }

  console.log("Go to page:", url);
  await page.goto(url, {
    timeout: 20000,
    waitUntil: ['domcontentloaded']
  });

  console.log("waiting for navigation :(");

  const content = await page.evaluate(() => document.body.innerHTML);

  console.log('GOT CONTENT');

  await page.close();
  await browser.close();

  return content.toString();
};
