const express = require('express');
const fs = require('fs');
const path = require('path');
const port = 8000;



const db = require('./config/mongoose')
const Contact = require('./models/contact');


const app=express();



app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());      //middle ware
app.use(express.static('assets'));



// app.use(function(res,req,next){
//     console.log("MiddleWare 1 Called");
//     next();
// });
// app.use(function(res,req,next){
//     console.log("MiddleWare 2 Called");
//     next();
// });






var contactList = [
    {
        name:"Brajesh",
        phone:"1234567890"
    },
    {
        name:"Rahul",
        phone:"865836588"
    },
    {
        name:"Bhavya",
        phone:"782785543"
    }
]

app.get('/',(req,res)=>{

    Contact.find({},function(err,contact){
        if(err){
            console.log("Error in connecting db");
            return;
        }
        return res.render('home',{ 
            title :'Contact List',
            contact_list : contact
        });
    })




    
})

app.get('/practice',(req,res)=>{
    return res.render('practice',{
        title:"Player Count"
    })
})

app.post('/create-contact',(req,res)=>{
    // return res.redirect('/practice')
    // contactList.push({
    //     name : req.body.name,
    //     phone : req.body.phone
    // })
    Contact.create({
        name:req.body.name,
        phone:req.body.phone
    },function(err,newContact){
        if(err){
            console.log("Error Occured Creating A contact");
            return;
        }
        console.log("************", newContact);
        return res.redirect('back');

    })
});


// for deleting contact
app.get('/delete-contact',(req,res)=>{
    
    let id = req.query.id;

    Contact.findByIdAndDelete(id,(err)=>{
        if(err){
            console.log("Error :::cannot delete");
            return;
        }
        return res.redirect('back');
    })

    });


    // server stats
app.listen(port,(err)=>{
    if(err){
        console.log("Yup! Error Occured!");
    }
    console.log("Server Running at Port : ",port);
});



