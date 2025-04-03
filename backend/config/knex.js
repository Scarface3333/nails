import knex from 'knex';
import dbConfig from './dbConfig';  // Импорт правильно названного файла


const db = knex(dbConfig);  // Создание соединения с базой данных

// Использование db для выполнения запросов
db('your_table')
  .select('*')
  .then(rows => console.log(rows))
  .catch(error => console.error(error));
