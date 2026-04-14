import express from 'express';
import { pool } from '../db/connect.js';

const db = pool();

const port = 3002;
const server = express();
server.use(express.static('frontend'));
server.use(onEachRequest);
server.get('/api/artist/:id', onGetArtistById);


async function onGetArtistById(request, response) {
    const id = request.params.id;
    const dbResult = await db.query(`
        select stage_name, nationality
        from   artists
        where  artist_id = $1`, [id]);
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