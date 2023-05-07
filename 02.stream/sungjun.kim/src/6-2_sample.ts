import { createServer } from 'http'
import Chance from 'chance'
import { Writable, Transform, TransformOptions, TransformCallback } from 'stream'
import { join, dirname } from 'path'
import { createReadStream, promises as fs } from 'fs'

const chance = new Chance()

/**
 * nod-flowing mode
 */
/*
process.stdin
	.on('readable', () => {
		let chunk
		console.log('New Data available')
		while ((chunk = process.stdin.read()) !== null) {
			console.log(`Chunk read (${chunk.length} bytes): "${chunk.toString()}"`)
		}
	})
	.on('end', () => console.log('End of Stream'))
*/

// flowing mode
/*
process.stdin
	.on('data', (chunk) => {
		console.log('New Data available')
		console.log(`Chunk read (${chunk.length} bytes): "${chunk.toString()}"`)
	})
	.on('end', () => console.log('End of Stream'))
*/

// async iterator
/*
async function main() {
	for await (const chunk of process.stdin) {
		console.log('New Data available')
		console.log(`Chunk read (${chunk.length} bytes): "${chunk.toString()}"`)
	}

	console.log('End of Stream')
}

main()
*/

/*
import Chance from 'chance'
import { Readable } from 'stream'

const chance = new Chance()

class RandomStream extends Readable {
	emittedBytes
	constructor(opt: {}) {
		super(opt)
		this.emittedBytes = 0
	}

	_read(size: number) {
		const chunk = chance.string({ length: size })
		this.push(chunk, 'utf8')
		this.emittedBytes += chunk.length
		if (chance.bool({ likelihood: 5 })) {
			this.push(null)
		}
	}
}
const randomStream = new RandomStream({})

const randomStream = new Readable({
	read(size: number) {
		const chunk = chance.string({ length: size })
		this.push(chunk, 'utf8')
		emittedBytes += chunk.length
		if (chance.bool({ likelihood: 5 })) {
			this.push(null)
		}
	}
})

randomStream
	.on('data', (chunk) => {
		console.log(`Chunk read (${chunk.length} bytes): "${chunk.toString()}"`)
	})
	.on('end', () => {
		console.log(`Produced  ${randomStream.emittedBytes} bytes of random data`)
	})
*/

// import { Readable } from 'stream'
//
// const mountains = [
// 	{ name: 'Everest', height: 8848 },
// 	{ name: 'K2', height: 8611 },
// 	{ name: 'Kangchenjunga', height: 8586 },
// 	{ name: 'Lhotse', height: 8516 },
// 	{ name: 'Makalu', height: 8481 },
// ]
//
// const mountainStream = Readable.from(mountains)
// mountainStream.on('data', (mountain) => {
// 	console.log(`${mountain.name.padStart(14)}\t${mountain.height}m`)
// })


// import { createServer } from 'http'
// import Chance from 'chance'
//
// const chance = new Chance()
// const server = createServer((req, res) => {
// 	res.writeHead(200, { 'Content-Type': 'text/plain' })
// 	while (chance.bool({ likelihood: 95 })) {
// 		res.write(`${chance.string()}\n`)
// 	}
// 	res.end('\n\n')
// 	res.on('finish', () => console.log('All data sent'))
// })
// server.listen(8080, () => {
// 	console.log('listening on port 8080')
// })


/**
 * Backpressure
 */
// const server = createServer((req, res) => {
// 	res.writeHead(200, { 'Content-Type': 'text/plain' })
//
// 	function generateMore() {
// 		while (chance.bool({ likelihood: 95 })) {
// 			const randomChunk = chance.string({ length: (16 * 1024) - 1 })
//
// 			const shouldContinue = res.write(`${randomChunk}`)
// 			if (!shouldContinue) {
// 				console.log('back-pressure')
// 				return res.once('drain', generateMore)
// 			}
// 		}
// 		res.end(`\n\n`)
// 	}
//
// 	generateMore()
// 	res.on('finish', () => console.log('All data sent'))
// })
//
// server.listen(8080, () => {
// 	console.log('listening on port 8080')
// })

// class ToFileStream extends Writable {
// 	constructor(props?: {}) {
// 		super({ ...props, objectMode: true })
// 	}
//
// 	// @ts-ignore
// 	_write(chunk, encoding, cb) {
// 		mkdirpPromise(dirname(chunk.path))
// 			.then(() => fs.writeFile(chunk.path, chunk.content))
// 			.then(() => cb())
// 			.catch(cb)
// 	}
// }
//
// const tfs = new ToFileStream({})
//
// tfs.write({ path: join('files', 'file1.txt'), content: 'Hello' })
// tfs.write({ path: join('files', 'file2.txt'), content: 'Node.js' })
// tfs.write({ path: join('files', 'file3.txt'), content: 'streams' })
// tfs.end(() => console.log('All files crreated'))


/**
 * Transform
 */
// class ReplaceStream extends Transform {
// 	private tail: string
// 	constructor(private searchStr: string, private replaceStr: string, options?: Partial<TransformOptions>) {
// 		super({ ...options })
// 		this.tail = ''
// 	}
//
// 	_transform(chunk: string, encoding: string, callback: any) {
// 		const pieces = (this.tail + chunk).split(this.searchStr)
// 		const lastPiece = pieces[pieces.length - 1]
// 		const tailLen = this.searchStr.length - 1
// 		this.tail = lastPiece.slice(-tailLen)
// 		pieces[pieces.length - 1] = lastPiece.slice(0, -tailLen)
//
// 		this.push(pieces.join(this.replaceStr))
// 		callback()
// 	}
//
// 	_flush(callback: any){
// 		this.push(this.tail)
// 		callback()
// 	}
// }
// const replaceStream = new ReplaceStream('World', 'Node.js')

// Simplify
// const searchStr = 'World'
// const replaceStr = 'Node.js'
// let tail = ''
// const replaceStream = new Transform({
// 	defaultEncoding: 'utf8',
// 	transform(chunk: any, encoding: BufferEncoding, callback: TransformCallback) {
// 		const pieces = (tail + chunk).split(searchStr)
// 		const lastPiece = pieces[pieces.length - 1]
// 		const tailLen = searchStr.length - 1
// 		tail = lastPiece.slice(-tailLen)
// 		pieces[pieces.length - 1] = lastPiece.slice(0, -tailLen)
// 		this.push(pieces.join(replaceStr))
// 		callback()
// 	},
// 	flush(callback: TransformCallback) {
// 		this.push(tail)
// 		callback()
// 	}
// })
//
// replaceStream.on('data', chunk => console.log(chunk.toString()))
//
// replaceStream.write('Hello W')
// replaceStream.write('orld!')
// replaceStream.end()
