import TextTransition, { presets } from "react-text-transition";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";
import { Button } from "@material-tailwind/react";
import ParticlesComponent from "../components/particles/particles";

const Home = () => {
  const texts = ["IDENTITY", "DIGITAL SELF"];
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      3000 // every 3 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);

  const { isConnected } = useAccount();
  const navigate = useNavigate();
  function handleOnClick() {
    isConnected ? navigate("create-netid") : navigate("connect");
  }

  return (
    <div className="flex flex-col justify-center w-screen h-[80vh] items-center text-white">
      <h1 className="md:text-6xl my-4 xs:text-2xl sm:text-4xl">
        OWN YOUR&nbsp;
        <span className="text-primary font-bold">
          <TextTransition
            springConfig={presets.stiff}
            inline={true}
            className="text-trans"
          >
            {texts[index % texts.length]}
          </TextTransition>
        </span>
      </h1>
      <h2 className="my-4 md:text-2xl xs:text-md sm:text-xl">
        Decentralized, Secure and Fraud Proof
      </h2>
      <Button
        className="my-4 bg-primary p-3 rounded-xl text-xl w-1/6"
        size="lg"
        onClick={handleOnClick}
      >
        Get NetID
      </Button>
      <ParticlesComponent id="tsparticles" />
    </div>
  );
};

export default Home;
