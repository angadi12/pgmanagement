import { Button } from "@nextui-org/react";
import React, { useEffect } from "react";
import { FaPlus } from "react-icons/fa6";
import {
  CircularProgress,
  Card,
  CardBody,
  CardFooter,
  Chip,
} from "@nextui-org/react";
import { Avatar, AvatarGroup } from "@nextui-org/react";
import Categorycard from "./Categorycard";
import { fetchAllCategories } from "@/lib/StaffSlice";
import { useDispatch, useSelector } from "react-redux";

const Allstaff = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.staff.categories);
  const loading = useSelector((state) => state.staff.loading);
  const error = useSelector((state) => state.staff.error);

  const searchQuery = useSelector((state) => state.staff.searchQuery);


  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="w-full h-auto flex justify-between items-start gap-4 px-4">
      <div className="flex w-full h-auto justify-center items-start ">
      
        {loading ? (
            <div className="w-full h-[60vh] flex justify-center items-center"><span className="loader3"></span></div>
          ) : error ? (
            <p className="w-full h-full flex justify-center items-center">Fialed to fetch Categories refresh the page</p>
          ) : (
         <>

           {filteredCategories.length>0? <div className="w-full grid grid-cols-3 gap-5 justify-center place-content-center items-start pb-4">

             {
              filteredCategories.map((value,id)=>(
                <Categorycard data={value} key={id} />
              ))
             }
             </div>:<div className="w-full flex justify-center items-center h-[40vh]">No Search Found</div>}

         </>
         
          )}
         
         

          {/* <Button className="border-2 border-dashed border-[#205093] bg-white  rounded-lg flex justify-center items-center gap-2 py-4  h-44 w-50 flex-col">
            <FaPlus size={40} className="text-[#205093]" />
          </Button> */}
      </div>
     {(!loading && !error) && <div className="w-2/4 flex-col sticky  top-48  flex justify-center items-center gap-4">
        <Card className="w-72 h-72 border-none boxshadow">
          <CardBody className="justify-center items-center pb-0">
            <CircularProgress
              classNames={{
                svg: "w-40 h-40 drop-shadow-md",
                indicator: "stroke-[#205093]",
                track: "stroke-[#205093]/10",
                value: "text-3xl font-semibold text-[#205093]",
              }}
              value={70}
              strokeWidth={4}
              showValueLabel={true}
            />
          </CardBody>
          <CardFooter className="justify-center items-center pt-0">
            <Chip
              classNames={{
                base: "border-1 border-[#205093]/30",
                content: "text-[#205093]/90 text-small font-semibold",
              }}
              variant="bordered"
            >
              Staff Satisfaction
            </Chip>
          </CardFooter>
        </Card>
        <Button className="rounded-md bg-[#205093] text-white font-semibold">
          Send Feedback forms to Staffs
        </Button>
      </div>}
    </main>
  );
};

export default Allstaff;
