import { enter, idCard } from "../../../assets";
import { Button } from "@material-tailwind/react";
import { useState } from "react";
import { cardUpload } from "../../../apis";
import { useAccount } from "wagmi";
import { mintNft } from "../../../apis/nft/mintNft";
import { Circles } from "react-loader-spinner";

function getRandomTokenId() {
  const randomNumber = Math.floor(Math.random() * 90000) + 10000;

  return randomNumber.toString();
}

const KycResponse = ({
  activeStep,
  changeActiveStep,
  kycDetails,
  name,
  mobileNo,
  email,
  setLinkToNft,
}) => {
  const { address, isConnected } = useAccount();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    event.preventDefault();
    setLoading(true);
    const tokenId = getRandomTokenId();
    const cid = await cardUpload(name, tokenId);
    const response = await mintNft(cid, name, email, mobileNo, address);
    const link = response.transactionResponse.transactionExternalUrl;
    setLinkToNft(link);
    // setLoading(false);
    changeActiveStep(activeStep + 1);
  };

  return (
    <div className="flex flex-col h-[80vh] w-screen justify-center items-center text-center">
      {loading ? (
        <div className="flex flex-col justify-center items-center">
          <Circles
            height="100"
            width="100"
            color={"#f84246"}
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
          <h1 className="text-white text-lg mt-4">Generating Netid</h1>
          <h2 className=" text-gray-400 text-md">
            This may take longer than usual. Please be patient
          </h2>
        </div>
      ) : (
        <div>
          <h1 className="text-white xs:text-2xl sm:text-4xl md:text-4xl lg:text-6xl xl:text-7xl font-semibold my-4">
            Is this&nbsp;
            <span className="text-primary font-bold">You?</span>
          </h1>
          <div className="grid grid-flow-col justify-items-center items-center md:grid-cols-2 md:grid-rows-1 xs:grid-cols-1 xs:grid-rows-2 xs:w-3/4 md:w-full h-1/2 xs:gap-2 md:gap-20">
            <div className="rounded-full xs:w-28 xs:h-28 sm:w-32 sm:h-32 lg:w-40 lg:h-40 overflow-hidden my-4 md:justify-self-end xs:justify-self-center">
              <img
                src={`data:image/png;base64,${kycDetails.photo_base64}`}
                alt="picture"
                className="object-cover h-full w-full"
              />
            </div>
            <div className="md:w-full h-full xs:w-3/4 flex flex-col justify-center items-start text-start gap-4 text-white">
              <h3>Name:&nbsp;{kycDetails.name}</h3>
              <h3>DOB:&nbsp;{kycDetails.date_of_birth}</h3>
              <h3>Gender:&nbsp;{kycDetails.gender}</h3>
              <h3>
                Address:&nbsp;
                {kycDetails.locality +
                  ", " +
                  kycDetails.district +
                  ", " +
                  kycDetails.state +
                  ", " +
                  "pincode: "}
                <span className="text-primary">{kycDetails.pincode}</span>
              </h3>
            </div>
          </div>
          <div className="flex xs:flex-col md:flex-row w-full justify-center items-center xs:gap-4 md:gap-20 xs:my-4">
            <Button className="p-2 bg-white text-black">No, not me</Button>
            <Button className="p-2 bg-primary" onClick={handleSubmit}>
              Yes, it's me
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default KycResponse;
