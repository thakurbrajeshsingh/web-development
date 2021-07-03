const express = require('express');
const fs = require('fs');
const path = require('path');
const port = 8000;




const app=express();



app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
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
    return res.render('home',{ 
    title :'Contact List',
    contact_list : contactList});
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
    contactList.push(req.body);
    // return res.redirect('/');
    return res.redirect('/');
});

// for deleting contact
app.get('/delete-contact',(req,res)=>{
    
    let phone = req.query.phone;

    let contactIndex = contactList.findIndex(contact=> contact.phone == phone);
    
    if(contactIndex != -1){
        contactList.splice(contactIndex,1);
    }
    return res.redirect('back');

    });


app.listen(port,(err)=>{
    if(err){
        console.log("Yup! Error Occured!");
    }
    console.log("Server Running at Port : ",port);
});



