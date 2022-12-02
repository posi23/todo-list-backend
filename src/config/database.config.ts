import { PoolConfig } from "pg";
import { config } from "./";
import url from 'url';
//THESE ARE PARAMS FOR SETTING UP THE POSTGRES DATABASE

const dbString: string = process.env.DATABASE_URL!;


let params: url.UrlWithStringQuery | undefined;
let auth: string[] | undefined;
if (dbString) {
    params = url.parse(dbString);
    auth = params.auth?.split(':');
}

const db_config: PoolConfig = process.env.DATABASE_URL ? {
    user: auth && auth[0],
    password: auth && auth[1],
    host: params && params.hostname!,
    port: params && Number(params.port),
    database: params && params.pathname?.split('/')[1],
    ssl: {
        rejectUnauthorized: false
    },
} :
    {
        host: config.database.HOST,
        port: config.database.PORT,
        database: config.database.DATABASE,
        user: config.database.USER,
    }

export default db_config;