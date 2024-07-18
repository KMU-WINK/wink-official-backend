import { readFileSync } from 'fs';
import { join } from 'path';
import * as yaml from 'js-yaml';

type Config = Record<string, any>;

export default () => {
  return yaml.load(readFileSync(join(process.cwd(), 'config/config.yaml'), 'utf8')) as Config;
};
