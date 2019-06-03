# maxios

Opionated axios wrapper for mAPI compatible API calls.

## Installtion

```
$ npm install maxios --save
```

## Quick start

```js
const api = new Maxios({
	defaults {
		baseUrl: 'https://myapi.com',
	},
	endpoints: {
		'getPosts': `/posts`,
		'getPost': ({ params }) => (`/posts/${params.id}`),
		'getPostsWithComments': [`/posts`, { timeout: 20000 }]
	}
})

api.call('getPost', {
	params: { id: 'xyz' }
})
.then(post => console.log(post))
.catch(err => console.log(err))
```

## Terminology

Often the terms params, query, body, data are used to describe the same thing. Here we would like to offer a clear distinction:

Term | Description | Example |
params | The variables within the URL | https://api.demo.net/reviews/12 - 12 is a param
query | The serialized data that follows the URL of a get request | https://api.demo.net/reviews/12?orderBy=az - { "orderBy": "az" } describes the query
body | Data that is send via a post request
data | data refers to both, query and body, i.e. it describes the information that we send to the server, independently if it is done through a get or post request.

## How to use

Initializing

```js
const Maxios = require('maxios')

// Initialize
const api = new Maxios({
	// Set the  default axios config
	// Full list of options: https://github.com/axios/axios
	defaults: {
		baseUrl: 'https://myapi.com',
		headers: {
			'Content-Type': 'application/json'
		}
	},
	// Define your endpoints:
	endpoints: {
		// Request without parameters:
		'getPosts': `/posts`,

		// Request with parameters:
		'getPost': ({ params }) => (`/posts/${params.id}`) ,

		// Passing specific axios defaults for this endpoint:
		'getPostsWithComments': [`/posts`, { timeout: 20000 }]
	}
})
```

Changing the config
```js
// Set or update a header
api.setHeader('X-Access-Token', 'xyz')

// Remove a header
api.setHeader('X-Access-Token', null)

// Changing axios defaults via axios instance
// (the above method is short for this)
api.axios.defaults.headers.common['X-Access-Token'] = 'xyz'
```

Making API calls
```js
// Make a call with params and data
// => GET https://myapi.com/posts/xyz?orderBy=desc
api.call('getPost', {
	// params will be passed to the endpoint URL function (see above)
	params: { id: 'xyz' }
	// In a get request data will be send as a URL query, i.e. ?orderBy=desc
	data: { orderBy: 'desc' }
})
.then(post => {
	console.log(post)
})
.catch(err => {
	console.log(err)
})

// Make an API call with additional axios config
// => PUT https://myapi.com/posts/xyz
api.call('putPost', {
	params: { id: 'xyz' },
	data: {
		title: 'New title',
		text: 'Updated post text'
	}
}, {
	timeout: 15000
})
.then(post => {
	console.log(post)
})
.catch(err => {
	console.log(err)
})
```

## License

MIT