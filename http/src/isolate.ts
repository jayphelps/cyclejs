import {HTTPSource, RequestOptions, RequestInput} from './interfaces';

export interface Mappable<T> {
  map<R>(project: (x: T) => R): Mappable<R>;
}

export function isolateSource(httpSource: HTTPSource, scope: string): HTTPSource {
  return httpSource.filter((request: RequestOptions) =>
    Array.isArray(request._namespace) &&
    request._namespace.indexOf(scope) !== -1,
  );
}

export function isolateSink(request$: Mappable<RequestInput | string>,
                            scope: string): any {
  return request$.map((req: RequestInput | string) => {
    if (typeof req === 'string') {
      return {url: req, _namespace: [scope]} as RequestOptions;
    }
    req._namespace = req._namespace || [];
    req._namespace.push(scope);
    return req;
  });
}
