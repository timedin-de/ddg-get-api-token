# ddg-get-api-token
Get your API token for DuckDuckGo private email redirecting service. Needed for Bitwarden, for example.

## Usage:
Go to [duckduckgo.com/email](https://duckduckgo.com/email/)
Create an account and @duck.com email.

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
