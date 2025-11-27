const fs = require('fs');
const https = require('https');

const url1 =
  'https://raw.githubusercontent.com/disposable-email-domains/disposable-email-domains/refs/heads/main/disposable_email_blocklist.conf';
const url2 =
  'https://disposable.github.io/disposable-email-domains/domains.txt';

const fetchUrl = (url) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve(data);
      });
      res.on('error', (err) => {
        reject(err);
      });
    });
  });
};

const mergeDomains = async () => {
  try {
    const [content1, content2] = await Promise.all([
      fetchUrl(url1),
      fetchUrl(url2),
    ]);

    const list1 = content1.split('\n').filter(Boolean);
    const list2 = content2.split('\n').filter(Boolean);

    const mergedSet = new Set([...list1, ...list2]);
    const sortedDomains = Array.from(mergedSet).sort();

    // Write to different formats
    fs.writeFileSync('domains.txt', sortedDomains.join('\n'));
    fs.writeFileSync('domains.json', JSON.stringify(sortedDomains, null, 2));
    fs.writeFileSync('domains.csv', sortedDomains.join(','));
    
    console.log(`Merged ${sortedDomains.length} domains.`);
  } catch (error) {
    console.error('Error merging domains:', error);
    process.exit(1);
  }
};

mergeDomains();
