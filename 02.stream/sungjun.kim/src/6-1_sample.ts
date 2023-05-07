import { createCipheriv, createDecipheriv, randomBytes } from 'crypto'
import { createReadStream, createWriteStream, promises as fs } from 'fs'
import { createServer, IncomingMessage, request, ServerResponse } from 'http'
import { createGzip, gzip } from 'zlib'
import { promisify } from 'util'
import { basename } from 'path'

const gzipPromise = promisify(gzip)

/**
 * Gzipping using Buffer API
 * @param filename
 */
export async function zip(filename: string) {
	const data = await fs.readFile(filename)
	const gzippedData = await gzipPromise(data)
	await fs.writeFile(`${filename}_buffer.gz`, gzippedData)
	// console.log('### File successfully compressed')
}

/**
 * Gzipping using Stream
 * @param filename
 */
export function zipStream(filename: string) {
	return createReadStream(filename)
		.pipe(createGzip())
		.pipe(createWriteStream(`${filename}_stream.gz`))
		// .on('finish', () => console.log('### File successfully compressed'))
		.on('finish', () => {})
}

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
	const filename = basename((req.headers['x-filename'] || '').toString())
	const secret = randomBytes(24)
	const iv = Buffer.from(req.headers['x-initialization-vector'] as  string, 'hex')
	const destFilename = `./02.stream/sungjun.kim/__test__/${filename}_received`
	// console.log(`File request received: ${filename}`)

	req.pipe(createDecipheriv('aes192', secret, iv))
		.pipe(createGzip())
		.pipe(createWriteStream(destFilename))
		.on('finish', () => {
			res.writeHead(201, { 'Content-Type': 'text/plain' })
			res.end('OK\n')
			// console.log(`File Saved: ${destFilename}`)
		})
})

export function startServer() {
	return new Promise((resolve, reject) => {
		server.listen(3000, () => {
			// console.log(`Listening on http://localhost:3000`)
			return resolve(3000)
		})
	})
}

/**
 * request to server
 * @param url
 * @param port
 * @param filename
 * @param pw
 */
export const sender = (url: string, port: number, filename: string, pw: string) => {
	const secret = Buffer.from(pw, 'hex')
	const iv = randomBytes(16)
	const httpRequestOptions = {
		hostname: url,
		port,
		path: '/',
		method: 'PUT',
		headers: {
			'Content-Type': 'application/octet-stream',
			'Content-Encoding': 'gzip',
			'X-Filename': basename(filename),
			'X-Initialization-Vector': iv.toString('hex')
		}
	}

	const req = request(httpRequestOptions, (res) => {
		// console.log(`Server response: ${res.statusCode}`)
	})

	return createReadStream(filename)
		.pipe(createGzip())
		.pipe(createCipheriv('aes192',  secret, iv))
		.pipe(req)
		.on('finish', () => {
			// console.log('File successfully sent')
		})
}
