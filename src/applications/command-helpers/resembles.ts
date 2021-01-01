export const resembles = <T>(
  candidate: unknown,
): candidate is Partial<Record<keyof T, unknown>> =>
  typeof candidate === 'object' && candidate !== null;
