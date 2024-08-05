import { readFileSync } from 'fs';
import { join } from 'path';
import yaml from 'js-yaml';

type ConfigType = Record<string, any>;

export const AppConfig = () =>
  yaml.load(readFileSync(join(process.cwd(), 'config/config.yaml'), 'utf8')) as ConfigType;
