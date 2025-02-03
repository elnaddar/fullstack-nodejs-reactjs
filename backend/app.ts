// @ts-types="npm:@types/express@5"
import express from 'express';
import router from './routes/index.ts';
import middlewares from './middlewares/index.ts';
import errorsMiddleware from './middlewares/errors.ts';
import mongoose from 'mongoose';

const app = express();

app.use(middlewares);
app.use(router);
app.use(errorsMiddleware);

mongoose
  .connect(Deno.env.get('MONGO_URI')!)
  .then((_) => {
    console.log('Done...');
    app.listen(3000);
  })
  .catch(console.log);
