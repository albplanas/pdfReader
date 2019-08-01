
'use strict';

const express     = require('express');

var bodyParser = require('body-parser');
var mammoth= require("mammoth");
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

const config = {
    user: 'sa',
    password: "sql-786+jva",
    server: "JVA-SQL", 
    database: "Datacenter" 
 
};


const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(__dirname +'./../dist')); //serves the index.html

var pdfreader = require("pdfreader");




app.post('/docx', upload.fields([{ name: 'avatar', maxCount: 3 }, { name: 'gallery', maxCount: 8 }]), function (req, res, next) {

  var path=req.files['avatar'][0].path;
  
  var rows = {}; 
 var entireArray=[]

   new pdfreader.PdfReader().parseFileItems(path, (
            err,
            item
          )=>{
              if(err){}
              else{
                
              }
          //console.log("This.item",item)
            if (!item || item.page) {
              // end of file, or page

            if(!item){
          
              res.json({Text:entireArray})
              }

              rows = {}; // clear rows for next page
            } else if (item.text) {

              // accumulate text items into rows object, per line
              
              (rows[item.y] = rows[item.y] || []).push(item.text);
              entireArray=entireArray.concat({rowY:item.y,text:item.text,rowX:item.x})
            }
          })
  
})


/****************************************************
 *               Listening
 * ***************************************************/ 
        app.listen(process.env.PORT || 3000, () => {
          console.log("Listening on port " + 3000);
        });  





  /*var options =  { 
    apikey: 'bbe97c2d6a88957',
    language: 'eng',
    imageFormat: 'application/pdf',
  
  };
 
// Image file to upload
const imageFilePath = req.files['avatar'][0].path;
 
// Run and wait the result
ocrSpaceApi.parseImageFromLocalFile(imageFilePath, options)
  .then(function (parsedResult) {
    console.log('parsedText: \n', parsedResult.parsedText);
    console.log('ocrParsedResult: \n', parsedResult.ocrParsedResult);
  }).catch(function (err) {
    console.log('ERROR:', err);
  });



 /* mammoth.extractRawText({path: req.files['avatar'][0].path})
  .then((result)=>
  {
    /*  var text = result.value; // The raw text
      var messages = result.messages;
      console.log("Console",result)
      //processor("nothing",result.value)
      res.send({txt:result.value})
      // const outputPrefix = 'results'




  })
  .done();*/