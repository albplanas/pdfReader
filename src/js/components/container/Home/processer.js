


function Processor(text,providers) {
    console.log("text",text)
var provider=GetProvider(text,providers);
var nprov=provider.length>0?provider[0].nprovider:null
        return  {
            remint:         provider,
            date:           getDate(text.filter(e =>  Extact_Date(e.text) ),text.filter(e =>  Extract_String(e.text,"INVOICE DATE") )),
            po:             PO(text,nprov),
            invoiceNumber:  InvoiceNumb(text,nprov),
            products: "",
            charges: {
                Subtotal: "",
                FreightNonTaxable: "",
                SalesTax: "",
                InvoiceTotal: ""
            }
    
        } 
    // connect to your database
 /*sql.connect(config, function (err) {
    
        if (err) console.log(err);
    
        // create Request object
        var request = new sql.Request();
    
        // query to the database and get the records
        request.query('select IDProvider,code, nprovider from [Datacenter].[dbo].[tblProvider]', function (err, recordset) {
    
            if (err) console.log(err)
    
            // send records as a response
            console.log(recordset);
           
            return   getDate(text.filter(e =>  Extact_Date(e.text) ),text.filter(e =>  Extract_String(e.text,"INVOICE DATE") ))
        });
    });*/


 

}


function TotalTruck(text) {
 
   
   
       
   
   
       return Invoice;
   }



module.exports = Processor;




var    Extact_Date=(str)=>{

    var date_regex = /[0-9]{0,2}["/"][0-9]{0,2}["/"](19|20)\d{2}/g;
    return str.match(date_regex)
  }

  var Extract_String=(text,str)=>text.match(str)
  

  var getDate=(datesArr,Pos)=>{

    if(Pos.length>0 && Pos[0].rowY!==undefined){
        var pos=Pos[0].rowY;
        
        var min=1000000000;
         datesArr.forEach(elem=>{
           if( Math.pow((parseFloat(elem.rowY)-parseFloat(pos)),2)<min){
               text=elem.text
               min=Math.pow((parseFloat(elem.rowY)-parseFloat(pos)),2);
           }
         })
         
        
        return Extact_Date(text)
    }
    else return null
  }


  var GetProvider=(text,providerList)=>{

    var Possible=[];
    var lastFilter=[]
   
    if(providerList!==undefined){
        text.forEach(elem=>{
            
            var remainder=providerList.filter(prov=>(elem.text.toUpperCase()).indexOf(prov.nprovider.toUpperCase())!==-1)
           
            Possible=Possible.concat(remainder)
           
        })
       Possible.forEach(p=>  {

            lastFilter.filter(lf=>lf.IDProvider===p.IDProvider).length===0?lastFilter.push(p):null
        })
        return lastFilter
    }
    else return null
  }

  var PO=(text,company)=>{
    var str=/P["."]O/
    var CustomerPO=text.map(elem=>{return elem.text.match(str)!==null?elem:null}).filter(e=>e!==null)

        if(company==="Total Truck Parts, Inc."){ 
          return   Minimun_Strategy(text,CustomerPO)
        }
        else return null
        

    
  }

  var InvoiceNumb=(text,company)=>{
    var str=/INVOICE NO/
    var INV=text.map(elem=>{return elem.text.match(str)!==null?elem:null}).filter(e=>e!==null)
  
    if(company==="Total Truck Parts, Inc."){ 
        return Minimun_Below(text,INV)
    }
    else return null
    
  }
  var DistanceSQ=(a,b)=>{
          return Math.pow(parseFloat(a.rowX)-parseFloat(b.rowX),2) + Math.pow(parseFloat(a.rowY)-parseFloat(b.rowY),2)
  }

  var Minimun_Strategy=(text,INV)=>{
    if(INV.length>0){
        var check=/\w{3}/
        var  min=1000000;
        var  MinElem=null;
            text.filter(e=>parseFloat(e.rowY)>parseFloat(INV[0].rowY)+0.5).forEach(elem=>{
            var d=DistanceSQ(elem,INV[0])

            if(d<min){ min=d; MinElem=elem }

            })
            var MinElem=MinElem.text.split("  ").filter(elem=>elem.match(check))
            return MinElem.length>0?MinElem[0]:""
      
        
    }
    else return null
  }

  var Minimun_Below=(text,INV)=>{
    if(INV.length>0){
        var check=/\d{5}/
        var  min=1000000;
        var  MinElem=null;
            text.filter(e=>parseFloat(e.rowY)>parseFloat(INV[0].rowY)).forEach(elem=>{
            var d=Math.pow(parseFloat(elem.rowY)-parseFloat(INV[0].rowY),2)
            
            console.log("Row",elem.text,elem.text.match(check))
         
            if(d<min && elem.text.match(check)!==null){ min=d; MinElem=elem }

            })
            console.log(MinElem)
            return MinElem!==null?MinElem.text.split("  ").filter(elem=>elem.match(check)):""
      
        
    }
    else return null
  }