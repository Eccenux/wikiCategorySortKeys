/**
 * CategorySortKeys.
 * 
 * Show sort keys on category pages on Wikipedia (or other MediaWiki).
 * 
 * Repository:
 * https://github.com/Eccenux/wikiCategorySortKeys
 * 
 * Authors:
 * Maciej Nux Jaros
 * 
 * <nowiki>
 */
var CategorySortKeys = class {
	constructor() {}

	/** @private Load keys from start to end letters. */
	async loadPage() {
		let {start, end} = this.findBounds();
		console.log('loadPage: ', {start, end});
		let data = await this.loadKeys(start, end);
		return data;
	}

	/** @private Find start/end letter. */
	findBounds() {
		let letters = Array.from(document.querySelectorAll('.mw-category-group h3')).map(el => el.textContent);
		if (!letters.length) {
			return false;
		}
		let start = letters[0];
		let end = letters.pop();
		return {start, end};
	}

	/** @private Load keys from start to end letters. */
	async loadKeys(start, end) {
		return new Promise((resolve, reject) => {
			const api = new mw.Api();
			let props = {
				action: 'query',
				list: 'categorymembers',
				format: 'json',

				cmtitle: mw.config.get('wgPageName'),
				cmsort: 'sortkey',
				cmdir: 'asc',

				cmprop: ['sortkeyprefix', 'title'],
				cmlimit: 'max',
			};
			if (start && end) {
				props['cmstartsortkeyprefix'] = `${start}`;
				props['cmstartsortkeyprefix'] = `${end}ZZZ`;
			}
			api.get(props).done(function (data) {
				let members = data?.query?.categorymembers;
				if (Array.isArray(members)) {
					resolve(members)
				} else {
					reject({
						e: 'invalid data',
						data,
					});
				}
			});
		});
	}
}

// temp
async function test() {
	var cats = new CategorySortKeys();

	var data = await cats.loadKeys();
	console.log( data );

	var data = await cats.loadPage();
	console.log(data);

	return cats;
}

if (mw.config.get('wgCanonicalNamespace') === 'Category') {
	$(function(){
		test();
	});
}

//</nowiki>