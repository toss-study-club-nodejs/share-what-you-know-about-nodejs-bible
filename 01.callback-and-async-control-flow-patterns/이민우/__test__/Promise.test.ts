describe('Promise', () => {
  describe('Promise.all',  () => {
    it('비동기 작업중 에러가 나는 작업이 있더라도 기존 작업이 중단되지 않는다. - 단지 무시될뿐', async () => {
      try {
        await Promise.all([
          sleep(1),
          sleep(2),
          sleepThrow(3),
          sleep(3.1),
        ])
      } catch (e: any) {
        await sleep(0.1);
        expect(e.message).toBe('Sleep Error');
      }
    });
  })

  describe('Promise.allSettled',  () => {
    it('비동기 작업을 전부 처리한후 결과값및 상태를 반환한다.', async () => {
      // given
      const promises = await Promise.allSettled([
        sleep(1),
        sleep(2),
        sleepThrow(3),
        sleep(3.1),
      ]);

      // when
      const status = promises.map(p => p.status);

      // then
      expect(status).toHaveLength(4);
      expect(status).toMatchInlineSnapshot(`
        [
          "fulfilled",
          "fulfilled",
          "rejected",
          "fulfilled",
        ]
      `
      );
    });
  })
})

function sleep(sec: number) {
  const start = performance.now();
  return new Promise(resolve=>{
    setTimeout(resolve, sec * 1000);
  }).then(() => {
    console.log(`sleep: ${sec}s, realTime: ${performance.now()- start}`);
  });
}

function sleepThrow(sec: number) {
  const start = performance.now();
  return new Promise(resolve=>{
    setTimeout(resolve, sec * 1000);
  }).then(() => {
    console.log(`sleep & Throw: ${sec}s, realTime: ${performance.now()- start}`);
    throw new Error('Sleep Error');
  })
}
