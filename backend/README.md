# Backend for SPA Web App Challenge #2

> An Express.js project that presents an API at /send and consumes the Mailgun API to send an email.

## Local Build Setup

``` bash
# install dependencies
npm install

# edit and copy config for local dev
# Note: you will neeed to supply your Mailgun API credentials here
cp .env_dev .env

# serve with hot reload at localhost:3000
npm run dev

# run all tests
npm test
```

## What's Working

* An Express.js backend serving:
    * An endpoint at /send to receive POST calls
    * An endpoint at /docs to present Swagger Doc 

## What's Missing

* No API authentication
* Call to Mailgun API only tries once instead of trying a few times before returning to the /send caller
* Returning error codes fromm /send could be nicer
