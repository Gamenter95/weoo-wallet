
# WeooWallet Payment Gateway Website

This website provides a payment gateway API that works with the WeooWallet Telegram bot.

## 🚀 GitHub Pages Deployment

1. **Create a new repository** named `weoo-wallet` (exactly this name) on GitHub
2. **Upload all files** from the `website/` folder to the repository root
3. **Enable GitHub Pages:**
   - Go to repository Settings
   - Scroll down to "Pages" section
   - Select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Click Save

4. **Your API will be available at:**
   ```
   https://gamenter95.github.io/weoo-wallet/
   ```

## 📡 API Endpoints

### Main API
```
https://gamenter95.github.io/weoo-wallet/api/
```

### Process Payment
```
GET https://gamenter95.github.io/weoo-wallet/api/{endpoint}?AMOUNT=100&COMMENT=Payment
```

### Validate Endpoint
```
GET https://gamenter95.github.io/weoo-wallet/api/validate/{endpoint}
```

### Check Payments
```
GET https://gamenter95.github.io/weoo-wallet/api/check?endpoint={endpoint}&user_id={user_id}
```

### API Status
```
GET https://gamenter95.github.io/weoo-wallet/api/status
```

## 🔧 Configuration

The website uses client-side JavaScript to simulate API functionality since GitHub Pages doesn't support server-side processing.

### Demo Endpoints

Two demo endpoints are included for testing:
- `abc123def456` (demo_user)
- `xyz789ghi012` (test_user)

### Testing URLs

**Payment Endpoints:**
```
https://gamenter95.github.io/weoo-wallet/api/abc123def456?AMOUNT=100&COMMENT=Test
https://gamenter95.github.io/weoo-wallet/api/xyz789ghi012?AMOUNT=50&COMMENT=Demo
```

**Validation Endpoints:**
```
https://gamenter95.github.io/weoo-wallet/api/validate/abc123def456
https://gamenter95.github.io/weoo-wallet/api/validate/xyz789ghi012
```

## 🤖 Bot Integration

Update your bot's gateway URL to:
```python
self.gateway_url = "https://gamenter95.github.io/weoo-wallet"
```

## 📝 Example Usage

### Test Payment:
```
https://gamenter95.github.io/weoo-wallet/api/abc123def456?AMOUNT=100&COMMENT=Test%20Payment
```

### Validate Endpoint:
```
https://gamenter95.github.io/weoo-wallet/api/validate/abc123def456
```

### Check Status:
```
https://gamenter95.github.io/weoo-wallet/api/status
```

## 🔧 Troubleshooting

1. **404 Error**: Make sure repository name is exactly `weoo-wallet`
2. **API Not Working**: Check that GitHub Pages is enabled and deployed from main branch
3. **Endpoint Issues**: Verify you're using the correct URL structure

## 🛠️ Local Development

Open `index.html` in a web browser to test the API locally before deploying to GitHub Pages.
