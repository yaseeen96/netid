import { Input } from "@material-tailwind/react";
import { enter } from "../../assets";

const CollectInfoStepper = ({
  heading1,
  highlightedHeading,
  heading2,
  lineBreak,
  placeholder,
  description1,
  description2,
  description3,
  descLineBreak,
  activeStep,
  changeActiveStep,
  inputValue,
  handleInputChange,
  inputKey,
}) => {
  const handleSubmit = () => {
    event.preventDefault();
    changeActiveStep(activeStep + 1);
    console.log("value: " + inputValue);
  };
  return (
    <div className="flex flex-col h-[80vh] w-screen justify-center text-center">
      <h1 className="text-white xs:text-2xl sm:text-4xl md:text-4xl lg:text-6xl xl:text-7xl leading-loose font-semibold">
        {heading1}{" "}
        <br
          className={`${lineBreak ? "block" : "hidden"} content-[\"\"] my-4`}
        />
        <span className="text-primary font-bold">
          {highlightedHeading}&nbsp;
        </span>
        {heading2}
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="flex flex-col h-20">
          {/* important reminder: change the h-20 to h-10 and back to h-20 to fix input form height error. 
          incase it comes again..........
          */}
          <Input
            error
            type="text"
            value={inputValue}
            onChange={(e) => {
              handleInputChange(inputKey, e.target.value);
              console.log(inputValue);
            }}
            placeholder={placeholder}
            className="p-4 rounded-lg mt-8 mb-4 xs:w-56 md:w-96 placeholder:text-center xs:placeholder:text-sm lg:placeholder:text-lg text-center"
          />
        </div>
      </form>
      <div className="flex flex-row justify-center opacity-50 mb-2">
        <h6 className="text-white tracking-widest">Hit</h6>
        <img src={enter} alt="enter" className="w-6 h-6 mx-2" />
      </div>
      <p className="text-md text-white xs:p-4">
        {description1}{" "}
        <br className={`${descLineBreak ? "block" : "hidden"}`} />
        {description2}
        <br className={`${descLineBreak ? "block" : "hidden"}`} />
        {description3}
      </p>
    </div>
  );
};

export default CollectInfoStepper;
