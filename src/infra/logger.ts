import { Logger } from './types';

export const logger: Logger = {
  // eslint-disable-next-line no-console
  publish: (message: string): void => console.error(message),
};
