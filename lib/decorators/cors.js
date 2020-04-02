import cors from 'cors';

export default function(server) {
  server.use(cors());

  console.log(`== CORS INITIALIZED ==`);

  return Promise.resolve(server);
}