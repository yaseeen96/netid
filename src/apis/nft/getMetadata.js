import axios from "axios";
import { useQuery } from "react-query";

export const getMetadata = (walletAddress) => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  return useQuery("getMetadata", async () => {
    const getNftResponse = await axios
      .get(`/v2/nftkit/nft/chain/SEPOLIA/owner/${walletAddress}`, {
        baseURL: baseURL,
      })
      .then((response) => {
        return response.data.evmNfts[0];
      })
      .catch((error) => {
        console.log("an error occurred from getNFTs: " + error.response);
      })
      .finally(() => {});
    const getMetadataResponse = await axios
      .get(
        `/v2/nftkit/nft/chain/SEPOLIA/contract/${getNftResponse.contract.address}/token/${getNftResponse.id.tokenId}/metadata`,
        { baseURL: baseURL }
      )
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("an error occurred from getNFTs: " + error.response);
      })
      .finally(() => {});
    return getMetadataResponse;
  });
};
