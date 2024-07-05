import React from "react";
import Image from "next/image";
import Logo from "../../public/Loginasset/Logo.png";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Checkbox,
  Button,
} from "@nextui-org/react";

const Loginpage = () => {
  return (
    <main className="h-screen w-full backgroundlayer flex justify-center items-center">
      {/* <Image src={Wave1} className='object-contain w-full'/> */}
      <div className="w-96 h-auto rounded-lg overflow-hidden">
        <div className="flex gap-3 bg-[#172953] justify-center items-center py-2  ">
          <Image alt=" logo" height={40} radius="sm" src={Logo} width={40} />
          <div className="flex flex-col">
            <p className="text-md text-white font-semibold">Pantza PG for</p>
            <p className="text-small font-semibold  text-white">Men & Woman</p>
          </div>
        </div>
        <div className="flex gap-3 justify-center bg-[#00000040] items-center py-4 flex-col">
          <div className="flex justify-center items-center py-2">
            <h2 className="text-white font-semibold ">Admin Login</h2>
          </div>
          <div className="w-full flex justify-center items-center flex-col gap-2">
            <div className="bg-[]  w-11/12 mx-auto h-10">
              <input
                className="outline-none bg-transparent text-white placeholder:text-white"
                placeholder="User Name"
              />
            </div>
            <input />
            <input />
          </div>
          <div className="flex py-2 px-4 justify-between w-full">
            <Checkbox
              classNames={{
                label: "text-small text-white opacity-70",
              }}
            >
              Remember me
            </Checkbox>
            <Link
              color="primary"
              href="#"
              size="sm"
              className="text-white opacity-70"
            >
              Forgot password?
            </Link>
          </div>
          <div className="w-full flex justify-center items-center py-2">
            <Button className="buttongradient w-11/12 text-white font-semibold rounded-md">
              Login
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Loginpage;
