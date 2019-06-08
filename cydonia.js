/*

EOS Cydonia V.0.01 - a proof-of-concept for a lightweight online-wallet for 
                     server-based applications.
                     
*/

console.log("EOS-Cydonia V0.01");
console.log("Usage at your own risk! NO WARRENTY!");
console.log("");

const myConfig = require('./config');
const myEoslib = require('./eoslib');



var http = require('http');



http.createServer(function (req, res)
{
console.log("call...");


res.writeHead(200, { 'Content-Type': 'application/json'   }); 
  
var url = require('url');
var url_parts = url.parse(req.url, true);
var query = url_parts.query;
var remoteip = req.connection.remoteAddress; 
 
 


if (req.method == 'POST') 
   {
   var jsonString = '';
   req.on('data', function (data) {      
   jsonString += data;
   });
  
req.on('end', function () 
      {
      remotejson = JSON.parse(jsonString);
   
      if ( remotejson.action == 'ping' )
         {
         var timestamp = Math.floor(  (new Date()).getTime() / 1000 );
         res.write(  JSON.stringify({ "respond":"pong", "timstamp": timestamp  })  );  
         res.end(); 
         }
         else
      if ( remotejson.action == 'getbalance' )
         {              
         myEoslib.geteosbalance( res, remotejson.account ); 
         }
         else
      if ( remotejson.action == 'transfer' )
           {         
        
            myEoslib.transfer( res, remoteip, remotejson.contract, remotejson.from,  remotejson.to, remotejson.memo, remotejson.amount, remotejson.token , remotejson.secret );  
           
           }
        else
        if ( remotejson.action == 'lastactions')
           {
                     
            myEoslib.lastactions( res, remotejson.account, remotejson.count );
              
           }
        else
        if ( remotejson.action == 'checkpayment')
           {
               
            myEoslib.checkpayment( res, remotejson.contract, remotejson.amount,  remotejson.token, remotejson.to, remotejson.memo, remotejson.maxseconds);
              
           }           
        else
            {
            res.write(  JSON.stringify({ "respond":  "null" })  );  
            res.end();  
            }
        
        });
   } // POST
   
   
   
   if (req.url == "/scan") 
   {  
      res.write(  JSON.stringify({ "respond":  "abc" , "ip": remoteip})  );  
      res.end();  
   }      
              
 
 
}).listen(443);


