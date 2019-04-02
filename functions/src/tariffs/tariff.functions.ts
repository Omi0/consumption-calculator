import { Tariff } from './tariff.model';
import { config } from 'firebase-functions';

/**
 * Calculating Tariff Cost
 *
 * @param {Number} consumption
 * @param {Tariff} tariff
 *
 * @return number
 */
export function calculateCost(consumption: number, tariff: Tariff): number {
  // Sorting Configs Ascending by Threshold
  const configs = tariff.configs.sort((a, b) => a.threshold - b.threshold);

  let total_cost: number = 0;
  let remained_consumption: number = consumption;

  for (var i = 0; i < configs.length; i++) {
    // Checking required parameters
    if (
      isNaN(configs[i].threshold) ||
      isNaN(configs[i].daily_rate) ||
      isNaN(configs[i].daily_charge)
    )
      break;

    if (consumption > configs[i].threshold) {
      total_cost +=
        configs[i].daily_charge * 365 +
        configs[i].daily_rate * remained_consumption;

      // Exluding current threshold  from remained_consumption
      remained_consumption -= configs[i].threshold;
      if (remained_consumption <= 0) break;
    } else {
      // Last iteration
      total_cost +=
        configs[i].daily_charge * 365 +
        configs[i].daily_rate * remained_consumption;
      break;
    }
  }

  return Math.round(total_cost);
}
