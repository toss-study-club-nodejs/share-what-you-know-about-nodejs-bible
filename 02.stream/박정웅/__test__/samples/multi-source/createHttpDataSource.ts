import got from 'got';

export function createHttpDataSource() {
  got.stream('https://jsonplaceholder.typicode.com/todos/1');
}
