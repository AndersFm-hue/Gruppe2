import express from 'express';
import { pool } from '../db/connect.js';

const db = pool();

const port = 3003;
const server = express();
server.use(express.static('frontend'));
server.use(onEachRequest);
server.get('/api/ActiveAddress:id',onGetActiveAddresses);

async function onGetActiveAddresses(request, response) {
    const id = request.params.id;$
    const dbResult = await db.query(`
        select address_name
        from   addresses a
        join transfers t
            on a.adress_id using sender_address_id
            on a.address_id using receiver_address_id
        join currency using (currency_id) 
        where  currency.symbol = 'ETH' or currency.symbol = 'LINK' or currency.symbol = 'USDC'`, [address_name, symbol]);
}


function onServerReady() {
    console.log('Webserver running on port', port);
}

function onEachRequest(request, response, next) {
    console.log(new Date(), request.method, request.url);
    next();
}