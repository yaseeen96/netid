import { useState, useEffect } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { logoDark } from "../../assets";

export default function CustomNavbar() {
  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);
  // 0x3C7f50f9cfA3DF2B737D639429d7fa77D0C2fD54 - smart contract address
  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal mx-auto"
      >
        <a href="/about" className="flex items-center">
          About
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal mx-auto"
      >
        <a href="/dashboard" className="flex items-center">
          Dashboard
        </a>
      </Typography>
      <div className="max-lg:hidden">
        <ConnectButton
          accountStatus={{ smallScreen: "address", largeScreen: "full" }}
        />
      </div>

      {/* classname should remain same */}
      {/* <h1 className=" max-lg:hidden">Dark mode button</h1> */}
    </ul>
  );

  return (
    <Navbar className="py-2 px-4 lg:px-8 lg:py-4 bg-tertiary">
      <div className="container mx-auto flex items-center justify-between text-white">
        <a href="/">
          <img
            src={logoDark}
            alt="logo"
            className="max-lg:w-40 max-lg:h-10 lg:w-60 lg:h-15"
          />
        </a>

        <div className="hidden lg:block">{navList}</div>
        <div className="lg:hidden mx-4 ml-auto">
          <ConnectButton
            accountStatus={{ smallScreen: "avatar", largeScreen: "full" }}
            label="Connect"
          />
        </div>
        <IconButton
          variant="text"
          className="h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
        {/* <h1 className="lg:hidden">Dark mode button</h1> */}
      </div>
      <MobileNav open={openNav}>
        <div className="container mx-auto justify-center flex flex-col items-center text-center">
          {navList}
        </div>
      </MobileNav>
    </Navbar>
  );
}
