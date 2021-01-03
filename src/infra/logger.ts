/* eslint-disable no-console */
import { Logger } from './types';

export const logger: Logger = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  log: (message: string | object): void => console.info(message),
};
