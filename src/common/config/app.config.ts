import { readFileSync } from 'fs';
import { join } from 'path';
import * as yaml from 'js-yaml';

type ConfigType = Record<string, unknown>;

export const AppConfig = (): ConfigType =>
  <ConfigType>yaml.load(readFileSync(join(process.cwd(), 'config/config.yaml'), 'utf8'));
