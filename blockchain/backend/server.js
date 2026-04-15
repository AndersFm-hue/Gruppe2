import express from 'express';
import { pool } from '../db/connect.js';

const db = pool();

const port = 3003;
const server = express();
server.use(express.static('frontend'));
server.use(onEachRequest);
server.get('/api/artist/:id', onGetArtistById);


async function onGetAdressesByCurrency(request, response) {
    const id = request.params.id;
    const dbResult = await db.query(`
        select address_name
        from   addresses
        join transfers using (sender_address_id)
        join transfers using (receiver_address_id)
        join currency using (currency_id) 
        where  currency_symbol = $1`, [id]); // Den skal væk 
    const rows = dbResult.rows;
    if (rows.length === 0) {
        response.sendStatus(404);
    } else {
        response.json(rows[0]);
    }
}


function onServerReady() {
    console.log('Webserver running on port', port);
}

function onEachRequest(request, response, next) {
    console.log(new Date(), request.method, request.url);
    next();
}