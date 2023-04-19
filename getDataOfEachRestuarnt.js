async function getDataOfEachRestuarnt(url,page,filteredRestuarnt,maximum,minimum,q){
  let counter = 0;
  let currentrestuarntsAndDishes = "";

  let maximumpriceLimit = parseInt(maximum);
  let minimumPriceLimt = parseInt(minimum);
  try {
    
    await page.setDefaultNavigationTimeout(0)
    await page.goto(url)
    console.log(url)
    await page.waitForNavigation()
    await page.waitForSelector('[data-testid="normal-dish-item"]');

    // Extract dish data
    let dishes = [];

    let dishElementExists = await page.$('[data-testid="normal-dish-item"]');
    let dishElements =
      dishElementExists === null || dishElementExists === undefined
        ? []
        : await page.$$('[data-testid="normal-dish-item"]');

    let hotelNameExists = await page.$(
      ".RestaurantNameAddress_name__2IaTv",
      (n) => n.innerText
    );
    const hotelName =
      hotelNameExists === null || hotelNameExists === undefined
        ? ""
        : await page.$eval(
            ".RestaurantNameAddress_name__2IaTv",
            (n) => n.innerText
          );

    //Apply Offer if existes
    let percentage = 0;
    let BestOfferExists = await page.$(
      ".RestaurantOffer_header__3FBtQ",
      (n) => n.innerText
    );
    let BestOffer =
      BestOfferExists === null || BestOfferExists === undefined
        ? null
        : await page.$eval(
            ".RestaurantOffer_header__3FBtQ",
            (n) => n.innerText
          );
    if (BestOffer !== null) {
      BestOffer = BestOffer.split(" ");
      percentage = Number(BestOffer[0].substring(0, BestOffer[0].length - 1));
      console.log(percentage);
    }

    let limit = 0;
    let limitExists = await page.$(
      ".RestaurantOffer_description__1SRJf",
      (lim) => lim.innerText
    );
    let limitOffer =
      limitExists === null || limitExists === undefined
        ? null
        : await page.$eval(
            ".RestaurantOffer_description__1SRJf",
            (lim) => lim.innerText
          );
    if (limitOffer !== null) {
      limit = limitOffer.split(" ");
      limit = Number(limit[1].substring(1));
    }
    console.log(limit);

    let filteredDishes = [];
    let limitDiscount = "";

    if (limit[0] === 'ABOVE') {
      limitDiscount = Number(limit[limit.length - 1].substring(1));
    }

    // Check if Restaurant is present in Query Filter
    if (
      !filteredRestuarnt.includes(hotelName) &&
      filteredRestuarnt.length > 0
    ) {
      return { [hotelName]: { dishes: filteredDishes } };
    }

    for (const dishElement of dishElements) {
      console.log("currentrestuarntsAndDishes" + " " + currentrestuarntsAndDishes.length)
      const dishName = await dishElement.$eval(
        "h3",
        (node) => node.textContent
      );
      let dishPrice = parseInt(
        await dishElement.$eval(".rupee", (node) => node.textContent)
      );
      let discount = (dishPrice * percentage) / 100;
      let dishPriceAfterDiscount =
        discount < limit ? dishPrice - discount : dishPrice - limit;
      const lowerCaseDishName = dishName.toLowerCase();
      
      console.log(dishName + " " + dishPrice)
 
      if (isNaN(dishPriceAfterDiscount)) {
        dishes.push({ dishName, dishPrice });
        if (dishPrice >= minimumPriceLimt && dishPrice <= maximumpriceLimit) {
          if (
            typeof limitDiscount === "number" &&
            dishPriceAfterDiscount >= limitDiscount
          ) {
            if (q && lowerCaseDishName.includes(q)) {
              counter++;
              currentrestuarntsAndDishes += `<br/> ${counter} . ${hotelName} : ${dishName}  ₹${dishPrice} -${percentage}%  "${q}" `;
         
            } else if (!q) {
              counter++;
              currentrestuarntsAndDishes += `<br/> ${counter} . ${hotelName} : ${dishName}  ₹${dishPrice} -${percentage}% `;
              
            }
          } else if (typeof limitDiscount === "string") {
            if (q && lowerCaseDishName.includes(q)) {
              counter++;
              currentrestuarntsAndDishes += `<br/> ${counter} . ${hotelName} : ${dishName}  ₹${dishPrice}  -${percentage}% ${q} `;
              
            } else if (!q) {
              counter++;
              currentrestuarntsAndDishes += `<br/> ${counter} . ${hotelName} : ${dishName}  ₹${dishPrice}  -${percentage} " `;
             
            }
          }
        }
      } else {
        dishes.push({ dishName, dishPrice: dishPriceAfterDiscount });
        if (
          dishPriceAfterDiscount >= minimumPriceLimt &&
          dishPriceAfterDiscount <= maximumpriceLimit
        ) {
          if (
            typeof limitDiscount === "number" &&
            dishPriceAfterDiscount >= limitDiscount
          ) {
            if (q && lowerCaseDishName.includes(q)) {
              counter++;
              currentrestuarntsAndDishes += `<br/> ${counter} . ${hotelName} : ${dishName} ₹${dishPriceAfterDiscount} -${percentage}% ${q}`;
             
            } else if (!q) {
              counter++;
              currentrestuarntsAndDishes += `<br/> ${counter} . ${hotelName} : ${dishName} ₹${dishPriceAfterDiscount} -${percentage}% ${q}`;
              
            }
          } else if (typeof limitDiscount === "string") {
            if (q && lowerCaseDishName.includes(q)) {
              counter++;
              currentrestuarntsAndDishes += `<br/> ${counter} . ${hotelName} : ${dishName} ₹${dishPriceAfterDiscount} -${percentage}% ${q}`;
              
            } else if (!q) {
              counter++;
              currentrestuarntsAndDishes += `<br/> ${counter} . ${hotelName} : ${dishName} ₹${dishPriceAfterDiscount} -${percentage}% ${q}`;
             
            }
          }
        }
      }
    }
    
  } catch (err) {
    console.log(err);
  }

  currentrestuarntsAndDishes += `<br/>`;
  return counter > 0 ? currentrestuarntsAndDishes : "";
}
module.exports = { getDataOfEachRestuarnt };
