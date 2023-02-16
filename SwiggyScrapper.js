const express = require('express')
const app = express();
const { getRestuarntData} = require('./getRestuarntData')


app.get('/', (req, res) => {
  console.log("/ is the Route");
  res.send("Swiggy Restuarnt Webscrapping WebSite")
})


app.get('/dishes',(req,res)=>{
    try {
            let { city, restaurants, email, maximum, minimum, q } = req.query
          console.log("email : " +  email);
        
      console.log("dishes");
        // removw await here for deployment
         getRestuarntData(city, restaurants, maximum, minimum, q,email);
            
            res.send(`The Message Will be Sent to ${email}`)
  } catch (err) {
    console.log("Error" + err);
  } 
})

var port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Successfully connected to Servere ${port}`))



