import { VenomConnect } from "venom-connect";
import { Address, ProviderRpcClient } from "everscale-inpage-provider";
import { EverscaleStandaloneClient } from "everscale-standalone-client";
import { useState, useEffect } from 'react';

const initTheme = 'light' as const;

const standaloneFallback = () =>
    EverscaleStandaloneClient.create({
        connection: {
            id: 1000,
            group: 'venom_testnet',
            type: 'jrpc',
            data:{
            endpoint: "https://jrpc.venom.foundation/rpc",
            },
        },
    });

    const initVenomConnect = async () => {
        return new VenomConnect({
            theme: initTheme,
            checkNetworkId: 1000,
            providersOptions: {
                venomwallet: {
                    links: {

                    },
                    walletWaysToConnect:[
                        {
                          // NPM package
                          package: ProviderRpcClient,
                          packageOptions: {
                            fallback:
                              VenomConnect.getPromise("venomwallet", "extension") ||
                              (() => Promise.reject()),
                            forceUseFallback: true,
                          },
                          packageOptionsStandalone: {
                            fallback: standaloneFallback,
                            forceUseFallback: true,
                          },
              
                          // Setup
                          id: "extension",
                          type: "extension",
              
                          // name: "Custom Name",
                          // logo: "",
              
                          // High-level setup
                          // options: ,
                          // connector: ,
                          // authConnector: ,
                        },
                      ],
                      defaultWalletWaysToConnect: [
                        // List of enabled options
                        "mobile",
                        "ios",
                        "android",
                      ],  
                }
            }
        })
    }

const themesList = ['light', 'dark','venom'];

const Wallet = () => {
    const [ venomConnect, setVenomConnect] =useState<any>();
    const [venomProvider, setVenomProvider] = useState<any>();
    const [address, setAddress] = useState();
    const [balance, setBalance] = useState();
    const [theme, setTheme] =useState(initTheme);
    const [info, setInfo] = useState('');
    const [standaloneMethodsIsFetching, setStandaloneMethodsIsFetching] =
    useState(false);

    const getTheme = () =>
    venomConnect?.getInfo()?.themeConfig?.name?.toString?.() || "...";

  const onToggleThemeButtonClick = async () => {
    const currentTheme = getTheme();

    const lastIndex = themesList.length - 1;

    const currentThemeIndex = themesList.findIndex(
      (item) => item === currentTheme
    );

    const theme =
      currentThemeIndex >= lastIndex || !~currentThemeIndex || !~lastIndex
        ? themesList[0]
        : themesList[currentThemeIndex + 1];

    await venomConnect?.updateTheme(theme);

    setTheme(getTheme());
  };

  const getAddress = async (provider: any) => {
    const providerState = await provider?.getProviderState?.();

    const address =
      providerState?.permissions.accountInteraction?.address.toString();

    return address;
  };

  const getBalance = async (provider: any, _address: string) => {
    try {
      const providerBalance = await provider?.getBalance?.(_address);

      return providerBalance;
    } catch (error) {
      return undefined;
    }
  };

  const checkAuth = async (_venomConnect: any) => {
    const auth = await _venomConnect?.checkAuth();
    if (auth) await getAddress(_venomConnect);
  };

  const onInitButtonClick = async () => {
    const initedVenomConnect = await initVenomConnect();
    setVenomConnect(initedVenomConnect);

    await checkAuth(initedVenomConnect);
  };

  const onConnectButtonClick = async () => {
    venomConnect?.connect();
  };

  const onDisconnectButtonClick = async () => {
    venomProvider?.disconnect();
  };

  const check = async (_provider: any) => {
    const _address = _provider ? await getAddress(_provider) : undefined;
    const _balance =
      _provider && _address ? await getBalance(_provider, _address) : undefined;

    setAddress(_address);
    setBalance(_balance);

    if (_provider && _address)
      setTimeout(() => {
        check(_provider);
      }, 100);
  };

  const onConnect = async (provider: any) => {
    setVenomProvider(provider);

    check(provider);
  };

  useEffect(() => {
    const off = venomConnect?.on("connect", onConnect);

    return () => {
      off?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [venomConnect]);

  const onStandaloneCall = async () => {
    const standalone: ProviderRpcClient | undefined =
      await venomConnect?.getStandalone("venomwallet");

    if (standalone) {
      const mainnetContractAddress = new Address(
        "0:" // todo
      );
  };
}

return(
    <>
    <div>
        <button
        onClick={onConnectButtonClick}>
            Connect Wallet
        </button>
    </div>
    </>
    );
};

export default Wallet;