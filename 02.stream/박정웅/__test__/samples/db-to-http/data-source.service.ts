export class DataSourceService {
  *getData() {
    let count = 0;
    yield {
      id: ++count,
      data: 'first data',
    };

    while (1000 > ++count) {
      yield {
        id: count,
        data: `${Math.random()}`,
      };
    }

    yield {
      id: ++count,
      data: `last data`,
    };
  }
}
