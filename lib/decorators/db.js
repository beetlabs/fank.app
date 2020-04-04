import massive from 'massive';

export default async function (server) {
  return massive({
    database: process.env.DB_DATABASE,
    user: process.env.DB_USERNAME,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: true,
  })
    .then((db) => server.set('db', db))
    .then((server) => {
      if (server.get('db')) {
        console.log('== DATABASE INITIALIZED ==');
      } else {
        console.log('xx ERROR xx');
      }

      return server;
    });
}
