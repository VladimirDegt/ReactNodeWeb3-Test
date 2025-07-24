# Web3 Integration Setup Guide

## Prerequisites

1. **MetaMask Extension**: Install MetaMask browser extension
   - Chrome: https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn
   - Firefox: https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/
   - Brave: Available in Chrome Web Store

2. **Node.js and npm**: Ensure you have Node.js installed

## Installation Steps

### 1. Install Dependencies
The Web3 integration uses existing dependencies:
- `react-icons` (for Ethereum icon)
- `@chakra-ui/react` (for UI components)
- `react-toastify` (for notifications)

### 2. MetaMask Setup
1. Install MetaMask extension
2. Create a new wallet or import existing one
3. Switch to desired network (Ethereum Mainnet, Testnet, etc.)
4. Ensure you have some test ETH for testing

### 3. Testing the Integration

#### Step 1: Start the Application
```bash
cd Client
npm start
```

#### Step 2: Test Wallet Connection
1. Navigate to the sign-in page
2. Click "Connect Wallet" button
3. Approve connection in MetaMask popup
4. Verify wallet address is displayed
5. Verify "Sign In" button becomes enabled

#### Step 3: Test Login Flow
1. With wallet connected, enter credentials:
   - Email: `admin@gmail.com`
   - Password: `admin123`
2. Click "Sign In"
3. Verify successful login and navigation

#### Step 4: Test Navigation
1. After login, check navbar for wallet info
2. Verify wallet address and network are displayed
3. Test wallet disconnection if needed

## Troubleshooting

### Common Issues

#### 1. MetaMask Not Found
**Error**: "MetaMask Not Found" toast
**Solution**: 
- Install MetaMask extension
- Refresh the page
- Ensure MetaMask is unlocked

#### 2. Connection Rejected
**Error**: "Connection Error" toast
**Solution**:
- Check MetaMask popup was not blocked
- Try connecting again
- Clear browser cache if needed

#### 3. Wrong Network
**Error**: Unexpected network in wallet info
**Solution**:
- Switch network in MetaMask
- Refresh the page
- Use `switchNetwork()` function if implemented

#### 4. Account Changed
**Behavior**: Wallet info updates automatically
**Expected**: This is normal behavior when switching accounts in MetaMask

### Development Tips

#### 1. Testing Different Networks
```javascript
// In browser console
window.ethereum.request({
  method: 'wallet_switchEthereumChain',
  params: [{ chainId: '0x1' }], // Ethereum Mainnet
});
```

#### 2. Testing Account Changes
- Use MetaMask to switch between accounts
- Verify UI updates automatically

#### 3. Testing Disconnection
- Use "Disconnect" button in Web3Wallet component
- Verify login button becomes disabled

## Security Considerations

1. **Wallet Connection Required**: Users cannot login without connecting wallet
2. **No Private Key Access**: Application only reads public address
3. **Network Validation**: Supports multiple networks with validation
4. **Secure Connection**: Uses MetaMask's secure connection methods

## Browser Support

- ✅ Chrome (with MetaMask)
- ✅ Firefox (with MetaMask)
- ✅ Brave (with MetaMask)
- ✅ Edge (with MetaMask)
- ❌ Safari (MetaMask not available)

## Network Support

- Ethereum Mainnet (0x1)
- Ropsten Testnet (0x3)
- Rinkeby Testnet (0x4)
- Goerli Testnet (0x5)
- Kovan Testnet (0x2a)
- Polygon (0x89)
- BSC (0x38)

## Next Steps

1. **Smart Contract Integration**: Add contract interaction
2. **Transaction Signing**: Implement transaction signing
3. **NFT Support**: Add NFT display and management
4. **Multi-chain Support**: Expand to more networks
5. **Wallet Connect**: Add support for other wallets 