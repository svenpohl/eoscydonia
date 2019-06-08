# eoscydonia

**BETA/UNTESTED/PROOF-OF-CONCEPT** - Lightweight json-API server wallet for EOS transactions. I.E. for PHP-applications who wants to send EOS or detect Token payments.
08/june/2019 - V0.01

**NO WARRENTY - NOT REVIEWED OR TESTED**

# Versions
Version | Date | Description
------------ | ------------- | -------------
**V0.01** | *08/june/2019* | *Proof of Concept / untested draft*


# Usage
* Send Transactions (EOS and other EOSIO token)
* Detecting last payments

# Installation
## Testing
1. node cydonia.js

## Permanent installation
1. npm install pm2 -g
2. pm2 start cydonia


# Configuration

## config.js
```javascript
exports.accounts =
  [
      {"account": "myeosaccount", "whitelistip": "", "keyprovider":"5KPwaxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxhRnp5P" , "secret":"yoursecretpassphrase"},
      {"account": "otheraccount", "whitelistip": "", "keyprovider":"5KNxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxgMw4LL" , "secret":"anothersecretpassphrase" },
      {"account": "testtesttest", "whitelistip": "", "keyprovider":"[privatekey]" }
  ];
```

# Curl Syntax 
(Replace xxx.xxx.xxx.xx with your server IP-address)

## Ping
```javascript
curl --request POST  --url http://xxx.xxx.xxx.xxx:443  --data '{"action":"ping" }'
```

## Get account balance (only EOS)
```javascript
curl --request POST  --url http://xxx.xxx.xxx.xxx:443  --data '{"action":"getbalance","account": "youreosaccount"}'
```

## Send EOS transaction/transfer
```javascript
curl --request POST  --url xxx.xxx.xxx.xxx:443  --data '{"action":"transfer","contract": "eosio.token",  "from":"youreosaccount", "to":"eosiocydonia", "memo":"A EOS donation for this project", "amount":"0.1", "token":"EOS" }'
```

## Send RIDL transaction/transfer
```javascript
curl --request POST  --url xxx.xxx.xxx.xxx.:443  --data '{"action":"transfer","contract": "ridlridlridl",  "from":"youreosaccount", "to":"otheraccount", "memo":"A RIDL donation", "amount":"1000.0000", "token":"RIDL" }'
```

## Get last transfer actions (ingoing/outgoing) from an account
```javascript
curl --request POST  --url http://xxx.xxx.xxx.xxx:443  --data '{"action":"lastactions","account": "investingwad", "count":"50"}'
```

## Check payment (ingoing) for an account with a given memo
```javascript
curl --request POST  --url http://xxx.xxx.xxx.xxx:443  --data '{"action":"checkpayment","contract": "eosio.token", "amount":"0.1", "token":"EOS", "to":"youreosaccount", "memo":"Payment 123", "maxseconds":"999999"}'
```

### Example output
```javascript
{ 
"actions" : [
{"seq": "136388","time": "1559749823",   "contract":"eosio.token" , "from":"eosbetbank11" ,  "to":"investingwad" ,  "quantity":"0.0003 EOS"  , "amount":"0.0003" , "token":"EOS" ,  "memo":"Bet id: 7635069280903098061 -- Referral reward! Play: https://eosbet.io" },
{"seq": "136389","time": "1559749844",   "contract":"eosio.token" , "from":"eosbetbank11" ,  "to":"investingwad" ,  "quantity":"0.0020 EOS"  , "amount":"0.0020" , "token":"EOS" ,  "memo":"Bet id: 42644468152716514 -- Referral reward! Play: https://eosbet.io" },
{"seq": "136390","time": "1559749865",   "contract":"eosio.token" , "from":"eosbetbank11" ,  "to":"investingwad" ,  "quantity":"0.0002 EOS"  , "amount":"0.0002" , "token":"EOS" ,  "memo":"Bet id: 9317337858404062912 -- Referral reward! Play: https://eosbet.io" },
{"seq": "136391","time": "1559749873",   "contract":"eosio.token" , "from":"eosbetbank11" ,  "to":"investingwad" ,  "quantity":"0.0002 EOS"  , "amount":"0.0002" , "token":"EOS" ,  "memo":"Bet id: 11063980520862980700 -- Referral reward! Play: https://eosbet.io" },
{"seq": "136392","time": "1559749880",   "contract":"eosio.token" , "from":"eosbetbank11" ,  "to":"investingwad" ,  "quantity":"0.0002 EOS"  , "amount":"0.0002" , "token":"EOS" ,  "memo":"Bet id: 16105407466258061608 -- Referral reward! Play: https://eosbet.io" },
}
```
...
```javascript
{
{"seq": "136435","time": "1559971323",   "contract":"eosio.token" , "from":"eosbetbank11" ,  "to":"investingwad" ,  "quantity":"0.0002 EOS"  , "amount":"0.0002" , "token":"EOS" ,  "memo":"Bet id: 7434551657669895117 -- Referral reward! Play: https://eosbet.io" },
{"seq": "136436","time": "1559971341",   "contract":"eosio.token" , "from":"eosbetbank11" ,  "to":"investingwad" ,  "quantity":"0.0002 EOS"  , "amount":"0.0002" , "token":"EOS" ,  "memo":"Bet id: 10906163770484662483 -- Referral reward! Play: https://eosbet.io" },
{"seq": "136437","time": "1559976253",   "contract":"pizzatotoken" , "from":"pizzaairdrop" ,  "to":"investingwad" ,  "quantity":"10.7757 PIZZA"  , "amount":"10.7757" , "token":"PIZZA" ,  "memo":"pizza.live, redefine defi." }]
}
```


