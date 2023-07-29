import KycDiv from "../components/kyc/kycDiv";
import KycResponse from "../components/kyc/kycResponse";
import OtpField from "../components/kyc/otpfield";
import CollectInfoStepper from "../components/stepper";
import { useState } from "react";
import Success from "../components/success";
import { useAccount } from "wagmi";
import ConnectWalletPage from "../components/connectWalletPage";

const CreateNetid = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    mobileNo: "",
    email: "",
    dob: "",
    gender: "",
    aadhaarNo: "",
  });
  const [otp, setOtp] = useState(null);
  const [txnId, setTxnId] = useState("");
  const [kycDetails, setKycDetails] = useState({});
  const [linkToNft, setLinkToNft] = useState("");
  const { isConnected } = useAccount();

  const updateLinkToNft = (link) => {
    setLinkToNft(link);
  };

  const changeActiveStep = (activeStep) => {
    setActiveStep(activeStep);
  };

  const handleInputChange = (fieldKey, fieldValue) => {
    setFormData({
      ...formData,
      [fieldKey]: fieldValue,
    });
  };

  const updateTxnId = (txnId) => {
    setTxnId(txnId);
  };

  const updateKycDetails = (kyc) => {
    setKycDetails(kyc);
  };

  if (isConnected === false) {
    return <ConnectWalletPage />;
  } else
    switch (activeStep) {
      // get name
      case 0:
        return (
          <div>
            <CollectInfoStepper
              heading1={"Let's make your"}
              highlightedHeading={"ID"}
              heading2={"official."}
              lineBreak={true}
              placeholder={"What do people call you?"}
              description1={
                "Please use your official name when creating your NETID, unless your"
              }
              description2={
                "parents named you Batman. In that case, please use Batman."
              }
              descLineBreak={true}
              activeStep={activeStep}
              changeActiveStep={changeActiveStep}
              inputValue={formData.name}
              handleInputChange={handleInputChange}
              inputKey={"name"}
            />
          </div>
        );
      // get email
      case 1:
        return (
          <div>
            <CollectInfoStepper
              heading1={"Hola"}
              highlightedHeading={formData.name}
              lineBreak={false}
              placeholder={"Enter Your Email Address"}
              description1={
                "We require your email address to store your information and ensure"
              }
              description2={
                "seamless communication through your NETID. This enables others to"
              }
              description3={
                "easily contact you while keeping your personal information secure."
              }
              descLineBreak={true}
              activeStep={activeStep}
              changeActiveStep={changeActiveStep}
              inputValue={formData.email}
              handleInputChange={handleInputChange}
              inputKey={"email"}
            />
          </div>
        );
      // get mobile number
      case 2:
        return (
          <div>
            <CollectInfoStepper
              heading1={"Share the digits. Your"}
              highlightedHeading={"ID"}
              heading2={"awaits."}
              lineBreak={true}
              placeholder={"Enter your mobile number"}
              description1={
                "To provide you with a seamless digital experience while keeping your"
              }
              description2={
                "account secure, we kindly request your mobile number. Please be"
              }
              description3={
                "assured that your number will be kept confidential."
              }
              descLineBreak={true}
              activeStep={activeStep}
              changeActiveStep={changeActiveStep}
              inputValue={formData.mobileNo}
              handleInputChange={handleInputChange}
              inputKey={"mobileNo"}
            />
          </div>
        );
      // e-kyc get otp
      case 3:
        return (
          <KycDiv
            heading={"Let's get you"}
            highlightedHeading={"Verified"}
            lineBreak={true}
            changeActiveStep={changeActiveStep}
            placeholder={"Enter your aadhaar number"}
            inputKey={"aadhaarNo"}
            inputValue={formData.aadhaarNo}
            handleInputChange={handleInputChange}
            descLineBreak={true}
            description1={
              "KYC verification helps us confirm your identity and ensure that you"
            }
            description2={
              "are who you claim to be. Your Aadhaar number is only used for this"
            }
            description3={"purpose and is not stored anywhere."}
            maxLength={12}
            activeStep={activeStep}
            setTxnId={updateTxnId}
          />
        );
      // e-kyc verify otp
      case 4:
        return (
          <OtpField
            highlightedHeading={"OTP"}
            heading={"in need"}
            inputValue={otp}
            setInputValue={setOtp}
            activeStep={activeStep}
            description1={"We sent an OTP to your"}
            description2={"registered mobile number"}
            descLineBreak={true}
            changeActiveStep={changeActiveStep}
            txnId={txnId}
            setKycDetails={updateKycDetails}
          />
        );
      // e-kyc response
      case 5:
        return (
          <KycResponse
            activeStep={activeStep}
            changeActiveStep={changeActiveStep}
            kycDetails={kycDetails}
            name={formData.name}
            mobileNo={formData.mobileNo}
            email={formData.email}
            setLinkToNft={updateLinkToNft}
          />
        );
      // success
      case 6:
        return <Success linkToNft={linkToNft} />;
      default:
        return (
          <div>
            <CollectInfoStepper
              heading1={"Hola"}
              highlightedHeading={formData.name}
              lineBreak={false}
              placeholder={"Enter Your Email Address"}
              description1={
                "We require your email address to store your information and ensure"
              }
              description2={
                "seamless communication through your NETID. This enables others to"
              }
              description3={
                "easily contact you while keeping your personal information secure."
              }
              descLineBreak={true}
              activeStep={activeStep}
              changeActiveStep={changeActiveStep}
              inputValue={formData.mobileNo}
              handleInputChange={handleInputChange}
              inputKey={"mobileNo"}
            />
          </div>
        );
    }
};

export default CreateNetid;
