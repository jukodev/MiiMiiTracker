import { Request, Response } from 'express';
require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const helpers = require('./tools/helpers');
const w2g = require('./routes/v1/w2g');
const discordBot = require('./discord-bot');
const app = express();

app.use(cors({ origin: '*' }));
app.use(logger('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req: Request, res: Response) => {
  res.send('mii mii');
});

app.use('/w2g', w2g);

app.listen(process.env.PORT ?? 4000, () => {
  helpers.log(`express server is running on port ${process.env.PORT ?? 4000}`);
  discordBot.init();
});
