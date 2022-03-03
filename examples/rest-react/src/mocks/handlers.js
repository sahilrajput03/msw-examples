import { rest } from 'msw'

// Learn from: https://mswjs.io/docs/api/response
// Api docs are amazing!

// Learn from: https://mswjs.io/docs/getting-started/mocks/rest-api
// Get started docs of msw is pretty awesome! ~Sahil

export const handlers = [
	rest.post('/login', (req, res, ctx) => {
		const { username } = req.body

		console.log(
			ctx.json({
				id: 'f79e82e8-c34a-4dc7-a49e-9fadc0979fda',
				username,
				firstName: 'John',
				lastName: 'Maverick',
			}),
		)
		console.log(ctx.status(203))

		const val1 = res(
			ctx.json({
				id: 'f79e82e8-c34a-4dc7-a49e-9fadc0979fda',
				username,
				firstName: 'John',
				lastName: 'Maverick',
			}),
			ctx.status(203),
		)

		const val12 = res(
			ctx.status(208), // The order of ctx.fn() calls  passed to res doesn't matter.
			ctx.json({
				id: 'f79e82e8-c34a-4dc7-a49e-9fadc0979fda',
				username,
				firstName: 'John',
				lastName: 'Maverick',
			}),
		)

		const val2 = res(
			ctx.json({
				id: 'f79e82e8-c34a-4dc7-a49e-9fadc0979fda',
				username,
				firstName: 'John',
				lastName: 'Maverick',
			}),
		)

		const val3 = res((res) => {
			res.status = 207
			res.headers.set('Content-Type', 'application/json')
			res.body = JSON.stringify({
				id: 'f79e82e8-c34a-4dc7-a49e-9fadc0979fda',
				username,
				firstName: 'John',
				lastName: 'Maverick',
			})

			return res
		})

		//? THIS IS WHERE YOU NEED TO CONTROL WHICH RESPONSE VAL TO SEND ACTUALLY.
		return val12
	}),
]
