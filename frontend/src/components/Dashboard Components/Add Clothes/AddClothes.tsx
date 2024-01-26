import React, { useRef, useState } from "react";
import "../../../global css/admincrud.scss";
import { AiOutlineClose } from "react-icons/ai";
import Select from "react-select";
import { MdFileUpload } from "react-icons/md";
import { useForm, Controller } from "react-hook-form";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../../../firebase/firebase.js"

const AddClothes = ({ open, form }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isImageSelected, setIsImageSelected] = useState(false);
  const [image, setImage] = useState(null)
  const [progress, setProgress] = useState(null)
  const [url, setUrl] = useState("")
  const [error, setError] = useState("")

  const imageInputRef = useRef(null);

  const handleImageClick = () => {
    imageInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
    setIsImageSelected(true);
    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        setSelectedImage(event.target.result);
        setImage(file); // Set the 'image' state to the selected file
      };

      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = async (e) => {
    e.preventDefault();
    const file = image;

    setError("")

    const timestamp = new Date().toISOString().replace(/[-:.]/g, "");
    const randomString = Math.random().toString(36).substring(2, 8);
    const fileName = `${timestamp}_${randomString}_${file.name}`;

    const storage = getStorage(app);
    const REF = ref(storage, `upload/${fileName}`);
    const uploadTask = uploadBytesResumable(REF, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress)
      },
      (err) => {
        setError(err)
      },
      () =>
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          // Assuming you have a Submit function defined elsewhere
          // Modify this part according to your logic
          //calls the submit to database
          setUrl(url)
          setTimeout(() => {
            setProgress(null)
          }, 3000)
        })
    );
  }

  const categoryOptions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Unisex", label: "Unisex" },
    { value: "Other", label: "Other" },
  ];

  const typeOptions = [
    { value: "T-Shirt", label: "T-Shirt" },
    { value: "Jeans", label: "Jeans" },
  ];

  const sizeOptions = [
    { value: "S", label: "S" },
    { value: "M", label: "M" },
    { value: "L", label: "L" },
  ];

  const colorOptions = [
    { value: "Red", label: "Red" },
    { value: "Blue", label: "Blue" },
  ];

  const {
    handleSubmit,
    control,
    setValue,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // Implement your submit logic here
    // console.log(data);

    if (url === "" || url === null) {

      setError("Image is required")
    } else {
      const Data = {
        name: data.clothesName,
        price: parseFloat(data.price), // Use parseFloat for the price
        category: data.category.value,
        type: data.type.value,
        size: data.size.map((item) => item.value),
        color: data.color.map((item) => item.value),
        imagePath: url,
        description: data.description,
      };
      console.log(Data);
    }
    // try {
    //   const res = await axios.post(
    //     "http://localhost:8080/api/v1/clothing/create",
    //     Data
    //   );
    //   console.log(res.data);

    //   setValue("clothesName", "");
    //   setValue("price", "");
    //   setValue("category", []);
    //   setValue("type", []);
    //   setValue("size", []);
    //   setValue("color", []);
    //   setValue("description", "");
    // } catch (errors) {
    //   console.log(errors);
    // }
  };

  const style1 = {
    control: (base, state) => ({
      ...base,
      border: ".5px solid black  !important",
      boxShadow: "0 !important",
      borderRadius: "4px",
      fontFamily: "sans-serif",
      fontSize: "12px",
      fontWeight: "bold",
      color: "black",
      "&:hover": {
        border: ".5px solid black !important",
      },
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: "white",
      color: "black",
      fontFamily: "sans-serif",
      fontSize: "12px",
      fontWeight: "bold",
      ":hover": {
        backgroundColor: "#c0c0c0",
      },
    }),
  };

  return (
    <div className={form ? "clothes-form" : "clothes-form open-form"}>
      <button className="close-btns" onClick={open}>
        <AiOutlineClose className="text-lg text-black" />
      </button>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3>Add Clothes</h3>
        <div className="input-container">
          <Controller
            name="clothesName"
            control={control}
            defaultValue=""
            rules={{ required: "Name is required" }}
            render={({ field }) => (
              <div className="custom-input">
                <label htmlFor="clothes-name">Name*</label>
                <input {...field} type="text" id="clothes-name" autoComplete="off" />
                {errors.clothesName && <p>{errors.clothesName.message}</p>}
              </div>
            )}
          />

          <Controller
            name="price"
            control={control}
            defaultValue=""
            rules={{ required: "Price is required" }}
            render={({ field }) => (
              <div className="custom-input">
                <label htmlFor="price">Price*</label>
                <input {...field} type="number" id="price" />
                {errors.price && <p>{errors.price.message}</p>}
              </div>
            )}
          />

          <div className="select">
            <label>Category*</label>
            <Controller
              name="category"
              control={control}
              defaultValue={[]}
              rules={{ required: "Category is required" }}
              render={({ field }) => (
                <Select
                  {...field}
                  placeholder="select category"
                  options={categoryOptions}
                  styles={style1}
                />
              )}
            />
            {errors.category && <p>{errors.category.message}</p>}
          </div>

          <div className="select">
            <label>Type*</label>
            <Controller
              name="type"
              control={control}
              defaultValue={[]}
              rules={{ required: "Type is required" }}
              render={({ field }) => (
                <Select
                  {...field}
                  placeholder="select types"
                  options={typeOptions}
                  styles={style1}
                />
              )}
            />
            {errors.type && <p>{errors.type.message}</p>}
          </div>

          <div className="select">
            <label>Size*</label>
            <Controller
              name="size"
              control={control}
              defaultValue={[]}
              rules={{ required: "Size is required" }}
              render={({ field }) => (
                <Select
                  {...field}
                  placeholder="select size"
                  isMulti
                  options={sizeOptions}
                  styles={style1}
                />
              )}
            />
            {errors.size && <p>{errors.size.message}</p>}
          </div>

          <div className="select">
            <label>Color*</label>
            <Controller
              name="color"
              control={control}
              defaultValue={[]}
              rules={{ required: "Color is required" }}
              render={({ field }) => (
                <Select
                  {...field}
                  placeholder="select color"
                  isMulti
                  options={colorOptions}
                  styles={style1}
                />
              )}
            />
            {errors.color && <p>{errors.color.message}</p>}
          </div>

          <div className="custom-input">
            <label htmlFor="imgs">Images*
              {
                progress ? <span className="text-red-600 font-normal text-[9px]">{progress !== 100 ? ` uploading... ${progress.toFixed(2)}%`
                  :
                  " image uploaded"}</span> : null
              }
              {
                error && <span className="text-red-600 font-normal text-[10px]"> {error}</span>
              }
            </label>

            <div
              className="flex items-center justify-center border py-1 border-black rounded-[4px]"
              onClick={handleImageClick}
            >
              <img
                src={selectedImage || "default_image_url"}
                alt="Preview"
                className=""
                width={"90px"}
                height={"140px"}
              />
              <input
                type="file"
                ref={imageInputRef}
                hidden
                onChange={handleImageChange}
                accept="image/*"
                id="imgs"
              />
            </div>
            {isImageSelected && (
              <button
                type="button"
                onClick={handleUploadClick}
                className="bg-black text-white mt-1 rounded-[2px] font-sans text-md font-semibold
              p-[3px] flex justify-center items-center gap-3"
              >
                <MdFileUpload />
                <span>upload</span>
              </button>
            )}
          </div>

          <div className="custom-input">
            <Controller
              name="description"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <div className="custom-input">
                  <label htmlFor="description">Description*</label>
                  <textarea {...field} name="description" id="description" />
                  {errors.description && <p>{errors.description.message}</p>}
                </div>
              )}
            />
          </div>

          <div className="custom-input">
            <button type="submit">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddClothes;
