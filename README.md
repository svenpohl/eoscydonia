# eoscydonia

BETA/UNTESTED/PROOF-OF-CONCEPT - Lightweight json-API server wallet for EOS transactions. I.E. for PHP-applications who wants to send EOS or detect Token payments.

# Usecase
* Send Transactions (EOS and other EOSIO token)
* Detecting last payments

# Installation
## Testing
1. node cydonia.js

## Permanent installation
1. npm install pm2 -g
2. pm2 start cydonia

# Curl Syntax 
(Replace xxx.xxx.xxx.xx with your server IP-address)

## Ping
```javascript
curl --request POST  --url http://xxx.xxx.xxx.xxx:443  --data '{"action":"ping" }'
```

## Get account balance (only EOS)
```javascript
curl --request POST  --url http://xxx.xxx.xxx.xxx  --data '{"action":"getbalance","account": "youreosaccount"}'
```

## Send EOS transaction/transfer
```javascript
curl --request POST  --url xxx.xxx.xxx.xxx:443  --data '{"action":"transfer","contract": "eosio.token",  "from":"youreosaccount", "to":"eosiocydonia", "memo":"A EOS donation for this project", "amount":"0.1", "token":"EOS" }'
```

## Send RIDL transaction/transfer
```javascript
curl --request POST  --url xxx.xxx.xxx.xxx.238:8080  --data '{"action":"transfer","contract": "ridlridlridl",  "from":"youreosaccount", "to":"otheraccount", "memo":"A RIDL donation", "amount":"1000.0000", "token":"RIDL" }'
```

## Get last transfer actions (ingoing/outgoing) from an account
```javascript
curl --request POST  --url http://xxx.xxx.xxx.xxx  --data '{"action":"lastactions","account": "investingwad", "count":"50"}'
```

## Check payment (ingoing) for an account with a given memo
```javascript
curl --request POST  --url http://xxx.xxx.xxx.xxx:8080  --data '{"action":"checkpayment","contract": "eosio.token", "amount":"0.1", "token":"EOS", "to":"youreosaccount", "memo":"Payment 123", "maxseconds":"999999"}'
```


