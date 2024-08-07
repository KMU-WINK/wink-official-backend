import { readFileSync } from 'fs';
import { join } from 'path';
import { load } from 'js-yaml';

type ConfigType = Record<string, unknown>;

const path = join(process.cwd(), 'config/config.yaml');

export const AppConfig = (): ConfigType => <ConfigType>load(readFileSync(path, 'utf8'));
