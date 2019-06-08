//
//
// eoslib.js
// Wrapper functions for eosjs-functions.
//
//

const myConfig = require('./config');

Eos = require('eosjs');



 
//
//
// geteosbalance()
//
//
exports.geteosbalance = async function( res, account ) 
{
 
  
 config = {
          chainId: myConfig.data.chainId,  
          keyProvider: [], // WIF string or array of keys..
          httpEndpoint: myConfig.data.httpEndpoint ,
          expireInSeconds: 60,
          broadcast: true,
          verbose: false, // API activity
          sign: true
          }


eos = Eos(config);

 
 
eos.getCurrencyBalance({
        code: 'eosio.token',
        account,
        symbol: 'EOS',
     })
    .then(
         data => 
              {
              console.log('SUCCESS: ', data);
    
              res.write(  JSON.stringify({ "respond":  "balance", "balance": data[0]  })  );  
              res.end();  
              }
         )
        .catch(
              error => 
                  {
                  console.log('ERROR: ', error);
                  res.write(  JSON.stringify({ "respond":  "error" })  );  
                  res.end(); //end the response 
                  }
              );
                                 
 
} // geteosbalance



//
//
// !!! CRITICAL section !!!
//
// parse_only_transactions()
//
// POSSILBE VULNERABILITY 
// * Fake-transactions: some kind of receipts could look like real transactions
// 
//
//
function parse_only_transactions( value, account_name )
{
var ret = "{ \n";
ret += '"actions" : [\n';


var size = value.actions.length;

      
var cnt2 = 0;  
       
for ( var i=0; i<size; i++ )
    {
     
    var account_action_seq = value.actions[i].account_action_seq;  
                                    
    var action_account = value.actions[i].action_trace.act.account;                
    var action_name    = value.actions[i].action_trace.act.name;  
    var block_time     = value.actions[i].block_time;  
    var ts             = Math.floor(  (new Date(block_time)).getTime() / 1000 );
          
  
          
    if (action_name == 'transfer')
       {
       var data_from     = value.actions[i].action_trace.act.data.from;
       var data_memo     = value.actions[i].action_trace.act.data.memo;
       var data_quantity = value.actions[i].action_trace.act.data.quantity;
       var data_to       = value.actions[i].action_trace.act.data.to;      
       var receiver      = value.actions[i].action_trace.receipt.receiver;  

       data_memo = JSON.stringify(data_memo, undefined, 1);


       if (receiver == data_to)
          {
                
          if (cnt2 > 0 ) 
             ret += ',\n'; else
             ret += '\n';
          cnt2++;    
                    
                
          qarray = data_quantity.split(" "); 
          var data_amount = qarray[0];
          var data_token  = qarray[1];
     
          ret += '{"seq": "'+account_action_seq+'","time": "'+ts+'",   "contract":"'+action_account+'" , "from":"'+data_from+'" ,  "to":"'+data_to+'" ,  "quantity":"'+data_quantity+'"  , "amount":"'+data_amount+'" , "token":"'+data_token+'" ,  "memo":'+data_memo+' }';
           
          } // if (receiver == action_account)

       } // if (action_name == 'transfer')
             
     
  
          
   } // for...
        
 
 
 
ret += ']\n';
ret += '}\n';
 
 

return(ret);
} // parse_only_transactions




//
//
// lastactions()
//
//
exports.lastactions = async function( res, account, count ) 
{

 
 
config = {
         chainId: myConfig.data.chainId,  
         keyProvider: [], // WIF string or array of keys..
         httpEndpoint: myConfig.data.httpEndpoint ,
         expireInSeconds: 60,
         broadcast: true,
         verbose: false, // API activity
         sign: true
         }


eos = Eos(config);

 

eos.getActions(account, -1 , -count ).then   
(
function (value)
         {
         var thelist = parse_only_transactions(value,account);  
                 
         res.write( thelist );            
         res.end(); //end the response               
         }  
);              
    
 
} // lastactions




//
//
// lastactions
//
//
exports.checkpayment = async function( res, contract, amount, token, to, memo, maxseconds ) 
{
 
config = {
         chainId: myConfig.data.chainId,  
         keyProvider: [], // WIF string or array of keys..
         httpEndpoint: myConfig.data.httpEndpoint ,
         expireInSeconds: 60,
         broadcast: true,
         verbose: false, // API activity
         sign: true
         }


eos = Eos(config);

 

eos.getActions(to, -1 , -50 ).then  // last  50 actions
(

function (value) 
         {
         var thelist = parse_only_transactions(value,to);  
       
         listjson = JSON.parse(thelist);
    
         size = listjson.actions.length;
    
         var FOUND = "no";
         var timestamp = "";
         var from = "";
         var diff = 0;
    
         for (i=0; i<size; i++)
             {
             if ( 
                listjson.actions[i].contract == contract &&
                listjson.actions[i].amount   >= amount &&
                listjson.actions[i].token     == token &&
                listjson.actions[i].to     == to &&
                listjson.actions[i].memo     == memo 
                ) 
                {
                timestamp = listjson.actions[i].time;
                from      = listjson.actions[i].from;
                FOUND = "yes";
                var now             = Math.floor(  (new Date()).getTime() / 1000 );
                diff = now - timestamp;           
                if (diff > maxseconds) FOUND = "no";    
                }
             }
    
         res.write(  JSON.stringify({ "respond":  "checkpayresponse", "payed": FOUND,  "time":timestamp, "from":from , "ageseconds":diff })  );        
         res.end();    
      
  }
   
);              
    
    
       
 
} // checkpayment


          
 

//
//
// transfer()
//
//
exports.transfer = async function( res, remoteip, contract, from, to, memo, amount, token ,secret  ) 
{
console.log("TX2 " + contract);

//
// Maintain of the log file
//
const fs = require('fs');
var time  = Math.floor(  (new Date()).getTime() / 1000 );
fs.appendFileSync('transfer.log', time + ' | IP:'    +remoteip +    ' | contract:'   +contract+ ' | from:'   +from+ ' | to:'  +to+ ' | memo:' +memo+ ' | amount:'  +amount+ ' | memo:' +token+ "\n");
    
    
//
// Scan for known accounts...
//
var keyprovider  = "";
var whitelistip  = "";
var walletsecret = "";
var size = myConfig.accounts.length;
for (i=0; i<size; i++)
    {
    console.log("i: "+i+" " + myConfig.accounts[i].account );
    if (myConfig.accounts[i].account == from)
       {
       keyprovider  = myConfig.accounts[i].keyprovider;
       whitelistip  = myConfig.accounts[i].whitelistip;
       walletsecret = myConfig.accounts[i].secret;
       }    
    }

//
// Has key?
//
if (keyprovider == "")
   {
   console.log("Unknown account");
   res.write(  JSON.stringify({ "respond":  "error" })  );     
   res.end();   
   return;         
   }
   


// 
// Check remote IP
// Return if whitelistip is defined
//
if (whitelistip != "" &&
    whitelistip != remoteip)
   {
   console.log("REMOTE IP ERROR "+whitelistip+" " +remoteip);
   res.write(  JSON.stringify({ "respond":  "errorip" })  );     
   res.end();          
   return; 
   }

 
//
// Secret?
//
if (secret != walletsecret)
   {
   console.log(" Bad secret! ");
   res.write(  JSON.stringify({ "respond":  "error" })  );     
   res.end();   
   return;         
   }
   
   

config = {
         chainId: myConfig.data.chainId,  
         keyProvider: [keyprovider], 
         httpEndpoint: myConfig.data.httpEndpoint ,
         expireInSeconds: 60,
         broadcast: true,
         verbose: false, 
         sign: true
         }

eos = Eos(config);

var quantity = amount + " " + token; 
          
 
eos.transaction(
   {
   
   actions: 
        [
        {
        account: contract,
        name: 'transfer',
        authorization: [{
                        actor: from,
                        permission: 'active'
                        }],
        data: {
              from: from,
              to: to,
              quantity: quantity,
              memo: memo
              }
        }
        ]
   })
   .then(
         data => 
             {    
             res.write(  JSON.stringify({ "respond":  "done" })  );  
             res.end();                 
             }
          )
    .catch(
           error => 
              {
              console.log('ERROR: ', error);
              
              res.write(  JSON.stringify({ "respond":  "error" })  );  
              res.end();  
              }
          );

 
   
} // transfer


 

