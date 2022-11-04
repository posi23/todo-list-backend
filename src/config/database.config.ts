import { PoolConfig } from "pg";
import { config } from "./";
//THESE ARE PARAMS FOR SETTING UP THE POSTGRES DATABASE
const db_config: PoolConfig = {
    host: config.database.HOST,
    port: config.database.PORT,
    database: config.database.DATABASE,
    // password: config.database.PASSWORD,
    user: config.database.USER,
};

export default db_config;