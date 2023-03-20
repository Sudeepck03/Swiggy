const puppeteer = require('puppeteer');

async function getRestuarntsLinks(city,restaurants)  {
      // make it true for deployment
    const browser = await puppeteer.launch({headless: true, args: ["--no-sandbox"]});
    let page = await browser.newPage();
     page.setDefaultNavigationTimeout(0);
     let filteredRestuarnt = []
      let links;


    let i=0;
     for (i=0;i<3;i++){

    // Navigate to Swiggy website   
    await page.goto(`https://swiggy.com/city/bangalore`);

    let currentLinks = await page.$$eval('#restaurants_container div div a',allLinks=>allLinks.map(a=>a.href))
     if(i >=1){
             links = links.concat(currentLinks)
        }else{
            links = currentLinks
        }
    let allRestuarnts =await page.$$eval('#restaurants_container div div a div div:nth-child(2) div:nth-child(1)',res=>res.map(data=>data.innerText));
    
       if(restaurants && restaurants.length >0){
            filteredRestuarnt = allRestuarnts.filter(res => restaurants.includes(res)) 
        }

    //if(isNaN(restaurants)){
      //  browser.close();
       // return {links,filteredRestuarnt};
    //}


    //if(allRestuarnts && restaurants.length > 0 && typeof(allRestuarnts) != 'undefined' && typeof(allRestuarnts) != 'null')
        //filteredRestuarnt = allRestuarnts.filter(res => restaurants.includes(res)) 
     }
    browser.close();
    return {links,filteredRestuarnt};
};

module.exports = {getRestuarntsLinks}
