var assert = require('assert'),
    FSEnd  = require('../lib/fs-end'),
    temp   = require('temp').track(),
    fs     = require('fs-extra'),
    path   = require('path')


var makeTempWorkplace = function () {
	var dirPath = temp.mkdirSync()
	var sourceRoot = path.join(dirPath, 'source')
	var targetRoot = path.join(dirPath, 'target')
	fs.emptyDirSync(sourceRoot)
	fs.emptyDirSync(targetRoot)

	var fe = FSEnd.create({
		type      : 'fs',
		sourceRoot: sourceRoot,
		root      : targetRoot,

	}, {
		syncOnChange: true,
		syncOnAdd   : true,
		syncOnDelete: true
	})

	return {
		fe        : fe,
		sourceRoot: sourceRoot,
		targetRoot: targetRoot
	}
}

describe('FSEnd', function () {
	it('_syncOnChange()', function (done) {
		var u = makeTempWorkplace()
		var randomStr = String(Math.random())
		fs.writeFileSync(path.join(u.sourceRoot, 'change.txt'), randomStr)
		u.fe._syncOnChange('change.txt', {}, function () {
			assert.equal(randomStr, fs.readFileSync(path.join(u.targetRoot, 'change.txt'), {encoding: 'utf-8'}))
			done()
		})
	})

	it('_syncOnAdd()', function (done) {
		var u = makeTempWorkplace()
		var randomStr = String(Math.random())
		fs.writeFileSync(path.join(u.sourceRoot, 'change.txt'), randomStr)
		u.fe._syncOnAdd('change.txt', {}, function () {
			assert.equal(randomStr, fs.readFileSync(path.join(u.targetRoot, 'change.txt'), {encoding: 'utf-8'}))
			done()
		})
	})

	it('_syncOnDelete()', function (done) {
		var u = makeTempWorkplace()
		var randomStr = String(Math.random())
		fs.writeFileSync(path.join(u.targetRoot, 'change.txt'), randomStr)
		u.fe._syncOnDelete('change.txt', {}, function () {
			assert.ok(!fs.existsSync(path.join(u.targetRoot, 'change.txt')))
			done()
		})
	})
})