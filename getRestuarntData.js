const puppeteer = require('puppeteer');
const {getDataOfEachRestuarnt} = require('./getDataOfEachRestuarnt')
const {getRestuarntsLinks} = require('./getRestuarntsLinks')
const {mailer} = require('./mailer')

async function getRestuarntData(city, restaurants, maximum = 150, minimum = 100, q,email) {
  const allLinks = await getRestuarntsLinks(city, restaurants);
  console.log(allLinks)

  // make it true for deployment
  const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox", "--disable-dev-shm-usage"] });
  let page = await browser.newPage()
  let restuarntsAndDishes = " ";


  for (let link of allLinks.links) {
    try{
      restuarntsAndDishes += await getDataOfEachRestuarnt(link, page, allLinks.filteredRestuarnt, maximum, minimum, q)
    console.log(restuarntsAndDishes)
    } catch(err){
      console.log("inside getRestuarntData.js" + err);
    }
    
  }

   await browser.close()
   
   mailer(email, restuarntsAndDishes)
}

module.exports = {getRestuarntData}
