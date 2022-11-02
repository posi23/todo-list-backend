import { Pool, QueryResult } from "pg";
import { db_config } from "../config";

const pool = new Pool(db_config);

const db = {
    pool,
    /**
     * Example Use Case. This is how you would use the function
     *
     *     const {rows} = await db.query('SELECT * FROM users WHERE id = $1', [params])
     *
     */
    query: (text: string, params: any[] = []) => {
        return pool.query(text, params);
    },
};

export default db;