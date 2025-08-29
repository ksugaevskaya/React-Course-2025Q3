type Resource<T> = { read(): T };

export default function wrapPromise<T>(promise: Promise<T>): Resource<T> {
  let status: 'pending' | 'success' | 'error' = 'pending';
  let response: T;
  let error: unknown;

  const suspender = promise.then(
    (res) => {
      status = 'success';
      response = res;
    },
    (err) => {
      status = 'error';
      error = err;
    }
  );

  return {
    read() {
      if (status === 'pending') throw suspender;
      if (status === 'error') throw error;
      return response;
    },
  };
}
