pragma solidity ^0.4.17;

contract InboxFactory {
    mapping(address => address) public deployedInbox;

    function createInbox() public {
        address newInbox = new Inbox(msg.sender);
        deployedInbox[msg.sender]=newInbox;
    }

    function getDeployedInbox() public view returns (address) {
        return deployedInbox[msg.sender];
    }
}

contract Inbox{
             
    struct Message {
        address fromAddress;
        address toAddress;
        string hash;
        string fileName;
        string timeStamp;
    }

    address public manager;

    Message[] private messages;
     
    function Inbox(address creator) public {
        manager = creator;
    }
    
       modifier restricted() {
        require(msg.sender == manager);
        _;
    }
    
    function insertMessage(address fromAddress, address toAddress, string hash, string fileName, string timeStamp) public restricted {
        Message memory newMessage = Message({
           fromAddress: fromAddress,
           toAddress: toAddress,
           hash: hash,
           fileName: fileName,
           timeStamp: timeStamp
        });

        messages.push(newMessage);
    }
     
    function getMessages(uint index) public restricted view returns (address,address,string,string,string) {
          Message storage retrieveMessage = messages[index];
          return ( retrieveMessage.fromAddress, retrieveMessage.toAddress, retrieveMessage.hash, retrieveMessage.fileName, retrieveMessage.timeStamp);
    }
    
    function getMessagesCount() public restricted view returns (uint) {
        return messages.length;
    }
     
}