# Blockchain4openscience (bforos-bnav1:frontend)

The project website is [here](http://blockchain4openscience.com/#home).

-----
The project is curretly in development using frameworks and tools from Hyperledger, in particular [Fabric](https://hyperledger-fabric.readthedocs.io/en/release-1.1/) and [Composer](https://hyperledger.github.io/composer/latest/introduction/introduction)  

In a [previous posting](https://github.com/Blockchain4openscience/hyperledger) we focussed on deploying version 1 of the business network `bforos-bnav1` onto a a multi-organization Hyperledger Fabric.

In this posting we will be deploying into a [single-organization](https://hyperledger.github.io/composer/latest/tutorials/deploy-to-fabric-single-org) the same business network, start the rest-server and the user interfaces generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.1.

## Deployment of Hyperledger Fabric onto a single-organization  

Follow *steps one and two* from the tutorial: 1-Starting a Hyperledger Fabric network; 2-Exploring the Hyperledger Fabric network.

In *step three* create a folder called `certificates` and follow the instructions:
3-Building a connection profile and save to the folder `connection.json`.

Follow *step four* to locate the certificate and private key for the Hyperledger Fabric administrator and copying these certificates in the file `certificates`. Note that these certificates change every time we boostrap the fabric network.

Navigate to the folder you just created and follow *step five*, creating a business network card for the Hyperledger Fabric administrator:
`````
composer card create -p connection.json -u PeerAdmin -c Admin@org1.example.com-cert.pem -k 114aab0e76bf0c78308f89efc4b8c9423e31568da0c340ca187a9b17aa9a4457_sk -r PeerAdmin -r ChannelAdmin
`````
Follow *step six* to import the business network card for the Hyperledger Fabric administrator,
`````
composer card import -f PeerAdmin@fabric-network.card
`````
In *step seven* we install the Hyperledger Composer business network onto the Hyperledger Fabric peer nodes. To do this we must firts get a copy of the business network `bforos-bnav1` (defined in bna file, `bforos-bnav1@0.0.1.bna`). This file is located in the [Blockchain4openscience hyperledger repository](https://github.com/Blockchain4openscience/hyperledger). 
`````
composer network install -c PeerAdmin@fabric-network -a bforos-bnav1@0.0.1.bna
`````
In *step eight* we start the blockchain business network
`````
composer network start --networkName bforos-bnav1 --networkVersion 0.0.1 -A admin -S adminpw -c PeerAdmin@fabric-network
`````
In *step nine* we import the business network card for the business network administrator
`````
composer card import -f admin@bforos-bnav1.card
`````
In *step ten* we test the connection to the blockchain business network
`````
composer network ping -c admin@bforos-bnav1
`````
## Interacting with the business network using the REST server

To create the REST API run the following command: 
`````
composer-rest-server
`````
use `admin@bforos-bnav1` as the card name and select: never use namespaces; not to secure the generated API; yes to enable event publication; no to enable TLS security.

## Interacting with an Angular application

In order to build the user interfaces for this busness networ please clone the repository and follow the instructions

`````
git clone https://github.com/Blockchain4openscience/bforos-frontend
`````
Now navigate to the folder. Check that npm is installed by running
`````
npm -v
`````
otherwise run
`````
npm install
`````
Once the installation is complete run,
`````
npm start
`````
and navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

-----

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `npm test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `npm run e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `npm start`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
