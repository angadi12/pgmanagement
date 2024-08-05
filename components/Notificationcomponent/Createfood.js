import React, { useEffect, useState } from "react";
import { Button, Input, Textarea ,Select,SelectItem} from "@nextui-org/react";
import { useSelector, useDispatch } from "react-redux";

import { CreatNoticeapi } from "../../lib/API/Notification";
import toast, { Toaster } from "react-hot-toast";

const Createfood = () => {  
  const [Loading, setLoading] = useState(false);
    const selectedBranchId = useSelector(
      (state) => state.branches.selectedBranchId
    );
    const [time, setTime] = useState();
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [food, setFood] = useState({
      morning: [],
      evening: [],
      night: [],
    });
    

    const handleTimeChange = (key) => {
      setTime(key);
    };


    

  

    const CreateFoodnotice= async()=>{
      if (!selectedBranchId) {
        return toast.error("Branch not selected");
      }
      if (!title || !desc || !time) {
        return toast.error("All fields are required");
      }

      setLoading(true)

      const payload={
        branch: selectedBranchId,
        type: "Other",
        titile: title,
        // desc: desc,
        food: {
          morning: time === "morning" ? [desc] : [],
          evening: time === "evening" ? [desc] : [],
          night: time === "night" ? [desc] : [],
        },
    }
      try {
        const Result = await CreatNoticeapi(payload);
        if(Result.status){
          toast.success(Result.message)
          setLoading(false)
        } else{
          toast.error("Failed to create Notice")
          setLoading(false)
        }

      } catch (error) {
        toast.error("error occured during create Notice ")
      } finally{
        setLoading(false)
      }
    }

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-4 h-96">
        <div className="w-full text-start"></div>
        <div className="w-full grid lg:grid-cols-1 grid-cols-1 gap-4 place-content-center justify-between items-center">
          <Select
            size="lg"
            radius="sm"
            variant="bordered"
            labelPlacement="outside"
            label="Time"
            placeholder="Select Time"
            className="w-full"
            selectedKeys={new Set([time])}
            onSelectionChange={(selectedKeys) => handleTimeChange(selectedKeys.values().next().value)}
          >
            <SelectItem color="primary" variant="flat" key="morning">Morning</SelectItem>
            <SelectItem color="primary" variant="flat" key="evening">Evening</SelectItem>
            <SelectItem color="primary" variant="flat" key="night">Night</SelectItem>
            
          </Select>
        </div>

        <div className="w-full grid lg:grid-cols-1 grid-cols-1  place-content-center justify-between items-center">
          <Input
            type="text"
            name="Title"
            variant="bordered"
            label="Title"
            labelPlacement="outside"
            radius="sm"
            className="w-full rounded-none"
            size="lg"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="w-full grid lg:grid-cols-1 grid-cols-1  place-content-center justify-between items-center">
          <Textarea
            isRequired
            label="Add Food"
            variant="bordered"
            labelPlacement="outside"
            placeholder="Food....."
            className="w-full"
            errorMessage="Food Required"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>

        <div className="flex justify-center items-center w-full">
          <Button
            onPress={CreateFoodnotice}
            className="buttongradient text-white rounded-md w-60 uppercase font-semibold"
          >
            {Loading ? <span className="loader2"></span> : "Create"}
          
          </Button>
        </div>
      </div>

      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 1000,
          style: {
            background: "linear-gradient(90deg, #222C68 0%, #1D5B9E 100%)",
            color: "#fff",
          },

          // Default options for specific types
          success: {
            duration: 1000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
    </>
  );
};


export default Createfood