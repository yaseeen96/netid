import { Input } from "@material-tailwind/react";
import { enter } from "../../../assets";
import { Circles } from "react-loader-spinner";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { kycGetOtp } from "../../../apis";

const KycDiv = ({
  heading,
  highlightedHeading,
  lineBreak,
  changeActiveStep,
  inputValue,
  inputKey,
  handleInputChange,
  placeholder,
  descLineBreak,
  description1,
  description2,
  description3,
  maxLength,
  activeStep,
  setTxnId,
}) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    event.preventDefault();
    setLoading(true);
    const kycResponse = await kycGetOtp({ aadhaar: inputValue }).finally(() =>
      setLoading(false)
    );

    if (kycResponse.status === 200) {
      setTxnId(kycResponse.data.transaction_id);
      changeActiveStep(activeStep + 1);
    } else {
      toast.error(kycResponse.error.message);
    }
  };

  return (
    <div className="flex flex-col h-[80vh] w-screen justify-center items-center text-center">
      <h1 className="text-white xs:text-2xl sm:text-4xl md:text-4xl lg:text-6xl xl:text-7xl font-semibold">
        {heading}{" "}
        <br
          className={`${
            lineBreak ? 'block content-[""] my-5' : "hidden"
          } content-[\"\"] my-4`}
        />
        <span className="text-primary font-bold">{highlightedHeading}</span>
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
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col h-20">
            <Input
              type="number"
              value={inputValue}
              onChange={(e) => {
                handleInputChange(inputKey, e.target.value);
                console.log(inputValue);
                console.log("max length: " + maxLength);
              }}
              onInput={(e) =>
                (e.target.value = e.target.value.slice(0, maxLength))
              }
              placeholder={placeholder}
              className="p-4 rounded-lg mt-8 mb-4 xs:w-56 md:w-96
        placeholder:text-center xs:placeholder:text-sm lg:placeholder:text-md
        text-center border-red-400 "
            />
          </div>
        </form>
      )}

      <div className="flex flex-row justify-center opacity-50 mb-2">
        <h6 className="text-white tracking-widest ">Hit</h6>
        <img src={enter} alt="enter" className="w-6 h-6 mx-2" />
      </div>
      <p className="text-md text-white xs:p-4">
        {description1}{" "}
        <br className={`${descLineBreak ? "block" : "hidden"}`} />
        {description2}
        <br className={`${descLineBreak ? "block" : "hidden"}`} />
        {description3}
      </p>
      <ToastContainer />
    </div>
  );
};

export default KycDiv;
