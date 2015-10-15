// @Reference
// - [fs-plus](https://github.com/atom/fs-plus)
//      many help methods about file system
// - [node-fs-extra](https://github.com/jprichardson/node-fs-extra)
//      choose by evaluating technically because it's more meet demand
var fs   = require('fs-extra'),
    path = require('path')


var FSEnd = {
	create: function (options, strategy) {
		var obj = Object.create(this)
		this._options = options

		if (strategy.syncOnChange) {
			this.syncOnChange = this._syncOnChange
		}

		if (strategy.syncOnAdd) {
			this.syncOnAdd = this._syncOnAdd
		}

		if (strategy.syncOnDelete) {
			this.syncOnDelete = this._syncOnDelete
		}

		return obj
	},

	_isIgnore: function () {
		return false
	},

	_targetPath: function (relativeFilePath) {
		return path.join(this._options.root, relativeFilePath)
	},

	_sourcePath: function (relativeFilePath) {
		return path.join(this._options.sourceRoot, relativeFilePath)
	},


	//
	// real sync method
	//
	_syncOnChange: function (relativeFilePath, stats, cb) {
		if (!this._isIgnore()) {
			fs.copySync(this._sourcePath(relativeFilePath), this._targetPath(relativeFilePath))
		}
		cb()
	},

	_syncOnAdd: function (relativeFilePath, stats, cb) {
		this._syncOnChange(relativeFilePath, stats, cb)
	},

	_syncOnDelete: function (relativeFilePath, stats, cb) {
		if (!this._isIgnore()) {
			fs.removeSync(this._targetPath(relativeFilePath))
		}
		cb()
	},


	//
	// empty method
	//
	syncOnChange: function (cb) {
		cb()
	},
	syncOnAdd   : function (cb) {
		cb()
	},
	syncOnDelete: function (cb) {
		cb()
	}
}


module.exports = FSEnd