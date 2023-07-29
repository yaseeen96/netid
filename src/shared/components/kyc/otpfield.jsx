import { enter } from "../../../assets";
import OtpInput from "react-otp-input";
import { Button } from "@material-tailwind/react";
import { Circles } from "react-loader-spinner";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { kycVerifyOtp } from "../../../apis";

const OtpField = ({
  highlightedHeading,
  heading,
  inputValue,
  activeStep,
  changeActiveStep,
  setInputValue,
  description1,
  description2,
  descLineBreak,
  txnId,
  setKycDetails,
}) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    event.preventDefault();
    setLoading(true);
    const kycResponse = await kycVerifyOtp(txnId, inputValue).finally(() =>
      setLoading(false)
    );

    if (kycResponse.status === 200) {
      setKycDetails(kycResponse.data.aadhaar_data);
      changeActiveStep(activeStep + 1);
    } else {
      toast.error(kycResponse.error.message);
    }
  };
  return (
    <div className="flex flex-col h-[80vh] w-screen justify-center items-center text-center">
      <h1 className="text-white xs:text-2xl sm:text-4xl md:text-4xl lg:text-6xl xl:text-7xl font-semibold">
        Almost Done <br className={`block content-[\"\"] my-4`} />
        <span className="text-primary font-bold">
          {highlightedHeading}&nbsp;
        </span>
        {heading}
      </h1>
      {loading ? (
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
        <form className="flex justify-center" onSubmit={handleSubmit}>
          <OtpInput
            containerStyle={
              "w-1/2 flex flex-row gap-5 justify-center p-10 text-center"
            }
            inputStyle={{
              width: "2.5em",
              height: "2.5em",
              borderRadius: "10px",
              fontSize: "20px",
            }}
            inputType="text"
            value={inputValue}
            onChange={(inputValue) => {
              setInputValue(inputValue);
              console.log(inputValue);
            }}
            shouldAutoFocus
            numInputs={6}
            renderSeparator={<span className="text-white">-</span>}
            renderInput={(props) => <input {...props} />}
          />
          <Button className="hidden" type="submit">
            hello
          </Button>
        </form>
      )}

      <div className="flex flex-row justify-center opacity-50 mb-4">
        <h6 className="text-white tracking-widest ">Hit</h6>
        <img src={enter} alt="enter" className="w-6 h-6 mx-2" />
      </div>
      <p className="text-md text-white xs:p-4">
        {description1}{" "}
        <br className={`${descLineBreak ? "block" : "hidden"}`} />
        {description2}
      </p>
      <ToastContainer />
    </div>
  );
};

export default OtpField;
