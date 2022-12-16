import {
  IfWalletConnected,
  TieredSalesSelector,
  CryptoValue,
  CryptoUnits,
  IfWalletNotConnected,
  Media,
  TieredSalesTotalMinted,
  TieredSalesMaxAllocation,
  Spinner,
  classNames,
} from "@flair-sdk/react";

function LandTierSelector() {
  return (
    <TieredSalesSelector
      // Even if there's 1 tier show this selector element:
      alwaysShowTierSelector={true}
      // Show all tiers no matter if they're active, sold out or wallet is not eligible:
      hideNotActiveTiers={false}
      hideNotEligibleTiers={false}
      hideSoldOutTiers={false}
      // Don't show a title element:
      title={false}
      // Don't wrap tier elements with a parent element:
      wrapper={true}
      wrapperClassName="flex flex-wrap items-center justify-center gap-4 pb-6 overflow-x-scroll scroll-visible w-[100vw]"
      // Show a simple loading element:
      loadingElement={
        <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
          <div className="bg-gray-200 duration-300 animate-pulse h-48 w-48 rounded-lg"></div>
          <div className="bg-gray-200 duration-300 animate-pulse h-48 w-48 rounded-lg"></div>
          <div className="bg-gray-200 duration-300 animate-pulse h-48 w-48 rounded-lg"></div>
        </div>
      }
      // Customize each tier element:
      optionClassName=""
      optionElement={({
        active,
        checked,
        currencySymbol,
        tierConfig,
        tierId,
        tokenMetadata,
        tokenMetadataLoading,
      }) => (
        <div
          className={classNames(
            "cursor-pointer w-80 text-center rounded-lg border border-4 p-2 list-outside w-[200px] hover:bg-gray-100/10",
            checked ? "border-gray-200" : "border-gray-900"
          )}
        >
          <div className="">
            {tokenMetadataLoading ? (
              "Loading..."
            ) : tokenMetadata?.image ? (
              <Media uri={tokenMetadata.image} preferManagedGateway={true} loadingMask={
                <div className="bg-gray-200 duration-300 animate-pulse h-48 w-full rounded-lg"></div>
              } />
            ) : (
              <i>No image</i>
            )}
          </div>

          {/* <div>
            Tier ID = <b>{tierId.toString()}</b>
          </div>

          <div>
            Is sale active for this tier ={" "}
            <b>{tierConfig.isActive ? "Yes" : "No"}</b>
          </div>

          <div>
            Is this tier currently selected ={" "}
            <b className={checked ? "text-indigo-500" : ""}>
              {checked ? "Yes" : "No"}
            </b>
          </div> */}

          <div className="mt-2 text-sm">
            <b>{tokenMetadata?.name || "No title set"}</b>
          </div>

          <div>
            {tierConfig?.price?.toString() ? (
              <CryptoValue
                symbol={currencySymbol}
                value={tierConfig.price?.toString()}
                formatted={false}
                showPrice={false}
                showSymbol={true}
              />
            ) : null}
          </div>

          {/* <div>
            Currency symbol = <b>{currencySymbol?.toString()}</b>
          </div>

          <div>
            Is current wallet eligible for tier? ={" "}
            <b>
              <IfWalletConnected>
                {tierConfig.isEligible === undefined
                  ? "..."
                  : tierConfig.isEligible
                  ? "Yes"
                  : "No"}
              </IfWalletConnected>
              <IfWalletNotConnected>Please connect first!</IfWalletNotConnected>
            </b>
          </div> */}

          {/* <div>
            Is current wallet eligible for tier? ={" "}
            <b>
              <IfWalletConnected>
                {tierConfig.isEligible === undefined
                  ? "..."
                  : tierConfig.isEligible
                  ? "Yes"
                  : "No"}
              </IfWalletConnected>
              <IfWalletNotConnected>Please connect first!</IfWalletNotConnected>
            </b>
          </div>

          <div>
            Is current wallet allowlisted for tier? ={" "}
            <b>
              <IfWalletConnected>
                {tierConfig.isAllowlisted === undefined
                  ? "..."
                  : tierConfig.isAllowlisted
                  ? "Yes"
                  : "No"}
              </IfWalletConnected>
              <IfWalletNotConnected>Please connect first!</IfWalletNotConnected>
            </b>
          </div> */}

          {/* <div>
            Tier total max allocation ={" "}
            <TieredSalesMaxAllocation tierId={Number(tierId)} />
          </div>

          <div>
            Tier total minted ={" "}
            <TieredSalesTotalMinted tierId={Number(tierId)} />
          </div> */}
        </div>
      )}
    />
  );
}

export default LandTierSelector;
