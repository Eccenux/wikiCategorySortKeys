# Wiki:CategorySortKeys

Show sort keys on category pages on Wikipedia (or other MediaWiki).

Will check sorting keys for each article in a given category. The check is done from a category page.

## Install
Use in [your en.wiki / common.js](https://en.wikipedia.org/wiki/Special:MyPage/common.js):
```js
// Show sort keys for articles in a category
if ( mw.config.get('wgCanonicalNamespace') === 'Category' ) {
	importScript('User:Nux/CategorySortKeys.js');
}
```

Use in [your pl.wiki / common.js](https://pl.wikipedia.org/wiki/Special:MyPage/common.js):
```js
// Show sort keys for articles in a category
if ( mw.config.get('wgCanonicalNamespace') === 'Category' ) {
	importScript('User:Nux/CategorySortKeys.js');
}
```

Or in **[your global.js](https://meta.wikimedia.org/wiki/Special:MyPage/global.js)**:
```js
// Show sort keys for articles in a category
if ( mw.config.get('wgCanonicalNamespace') === 'Category' ) {
	importScript('User:Nux/CategorySortKeys.js');
}
```