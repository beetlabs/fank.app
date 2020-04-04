import { cors, db, listen } from './decorators';

export default function (server) {
  return cors(server).then(db).then(listen);
}
