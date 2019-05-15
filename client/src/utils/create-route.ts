import { compile, PathFunctionOptions } from 'path-to-regexp'

type PathFunction<T> = (data?: T, options?: PathFunctionOptions) => string;

type Route<T> = {
  path: string,
  url: PathFunction<T>
}

export function createRoute<T extends object = object>(path: string): Route<T> {
  return {
    path,
    url: compile(path)
  }
}
