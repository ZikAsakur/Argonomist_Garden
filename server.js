import jsonServer from 'json-server';
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Разрешаем CORS для всех доменов
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  next();
});

server.use(middlewares);
server.use(router);

const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`JSON Server is running on port ${PORT}`);
  console.log('API available at:');
  console.log(`http://localhost:${PORT}`);
  console.log('Endpoints:');
  console.log(`  GET    /visitors`);
  console.log(`  POST   /visitors`);
  console.log(`  PATCH  /visitors/:id`);
  console.log(`  PUT    /visitors/:id`);
  console.log(`  DELETE /visitors/:id`);
});