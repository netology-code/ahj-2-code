const Router = require('koa-router');
const subscriptions = require('../../db/db');

const router = new Router();

router.post('/subscriptions', (ctx) => {
  console.log(typeof ctx.request.body);
  console.log(ctx.request.body);

  ctx.response.body = 'subscriptions';

  const { name, phone } = ctx.request.body;

  ctx.response.set('Access-Control-Allow-Origin', '*');

  if (subscription.data.some(sub => sub.phone === phone)) {
    ctx.response.status = 400;
    ctx.response.body = { status: "subscriprion exists" };

    return;
  }

  subscriptions.add({ name, phone });

  ctx.response.body = { status: "OK" };
});

router.delete('/subscriptions/:phone', (ctx) => {
  const { phone } = ctx.params;

  ctx.response.set('Access-Control-Allow-Origin', '*');

  if (subsriptions.data.every(sub => sub.phone !== phone)) {
    ctx.response.status = 400;
    ctx.response.body = { status: "subscriprion doesn\'t exists" };

    return;
  }

  subscriptions.data = subscriptions.data.filter(sub => sub.phone !== phone);

  ctx.response.body = { status: "OK" };
});

module.exports = router;
