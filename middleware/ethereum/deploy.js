const HDWalletProvider = require('truffle-hdwallet-provider');
const path = require('path');
const Web3 = require('web3');
const compiledFactory = require('./build/InboxFactory.json');
const fs = require('fs-extra');

const filePath = path.resolve(__dirname);

const provider = new HDWalletProvider(
  'pink song seed ladder senior bar game oxygen chicken pilot sweet arrive',
  'https://rinkeby.infura.io/v3/a86317d87a6146efa977516eeaf5f9a9'
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(
    JSON.parse(compiledFactory.interface)
  )
    .deploy({ data: '0x' +compiledFactory.bytecode })
     .send({from: accounts[0] });

  console.log('Contract deployed to', result.options.address);

  let outputStructure={"deployAddress":result.options.address};


fs.outputJsonSync(
    path.resolve(filePath, 'deployed.json'),
    outputStructure
  );

  process.exit(22);
};
deploy();
