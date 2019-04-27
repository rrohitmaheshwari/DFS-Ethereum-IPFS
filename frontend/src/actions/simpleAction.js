import web3 from '../web3';
import InboxFactoryABI from '../helper/build/InboxFactory.json';
import InboxABI from '../helper/build/Inbox.json';
import { RESTService } from "../api/api";

/*
 src/actions/simpleAction.js
*/
export const simpleAction = () => async dispatch => {


    let inboxFactoryAddress = await RESTService.fetchInboxAddress();
    inboxFactoryAddress = inboxFactoryAddress.data.msg;

    let accounts = await
        web3.eth.getAccounts();

    console.log('accounts:' + accounts[0])

    let instanceInboxFactory = new web3.eth.Contract(
        JSON.parse(InboxFactoryABI.interface),
        inboxFactoryAddress
    );

    let inboxAddress = await
        instanceInboxFactory.methods.getDeployedInbox().call({from: accounts[0]});
    console.log('inboxAddress:' + inboxAddress)

    let instanceInbox = new web3.eth.Contract(
        JSON.parse(InboxABI.interface),
        inboxAddress
    );

    let inboxDataCount = await
        instanceInbox.methods.getMessagesCount().call({from: accounts[0]});

    console.log('inboxDataCount:' + inboxDataCount)

    const inboxData = await
        Promise.all(
            Array(parseInt(inboxDataCount))
                .fill()
                .map((element, index) => {
                    return instanceInbox.methods.getMessages(index).call({from: accounts[0]});
                })
        );

    let temp = [];
    for (let i = 0; i < inboxData.length; i++) {
        let tempObj = {};
        tempObj.fromAddress = inboxData[i][0];
        tempObj.toAddress = inboxData[i][1];
        tempObj.hash = inboxData[i][2];
        tempObj.fileName = inboxData[i][3];
        tempObj.timeStamp = inboxData[i][4];
        temp.push(tempObj);
    }


    //get call to fetch details and pass payload to dispatch
    dispatch({
        type: 'SIMPLE_ACTION',
        payload: temp,
    })
}