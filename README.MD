# Introduction
This tutorial shows how to add a Bitcoin Lightning checkout page to your react app. This is useful if you would like to add the option of monetizing your app through Bitcoin Lightning. 

# Steps to Run Project
1. Get API Keys at [app.minatopay.com/api-keys](https://app.minatopay.com/api-keys)
2. Clone Project
3. Replace the `API_KEY` variable in `src/components/Pricing.js` with your API Key.
4. cd into the project and run `yarn`
5. run `yarn start`

# Disclaimer
This tutorial calls the [MinatoPay API](https://minatopay.com/) directly from the frontend (client). In a real deployed app, you should do this from the backend, as calling the API directly from the frontend exposes the API key. A tutorial incorporating a backend will be published at a later date.