import * as functions from 'firebase-functions';
import * as cors from 'cors';
import * as express from 'express';
import * as admin from 'firebase-admin';
import * as joi from 'joi';
import { Tariff, TariffInfo } from './tariff.model';
import { errorResponse } from '../core/core.functions';
import { ApiResponse } from '../core/core.models';
import { calculateCost } from './tariff.functions';

// firebase-admin must be initialized only once
if (!admin.apps.length) {
  admin.initializeApp();
  // timestampsInSnapshots is to hide The behavior for Date objects stored in Firestore from firebase Log
  admin.firestore().settings({ timestampsInSnapshots: true });
}

const firestore = admin.firestore();

const app = express();

app.use(cors({ origin: true }));

app.get('*', async (req, res) => {
  try {
    // Validating Get Params
    const query: {
      consumption: number;
    } = await joi.validate(
      req.query,
      joi.object().keys({
        consumption: joi.number().required()
      }),
      { abortEarly: false }
    );

    const snapshot = await firestore.collection('tariffs').get();

    const tariffs = snapshot.docs.map(doc => doc.data() as Tariff);

    const costs: TariffInfo[] = tariffs.map(tariff => {
      return <TariffInfo>{
        tariff_name: tariff.name,
        tariff_cost: calculateCost(query.consumption, tariff)
      };
    });

    return res.json(<ApiResponse<TariffInfo[]>>{ data: costs });
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
