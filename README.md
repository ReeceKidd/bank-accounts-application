# bitcoin-wallet-api

- [Objectives](#objectives)
- [Installation](#installation)
- [Usage](#usage)
- [Documentation](#documentation)
- [Testing](#testing)
- [Improvements](#improvements)


## Objectives
1. Create an api to view accounts and balances
2. Create an app to view accounts and balances
 
## Installation
Set up the following environment variables in a .env file inside of the api folder. 
````
NODE_ENV=test

PORT=3000

ACCOUNTS_API_URL=https://bankapi.gelt.finance/accounts

TRANSACTIONS_API_URL=https://bankapi.gelt.finance/transactions
````
Once your environment variables are set up run
```
yarn
```     

## Usage
Use the below command to run the node server locally
```
yarn dev
```

## Documentation
Documentation is defined inside of swagger.json
To view the documentation run
```
yarn dev
```
 and go to: 
**http://localhost:3000/swagger**



## Testing
The API has both unit and functional tests. 
```
 yarn test
```

## Improvements
* Authentication middleware should be provided on service layer. 


