import web3 from './web3';
import InboxFactory from './build/InboxFactory.json';
const deployedFactory= require('./deployed.json');

const instance = new web3.eth.Contract(
  JSON.parse(InboxFactory.interface),
  deployedFactory[deployAddress]
);

//this address is the InboxFactory deployed address ( generated after running node deploy.js)

export default instance;
