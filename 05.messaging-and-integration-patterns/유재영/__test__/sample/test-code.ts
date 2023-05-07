import {EventEmitter} from "events";

export async function fooAsyncFunction(data?: string) {
    if (data != null) throw new Error('do not input data')
    return 'foo'
}

export function fooCallbackFunction(data: string, callback: (data: string) => void) {
    if (data === '1') throw new Error('do not input data')
    callback('foo')
}

export const event = new EventEmitter();

export function fooCallbackFunction2(callback: (data: string) => void) {
    event.on('foo', () => {
        callback('foo')
    })
}