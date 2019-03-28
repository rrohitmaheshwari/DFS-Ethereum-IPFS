import web3 from './web3';
import Inbox from './build/Inbox.json';

export default address => {
  return new web3.eth.Contract(JSON.parse(Inbox.interface), address);
};
