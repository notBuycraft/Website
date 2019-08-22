# NotBuycraft (WIP)
(It's not finished yet lol)

**Features**
- Payment Management (50%)
- Payment Lookup (TODO)
- Package/Category Management & Creation (25%)
- Coupons / Discounts / Gift cards / Sales (TODO)
- Full Statistics / Statistic Lookup (TODO)
- PayPal Support (TODO)
- Other payment gateway support (TODO)
- Expiry / Chargeback / 
- Multiple Currency Support (TODO)
- Language Translations (TODO eventually)

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

**Thanks**
- Tim Creative (Argon Dashboard)