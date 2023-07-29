import axios from "axios";
export const mintNft = async (cid, name, email, mobileNo, walletAddress) => {
  const requestBody = {
    metadata: {
      description:
        "One card for all digital services. Avail services without sending your data",
      name: "NETID",
      image: `ipfs://${cid}`,
      attributes: [
        {
          trait_type: "name",
          value: name,
        },
        {
          trait_type: "Email",
          value: email,
        },
        {
          trait_type: "Mobile No",
          value: mobileNo,
        },
      ],
    },
    recipientAddress: walletAddress,
    metadataStorageType: "OFF_CHAIN",
  };
  const baseURL = import.meta.env.VITE_BASE_URL;
  const smartContractAddress = import.meta.env.VITE_SMART_CONTRACT_ADDRESS;
  const response = await axios
    .post(
      `/v2/nftkit/nft/chain/SEPOLIA/contract/${smartContractAddress}/token/mint`,
      requestBody,
      {
        headers: {
          "Content-Type": "application/json",
        },
        baseURL: baseURL,
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error.response) {
        return error.response.data;
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error: ", error.message);
      }
    })
    .finally(() => {});
  return response;
};
