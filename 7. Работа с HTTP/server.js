const fs = require('fs');
const http = require('http');
const Koa = require('koa');
const koaBody = require('koa-body');
const koaStatic = require('koa-static');
const path = require('path');
const uuid = require('uuid');

const app = new Koa();

let subscriptions = [];

const public = path.join(__dirname, '/public');

app.use(koaStatic(public));

app.use(koaBody({
  urlencoded: true,
  multipart: true,
}));

app.use((ctx, next) => {
  if (ctx.request.method !== 'OPTIONS') {
    next();

    return;
  }

  ctx.response.set('Access-Control-Allow-Origin', '*');

  ctx.response.set('Access-Control-Allow-Methods', 'DELETE, PUT, PATCH, GET, POST');

  ctx.response.status = 204;
});

app.use((ctx, next) => {
  if (ctx.request.method !== 'POST' && ctx.request.url !== '/upload') {
    next();

    return;
  }

  ctx.response.set('Access-Control-Allow-Origin', '*');

  console.log(ctx.request.files);

  let fileName;

  try {
    const public = path.join(__dirname, '/public');

    const { file } = ctx.request.files;

    const subfolder = uuid.v4();

    const uploadFolder = public + '/' + subfolder;

    fs.mkdirSync(uploadFolder)
    fs.copyFileSync(file.path, uploadFolder + '/' + file.name);

    fileName = '/' + subfolder + '/' + file.name;
  } catch (error) {
    ctx.response.status = 500;
    
    return;
  }

  ctx.response.body = fileName;
});

app.use((ctx, next) => {
  if (ctx.request.method !== 'POST') {
    next();

    return;
  }

  console.log(ctx.request.body);

  const { name, phone } = ctx.request.body;

  ctx.response.set('Access-Control-Allow-Origin', '*');

  if (subscriptions.some(sub => sub.phone === phone)) {
    ctx.response.status = 400;
    ctx.response.body = 'subscription exists';

    return;
  }

  subscriptions.push({ name, phone });

  ctx.response.body = 'OK';

  next();
});

app.use((ctx, next) => {
  if (ctx.request.method !== 'DELETE') {
    next();

    return;
  }
  
  console.log(ctx.request.query);

  const { phone } = ctx.request.query;

  ctx.response.set('Access-Control-Allow-Origin', '*');

  if (subscriptions.every(sub => sub.phone !== phone)) {
    ctx.response.status = 400;
    ctx.response.body = 'subscription doesn\'t exists';

    return;
  }

  subscriptions = subscriptions.filter(sub => sub.phone !== phone);

  ctx.response.body = 'OK';

  next();
});

const server = http.createServer(app.callback());

const port = process.env.PORT || 7070;

server.listen(port, (err) => {
  if (err) {
    console.log(err);

    return;
  }

  console.log('Server is listening to ' + port);
});
