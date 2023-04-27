import { sender, startServer, zip, zipStream } from '../src/6-1_sample'
import fs from 'fs'

const unlink = (pwd: string) => fs.unlink(pwd, (err) => err)

describe('06. Stream', () => {
	const pwdPrefix = `./02.stream/sungjun.kim/__test__`

	describe('6-1-2', () => {
		afterAll(() => {
			unlink(`${pwdPrefix}/test_buffer.gz`)
		})

		it('Gzipping using Buffer API', async () => {
			await zip(`${pwdPrefix}/test`)

			const checkGz = fs.existsSync(`${pwdPrefix}/test_buffer.gz`)
			expect(checkGz).toBeTruthy()
		})

		it('Gzipping using Stream', () => {
			zipStream(`${pwdPrefix}/test`)
				.on('finish', () => {
					const checkGz = fs.existsSync(`${pwdPrefix}/test_stream.gz`)
					expect(checkGz).toBeTruthy()

					// stream 시간차이로 인한 삭제 위치
					unlink(`${pwdPrefix}/test_stream.gz`)
				})
		})
	})

	describe('6-1-3', () => {
		const url = `localhost`
		const port = 3000

		beforeAll(async () => {
			await startServer()
		})

		it('Request to Server', () => {
			sender(url, port, `${pwdPrefix}/test`, 'dc8a453e728fc19398178797e2c39067e1965f2061220257')
				.on('finish', () => {
					const checkGz = fs.existsSync(`${pwdPrefix}/test_received`)
					expect(checkGz).toBeTruthy()

					unlink(`${pwdPrefix}/test_received`)
				})
		})
	})
})
