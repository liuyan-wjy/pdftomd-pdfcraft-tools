export const LANGUAGES = ['en', 'zh', 'ja', 'de'];
export const TOOLS = ['merge', 'split', 'rotate'];
export const SITE_ORIGIN = 'https://pdf-to-md.app';
export function toolPath(tool, lang = 'en') { return `${lang === 'en' ? '' : `/${lang}`}/${tool}-pdf/`; }
export function languageTag(lang) { return lang === 'zh' ? 'zh-CN' : lang; }
