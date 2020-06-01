const express = require("express");
const bodyParser = require("body-parser");
const request=require("request");
const https = require("https");
const app = express();

app.use(bodyParser.urlencoded({extended:true})); //to use body parser

app.use(express.static("public")); //to use a static folder

app.post("/",function(req,res){
const firstName= req.body.firstName; //post request data
const lastName=req.body.secondName;
const email = req.body.email;

const webData={            //data to send to mailchimp account in the format the asked for
  members :[               //array of objects
    {
      email_address:email,
      status: "subscribed",
      merge_fields: {
        FNAME:firstName,
        LNAME:lastName
      }
    }
  ]
}
const jsonData=JSON.stringify(webData);
const url="https://us10.api.mailchimp.com/3.0/lists/6368df5751"   //api
const options = {
  method:"POST",
  auth:"richal:da1246f43105e665663961e49aae8669-us10"
}

const request = https.request(url,options,function(response){

  if(response.statusCode=== 200){
    res.sendFile(__dirname + "/success.html");
  }
  else{
    res.sendFile(__dirname+"/failure.html");
  }
// response.on("data",function(data){
//   console.log(JSON.parse(data));
// })
})
request.write(jsonData);  //passing data to mailchimp server
request.end();
});

app.get("/",function(req,res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/failure" , function(req,res){
  res.redirect("/");
});

app.listen(process.env.PORT || 3000,function(){
  console.log("Server is running at port 3000");
});
