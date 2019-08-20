# NotBuycraft (WIP)
(It's not finished yet lol)
- An alternative to Buycraft/Tebex that will be self hosted.
- Uses MongoDB as the database
- Built using NodeJS
- Bootstrap Based
- Fully Customizable

**Installation**
 ```shell script
git clone https://gitlab.dec0de.xyz/shaunagostinho/notbuycraft.git
cd notbuycraft
npm install
npm start
 ```

**Configuration**
```json
{
  "mongodb": {
    "uri": "localhost"
  },
  "mail": {
    "host": "localhost",
    "port": 587,
    "type": "TLS",
    "auth": {
      "user": "email",
      "pass": "pass"
    }
  },
  "https": false,
  "port": 8080,
  "api_key": "vnepPgxHtq8xRK4p"
}
```