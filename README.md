# ddg-get-api-token
Get your API token for DuckDuckGo private email redirecting service. Needed for Bitwarden, for example.

## Usage:
Go to [duckduckgo.com/email](https://duckduckgo.com/email/)\
Create an account and @duck.com email.

### Using the Web-App
[timedin.de/tools/ddg-api-token/](https://www.timedin.de/tools/ddg-api-token/)\
Fastest and easiest way, but your tokens and keys must be transferred and processed by the web server and Cloudflare.\
(We don't store any of the provided credentials, not even in server logs)


### Easy One-Step 
```
curl -sSL https://raw.githubusercontent.com/timedin-de/ddg-get-api-token/main/create_token.sh | bash
```
### Alternatives

#### Clone the repo and run the bash file
```
git clone https://github.com/timedin-de/ddg-get-api-token.git
cd ddg-get-api-token
bash create_token.sh
```
#### Manually download and run
```
wget https://raw.githubusercontent.com/timedin-de/ddg-get-api-token/main/create_token.sh
bash create_token.sh
```
:tada:
