import { PoolConfig } from "pg";
import { config } from "./";
import url from 'url';
//THESE ARE PARAMS FOR SETTING UP THE POSTGRES DATABASE

const dbString: string = process.env.DATABASE_URL!;

const params = url.parse(dbString);
const auth = params.auth?.split(':');

// const config2: PoolConfig = {
//     user: auth && auth[0],
//     password: auth && auth[1],
//     host: params.hostname!,
//     port: Number(params.port),
//     database: params.pathname?.split('/')[1],
//     ssl: true
// };

// const db_config: PoolConfig = {
//     host: config.database.HOST,
//     port: config.database.PORT,
//     database: config.database.DATABASE,
//     // password: config.database.PASSWORD,
//     user: config.database.USER,
// };

const db_config: PoolConfig = process.env.DATABASE_URL ? {
    user: auth && auth[0],
    password: auth && auth[1],
    host: params.hostname!,
    port: Number(params.port),
    database: params.pathname?.split('/')[1],
    ssl: true
} :
    {
        host: config.database.HOST,
        port: config.database.PORT,
        database: config.database.DATABASE,
        // password: config.database.PASSWORD,
        user: config.database.USER,
    }

export default db_config;