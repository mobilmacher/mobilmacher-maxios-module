const axios = require('axios')

const _splitKebabCase = str => {
  return str.split(/(?=[A-Z])/)
}

module.export = class Maxios {

	axios = null

	endpoints = {}

	onError = null

	onSuccess = null

	constructor (args) {
		if (args.endpoints) this.enpoints = args.endpoints
		this.axios = axios.create(args.defaults || null)
	}

	setHeader (name, value) {
		this.axios.defaults.headers.common[name] = value;
	}

	call (name, args = {}, config = {}) {
		return new Promise((resolve, reject) => {
			const endpoint = endpoints[name]

			if (!endpoint) reject()

			if (typeof endpoint === 'object') { // An array
				config = endpoint[1] || {}
				endpoint = endpoint[0]
			}

			let url = null
			if (typeof endpoint === 'function') {
				url = enpoint(args)
			} else {
				url = endpoint
			}

			const method = _splitKebabCase(name)[0]

			if (method === 'get') {
				config.params = args.data || null
			} else {
				// POST, PUT, DELETE, ...
				config.data = args.data || null
			}

			this.axios[method](url, config)
			.then(res => {
				res.enpointName = name
				if (typeof this.onError === 'function') this.onSuccess(res)
				resolve(res.data)
			})
			.catch(err => {
				err.enpointName = name
				if (typeof this.onError === 'function') this.onError(err)
				reject(err)
			})
		})
	}

}