

async function getDataOfEachRestuarnt(url, page, filteredRestuarnt, maximum, minimum, q,restuarntsAndDishes) {
   let counter = 0;
   let currentrestuarntsAndDishes = "";
  let maximumpriceLimit = parseInt(maximum);
  let minimumPriceLimt = parseInt(minimum);

  await page.setDefaultNavigationTimeout(0);
  await page.goto(url); 
  await page.waitForSelector('[data-testid="normal-dish-item"] > div > div:first-of-type');

  // Extract dish data
  let dishes = [];
  let dishElements = await page.$$('[data-testid="normal-dish-item"] > div > div:first-of-type');
  const hotelName = await page.$eval('h1', n => n.title)

  //Apply Offer if existes  
  let BestOffer = await page.$eval('._3lvLZ', n => n.innerText)
  BestOffer = BestOffer.split(" ")
  let percentage = Number(BestOffer[0].substring(0, BestOffer[0].length - 1));
  limit = Number(BestOffer[4].substring(1, BestOffer[4].length))
  let filteredDishes = []
  let limitDiscount = ""

  if (BestOffer[BestOffer.length - 2] === 'Above') {
    limitDiscount = Number(BestOffer[BestOffer.length - 1].substring(1));
  }



  // Check if Restaurant is present in Query Filter
  if (!filteredRestuarnt.includes(hotelName) && filteredRestuarnt.length > 0) {
    return { [hotelName]: { dishes: filteredDishes } }
  }

  for (const dishElement of dishElements) {

    const dishName = await dishElement.$eval('h3', node => node.textContent);
    let dishPrice = parseInt(await dishElement.$eval('.rupee', node => node.textContent));
    let discount = (dishPrice * (percentage) / 100)
    let dishPriceAfterDiscount = discount < limit ? dishPrice - discount : dishPrice - limit;
    const lowerCaseDishName = dishName.toLowerCase()

    if (isNaN(dishPriceAfterDiscount)) {
      dishes.push({ dishName, dishPrice })
      if (dishPrice >= minimumPriceLimt && dishPrice <= maximumpriceLimit) {
        if (typeof (limitDiscount) === 'number' && dishPriceAfterDiscount >= limitDiscount) {
            // console.log(q + " " + lowerCaseDishName .includes(q)+ " " + lowerCaseDishName)
          if (q && lowerCaseDishName.includes(q)){
             counter++;
            currentrestuarntsAndDishes += `<br/> ${counter} . ${hotelName} : ${dishName}  ₹${dishPrice} -${percentage}%  "${q}" `
//             console.log( typeof(restuarntsAndDishes )  +" "  + typeof(`<br/> ${counter} . ${hotelName} : ${dishName}  ₹${dishPrice}  -${percentage}% `))
          }
          else if (!q){
             counter++;
            currentrestuarntsAndDishes += `<br/> ${counter} . ${hotelName} : ${dishName}  ₹${dishPrice} -${percentage}%  "${q}" `
//             console.log( typeof(restuarntsAndDishes )  +" "  + typeof(`<br/> ${counter} . ${hotelName} : ${dishName}  ₹${dishPrice} -${percentage}%  `))
          }
        }

        else if (typeof (limitDiscount) === "string") {
            // console.log(q + " " + lowerCaseDishName .includes(q)+ " " + lowerCaseDishName)
          if (q && lowerCaseDishName.includes(q)){
             counter++;
            currentrestuarntsAndDishes += `<br/> ${counter} . ${hotelName} : ${dishName}  ₹${dishPrice}  -${percentage}% "${q}" `
//             console.log( typeof(restuarntsAndDishes )  +" "  + typeof(`<br/> ${counter} . ${hotelName} : ${dishName}  ₹${dishPrice}  -${percentage}% `))
          }
          else if (!q){
             counter++;
            currentrestuarntsAndDishes += `<br/> ${counter} . ${hotelName} : ${dishName}  ₹${dishPrice}  -${percentage} " ${q} " `
//             console.log( typeof(restuarntsAndDishes )  +" "  + typeof(`<br/> ${counter} . ${hotelName} : ${dishName}  ₹${dishPrice}  -${percentage} `))
          }
        }
      }
    }
    else {
      dishes.push({ dishName, dishPrice: dishPriceAfterDiscount });
      if (dishPriceAfterDiscount >= minimumPriceLimt && dishPriceAfterDiscount <= maximumpriceLimit) {
        if (typeof (limitDiscount) === 'number' && dishPriceAfterDiscount >= limitDiscount) {
            // console.log(q + " " + lowerCaseDishName .includes(q) + " " + lowerCaseDishName )
          if (q && lowerCaseDishName.includes(q)){
             counter++;
            currentrestuarntsAndDishes += `<br/> ${counter} . ${hotelName} : ${dishName} ₹${dishPriceAfterDiscount} -${percentage}% "${q}"`
//             console.log( typeof(restuarntsAndDishes )  +" "  + typeof(`<br/> ${counter} . ${hotelName} : ${dishName} ₹${dishPriceAfterDiscount} -${percentage}%  `))
          }
          else if (!q){
             counter++;
            currentrestuarntsAndDishes += `<br/> ${counter} . ${hotelName} : ${dishName} ₹${dishPriceAfterDiscount} -${percentage}% "${q}"`    
//             console.log( typeof(restuarntsAndDishes )  +" "  + typeof(`<br/> ${counter} . ${hotelName} : ${dishName} ₹${dishPriceAfterDiscount} -${percentage}% `))
          }
        }
        else if (typeof (limitDiscount) === "string") {
            // console.log(q + " " + lowerCaseDishName .includes(q)+ " " + lowerCaseDishName)
          if (q && lowerCaseDishName.includes(q)){
             counter++;
            currentrestuarntsAndDishes += `<br/> ${counter} . ${hotelName} : ${dishName} ₹${dishPriceAfterDiscount} -${percentage}% "${q}"`
//               console.log( typeof(restuarntsAndDishes )  +" "  + typeof(`<br/> ${counter} . ${hotelName} : ${dishName} ₹${dishPriceAfterDiscount} -${percentage}% `))
          }
          else if (!q){
             counter++;
            currentrestuarntsAndDishes += `<br/> ${counter} . ${hotelName} : ${dishName} ₹${dishPriceAfterDiscount} -${percentage}% "${q}"`
//              console.log(typeof(restuarntsAndDishes )  + " " + typeof(`<br/> ${counter} . ${hotelName} : ${dishName} ₹${dishPriceAfterDiscount} -${percentage}% `))
          }
        }
      }
    }
  }
  currentrestuarntsAndDishes += `<br/>`
   return counter > 0 ? currentrestuarntsAndDishes : "";
    return currentrestuarntsAndDishes;
}
module.exports = {getDataOfEachRestuarnt}
