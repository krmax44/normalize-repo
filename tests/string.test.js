const normalizeRepo = require('../dist');

test('github shortcut', () => {
	expect(normalizeRepo('github:foo/bar')).toEqual({
		url: 'https://github.com/foo/bar.git',
		shortcut: 'github:foo/bar',
		provider: 'github',
		owner: 'foo',
		name: 'bar'
	});
});

test('gist shortcut', () => {
	expect(normalizeRepo('gist:abcdefghijklmnop')).toEqual({
		url: 'https://gist.github.com/abcdefghijklmnop.git',
		shortcut: 'gist:abcdefghijklmnop',
		provider: 'gist',
		owner: 'abcdefghijklmnop',
		name: undefined
	});
});

test('invalid shortcut', () => {
	expect(() => normalizeRepo('github:foo')).toThrow('Malformatted repository shortkey.');
});