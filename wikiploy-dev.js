/**
 * Dev/staging deploy.
 */
import {DeployConfig, Wikiploy} from 'wikiploy';

const ployBot = new Wikiploy();

// custom summary
ployBot.summary = () => {
	return 'v1.0.1: beauty mark';
}

(async () => {
	const configs = [];
	configs.push(new DeployConfig({
		src: 'CategorySortKeys.js',
		site: 'en.wikipedia.org',
	}));
	await ployBot.deploy(configs);
})().catch(err => {
	console.error(err);
	process.exit(1);
});