export type Ok<T> = { ok: true; value: T };
export type Err<E> = { ok: false; error: E };
export type Result<T, E> = Ok<T> | Err<E>;

/**
 * Returns an object representing an Ok result.
 * @param value Success value.
 */
export function ok<T>(value: T): Ok<T> {
    return { ok: true, value };
}

/**
 * Returns an object representing an Err result.
 * @param error Error object.
 */
export function err<E>(error: E): Err<E> {
    return { ok: false, error };
}


export async function match<T, E>(fn: () => Promise<T>): Promise<Result<T, E>> {
    try {
        const result = await fn();
        return ok(result);
    } catch (error) {
        return err(error as E);
    }
}
