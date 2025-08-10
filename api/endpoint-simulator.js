
// WeooWallet API Endpoint Simulator
// This simulates the backend functionality for GitHub Pages hosting

class WeooWalletAPI {
    constructor() {
        this.endpoints = this.loadEndpoints();
        this.transactions = this.loadTransactions();
    }
    
    // Load endpoints from localStorage (simulating database)
    loadEndpoints() {
        const stored = localStorage.getItem('weoowallet_endpoints');
        return stored ? JSON.parse(stored) : {
            // Demo endpoints for testing
            'abc123def456': {
                user_id: 123456789,
                username: 'demo_user',
                balance: 250.00,
                active: true,
                created: new Date().toISOString()
            },
            'xyz789ghi012': {
                user_id: 987654321,
                username: 'test_user',
                balance: 150.50,
                active: true,
                created: new Date().toISOString()
            }
        };
    }
    
    // Load transactions from localStorage
    loadTransactions() {
        const stored = localStorage.getItem('weoowallet_transactions');
        return stored ? JSON.parse(stored) : [];
    }
    
    // Save endpoints to localStorage
    saveEndpoints() {
        localStorage.setItem('weoowallet_endpoints', JSON.stringify(this.endpoints));
    }
    
    // Save transactions to localStorage
    saveTransactions() {
        localStorage.setItem('weoowallet_transactions', JSON.stringify(this.transactions));
    }
    
    // Generate transaction ID
    generateTransactionId() {
        return 'gw_' + Math.random().toString(36).substr(2, 12);
    }
    
    // Validate amount
    validateAmount(amount) {
        const parsed = parseFloat(amount);
        if (isNaN(parsed) || parsed < 1) {
            return { valid: false, error: 'Amount must be a number >= 1' };
        }
        return { valid: true, amount: parsed };
    }
    
    // Process payment
    processPayment(endpoint, amount, comment = '') {
        // Validate endpoint
        if (!this.endpoints[endpoint]) {
            return {
                status: 'error',
                message: 'Invalid endpoint',
                endpoint: endpoint
            };
        }
        
        // Validate amount
        const validation = this.validateAmount(amount);
        if (!validation.valid) {
            return {
                status: 'error',
                message: validation.error,
                endpoint: endpoint
            };
        }
        
        // Process payment
        const user = this.endpoints[endpoint];
        const transactionId = this.generateTransactionId();
        const timestamp = new Date().toISOString();
        
        // Update balance
        user.balance += validation.amount;
        
        // Create transaction record
        const transaction = {
            transaction_id: transactionId,
            endpoint: endpoint,
            user_id: user.user_id,
            username: user.username,
            amount: validation.amount,
            comment: comment,
            timestamp: timestamp,
            status: 'completed'
        };
        
        this.transactions.push(transaction);
        
        // Save to localStorage
        this.saveEndpoints();
        this.saveTransactions();
        
        return {
            status: 'success',
            message: 'Payment processed successfully',
            data: {
                transaction_id: transactionId,
                amount: validation.amount,
                user_id: user.user_id,
                username: user.username,
                comment: comment,
                new_balance: user.balance,
                timestamp: timestamp
            }
        };
    }
    
    // Validate endpoint
    validateEndpoint(endpoint) {
        if (!this.endpoints[endpoint]) {
            return {
                status: 'error',
                message: 'Invalid endpoint',
                endpoint: endpoint
            };
        }
        
        const user = this.endpoints[endpoint];
        return {
            status: 'success',
            message: 'Valid endpoint',
            data: {
                user_id: user.user_id,
                username: user.username,
                endpoint: endpoint,
                balance: user.balance,
                active: user.active
            }
        };
    }
    
    // Get API status
    getStatus() {
        const activeEndpoints = Object.keys(this.endpoints).length;
        const totalTransactions = this.transactions.length;
        const totalVolume = this.transactions.reduce((sum, tx) => sum + tx.amount, 0);
        
        return {
            status: 'online',
            service: 'WeooWallet Payment Gateway',
            version: '1.0.0',
            timestamp: new Date().toISOString(),
            statistics: {
                active_endpoints: activeEndpoints,
                total_transactions: totalTransactions,
                total_volume: totalVolume
            },
            endpoints: {
                '/api/{endpoint}': 'Process payment',
                '/api/validate/{endpoint}': 'Validate endpoint',
                '/api/status': 'API status'
            },
            uptime: '99.9%',
            response_time: '< 100ms'
        };
    }
    
    // Add new endpoint (for demo purposes)
    addEndpoint(endpoint, user_id, username, balance = 0) {
        this.endpoints[endpoint] = {
            user_id: user_id,
            username: username,
            balance: balance,
            active: true,
            created: new Date().toISOString()
        };
        this.saveEndpoints();
    }
    
    // Get user transactions
    getUserTransactions(endpoint, limit = 10) {
        return this.transactions
            .filter(tx => tx.endpoint === endpoint)
            .slice(-limit)
            .reverse();
    }
}

// Global API instance
window.WeooWalletAPI = WeooWalletAPI;

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WeooWalletAPI;
}
