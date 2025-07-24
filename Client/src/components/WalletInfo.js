import React from 'react';
import { Box, Text, Badge, HStack, Icon } from '@chakra-ui/react';
import { FaEthereum } from 'react-icons/fa';
import { useWeb3 } from '../contexts/Web3Context';

const WalletInfo = () => {
  const { walletAddress, isConnected, chainId } = useWeb3();

  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const getNetworkName = (chainId) => {
    switch (chainId) {
      case '0x1':
        return 'Ethereum';
      case '0x3':
        return 'Ropsten';
      case '0x4':
        return 'Rinkeby';
      case '0x5':
        return 'Goerli';
      case '0x2a':
        return 'Kovan';
      case '0x89':
        return 'Polygon';
      case '0x38':
        return 'BSC';
      default:
        return 'Unknown';
    }
  };

  if (!isConnected) {
    return (
      <Box>
        <Badge colorScheme="red" variant="subtle">
          Wallet Not Connected
        </Badge>
      </Box>
    );
  }

  return (
    <HStack spacing={2}>
      <Icon as={FaEthereum} color="green.500" />
      <Box>
        <Text fontSize="sm" fontWeight="medium">
          {formatAddress(walletAddress)}
        </Text>
        <Badge colorScheme="green" variant="subtle" fontSize="xs">
          {getNetworkName(chainId)}
        </Badge>
      </Box>
    </HStack>
  );
};

export default WalletInfo; 