import TextTransition, { presets } from "react-text-transition";
import React, { useState, useEffect } from "react";
import { idCard } from "../../assets";

const About = () => {
  const texts = ["Manage", "Control", "Protect"];
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      3000 // every 3 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center w-screen h-[80vh] text-white">
      <div className="flex lg:flex-row xs:flex-col w-full h-full">
        <div className="flex xs:w-full lg:w-1/2 h-full justify-center items-center">
          <h1 className=" xs:text-2xl sm:text-4xl lg:text-8xl">
            We help you <br />
            <span className="text-primary">
              <TextTransition springConfig={presets.molasses} className="">
                {texts[index % texts.length]}
              </TextTransition>
            </span>{" "}
            Your Identity
          </h1>
        </div>
        <div className="flex xs:w-full lg:w-1/2 h-full justify-center items-center p-8">
          <img src={idCard} alt="idCard" className="animate-breathe" />
        </div>
      </div>
    </div>
  );
};

export default About;
