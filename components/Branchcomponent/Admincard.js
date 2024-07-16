import React from "react";
import Image from "next/image";
import adminpic from "../../public/Loginasset/adminpic.png";
import { MdEmail } from "react-icons/md";
import { Button } from "@nextui-org/react";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const Admincard = () => {
  return (
    <div className="w-full boxshadow h-full rounded-md flex flex-col justify-center items-center ">
      <Image
        src={adminpic}
        alt="Profile Picture"
        className="rounded-full mx-auto -mt-12 w-24 h-24"
      />
      <h2 class="text-lg font-bold mt-2">Mithul M</h2>
      <p className="text-sm font-bold flex items-center gap-2">
        Branch 1:<span className="text-[#1B9D31]">Full Access</span>
      </p>
      <div className="bg-[#F0F0F0] p-4 flex flex-col justify-center items-center w-full mt-2 gap-4">
      <div className=" flex justify-between gap-4  items-center w-full">
      <div>
            <p className="text-xs font-bold flex items-center gap-2">
              <MdEmail className="text-[#205093]" />
              Email
            </p>
          </div>
          <span className="text-xs font-semibold text-gray-400">
            mithulofficial02@gmail.com
          </span>
        </div>
        <div className=" flex justify-between gap-4  items-center w-full">
          <div>
            <p className="text-xs font-bold flex items-center gap-2">
              <FaPhoneAlt  className="text-[#205093]" />
              Contact
            </p>
          </div>
          <span className="text-[0.7rem] font-semibold text-gray-400">
          +91-7353830989 (+91-6382645389)
          </span>
        </div>
        <div className=" flex justify-between gap-4  items-center w-full">
          <div>
            <p className="text-xs font-bold flex items-center gap-2">
              <FaLocationDot className="text-[#205093]" />
              Address
            </p>
          </div>
          <span className="text-xs font-semibold text-gray-400">
          This is a Sample Address of this particular Individual or Tenant
          </span>
        </div>
      <Button className="buttongradient text-white w-full rounded-sm h-8">View / Edit</Button>
      </div>
      {/* <div>
            <Image className='-mt-24 ' src={adminpic} alt='Branches'/>
        </div> 
        <div></div>
        <div></div>  */}
    </div>
  );
};

export default Admincard;
