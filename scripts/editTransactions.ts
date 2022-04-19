import fs = require('fs');
import path = require('path');
import { TransactionData } from '../src/mockAPI';
import { AddressObjectBase, MappedAddressObject } from '../src/types/address';

interface JsonAddressObject extends AddressObjectBase {
  address1: string;
  address2: never;
}

interface AddressessJsonStructure {
  addresses: JsonAddressObject[];
  attribution: string[];
}

interface TransactionsJsonStructure {
  properties: TransactionData[];
  total: number;
}

const mapAddress = (addressObj: JsonAddressObject): MappedAddressObject => ({
  address: `${addressObj.address1}${addressObj.address2 ? ' ' + addressObj.address2 : ''}`,
  city: addressObj.city,
  state: addressObj.state,
  postalCode: addressObj.postalCode,
  coordinates: addressObj.coordinates
});
const rootDir = path.dirname(__dirname);
const transactionsPath = path.join(rootDir, 'src/mockAPI/transactions.json');
const addresses = fs.readFileSync(path.join(__dirname, 'addressess-us-100.min.json'));
const transactions = fs.readFileSync(transactionsPath);
const decoder = new TextDecoder();
const addressesJson: AddressessJsonStructure = JSON.parse(decoder.decode(addresses));
const transactionsJson: TransactionsJsonStructure = JSON.parse(decoder.decode(transactions));
const mappedTransactions = transactionsJson.properties.map((t, i) => ({
  ...t,
  address: mapAddress(addressesJson.addresses[i])
}));
const newTransactionsJson: TransactionsJsonStructure = {
  properties: mappedTransactions,
  total: mappedTransactions.length
};

fs.writeFileSync(path.join(path.dirname(transactionsPath), 'transactions2.json'), JSON.stringify(newTransactionsJson));

process.exit(0);
