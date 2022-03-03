# README ~Sahil

-   Getting started: https://mswjs.io/docs/getting-started/install
-   Docs: https://mswjs.io/
-   Api docs: https://mswjs.io/docs/api

```
yarn
cd examples/rest-react/
npm start
```

Original Readme: [Click here](README.md_ORIGINAL)

## Adding mock service worker to existing project:

You need to configure three file:

-   `src/index.js`
-   `src/mocks/browser.js`
-   `src/mocks/handlers.js`
-   `public/mockServiceWorker.js` (\*created with command automatically)

1. File: `src/index.js`

```js
// FILE: src/index.js
import React from 'react'
import ReactDOM from 'react-dom'
import { LoginForm } from './LoginForm'

// Start the mocking conditionally.
if (process.env.NODE_ENV === 'development') {
	const { worker } = require('./mocks/browser')
	worker.start()
}

ReactDOM.render(<LoginForm />, document.getElementById('root'))
```

2. File: `src/mocks/browser.js`

```js
// FILE: src/mocks/browser.js
import { setupWorker } from 'msw'
import { handlers } from './handlers'

export const worker = setupWorker(...handlers)
```

3. File: `src/mocks/handlers.js`

```js
// FILE: src/mocks/handlers.js
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
```

4.  Creating `public/mockServiceWorker.js` file

```bash
npx msw init public/ --save
# It creates a file in the give directory i.e.,
# ./public/mockServiceWorker.js
# THIS WILL ENABLE OUR MOCK SERVICE WORKER IN BROWSER.
```

_Also, the command will add workerDirectory to your `package.json` as well, it is a recommended thing IDK exactly why._

```json
{
	"name": "my-project",
	"scripts": {},
	"msw": {
		"workerDirectory": "public"
	}
}
```
