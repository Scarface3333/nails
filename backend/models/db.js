// /models/db.js
import pkg from 'pg';
const { Pool } = pkg;
import  dbConfig  from '../config/dbConfig.js';

const pool = new Pool(dbConfig);

export default pool;
