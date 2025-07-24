import React, { useState } from 'react';
import { Button, Text, VStack, useToast } from '@chakra-ui/react';
import { FaEthereum } from 'react-icons/fa';
import { useWeb3 } from '../contexts/Web3Context';

const Web3Wallet = ({ onWalletConnected, isRequired = true }) => {
  const { walletAddress, isConnected, connectWallet, disconnectWallet } = useWeb3();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleConnectWallet = async () => {
    setIsLoading(true);
    try {
      const address = await connectWallet();
      onWalletConnected && onWalletConnected(address);
      toast({
        title: 'Wallet Connected',
        description: `Address: ${address.slice(0, 6)}...${address.slice(-4)}`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      if (error.message === 'MetaMask not found') {
        toast({
          title: 'MetaMask Not Found',
          description: 'Please install MetaMask extension',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Connection Error',
          description: 'Failed to connect wallet',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisconnectWallet = () => {
    disconnectWallet();
    onWalletConnected && onWalletConnected('');
    toast({
      title: 'Wallet Disconnected',
      status: 'info',
      duration: 2000,
      isClosable: true,
    });
  };

  const formatAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (isConnected) {
    return (
      <VStack spacing={2}>
        <Button
          leftIcon={<FaEthereum />}
          colorScheme="green"
          variant="outline"
          size="sm"
          isDisabled
        >
          Connected: {formatAddress(walletAddress)}
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={handleDisconnectWallet}
        >
          Disconnect
        </Button>
      </VStack>
    );
  }

  return (
    <VStack spacing={2}>
      <Button
        leftIcon={<FaEthereum />}
        colorScheme="blue"
        onClick={handleConnectWallet}
        isLoading={isLoading}
        loadingText="Connecting..."
      >
        Connect Wallet
      </Button>
      {isRequired && (
        <Text fontSize="sm" color="gray.500">
          Wallet connection required for login
        </Text>
      )}
    </VStack>
  );
};

export default Web3Wallet; 