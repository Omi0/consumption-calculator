# ConsumptionCalculator

This [calculator](https://consumption-calculator-cc81b.firebaseapp.com) is used to estimate annual energy costs based on annual consumption value. Front-end is written on Angular 7. RestAPI is written on Node.JS Express and hosted on Google Cloud Functions. Utilizes Firebase hosting.

![widget preview](https://raw.githubusercontent.com/Omi0/consumption-calculator/master/preview.png)

## Requirements

[Angular 7](https://angular.io/)
[Firebase](https://firebase.google.com/)

## UI Details
1. UI has 2 different routes: one for input and another for results. Parameters are passed to url via encoded Base64 string. This allows customers to share the result page.
2. There are 2 key listeres: enter on input to get results and esc on result page to get back
3. Basic Routes animation to smooth out transitions

## Calculation Model

Calculation configs inherits following model. This model allows you to add many different customizable tariffs:

```
{
    name: string;
    configs:[
        {
        daily_charge: number;
        daily_rate: number;
        threshold: number;
        },
        ...
    ]
}
```
Existing Tariffs: 

```
{
    name: "Packaged tariff",
    configs:[{
        daily_charge: 2.19178082192, 
        daily_rate: 0, 
        threshold: 4000
    },
    {
        daily_charge: 0, 
        daily_rate: 0.30, 
        threshold: 999999999
    }]
}
```

```
{
    name: "Packaged tariff",
    configs:[{
        daily_charge:0.16438356164, 
        daily_rate: 0.22, 
        threshold: 999999999
    }]
}
```



### Adding new tariff

To add new tariff you need to send POST request to following endpoint specified tariff model via params. 
Param validation is taking place. 
```
https://us-central1-consumption-calculator-cc81b.cloudfunctions.net/tariffsAdd
```

## RestAPI

RestAPI endpoints is located under `functions/src` directory. Info:
1. index.ts autoloads automatically functions with `.export.js` suffix
2. Basic query and params validations is processed by `joi`
3. Cost calculation logic is under `tariff.function.ts` file


## Unit tests

Unin tests are written and can be run via `ng test`

## Deployments

Prior deployments app must pass `lint` and `karma` tests. To deploy to Firebase run following commands:

1. Install Firebase CLI / firebase-tools: `npm install -g firebase-tools`
2. Login into Firebase account: `firebase login`
3. Init firebase and create new project (pickup Hosting, Functions, DB): `firebase init`
4. Deploy environment: `npm run deploy`

## Known security flaws

1. CORS requests
2. Absence of request limiter
