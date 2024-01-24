import React, { useRef, useState } from 'react';
import "../../../global css/admincrud.scss";
import { AiOutlineClose } from 'react-icons/ai';
import Select from 'react-select';
import { MdFileUpload } from "react-icons/md";
import { useForm, Controller } from 'react-hook-form';

const AddClothes = ({ open, form }) => {

  const [selectedImage, setSelectedImage] = useState(null);
  const [isImageSelected, setIsImageSelected] = useState(false);

  const imageInputRef = useRef(null);


  const handleImageClick = () => {
    imageInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
    setIsImageSelected(true);
  };

  const handleUploadClick = () => {
    // Implement your upload logic here
    console.log('Upload button clicked');
  };
  const categoryOptions = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Unisex', label: 'Unisex' },
    { value: 'Other', label: 'Other' },
  ];

  const typeOptions = [
    { value: 'T-Shirt', label: 'T-Shirt' },
    { value: 'Jeans', label: 'Jeans' },
  ];

  const sizeOptions = [
    { value: 'S', label: 'S' },
    { value: 'M', label: 'M' },
    { value: 'L', label: 'L' },
  ];

  const colorOptions = [
    { value: 'Red', label: 'Red' },
    { value: 'Blue', label: 'Blue' },
  ];

  const { handleSubmit, control, setValue, register, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    // Implement your submit logic here
    console.log(data);
    const selectedCategories = data.category.map((item) => item.value);
    const selectedSizes = data.size.map((item) => item.value);
    const selectedTypes = data.type.map((item) => item.value);
    const selectedColor = data.color.map((item) => item.value);

    console.log("Selected Categories:", selectedCategories);
    console.log("Selected Sizes:", selectedSizes);
    console.log("Selected Types:", selectedTypes);
    console.log("Selected Color:", selectedColor);
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
      backgroundColor: 'white',
      color: "black",
      fontFamily: "sans-serif",
      fontSize: "12px",
      fontWeight: "bold",
      ':hover': {
        backgroundColor: '#c0c0c0',
      },
    }),
  };

  return (
    <div className={form ? 'clothes-form' : 'clothes-form open-form'}>
      <button className="close-btns" onClick={open}>
        <AiOutlineClose className="text-lg text-black" />
      </button>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3>Add Clothes</h3>
        <div className='input-container'>
          <Controller
            name="clothesName"
            control={control}
            defaultValue=""
            rules={{ required: 'Name is required' }}
            render={({ field }) => (
              <div className='custom-input'>
                <label htmlFor="clothes-name">Name*</label>
                <input {...field} type="text" id="clothes-name" />
                {errors.clothesName && <p>{errors.clothesName.message}</p>}
              </div>
            )}
          />

          <Controller
            name="price"
            control={control}
            defaultValue=""
            rules={{ required: 'Price is required' }}
            render={({ field }) => (
              <div className='custom-input'>
                <label htmlFor="price">Price*</label>
                <input {...field} type="number" id="price" />
                {errors.price && <p>{errors.price.message}</p>}
              </div>
            )}
          />

          <div className='select'>
            <label>Category*</label>
            <Controller
              name="category"
              control={control}
              defaultValue={[]}
              rules={{ required: 'Category is required' }}
              render={({ field }) => (
                <Select
                  {...field}
                  placeholder="select category"
                  isMulti
                  options={categoryOptions}
                  styles={style1}
                />
              )}
            />
            {errors.category && <p>{errors.category.message}</p>}
          </div>

          <div className='select'>
            <label>Type*</label>
            <Controller
              name="type"
              control={control}
              defaultValue={[]}
              rules={{ required: 'Type is required' }}
              render={({ field }) => (
                <Select
                  {...field}
                  placeholder="select types"
                  isMulti
                  options={typeOptions}
                  styles={style1}
                />
              )}
            />
            {errors.type && <p>{errors.type.message}</p>}
          </div>

          <div className='select'>
            <label>Size*</label>
            <Controller
              name="size"
              control={control}
              defaultValue={[]}
              rules={{ required: 'Size is required' }}
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

          <div className='select'>
            <label>Color*</label>
            <Controller
              name="color"
              control={control}
              defaultValue={[]}
              rules={{ required: 'Color is required' }}
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

          <div className='custom-input'>
            <label htmlFor="imgs">Images*</label>
            <div className="flex items-center justify-center border py-1 border-black rounded-[4px]">
              <img src={selectedImage || 'default_image_url'} alt="Preview" className="" width={"90px"} height={"140px"} />
              <input
                type="file"
                ref={imageInputRef}
                hidden
                onChange={handleImageChange}
                accept="image/*"
                id='imgs'
              />
            </div>
            {isImageSelected && (
              <button onClick={handleUploadClick} className='bg-black text-white mt-1 rounded-[2px] font-sans text-md font-semibold
              p-[3px] flex justify-center items-center gap-3'><MdFileUpload /><span>upload</span></button>
            )}
          </div>

          <div className='custom-input'>
            <label htmlFor="description">Description*</label>
            <textarea name="" id="description" />
          </div>

          <div className='custom-input'>
            <button type="submit">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddClothes;
