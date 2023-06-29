/**
 * Dev/staging deploy.
 */
import {DeployConfig, Wikiploy} from 'wikiploy';

const ployBot = new Wikiploy();

// custom summary
ployBot.prepareSummary = () => {
	return '#Wikiploy' + ' v1.0.0: beauty mark';
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