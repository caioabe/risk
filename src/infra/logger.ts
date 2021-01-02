import { Logger } from './types';

export const logger: Logger = {
  // eslint-disable-next-line no-console
  log: (message: string): void => console.error(message),
};
