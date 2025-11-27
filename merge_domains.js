const fs = require('fs');
const https = require('https');

const sources = [
  'https://raw.githubusercontent.com/disposable-email-domains/disposable-email-domains/refs/heads/main/disposable_email_blocklist.conf',
  'https://disposable.github.io/disposable-email-domains/domains.txt',
  'https://raw.githubusercontent.com/amieiro/disposable-email-domains/master/denyDomains.txt',
  'https://raw.githubusercontent.com/kslr/disposable-email-domains/master/list.txt',
];

const fetchUrl = (url) =>
  new Promise((resolve, reject) => {
    const req = https.get(url, (res) => {
      if (res.statusCode !== 200) {
        return reject(
          new Error(`Failed to fetch ${url} - Status: ${res.statusCode}`)
        );
      }

      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => resolve(data));
    });

    req.on('error', reject);
    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error(`Timeout fetching ${url}`));
    });
  });

const normalizeList = (content) =>
  content
    .split('\n')
    .map((line) => line.trim())
    .filter(
      (line) =>
        line &&
        !line.startsWith('#') && // ignore comments
        /^[a-zA-Z0-9.-]+$/.test(line) // basic domain validation
    )
    .map((domain) => domain.toLowerCase());

const writeFileAtomic = (filename, data) => {
  const temp = filename + '.tmp';
  fs.writeFileSync(temp, data);
  fs.renameSync(temp, filename);
};

const mergeDomains = async () => {
  try {
    const contents = await Promise.all(sources.map(fetchUrl));

    const allDomains = contents.flatMap(normalizeList);
    const uniqueSorted = [...new Set(allDomains)].sort();

    writeFileAtomic('domains.txt', uniqueSorted.join('\n'));
    writeFileAtomic(
      'domains.json',
      JSON.stringify(uniqueSorted, null, 2)
    );
    writeFileAtomic('domains.csv', uniqueSorted.join(','));

    console.log(`🔥 Done! Merged ${uniqueSorted.length} unique domains.`);
  } catch (error) {
    console.error('❌ Error merging domains:', error.message);
    process.exit(1);
  }
};

mergeDomains();
