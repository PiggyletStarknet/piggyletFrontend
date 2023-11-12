import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import type { AppProps } from 'next/app';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  goerli,
} from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import {
  StarknetConfig,
  InjectedConnector,
  publicProvider as publicProviderSTRK
} from "@starknet-react/core";
import { goerli as goerliSTRK, mainnet as mainnetSTRK } from "@starknet-react/chains"

// const providersSTRK = [publicProviderSTRK()]

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    goerli,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [goerli] : []),
  ],
  [publicProvider()]
);
const chainsStarknet = [goerliSTRK, mainnetSTRK]

const { connectors } = getDefaultWallets({
  appName: 'Piggylet',
  projectId: 'b88aca1ec36164be80539e3221e02bbc',
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

function MyApp({ Component, pageProps }: AppProps) {
  const connectorsSTRK = [
    new InjectedConnector({ options: { id: "argentX", name: "Argent",}}),
    new InjectedConnector({ options: { id: "braavos", name: "Braavos",}}),
  ];

  return (
    <StarknetConfig chains={chainsStarknet} provider={publicProviderSTRK as any} connectors={connectorsSTRK} autoConnect={true}>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains}>
            <Component {...pageProps} />
        </RainbowKitProvider>
      </WagmiConfig>
    </StarknetConfig>

  );
}

export default MyApp;
