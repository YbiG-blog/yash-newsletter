const express=require("express");
const bodyparser=require("body-parser");
const request=require("request");
const https=require("https");

const app=express();
app.use(express.static("other-files"));
app.use(bodyparser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
})

app.post("/",function(req,res){
    var nm1=req.body.namefst;
    var nm2=req.body.namelst;
    var gm=req.body.gmail;
    
    var data={
        members:[
            {
                email_address: gm,
                status: "subscribed",
                merge_fields:{
                    FNAME: nm1,
                    LNAME: nm2

                }
            }
        ]
    };

    const jsondata =JSON.stringify(data);
    const url="https://us20.api.mailchimp.com/3.0/lists/8d8e408a5c";
    const options= {
        method: "POST",
        auth: "yash:b90e60aceeb175c689171d49a6cc5928-us20"
    }

   const request= https.request(url,options,function(rs)
    {
        if(rs.statusCode==200)
        {
            res.sendFile(__dirname+"/success.html");
        }
        else
        {
            res.sendFile(__dirname+"/fail.html");
        }
        rs.on("data",function(data)
        {
            console.log(JSON.parse(data));
        })
    })
    request.write(jsondata);
    request.end();
});
app.post("/fail",function(req,res){
    res.redirect("/");
})
app.listen(3000,function(){
    console.log("server is runnig at 3000 port")
});

