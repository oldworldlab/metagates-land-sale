import {
  ConnectButton,
  SwitchChainButton,
  WalletDropdown,
  IfWalletConnected,
  DiamondProvider,
  TieredSalesProvider,
  TieredSalesStatus,
  TieredSalesAllowlistStatus,
  TieredSalesMintStatusBar,
  TieredSalesPrice,
  TieredSalesMintInput,
  TieredSalesMintButton,
  TieredSalesIfWalletCanMint,
  TieredSalesEligibleAmount,
  TieredSalesWalletMints,
  TieredSalesApproveButton,
  TieredSalesIfNotSoldOut,
  TieredSalesIfSoldOut,
  TieredSalesPayButton,
  ERC721TotalSupply,
  ERC721MaxSupply,
  ERC721TieredSalesSelector,
  classNames,
  SECONDARY_BUTTON,
  useWalletContext,
  TieredSalesSuccessDialog,
} from "@flair-sdk/react";
import { useCallback, useEffect, useState } from "react";

import { useAccount } from "wagmi";
import LandTierSelector from "./LandTierSelector";
import { SendTransactionResult } from "@wagmi/core";
import { BigNumberish } from "ethers";
import { TransactionReceipt } from "@ethersproject/providers";

const chainId = Number(process.env.REACT_APP_CONTRACT_CHAIN_ID);
const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS as `0x${string}`;

function App() {
  const { isConnected } = useAccount();

  const mainButtonClass =
    "w-full bg-indigo-700 border border-transparent py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed";

  const { setPreferredChainId, setAllowedNetworks } = useWalletContext();

  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [successDialogMintCount, setSuccessDialogMintCount] =
    useState<BigNumberish>();
  const [successDialogTxResponse, setSuccessDialogTxResponse] =
    useState<SendTransactionResult>();
  const [successDialogTxReceipt, setSuccessDialogTxReceipt] =
    useState<TransactionReceipt>();

  const onMintSuccess = useCallback(
    (args: {
      currentTierId: BigNumberish;
      totalAmount: BigNumberish;
      mintCount: BigNumberish;
      txReceipt?: TransactionReceipt | undefined;
      txResponse?: SendTransactionResult | undefined;
    }) => {
      setSuccessDialogMintCount(args.mintCount);
      setSuccessDialogTxResponse(args.txResponse);
      setSuccessDialogTxReceipt(args.txReceipt);
      setSuccessDialogOpen(true);
    },
    []
  );

  useEffect(() => {
    setPreferredChainId(Number(chainId));
    setAllowedNetworks([Number(chainId)]);

    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen text-white p-12 mt-12">
      <DiamondProvider
        chainId={Number(chainId)}
        contractAddress={contractAddress}
      >
        <TieredSalesSuccessDialog
          mintCount={successDialogMintCount}
          txResponse={successDialogTxResponse}
          txReceipt={successDialogTxReceipt}
          open={successDialogOpen}
          setOpen={setSuccessDialogOpen}
        />
        <TieredSalesProvider
          chainId={Number(chainId)}
          contractAddress={contractAddress}
          onMintSuccess={onMintSuccess}
        >
          {({
            data: { tiers, rampRequestConfig },
            isLoading: { tiersLoading, isAutoDetectingTier },
          }) => (
            <main className="h-fit w-full max-w-2xl min-w-xl mx-auto lg:max-w-5xl flex flex-col gap-8 items-center p-4">
              {/* Sales Title */}
              <div className="flex flex-col gap-4 items-center justify-between">
                <h2 className="font-bold text-2xl">Choose your housing type</h2>
              </div>

              {/* Tier Selector */}
              <div className="flex gap-2 items-center justify-center">
                {/* <ERC721TieredSalesSelector /> */}
                <LandTierSelector />
              </div>

              <IfWalletConnected>
                <WalletDropdown />
              </IfWalletConnected>

              <div className="rounded-lg p-6 bg-gray-100/10 w-full max-w-[500px]">
                <main className="flex flex-col gap-y-8">
                  {/* Sale Info */}
                  <div>
                    {/* Price */}
                    <div className="flex gap-2 items-center justify-center">
                      <TieredSalesPrice
                        showPrice={true}
                        className="text-lg font-medium text-gray-100 whitespace-nowrap"
                      />
                    </div>

                    {/* Status and Supply Counter */}
                    <div className="mt-4 flex gap-4 justify-between">
                      <div className="flex flex-col flex-wrap sm:flex-row sm:items-center gap-4">
                        <TieredSalesStatus />

                        {isConnected && <TieredSalesAllowlistStatus />}
                      </div>

                      <div className="inline-block rounded-full px-4 py-2 text-center">
                        <ERC721TotalSupply
                          chainId={chainId}
                          contractAddress={contractAddress}
                        />{" "}
                        /{" "}
                        <ERC721MaxSupply
                          chainId={chainId}
                          contractAddress={contractAddress}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Mint Widget */}
                  <div>
                    <div>
                      <div className="mb-4">
                        <div className="flex items-center justify-between">
                          <h2 className="text-sm font-medium">
                            How many to mint?
                          </h2>
                        </div>

                        <fieldset className="mt-4">
                          <legend className="sr-only">
                            Choose number of mints
                          </legend>
                          <div className="flex">
                            <TieredSalesMintInput className="appearance-none min-w-0 w-full bg-gray-900 border border-gray-300 py-2 px-4 text-base text-gray-100 placeholder-gray-300 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 disabled:opacity-75" />
                          </div>
                        </fieldset>
                      </div>

                      {/* Mint button */}
                      <TieredSalesIfNotSoldOut>
                        <ConnectButton
                          className={mainButtonClass}
                          label={"Sign-in to buy"}
                        >
                          <div className="flex flex-col gap-3 items-center">
                            <SwitchChainButton
                              requiredChainId={Number(chainId)}
                              className={mainButtonClass}
                            >
                              <TieredSalesApproveButton
                                className={mainButtonClass}
                              >
                                <TieredSalesMintButton
                                  className={mainButtonClass}
                                />
                              </TieredSalesApproveButton>
                              <div className="flex gap-2 items-center w-full">
                                {rampRequestConfig?.canSponsorTransaction ? (
                                  <TieredSalesMintButton
                                    rampIgnoreCurrentBalance={true}
                                    rampPreferredMethod={"sponsor"}
                                    className={classNames(
                                      SECONDARY_BUTTON,
                                      "flex flex-1 flex-col justify-center items-center gap-2"
                                    )}
                                  >
                                    Mint without Gas
                                  </TieredSalesMintButton>
                                ) : (
                                  <>
                                    <TieredSalesPayButton
                                      className={classNames(
                                        SECONDARY_BUTTON,
                                        "flex flex-1 flex-col justify-center items-center gap-2"
                                      )}
                                      method="stripe"
                                    />
                                    <TieredSalesPayButton
                                      className={classNames(
                                        SECONDARY_BUTTON,
                                        "flex flex-1 flex-col justify-center items-center gap-2"
                                      )}
                                      method="utrust,bitpay,coinbase"
                                    />
                                  </>
                                )}
                              </div>
                            </SwitchChainButton>
                          </div>
                        </ConnectButton>
                      </TieredSalesIfNotSoldOut>

                      {/* Sold Out Message */}
                      <TieredSalesIfSoldOut>
                        <div className="border-l-4 border-green-400 bg-green-50 p-4">
                          <div className="flex">
                            <div>
                              <p className="text-sm text-green-700">
                                Sold Out 🎉{" "}
                              </p>
                            </div>
                          </div>
                        </div>
                      </TieredSalesIfSoldOut>

                      {/* Maximum Eligible Amount */}
                      <IfWalletConnected>
                        <small className="block font-light mt-2 text-xs">
                          <TieredSalesIfWalletCanMint>
                            You can mint up to{" "}
                            <TieredSalesEligibleAmount
                              as="div"
                              className="inline"
                            />
                            .{" "}
                          </TieredSalesIfWalletCanMint>
                          {isConnected ? (
                            <>
                              You have minted <TieredSalesWalletMints /> NFTs in
                              this tier.
                            </>
                          ) : null}
                        </small>
                      </IfWalletConnected>
                    </div>

                    {/* Transaction Status Bar */}
                    <TieredSalesMintStatusBar className="mt-4 flex flex-col gap-2" />
                  </div>
                </main>
              </div>
            </main>
          )}
        </TieredSalesProvider>
      </DiamondProvider>
    </div>
  );
}

export default App;
