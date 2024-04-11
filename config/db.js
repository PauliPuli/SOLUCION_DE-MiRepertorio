import pg from "pg";
const { Pool }= pg;
process.loadEnvFile();

const {DB_HOST, DB_PASSWORD, DB_DATABASE, DB_USER, DB_PORT} = process.env;

const config = {
    user: DB_USER,
    password: DB_PASSWORD,
    host: DB_HOST,
    database:DB_DATABASE,
    port: DB_PORT,
    allowExitOnIdle: true,
    }
    
    const db = new Pool(config);

export default db; //en otros ejercicios lo importábamos como 'pool'