import 'dotenv/config';
import { cleanEnv, bool, url, str } from 'envalid';

const env = cleanEnv(process.env, {
  CI: bool({ default: false }),
  BASE_URL: url(),
  BROWSER: str({
    choices: ['chromium', 'firefox', 'webkit'],
    default: 'chromium',
  }),
});

export default env;
