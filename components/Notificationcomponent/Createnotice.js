import React, { useEffect, useState } from "react";
import { Button, Input, Textarea ,Select,SelectItem} from "@nextui-org/react";
import { useSelector, useDispatch } from "react-redux";

import { CreatNoticeapi } from "../../lib/API/Notification";

import toast, { Toaster } from "react-hot-toast";




const Createnotice = () => {
    const [Loading, setLoading] = useState(false);
    const selectedBranchId = useSelector(
      (state) => state.branches.selectedBranchId
    );
    const [Type, setType] = useState();
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
   
    
    const noticeTypes = [
      "Vacating Notice",
      "Rent Due Notice",
      "Maintenance Notice",
      "Policy Update Notice",
      "Event Notice",
      "Inspection Notice",
      "Rent Increase Notice",
      "General Notice"
    ];
    



    const handleTypeChange = (key) => {
      setType(key);
    };


    

  

    const Createnotice= async()=>{
      if (!selectedBranchId) {
        return toast.error("Branch not selected");
      }
      if (!title || !desc || !Type) {
        return toast.error("All fields are required");
      }

      setLoading(true)

      const payload={
        branch: selectedBranchId,
        type: Type,
        titile: title,
        desc: desc,
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
            label="Notice type"
            placeholder="Select Type"
            className="w-full"
            selectedKeys={new Set([Type])}
            onSelectionChange={(selectedKeys) => handleTypeChange(selectedKeys.values().next().value)}
          >
           {noticeTypes.map((value)=>(
            <SelectItem color="primary" variant="flat" key={value}>{value}</SelectItem>
           ))}
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
            // isInvalid={error}
            label="Add Description"
            variant="bordered"
            labelPlacement="outside"
            placeholder="Description....."
            className="w-full"
            errorMessage="Description Required"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>

        <div className="flex justify-center items-center w-full">
          <Button
            onPress={Createnotice}
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

export default Createnotice;
