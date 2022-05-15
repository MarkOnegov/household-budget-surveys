import { firstValueFrom, Observable } from 'rxjs';

export async function finalize<T>(
  data: T | Promise<T> | Observable<T>,
): Promise<T> {
  if (data instanceof Promise) {
    return await data;
  }
  if (data instanceof Observable) {
    return await firstValueFrom(data);
  }
  return data;
}
