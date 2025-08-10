
// WeooWallet API Router for GitHub Pages
// This handles routing and API responses using client-side JavaScript

(function() {
    'use strict';
    
    // Initialize API
    const api = new WeooWalletAPI();
    
    // Parse URL path and query parameters
    function parseRequest() {
        const path = window.location.pathname;
        const params = new URLSearchParams(window.location.search);
        
        // Extract endpoint from path like /weoowallet/api/abc123def456
        const pathParts = path.split('/');
        const apiIndex = pathParts.indexOf('api');
        
        if (apiIndex === -1) {
            return null;
        }
        
        const endpoint = pathParts[apiIndex + 1];
        const action = pathParts[apiIndex + 2]; // For routes like /api/validate/endpoint
        
        return {
            endpoint: endpoint,
            action: action,
            amount: params.get('AMOUNT'),
            comment: params.get('COMMENT') || '',
            format: params.get('format') || 'html'
        };
    }
    
    // Send JSON response
    function sendJSON(data, status = 200) {
        document.body.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
        document.body.style.fontFamily = 'Courier New, monospace';
        document.body.style.padding = '20px';
        document.body.style.backgroundColor = '#f5f5f5';
        document.body.style.margin = '0';
        
        // Set page title
        document.title = `API Response - ${data.status || 'WeooWallet'}`;
        
        // Add copy button
        const copyBtn = document.createElement('button');
        copyBtn.textContent = 'Copy JSON';
        copyBtn.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 10px 20px;
            background: #007bff;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 14px;
        `;
        copyBtn.onclick = () => {
            navigator.clipboard.writeText(JSON.stringify(data, null, 2));
            copyBtn.textContent = 'Copied!';
            setTimeout(() => copyBtn.textContent = 'Copy JSON', 2000);
        };
        document.body.appendChild(copyBtn);
    }
    
    // Send HTML error response
    function sendHTMLError(message, status = 400) {
        document.body.innerHTML = `
            <style>
                body { font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px; }
                .error { background: #ffe7e7; border: 1px solid #ffb3b3; padding: 20px; border-radius: 10px; }
                .error h2 { color: #d63384; margin-top: 0; }
                .code { background: #f8f9fa; padding: 10px; border-radius: 5px; font-family: monospace; }
                .back-link { margin-top: 20px; }
                .back-link a { color: #007bff; text-decoration: none; }
            </style>
            <div class="error">
                <h2>❌ API Error</h2>
                <p><strong>Status:</strong> ${status}</p>
                <p><strong>Message:</strong> ${message}</p>
                
                <h3>Expected Format:</h3>
                <div class="code">
                    /api/{endpoint}?AMOUNT=100&COMMENT=Payment
                </div>
                
                <h3>Example:</h3>
                <div class="code">
                    /api/abc123def456?AMOUNT=100&COMMENT=Test%20Payment
                </div>
                
                <div class="back-link">
                    <a href="/">← Back to Home</a> | 
                    <a href="/api/docs.html">📖 API Documentation</a>
                </div>
            </div>
        `;
    }
    
    // Handle API requests
    function handleAPIRequest() {
        const request = parseRequest();
        
        if (!request) {
            // Not an API request, return
            return;
        }
        
        try {
            // Handle different API endpoints
            if (request.endpoint === 'status') {
                const response = api.getStatus();
                sendJSON(response);
                return;
            }
            
            if (request.action === 'validate' || request.endpoint === 'validate') {
                const endpoint = request.action || request.endpoint;
                const response = api.validateEndpoint(endpoint);
                sendJSON(response, response.status === 'error' ? 404 : 200);
                return;
            }
            
            // Handle payment processing
            if (request.endpoint && !request.action) {
                if (!request.amount) {
                    const error = {
                        status: 'error',
                        message: 'AMOUNT parameter is required',
                        example: `/api/${request.endpoint}?AMOUNT=100&COMMENT=Test%20Payment`
                    };
                    sendJSON(error, 400);
                    return;
                }
                
                const response = api.processPayment(
                    request.endpoint,
                    request.amount,
                    request.comment
                );
                
                sendJSON(response, response.status === 'error' ? 400 : 200);
                return;
            }
            
            // Invalid endpoint
            sendHTMLError('Invalid API endpoint', 404);
            
        } catch (error) {
            console.error('API Error:', error);
            const response = {
                status: 'error',
                message: 'Internal server error',
                error: error.message
            };
            sendJSON(response, 500);
        }
    }
    
    // Initialize when page loads
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', handleAPIRequest);
    } else {
        handleAPIRequest();
    }
    
})();
