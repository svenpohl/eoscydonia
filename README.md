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
'''javascript
curl --request POST  --url http://xxx.xxx.xxx.xxx:443  --data '{"action":"ping" }'
'''
