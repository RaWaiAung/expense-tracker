import { SortOrder } from 'mongoose';

export function toOrder(value: string, defaultOrder: string): SortOrder {
  const direction = value ? value.toLowerCase() : defaultOrder;

  return direction === 'desc' ? -1 : 1;
}
