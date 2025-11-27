# Suspicious and Disposable Email Domains

A curated list of suspicious and disposable email domains commonly associated with spam, phishing, or fraudulent activities. This repository provides a simple way to check if an email domain is potentially suspicious or disposable.

## Features

- **Comprehensive List**: Contains thousands of known suspicious and disposable domains.
- **Easy Integration**: Use the provided JavaScript function to check domains programmatically.
- **Open Source**: Community-driven and regularly updated.

## Usage

You can fetch the list of domains directly from this repository and use it in your applications to validate email domains.

### JavaScript Example

Here's a simple JavaScript function to check if an email domain is in the suspicious list:

```javascript
export const isSuspiciousEmailDomain = async (email) => {
  try {
    const res = await fetch(
      "https://raw.githubusercontent.com/said7388/suspicious-email-domains/refs/heads/main/domains.txt",
    );

    if (!res.ok) {
      return false;
    }

    const content = await res.text();
    const blocklist = content.split("\n").slice(0, -1);
    // Check if the email domain is in the blocklist
    const mailDomain = email.split("@")[1];
    const findIndex = blocklist.findIndex((item) => item === mailDomain);

    return findIndex !== -1;
  } catch (_error) {
    // console.log(error);
    return false;
  }
};
```

### Python Example

Here's a simple Python function to check if an email domain is in the suspicious list:

```python
import requests

def is_suspicious_email_domain(email):
    try:
        response = requests.get("https://raw.githubusercontent.com/said7388/suspicious-email-domains/refs/heads/main/domains.txt")
        if response.status_code != 200:
            return False
        blocklist = response.text.split('\n')[:-1]
        mail_domain = email.split('@')[1]
        return mail_domain in blocklist
    except:
        return False
```

### Java Example

Here's a simple Java method to check if an email domain is in the suspicious list:

```java
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.List;
import java.util.Arrays;

public class EmailChecker {
    public static boolean isSuspiciousEmailDomain(String email) {
        try {
            URL url = new URL("https://raw.githubusercontent.com/said7388/suspicious-email-domains/refs/heads/main/domains.txt");
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String inputLine;
            StringBuilder content = new StringBuilder();
            while ((inputLine = in.readLine()) != null) {
                content.append(inputLine).append("\n");
            }
            in.close();
            List<String> blocklist = Arrays.asList(content.toString().split("\n"));
            String mailDomain = email.split("@")[1];
            return blocklist.contains(mailDomain);
        } catch (Exception e) {
            return false;
        }
    }
}
```

### C# Example

Here's a simple C# method to check if an email domain is in the suspicious list:

```csharp
using System;
using System.Net.Http;
using System.Threading.Tasks;

public class EmailChecker
{
    private static readonly HttpClient client = new HttpClient();

    public static async Task<bool> IsSuspiciousEmailDomain(string email)
    {
        try
        {
            HttpResponseMessage response = await client.GetAsync("https://raw.githubusercontent.com/said7388/suspicious-email-domains/refs/heads/main/domains.txt");
            if (!response.IsSuccessStatusCode)
            {
                return false;
            }
            string content = await response.Content.ReadAsStringAsync();
            string[] blocklist = content.Split('\n');
            string mailDomain = email.Split('@')[1];
            return Array.IndexOf(blocklist, mailDomain) != -1;
        }
        catch
        {
            return false;
        }
    }
}
```

### PHP Example

Here's a simple PHP function to check if an email domain is in the suspicious list:

```php
function isSuspiciousEmailDomain($email) {
    try {
        $url = "https://raw.githubusercontent.com/said7388/suspicious-email-domains/refs/heads/main/domains.txt";
        $content = file_get_contents($url);
        if ($content === false) {
            return false;
        }
        $blocklist = explode("\n", trim($content));
        $mailDomain = explode("@", $email)[1];
        return in_array($mailDomain, $blocklist);
    } catch (Exception $e) {
        return false;
    }
}
```

### How to Use

1. Call the `isSuspiciousEmailDomain` function with an email address.
2. It returns `true` if the domain is suspicious, `false` otherwise.

Example:

```javascript
const isSuspicious = await isSuspiciousEmailDomain("user@0-00.usa.cc");
console.log(isSuspicious); // true
```

## Data Sources

The domains are collected from various sources including:

- Public reports of spam and phishing domains
- Lists of disposable email services
- Community contributions
- Automated scans and monitoring

## Contributing

Contributions are welcome! If you know of suspicious domains not listed here, please:

1. Fork the repository
2. Add the domains to the appropriate files
3. Submit a pull request

## Files

- `domains.txt`: Plain text list of suspicious and disposable domains (one per line)
- `domains.json`: JSON array of suspicious and disposable domains
- `domains.csv`: CSV format with suspicious and disposable domains
- `merge_domains.js`: Script to merge and process domains

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Disclaimer

This list of suspicious and disposable domains is not exhaustive and should be used as one of many tools in email validation. Always combine with other security measures.
