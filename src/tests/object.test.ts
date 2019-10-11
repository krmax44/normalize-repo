import test from 'ava';
import { normalizeRepo } from '..';

test('github object', t => {
	t.deepEqual(normalizeRepo({ url: 'https://github.com/foo/bar.git' }), {
		url: 'https://github.com/foo/bar.git',
		shortcut: 'github:foo/bar',
		provider: 'github',
		owner: 'foo',
		name: 'bar'
	});
});

test('gist object', t => {
	t.deepEqual(
		normalizeRepo({ url: 'https://gist.github.com/abcdefghijklmnop.git' }),
		{
			url: 'https://gist.github.com/abcdefghijklmnop.git',
			shortcut: 'gist:abcdefghijklmnop',
			provider: 'gist',
			owner: 'abcdefghijklmnop',
			name: undefined
		}
	);
});
