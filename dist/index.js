var Providers;
(function (Providers) {
    Providers["github.com"] = "github";
    Providers["gist.github.com"] = "gist";
    Providers["gitlab.com"] = "gitlab";
    Providers["bitbucket.org"] = "bitbucket";
})(Providers || (Providers = {}));
var removeGit = function (path) {
    return path.endsWith('.git') ? path.slice(0, -4) : path;
};
module.exports = function (repo) {
    if (typeof repo === 'object') {
        var url = repo.url, type = repo.type;
        if (!url) {
            throw new Error('No repository URL was given.');
        }
        try {
            var parsedUrl = new URL(url);
            var hostname = parsedUrl.hostname.startsWith('www.')
                ? parsedUrl.hostname.slice(4)
                : parsedUrl.hostname;
            var shortcut = void 0;
            var provider = void 0;
            var owner = void 0;
            var name_1;
            if (hostname in Providers && (!type || type === 'git')) {
                provider = Providers[hostname];
                console.log(provider);
                var results = /^\/([^/]*)\/?([^/]*)?$/.exec(parsedUrl.pathname);
                if (results === null) {
                    throw new Error('The repository URL is invalid.');
                }
                owner = provider === 'gist' ? removeGit(results[1]) : results[1];
                name_1 = results[2] && removeGit(results[2]);
                shortcut =
                    provider === 'gist'
                        ? provider + ":" + owner
                        : provider + ":" + owner + "/" + name_1;
            }
            return { url: url, shortcut: shortcut, provider: provider, owner: owner, name: name_1 };
        }
        catch (_a) {
            throw new Error('The repository URL is invalid.');
        }
    }
    else {
        var results = /^(github:|gitlab:|bitbucket:|gist:|)?([^:/]*)\/?([^:/]*)$/.exec(repo);
        if (results === null) {
            throw new Error('Malformatted repository shortkey.');
        }
        var provider_1 = results[1], owner = results[2], name_2 = results[3];
        provider_1 = provider_1 ? provider_1.slice(0, -1) : Providers['github.com'];
        if (provider_1 === Providers['gist.github.com']) {
            if (name_2)
                throw new Error('Malformatted repository shortkey.');
            name_2 = undefined;
        }
        else if (!name_2)
            throw new Error('Malformatted repository shortkey.');
        var hostname = Object.keys(Providers).find(function (key) { return Providers[key] === provider_1; });
        var url = "https://" + hostname + "/" + (provider_1 === 'gist' ? owner : owner + "/" + name_2) + ".git";
        return { url: url, shortcut: repo, provider: provider_1, owner: owner, name: name_2 };
    }
};
