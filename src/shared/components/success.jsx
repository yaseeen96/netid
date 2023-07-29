import { Button } from "@material-tailwind/react";
const Success = ({ linkToNft }) => {
  const handleSubmit = () => {
    window.open(linkToNft);
  };
  return (
    <div className=" w-screen h-[80vh] flex flex-col justify-center items-center text-center gap-8">
      <h1 className="text-white xs:text-2xl sm:text-4xl md:text-4xl lg:text-6xl xl:text-7xl font-semibold">
        <span className="text-primary font-bold">NETID&nbsp;</span>Created{" "}
        <br className="block content-[''] my-4 " />
        Successfully
      </h1>
      <Button
        onClick={handleSubmit}
        className="bg-primary text-white p-2 w-1/6"
      >
        Get NetID
      </Button>
    </div>
  );
};

export default Success;
