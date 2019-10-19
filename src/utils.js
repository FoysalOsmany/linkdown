import request from "request";
import puppeteer from "puppeteer";

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
