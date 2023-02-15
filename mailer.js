const nodemailer = require('nodemailer');

const mailer = (email,resturantsAndDishes) => {
  try {
    let requiredResturantData = resturantsAndDishes
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "1ms19is119@gmail.com",
        pass: "popoqibpxuxpclbr"
      },
      tls: {
        rejectUnauthorized: false
      },
      secure: false
    })


    let mailOptions = {
      from: "1ms19is119@gmail.com",
      to: email || "sudeepck29@gmail.com",
      subject: "Swiggy.com",
      text: "Firts Email Using Nodejs" + " " + requiredResturantData,
      html: requiredResturantData,
      amp: `${requiredResturantData}`,
      secure: false,
    }

    transporter.sendMail(mailOptions, function (err, success) {
      if (err) {
        console.log(err);
      } else {
        console.log(success)
      }
    })
  } catch (err) {
    console.log(err);
  }
}

module.exports = {mailer}