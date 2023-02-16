const puppeteer = require('puppeteer');
const {getDataOfEachRestuarnt} = require('./getDataOfEachRestuarnt')
const {getRestuarntsLinks} = require('./getRestuarntsLinks')
const {mailer} = require('./mailer')

async function getRestuarntData(city, restaurants, maximum = 150, minimum = 100, q,email) {
  const allLinks = await getRestuarntsLinks(city, restaurants);

  // make it true for deployment
  const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] });
  let page = await browser.newPage()
  let restuarntsAndDishes = " ";
  let i=0;

  for (let link of allLinks.links) {
    if(i> 3){
      break;
    }
    i++;
    restuarntsAndDishes += await getDataOfEachRestuarnt(link, page, allLinks.filteredRestuarnt, maximum, minimum, q)
  }
  
   await browser.close()
   
   mailer(email, restuarntsAndDishes)
   return  restuarntsAndDishes;
}

module.exports = {getRestuarntData}
