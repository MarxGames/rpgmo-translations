import fs from 'fs';

const directory = './translations';

const languages = {
  'cs': 'Czech',
  'da': 'Danish',
  'de': 'German',
  'es': 'Spanish',
  'et': 'Estonian',
  'fr': 'French',
  'hu': 'Hungarian',
  'it': 'Italian',
  'ko': 'Korean',
  'lt': 'Lithuanian',
  'nl': 'Dutch',
  'pl': 'Polish',
  'pt': 'Portuguese',
  'pt-br': 'Brazilian Portuguese',
  'ru': 'Russian',
  'sk': 'Slovak',
  'sv': 'Swedish',
  'tr': 'Turkish',
  'uk': 'Ukrainian',
  'zh': 'Chinese',
  'zh-tw': 'Taiwanese',
};

const statuses = [];
for (const language in languages) {
  const translations = JSON.parse(fs.readFileSync(`${directory}/${language}.json`, {
    enoding: 'utf8'
  }));
  let total = 0;
  let translated = 0;
  let totalNames = 0;
  let translatedNames = 0;

  for (const group in translations) {
    if (group === 'names') {
      for (const translation in translations[group]) {
        totalNames++;
        if (translations[group][translation] !== '') {
          translatedNames++;
        }
      }
    } else {
      for (const translation in translations[group]) {
        total++;
        if (translations[group][translation] !== '') {
          translated++;
        }
      }
    }
  }
  const ui = `![UI](https://progress-bar.dev/${Math.floor(translated / total * 100)}/)`;
  const names = `![Names](https://progress-bar.dev/${Math.floor(translatedNames / totalNames * 100)}/)`;
  statuses.push(`| ${language} | ${languages[language]} | ${ui} | ${names} |`);
}

const template = `![RPG MO](https://data.mo.ee/img/login_logo.png)

Free to play MMORPG https://mo.ee

Translations thread
https://forums.mo.ee/viewtopic.php?t=6561

# Translations

| Locale | Language | UI | Names |
| --- | --- | --- | --- |
${statuses.join('\n')}`;

fs.writeFileSync('README.md', template);