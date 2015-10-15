var chokidar = require('chokidar')


var ProjectWatcher = {
	create: function () {
		this._config = null
		this._ends = []
	},

	_onChange: function (absolutePath, event) {

	},

	_onAdd: function (absolutePath, event) {

	},

	_onDelete: function () {

	},


	start: function () {
		
	},

	stop: function () {

	}
}


module.exports = ProjectWatcher