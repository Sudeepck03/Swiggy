const puppeteer = require("puppeteer");

async function getRestuarntsLinks(city, restaurants) {
  // make it true for deployment
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"],
  });
  let page = await browser.newPage();
  let filteredRestuarnt = [];
  let links;
  let i = 0;

  page.setDefaultNavigationTimeout(0);
  if (city) await page.goto(`https://swiggy.com/city/${city}`);
  else await page.goto(`https://www.swiggy.com/city/bangalore`);

  while (i < 10) {
    await page.$eval(
      ".RestaurantList__ShowMoreContainer-sc-1d3nl43-0.ikntVJ > div > div:nth-child(1)",
      (el) => el.click()
    );
    await new Promise((r) => setTimeout(r, 2000));
    i++;
  }

  links = await page.$$eval(".sc-iBdmCd.hPntbc > div > a", (allLinks) =>
    allLinks.map((a) => a.href)
  );
  let allRestuarnts = await page.$$eval(
    ".sc-iBdmCd.hPntbc > div .sc-dmyDGi.dpnlFb",
    (res) => res.map((data) => data.innerText)
  );
  console.log(allRestuarnts);
  console.log(links);

  if (restaurants && restaurants.length > 0) {
    filteredRestuarnt = allRestuarnts.filter((res) =>
      restaurants.includes(res)
    );
  }

  browser.close();
  return { links, filteredRestuarnt };
}

module.exports = { getRestuarntsLinks };
