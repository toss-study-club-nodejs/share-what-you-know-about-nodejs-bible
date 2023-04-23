import {event, fooAsyncFunction, fooCallbackFunction, fooCallbackFunction2} from "./sample/test-code";

describe('비동기, 이벤트 코드의 테스트 코드 작성 패턴', () => {
    it('비동기 함수 테스트', async () => {
        //방법1
        const result = await fooAsyncFunction();
        expect(result).toBe('foo');

        //방법2
        await expect(fooAsyncFunction()).resolves.toBe('foo');

        //방법3
        await expect(fooAsyncFunction()).rejects.toThrow('foo');
    });

    it('비동기 함수 throw 테스트', async () => {
        //방법1
        try {
            await fooAsyncFunction('1');
        } catch (e) {
            //이런식으로 catch 문이 동작했는지 체크
            //expect.assertions(1)
        }

        //방법2
        await expect(fooAsyncFunction('1')).rejects.toThrow()
    });


    it('콜백 함수 호출 테스트', async () => {
        const result = await new Promise<string>(resolve => {
            fooCallbackFunction('2', resolve)
        });
        expect(result).toBe('foo')
    });

    it('콜백 함수 호출 테스트2-대부분 경험하는 케이스는 이러한 케이스가 아닐까 싶습니다.', async () => {
        const promise = new Promise<string>(resolve => {
            //특정 동작이 있어야 콜백이 수행되는 함수
            fooCallbackFunction2(resolve)
        });
        event.emit('foo');//<-이게 특정 동작
        await expect(promise).resolves.toBe('foo')
    });

    it('이벤트 리슨 함수 테스트', done => {
        const mockFn = jest.fn();
        event.on('foo2', () => {
            mockFn('fire foo2 event');
            expect(mockFn).toBeCalledTimes(1);
            done()
        });

        //비동기 처리라고 가정
        process.nextTick(() => {
            event.emit('foo2');
        });
    });
});