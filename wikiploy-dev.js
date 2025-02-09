/**
 * Dev/staging deploy.
 */
import {DeployConfig, Wikiploy, verlib} from 'wikiploy';

import * as botpass from './bot.config.mjs';
const ployBot = new Wikiploy(botpass);

(async () => {
// custom summary
	const version = await verlib.readVersion('./package.json');
	ployBot.summary = () => {
		return `v${version}: from github`;
	}

	// deployment config
	const configs = [];
	configs.push(new DeployConfig({
		src: 'CategorySortKeys.js',
		dst: '~/CategorySortKeys-dev.js',
		site: 'meta.wikimedia.org',
	}));

	await ployBot.deploy(configs);
})().catch(err => {
	console.error(err);
	process.exit(1);
});