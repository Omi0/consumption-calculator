import * as functions from 'firebase-functions';
import * as cors from 'cors';
import * as express from 'express';
import * as admin from 'firebase-admin';
import * as joi from 'joi';
import { Tariff, tariffValidator } from './tariff.model';
import { errorResponse } from '../core/core.functions';
import { ApiResponse } from '../core/core.models';

// firebase-admin must be initialized only once
if (!admin.apps.length) {
  admin.initializeApp();
  // timestampsInSnapshots is to hide The behavior for Date objects stored in Firestore from firebase Log
  admin.firestore().settings({ timestampsInSnapshots: true });
}

const firestore = admin.firestore();

const app = express();

app.use(cors({ origin: true }));

app.post('*', async (req, res) => {
  try {
    const body: Tariff = await joi.validate(
      req.body,
      tariffValidator.requiredKeys('name', 'configs'),
      { abortEarly: false }
    );

    await firestore.collection('tariffs').add(body);

    return res.json(<ApiResponse<Tariff>>{ data: body });
  } catch (error) {
    return errorResponse(res, error);
  }
});

module.exports = functions.https.onRequest((req, res) => {
  // Fix Cannot POST null issue
  // @see https://github.com/firebase/firebase-functions/issues/27
  if (!req.path) req.url = `/${req.url}`;
  return app(req, res);
});
