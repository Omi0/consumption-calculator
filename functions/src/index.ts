/** 
 *  Autoloads recuresevely `.export.js` files
 */
import * as glob from 'glob';
import * as camelcase from 'camelcase';
const files = glob.sync('./**/*.export.js', { cwd: __dirname, ignore: './node_modules/**'});
for (const file of files) {
  const functionName = camelcase(file.slice(0, -10).split('/').join('_'));
  if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === functionName) {
    module.exports[functionName] = require(file);
  }
}