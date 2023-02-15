const puppeteer = require('puppeteer');
const {getDataOfEachRestuarnt} = require('./getDataOfEachRestuarnt')
const {getRestuarntsLinks} = require('./getRestuarntsLinks')


async function getRestuarntData(city, restaurants, maximum = 150, minimum = 100, q) {
  const allLinks = await getRestuarntsLinks(city, restaurants);
  console.log(allLinks)
  // make it true for deployment
  const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] });
  let page = await browser.newPage()
  let restuarntsAndDishes = " ";
    

  //   // remove this line
  // console.log(" the value of q in getRestuarntData  :" + q);

  for (let link of allLinks.links) {
    // removed await for deployement in render
    restuarntsAndDishes += getDataOfEachRestuarnt(link, page, allLinks.filteredRestuarnt, maximum, minimum, q,restuarntsAndDishes)
  }

  await browser.close()
   return  restuarntsAndDishes;
}

module.exports = {getRestuarntData}
