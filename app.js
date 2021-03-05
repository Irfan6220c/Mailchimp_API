
const  express= require("express");
const bodyParser=require ("body-parser");
const http=require("https")

var app=express();
app.use(express.urlencoded({ extended: true }))

app.use(express.static("public"));



app.get("/",function(req,res){

    res.sendFile(__dirname+"/signup.html")

});


app.post("/",function(req,res)

{

    var fname=req.body.FirstName;
    var lname=req.body.LastName;
    var email=req.body.email;
    var email=req.body.password;

    var data={

        members:[
       {
        email_address:email,
        status: "subscibed",
        merge_fields: {

            FNAME:fname,
            LNAME:lname
        }

    }]};

    var jsonData=JSON.stringify(data);

    const url=   "https://us1.api.mailchimp.com/3.0/lists/1af5cef1ed"

    const options= {

        method:"POST",
        auth: "Irfan:1eee2b819a60032ee0dd5f47f1daaec8-us1"
    }

    const request=http.request(url,options,function(response){


        if (response.statusCode==200)
        {
            res.sendFile(__dirname+"/success.html");
         
        }
            else{
                res.sendFile(__dirname+"/Failure.html");

            }

        response.on("data",function(data){

            console.log(JSON.parse(data));
        })
    });

    request.write(jsonData);
    request.end();


});

    



app.listen(3000,function(){

console.log("Listening");

});

//API key

//1eee2b819a60032ee0dd5f47f1daaec8-us1
//List ID
//1af5cef1ed
