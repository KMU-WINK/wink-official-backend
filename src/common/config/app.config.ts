import { readFileSync } from 'fs';
import { load } from 'js-yaml';
import { join } from 'path';

type ConfigType = Record<string, unknown>;

const path = join(process.cwd(), 'config/config.yaml');

export const AppConfig = (): ConfigType => <ConfigType>load(readFileSync(path, 'utf8'));
