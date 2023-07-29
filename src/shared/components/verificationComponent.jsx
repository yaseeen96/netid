import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { approved, wrong } from "../../assets";

const NFTVerification = () => {
  const [progress, setProgress] = useState([
    { label: "Getting NFT", success: false },
    { label: "Verifying NFT", success: false },
    { label: "Success", success: false },
  ]);
  const [open, setOpen] = useState(false);
  const [isProgressComplete, setIsProgressComplete] = useState(false);
  const [activeStage, setActiveStage] = useState(0);

  const handleOpen = () => setOpen(!open);

  const handleTaskCompletion = (index) => {
    // add switch statement to handle case 1 2 3
    const updatedProgress = [...progress];
    updatedProgress[index].success = true;
    setProgress(updatedProgress);
    setActiveStage(index + 1);
    if (activeStage >= 2) {
      setIsProgressComplete(true);
    }
  };

  const isVerificationSuccess = () => {
    // Check if all tasks are done by using the Array.every() method
    return progress.every((task) => task.success === true);
  };

  return (
    <>
      <Button onClick={handleOpen} variant="gradient">
        Open Dialog
      </Button>
      <Dialog
        open={open}
        size="sm"
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        className="w-[80vw] h-[30vh] m-0 justify-self-center relative top-1/2 bottom-1/2"
      >
        <DialogHeader className="flex justify-center text-3xl h-1/3">
          Verifying your&nbsp;
          <span className="text-primary font-bold">NETID</span>
        </DialogHeader>
        <DialogBody
          divider
          className="flex justify-center items-center space-x-4 h-2/3"
        >
          {isProgressComplete ? (
            <div className="flex flex-col items-center">
              <img
                src={isVerificationSuccess() ? approved : wrong}
                alt="approved"
                className="w-16 h-16"
              />
              <h1
                className={`w-fulltext-xl ${
                  isVerificationSuccess() ? "text-green-600" : "text-red-600"
                } font-bold`}
              >
                {isVerificationSuccess()
                  ? "You are authorized"
                  : "Sorry, you are not authorized"}
              </h1>
            </div>
          ) : (
            progress.map((progress, index) => (
              <div
                key={index}
                className={`flex flex-col items-center space-x-1 ${
                  index === activeStage ? "font-bold" : "text-gray-400"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full  ${
                    progress.success
                      ? "bg-green-500"
                      : index === activeStage
                      ? " bg-amber-400 animate-pulse"
                      : "bg-gray-300"
                  }`}
                />
                <p>{progress.label}</p>
              </div>
            ))
          )}
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => {
              handleTaskCompletion(activeStage);
            }}
            className="mr-1"
          >
            <span>test</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};
export default NFTVerification;
