import { Validator } from './types';

export const checkValid = (validator: Validator) => <T>({
  candidate,
  errorMessage,
}: {
  candidate: unknown;
  errorMessage: string;
}): T | never => {
  if (validator(candidate)) {
    return candidate as T;
  }

  throw Error(errorMessage);
};
