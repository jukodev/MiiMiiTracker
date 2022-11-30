import { Request, Response } from 'express';
export {};

const { Router } = require('express');
const w2g = Router();
const discordBot = require('../../discord-bot');
const api = require('../../tools/api');
const helpers = require('../../tools/helpers');
const { requireAuth } = require('../../tools/middlewares');

w2g.post('/', requireAuth, (req: Request, res: Response) => {
  if (req.body?.url !== undefined) {
    const err = new Error();
    err.message = 'Missing url parameter "url"';
    err.name = 'missing-parameter';
    res.status(402).json(err);
  } else {
    api
      .createW2GRoom(req.body.url)
      .then((w2g: string) => {
        discordBot.sendMessageToServer(w2g);
        helpers.log('created w2g room for ' + w2g + ' from extension');
        res.status(200).json({ data: { url: w2g } });
      })
      .catch((err: Error) => {
        res.status(400).json({ err });
      });
  }
});

module.exports = w2g;
