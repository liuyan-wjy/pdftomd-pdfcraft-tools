import { LANGUAGES, toolPath } from './paths.js';
const query = new URLSearchParams(location.search);
const requested = query.get('lang');
query.delete('lang');
const target = new URL(toolPath('merge', LANGUAGES.includes(requested) ? requested : 'en'), location.origin);
target.search = query.toString();
target.hash = location.hash;
location.replace(target.href);
