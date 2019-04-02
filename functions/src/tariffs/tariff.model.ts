import * as joi from 'joi';

export interface TariffInfo {
  tariff_name: string;
  tariff_cost: number;
}

export interface Tariff {
  name: string;
  configs: TariffConfig[];
}

export interface TariffConfig {
  daily_charge: number;
  daily_rate: number;
  threshold: number;
}

export const tariffConfigValidator = joi.object().keys({
  daily_charge: joi.number().required(),
  daily_rate: joi.number().required(),
  threshold: joi.number().required()
});

export const tariffValidator = joi.object().keys({
  name: joi.string().max(100),
  configs: joi
    .array()
    .items(tariffConfigValidator)
    .min(1)
});
