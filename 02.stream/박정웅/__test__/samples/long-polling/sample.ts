import { Readable } from 'stream';

export class LongPollingSample {
  constructor(private readonly getData: () => Promise<string>) {}

  async getLongPollingData() {
    let flag = true;
    sleep(1000).then(() => {
      flag = false;
    });

    while (flag) {
      const data = await this.getData();
      if (data != null) {
        return data;
      }
      await sleep(500);
    }

    return '';
  }

  getLongPollingData2() {
    const self = this;
    return new Readable({
      objectMode: true,
      read() {
        self.getLongPollingData().then(data => {
          this.push(data);
          this.push(null);
        });
      },
    });
  }
}

function sleep(ms: number) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}
