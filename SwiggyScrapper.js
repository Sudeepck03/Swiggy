const express = require('express')
const app = express();
const { getRestuarntData} = require('./getRestuarntData')


app.get('/', (req, res) => {
  res.send("Swiggy Restuarnt Webscrapping WebSite")
})


app.get('/dishes',(req,res)=>{
    try {
            let { city, restaurants, email, maximum, minimum, q } = req.query

        if (!isNaN(maximum) && !isNaN(minimum)) {
            maximum = Number(maximum)
            minimum = Number(minimum)
        }
      console.log("dishes");
        // removw await here for deployment
            const resturantData =  getRestuarntData(city, restaurants, maximum, minimum, q,email);
            
            res.send(`The Message Will be Sent to ${email}`)
  } catch (err) {
    console.log("Error" + err);
  } 
})

var port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Successfully connected to Servere ${port}`))



