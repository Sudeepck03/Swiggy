const express = require('express')
const app = express();
const { getRestuarntData} = require('./getRestuarntData')
const {mailer} = require('./mailer')

app.get('/', (req, res) => {
  res.send("Swiggy Restuarnt Webscrapping WebSite")
})

app.get('/dish',(req,res)=>{
    console.log("it is an /dish route"); 
})

app.get('/dishes',(req,res)=>{
    try {
            let { city, restaurants, email, maximum, minimum, q } = req.query

        if (!isNaN(maximum) && !isNaN(minimum)) {
            maximum = Number(maximum)
            minimum = Number(minimum)
        }
        // removw await here for deployment
            const resturantData =  getRestuarntData(city, restaurants, maximum, minimum, q);
            
            mailer(email, resturantData)
            res.send(`The Message Will be Sent to ${email}`)
  } catch (err) {
    console.log("Error" + err);
  } 
})

var port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Successfully connected to Servere ${port}`))



