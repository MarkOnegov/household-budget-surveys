import { existsSync, readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

const YAML_CONFIG_FILENAME = 'config.yaml';

export default () => {
  let path = join(__dirname, YAML_CONFIG_FILENAME);
  if (!existsSync(path)) {
    path = join(__dirname, '../../src/nest/' + YAML_CONFIG_FILENAME);
  }
  return yaml.load(readFileSync(path, 'utf8')) as Record<string, any>;
};
