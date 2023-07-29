import React from "react";
import { age, email, gender, idCard, phone } from "../../../assets";
import InfoDiv from "../components/infoDiv";
import { Button } from "@material-tailwind/react";
import { useAccount } from "wagmi";
import ConnectWalletPage from "../../../shared/components/connectWalletPage";
import { getMetadata } from "../../../apis";
import { Circles } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { address, isConnected } = useAccount();
  const navigate = useNavigate();
  const { isLoading, data, isError, status } = getMetadata(address);

  const image = `https://ipfs.io/${data?.image?.replace("ipfs://", "ipfs/")}`;
  if (isConnected === true && isError === false) {
    console.log("data:" + data);
    console.log(image);

    return (
      <>
        <div className="flex flex-col lg:px-24 lg:py-10 xs:px-12 xs:py-5 ">
          <h1 className="text-3xl text-white my-8 mx-2 font-bold lg:text-5xl ">
            Hello&nbsp;
            <span className="text-primary">{data?.attributes[0].value}</span>
          </h1>
          ;
          <div className="grid md:grid-cols-2 xs:grid-cols-1 xs:gap-8 md:gap-16 ">
            <div className="flex justify-center items-center">
              {isLoading ? (
                <Circles
                  height="100"
                  width="100"
                  color={"#f84246"}
                  ariaLabel="circles-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                />
              ) : (
                <img src={image} alt="idcard" className=" animate-breathe" />
              )}
            </div>

            <div className="md:p-10 xs:py-3 xs:px-1 text-white text-xl flex flex-col justify-between">
              <InfoDiv
                title={data?.attributes[0].trait_type}
                value={data?.attributes[0].value}
                image={gender}
              />
              <InfoDiv
                title={data?.attributes[1].trait_type}
                value={data?.attributes[1].value}
                image={email}
              />
              <InfoDiv
                title={data?.attributes[2].trait_type}
                value={data?.attributes[2].value}
                image={phone}
              />
            </div>
          </div>
          <Button className="bg-gray-400 xs:w-1/2 md:w-1/6 text-tertiary rounded-xl h-8 hover:bg-primary hover:text-white mx-2 my-4">
            Delete ID
          </Button>
        </div>
        ;
      </>
    );
  } else if (isLoading === false && isError === true) {
    return (
      <div className="flex flex-col h-[80vh] w-screen justify-center items-center">
        <h1 className=" text-gray-400 text-xl">
          No NFTs found. Please get your NFT.
        </h1>
        <Button
          onClick={() => {
            navigate("/create-netid");
          }}
          className="w-1/6 bg-primary p-2 my-4"
        >
          Get NFT
        </Button>
      </div>
    );
  } else {
    return <ConnectWalletPage />;
  }
};

export default Dashboard;
