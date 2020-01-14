// Ordinarily, you'd generate this data from markdown files in your
// repo, or fetch them from a database of some kind. But in order to
// avoid unnecessary dependencies in the starter template, and in the
// service of obviousness, we're just going to leave it here.

// This file is called `_posts.js` rather than `posts.js`, because
// we don't want to create an `/blog/posts` route — the leading
// underscore tells Sapper not to do that.

const posts = [
	{
		title: 'About this site',
		slug: 'about-this-site',
		html: `
			<p>
        This site was built to serve two purposes. To be an online portfolio, and to have a place to track of my own progress by writing about project I'm working on and things I'm thinking about.
      </p>
      <p>
        Since I'm building the site on my own – and this being fairly low-stakes environment – I figured I'd try out tools that might not be very well suited for production. For instance, this site was built using <a href="https://sapper.svelte.dev/">Sapper</a>, an app developement tool built around <a href="https://svelte.dev/">Svelte</a>. Sapper has some great out-of-the-box features, but seeing as it yet to reach version 1, things are bound to change.
      </p>
      <p>
        I've also been wanting to try out variable fonts, which is why this entire page is set in <a href="https://www.recursive.design/">Recursive</a>, a variable font with axes for weight, mono, casual, and slant.
      </p>
    `
	},
	{
		title: 'Bybanestriden',
		slug: 'bybanestriden',
		html: `
			<p>
        <code>
          #TODO
        </code>
      </p>
    `
	},
	{
		title: 'Skoleinntaksmodeller',
		slug: 'skoleinntaksmodeller',
		html: `
			<p>
        <code>
          #TODO
        </code>
      </p>
    `
	},
	{
		title: '"Lydig Bergenser"',
		slug: 'lydig-bergenser',
		html: `
			<p>
        <code>
          #TODO
        </code>
      </p>
    `
	}
];

posts.forEach(post => {
	post.html = post.html.replace(/^\t{3}/gm, '');
});

export default posts;
