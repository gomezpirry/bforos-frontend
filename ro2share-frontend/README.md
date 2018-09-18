# RO2SHARE-client
GUI for [RO2SHARE](https://github.com/LinkingDataIO/RO2SHARE)

## Installation
Include your ORCID APP Client ID in src/environments/enviroment.ts
### Using NPM
```bash
git clone https://github.com/LinkingDataIO/RO2SHARE-client.git
cd RO2SHARE-client
npm install
npm start
```

### Using Dockerfile
```bash
git clone https://github.com/LinkingDataIO/RO2SHARE-client.git
cd RO2SHARE-client
sudo docker build -t username:RO2SHARE-client .
sudo docker run -p 4200:4200 username:RO2SHARE-client
```