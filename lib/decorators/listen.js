export default function (server) {
  server.get('/health', (_, response) => {
    response.send('🤙🏼');
  });

  server.listen(process.env.PORT, function () {
    console.log(`[READY]: ${this.address().port}`);
  });

  return Promise.resolve(server);
}
