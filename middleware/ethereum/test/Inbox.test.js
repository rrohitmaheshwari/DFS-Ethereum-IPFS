const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const compiledFactory = require('../build/InboxFactory.json');
const compiledInbox = require('../build/Inbox.json');

const {interface, bytecode} = require('../compile');

let accounts;
let inboxFactory;


describe('Solidity Contract Testing', async () => {


    it('Test 1: Deploys a Factory contract', async () => {
        try {
            accounts = await web3.eth.getAccounts();
            assert.ok((accounts.length > 0), "List of account succesfully generated");

            inboxFactory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
                .deploy({data: compiledFactory.bytecode})
                .send({from: accounts[0], gas: '1000000'});


            assert.ok(inboxFactory.options.address, "Inbox Factory Deployed");
        }
        catch (err) {
            assert.ok(false, "Inbox Factory Deployment failed");
        }
    });

    it('Test 2: Creating new Inbox for user 1', async () => {

        try {
            await inboxFactory.methods.createInbox().send({from: accounts[0], gas: '1000000'});
            assert(true, "New Inbox 1 created");
        }

        catch (err) {
            assert(false);
        }

    });

    it('Test 3: Creating new Inbox for user 2', async () => {

        try {
            await inboxFactory.methods.createInbox().send({from: accounts[1], gas: '1000000'});
            assert(true, "New Inbox 2 created");
            assert(true);
        }

        catch (err) {
            assert(false);
        }


    });

    it('Test 4: Getting Inbox address for Valid Users', async () => {

        try {
            let inboxAddress1 = await inboxFactory.methods.getDeployedInbox().call({from: accounts[0]});
            assert.ok(inboxAddress1, "Got address of Inbox 1");


            let inboxAddress2 = await inboxFactory.methods.getDeployedInbox().call({from: accounts[1]});
            assert.ok(inboxAddress2, "Got address of Inbox 2");

        }

        catch (err) {
            assert(false);
        }


    });

    it('Test 4: Getting Inbox address for invalid Users', async () => {

        try {
            let inboxAddress1 = await inboxFactory.methods.getDeployedInbox().call({from: accounts[2]});
            assert.equal(inboxAddress1, "0x0000000000000000000000000000000000000000", "Inbox not found");
        }

        catch (err) {
            assert(false);
        }


    });

    it('Test 5: Sending message from user 1 to user 2', async () => {

        try {
            let inboxAddress1 = await inboxFactory.methods.getDeployedInbox().call({from: accounts[0]});
            assert.ok(inboxAddress1, "Got address of Inbox 1");
            assert.notEqual(inboxAddress1, "0x0000000000000000000000000000000000000000", "Inbox found");


            let inboxAddress2 = await inboxFactory.methods.getDeployedInbox().call({from: accounts[1]});
            assert.notEqual(inboxAddress2, "0x0000000000000000000000000000000000000000", "Inbox found");

            let inbox = new web3.eth.Contract(
                JSON.parse(compiledInbox.interface),
                inboxAddress2
            );


            let inboxDataCount = await inbox.methods.getMessagesCount().call({from: accounts[1]});


            assert.equal(inboxDataCount, 0, "No messages");

            await inbox.methods.insertMessage(accounts[0], accounts[1], "filehash", "filename", "timestamp").send({
                from: accounts[0],
                gas: '1000000'
            })

            inboxDataCount = await inbox.methods.getMessagesCount().call({from: accounts[1]});

            assert.equal(inboxDataCount, 1, "One New message found");


        }
        catch (err) {
            assert(false);
        }

    });


    it('Test 6: Reading message and validating its content', async () => {

        try {

            let inboxAddress2 = await inboxFactory.methods.getDeployedInbox().call({from: accounts[1]});
            assert.notEqual(inboxAddress2, "0x0000000000000000000000000000000000000000", "Inbox found");

            let inbox = new web3.eth.Contract(
                JSON.parse(compiledInbox.interface),
                inboxAddress2
            );

            let result = await inbox.methods.getMessages(0).call({from: accounts[1]});

            assert.equal(result['0'], accounts[0], "Same From Address");
            assert.equal(result['1'], accounts[1], "Same To Address");
            assert.equal(result['2'], "filehash", "Same hash");
            assert.equal(result['3'], "filename", "Same file Name");
            assert.equal(result['4'], "timestamp", "Same timestamp");
        }
        catch (err) {
            assert(false);
        }

    });

})
;