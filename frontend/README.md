# Frontend for SPA Web App Challenge #2

> A Vue.js frontend that connects to the backend endpoint on /send to send an email. 

## Local build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## What's Working

* An Vue.js frontend:
    * Wizard style SPA that asks the user to input email details (to, cc, bcc, subject and meesage body)
     

## What's Missing

* Call to backend API only tries once instead of trying a few times before returning to the user
* No tests
* Some of the validation feedback is a bit generic
