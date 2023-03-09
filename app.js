const path = require('path');
const express= require('express');
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/contactdance');
    
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

//Define scheman for mongoose:-
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String,
    
});
const contact = mongoose.model('contact', contactSchema);
app.use('/static', express.static('static'));   //static file usage.




  
  app.set('view engine','pug');
  app.set('views',path.join(__dirname,'views'))
  app.use(bodyparser.json());
  app.use(express.urlencoded())  //middleware for posting data using express.
  
  app.get('/',(req,res)=>{
      console.log('server made req')
      
      res.status(200).render('index.pug');
    })
    app.post('/contact', (req, res)=>{
        console.log('req rec')
        const mydata = new contact(req.body);
        mydata.save().then(()=>{
            res.send('This item has been saved to the database')
            
            
        }).catch(()=>{
            res.status(400).send('item was not saved to the databse')
        });
    })
    app.get('/contact',(req,res)=>{
        console.log('Request received! via conta');
        res.render("contact.pug")
        
        
    })
    
app.listen(80,()=>{
    console.log("App is being listened at port 80");
})