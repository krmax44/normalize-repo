import test from 'ava';
import { normalizeRepo } from '..';

test('github shortcut', t => {
	t.deepEqual(normalizeRepo('github:foo/bar'), {
		url: 'https://github.com/foo/bar.git',
		shortcut: 'github:foo/bar',
		provider: 'github',
		owner: 'foo',
		name: 'bar'
	});
});

test('gist shortcut', t => {
	t.deepEqual(normalizeRepo('gist:abcdefghijklmnop'), {
		url: 'https://gist.github.com/abcdefghijklmnop.git',
		shortcut: 'gist:abcdefghijklmnop',
		provider: 'gist',
		owner: 'abcdefghijklmnop',
		name: undefined
	});
});

test('invalid shortcut', t => {
	t.throws(
		() => normalizeRepo('github:foo'),
		'Malformatted repository shortkey.'
	);
});
