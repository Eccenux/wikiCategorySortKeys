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
 * Deployed with love using Wikiploy:
 * [[Wikipedia:Wikiploy]]
 * 
 * <nowiki>
 */

/* Translatable strings */
let pl = mw.config.get('wgUserLanguage') === 'pl';
let lang = {
	missing: pl ? '__NN__' : '__NA__',
	buttonTitle: pl ? '🔤 Klucze sort.' : '🔤 Sort keys',
	buttonDesc: pl ? 'Pokaż klucze sortowania dla stron w bieżącej kategorii' : 'Show sort keys for pages in this category',
};
// usage:
//mw.hook('userjs.CategorySortKeys.lang.ready').add( (lang) => { lang = ... } );
mw.hook('userjs.CategorySortKeys.lang.ready').fire(lang);

// above in a separate file with en being default and pl when ``

class CategorySortKeys {
	constructor() {
		this.conf = {
			missing: lang.missing,
		};
	}

	/**
	 * Enhance current category page.
	 */
	async enhance() {
		// Object { ns: 0, title: "Gordon Allan", sortkeyprefix: "Allan, Gordon" }
		const data = await this.loadPage();
	
		// mapit
		const keys = {};
		data.forEach(d => {
			keys[d.title] = d.sortkeyprefix;
		});
	
		// append
		document.querySelectorAll('#mw-pages .mw-category-group a').forEach((a)=>{
			let title = a.textContent.trim();
			let sortkey = (title in keys) ? keys[title] : '';
			if (!sortkey.length) {
				sortkey = this.conf.missing;
			}
			a.insertAdjacentHTML('afterend', ` <csk>(${sortkey})</csk>`);
		});
	}

	/** @private Load keys from start to end letters. */
	async loadPage() {
		let {start, end} = this.findBounds();
		console.log('loadPage: ', {start, end});
		let data = await this.loadKeys(start, end);
		return data;
	}

	/** @private Find start/end letter. */
	findBounds() {
		let letters = Array.from(document.querySelectorAll('#mw-pages .mw-category-group h3')).map(el => el.textContent);
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
				props['cmendsortkeyprefix'] = `${end}ZZZ`;
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

// init
if ( mw.config.get('wgCanonicalNamespace') === 'Category' ) {
	mw.loader.using(['mediawiki.util'], function () {
		// link-button
		const title = lang.buttonTitle;
		const desc = lang.buttonDesc;
		const link = mw.util.addPortletLink( 'p-tb', '', title, 'pt-sortkeys', desc, null, '#t-info' );

		// action
		$( link ).click( function ( e ) {
			e.preventDefault();

			var cats = new CategorySortKeys();
			cats.enhance();
		} );
	} );
}

//</nowiki>