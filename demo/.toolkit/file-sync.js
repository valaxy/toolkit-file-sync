var fs = require('fs')
var secret = {}

module.exports = {
	tasks: [{
		syncOnChange        : true,
		syncOnAdd           : true,
		syncOnDelete        : true,
		compareStrategy     : 'timestamp',
		ignoreOnRelativePath: [
			''
		],
		targets             : {
			type          : 'fs',
			root          : '/123/abc/',
			host          : '',
			port          : '',
			account       : secret.account,
			password      : secret.password,
			reportConflict: true
		}
	}]
}