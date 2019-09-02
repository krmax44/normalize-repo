const normalizeRepo = require('../dist');

test('github object', () => {
	expect(normalizeRepo({ url: 'https://github.com/foo/bar.git' })).toEqual({
		url: 'https://github.com/foo/bar.git',
		shortcut: 'github:foo/bar',
		provider: 'github',
		owner: 'foo',
		name: 'bar'
	});
});

test('gist object', () => {
	expect(
		normalizeRepo({ url: 'https://gist.github.com/abcdefghijklmnop.git' })
	).toEqual({
		url: 'https://gist.github.com/abcdefghijklmnop.git',
		shortcut: 'gist:abcdefghijklmnop',
		provider: 'gist',
		owner: 'abcdefghijklmnop',
		name: undefined
	});
});
