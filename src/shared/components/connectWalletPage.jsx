import { connectWalletBg } from "../../assets";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import NFTVerification from "./verificationComponent";
import { cardUpload } from "../../apis";

const ConnectWalletPage = () => {
  // const handleSubmit = async (name, tokenId) => {
  //   const response = await cardUpload(name, tokenId);
  //   console.log("card upload: " + response.value.cid);
  // };

  const { isConnected } = useAccount();
  const navigate = useNavigate();
  if (isConnected) navigate("../create-netid", { replace: true });
  else
    return (
      <div className="flex flex-col w-screen h-[80vh] justify-center items-center">
        <img src={connectWalletBg} alt="connect-wallet-bg" className="my-8" />
        <ConnectButton />
        {/* <NFTVerification /> */}
        {/* <Button
          onClick={() => {
            handleSubmit("Yaseen", "11202");
          }}
        >
          click me
        </Button> */}
      </div>
    );
};

export default ConnectWalletPage;
