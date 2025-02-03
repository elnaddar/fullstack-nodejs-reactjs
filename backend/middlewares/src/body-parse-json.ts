// @ts-types="npm:@types/express@5"
import { Router } from 'express';
import bodyParser from 'body-parser';

const jsonParser = Router();

jsonParser.use(bodyParser.json());

export default jsonParser;
