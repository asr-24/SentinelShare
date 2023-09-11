# SentinelShare

This project aims to create a tamperproof data sharing platform that can be used to securely share data between organisations and third parties

[Task Tracker](http://bit.ly/TaskTracker_SentinelShare)

## Folder structure

`/application` - Reactjs initialized frontend app; server.js is Token API
`/web3` - Truffle initialized to interact with smart contracts and Nodejs app to interact with IPFS and provide authentication

## Installation

- Go to `/application` and run `npm install`
- Go to `/web3` and run `npm install`

## Usage

- In /application, run `node server.js`
- Open a new terminal and run `npm start` to start Reactjs
- In /web3, run `node app.js` to fetch the CID for the AuthDB

---

Authors: Yash Burshe, Ridhima Mishra, Arushi Rai
