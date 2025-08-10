
# WeooWallet Payment Gateway Website

This website provides a payment gateway API that works with the WeooWallet Telegram bot.

## 🚀 GitHub Pages Deployment

1. **Create a new repository** named `weoowallet` on GitHub
2. **Upload all files** from the `website/` folder to the repository
3. **Enable GitHub Pages:**
   - Go to repository Settings
   - Scroll down to "Pages" section
   - Select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Click Save

4. **Your API will be available at:**
   ```
   https://gamenter95.github.io/weoowallet/
   ```

## 📡 API Endpoints

### Process Payment
```
GET https://gamenter95.github.io/weoowallet/api/{endpoint}?AMOUNT=100&COMMENT=Payment
```

### Validate Endpoint
```
GET https://gamenter95.github.io/weoowallet/api/validate/{endpoint}
```

### API Status
```
GET https://gamenter95.github.io/weoowallet/api/status
```

## 🔧 Configuration

The website uses client-side JavaScript to simulate API functionality since GitHub Pages doesn't support server-side processing. The API responses are stored in browser localStorage.

### Demo Endpoints

Two demo endpoints are included for testing:
- `abc123def456` (demo_user)
- `xyz789ghi012` (test_user)

## 🤖 Bot Integration

Update your bot's gateway URL to:
```python
self.gateway_url = "https://gamenter95.github.io/weoowallet"
```

## 📝 Features

- ✅ User-specific payment endpoints
- ✅ Payment validation and processing
- ✅ Transaction logging
- ✅ Balance management
- ✅ Real-time API responses
- ✅ Mobile-responsive design
- ✅ Complete API documentation

## 🔍 Testing

Test the API with these URLs:
- https://gamenter95.github.io/weoowallet/api/abc123def456?AMOUNT=100&COMMENT=Test
- https://gamenter95.github.io/weoowallet/api/validate/abc123def456
- https://gamenter95.github.io/weoowallet/api/status

## 📱 Mobile Support

The website is fully responsive and works on all devices.

## 🔒 Security Note

This implementation uses client-side storage for demo purposes. For production use, consider implementing proper backend validation and database storage.
