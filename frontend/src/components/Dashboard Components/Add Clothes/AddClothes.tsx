import React, { useState, useRef } from 'react';
import "../../../global css/admincrud.scss";
import { AiOutlineClose } from 'react-icons/ai';
import Select from 'react-select';
import { MdFileUpload } from "react-icons/md";

const AddClothes = ({ open, form }) => {
  const categoryOptions = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Unisex', label: 'Unisex' },
    { value: 'Other', label: 'Other' },
    // Add more categories as needed
  ];

  const typeOptions = [
    { value: 'T-Shirt', label: 'T-Shirt' },
    { value: 'Jeans', label: 'Jeans' },
    // Add more types as needed
  ];

  const sizeOptions = [
    { value: 'S', label: 'S' },
    { value: 'M', label: 'M' },
    { value: 'L', label: 'L' },
    // Add more sizes as needed
  ];

  const colorOptions = [
    { value: 'Red', label: 'Red' },
    { value: 'Blue', label: 'Blue' },
    // Add more colors as needed
  ];

  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedType, setSelectedType] = useState([]);
  const [selectedSize, setSelectedSize] = useState([]);
  const [selectedColor, setSelectedColor] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isImageSelected, setIsImageSelected] = useState(false);

  const imageInputRef = useRef(null);

  const handleCategories = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    setSelectedCategory(selectedValues);
  };

  const handleTypes = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    setSelectedType(selectedValues);
  };

  const handleSize = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    setSelectedSize(selectedValues);
  };

  const handleColor = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    setSelectedColor(selectedValues);
  };

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
      <form>
        <h3>Add Clothes</h3>
        <div className='input-container'>
          <div className='custom-input'>
            <label htmlFor="clothes-name">Name*</label>
            <input type="text" id="clothes-name" />
          </div>

          <div className='select'>
            <label>Category*</label>
            <Select
              placeholder="select category"
              isMulti
              onChange={handleCategories}
              options={categoryOptions}
              styles={style1}
            />
          </div>

          <div className='select'>
            <label>Type*</label>
            <Select
              placeholder="select types"
              isMulti
              onChange={handleTypes}
              options={typeOptions}
              styles={style1}
            />
          </div>

          <div className='select'>
            <label>Size*</label>
            <Select
              placeholder="select size"
              isMulti
              onChange={handleSize}
              options={sizeOptions}
              styles={style1}
            />
          </div>

          <div className='select'>
            <label>Color*</label>
            <Select
              placeholder="select color"
              isMulti
              onChange={handleColor}
              options={colorOptions}
              styles={style1}
            />
          </div>

          <div className="custom-input">
            <label htmlFor="imgs">Images*</label>
            <div onClick={handleImageClick} className="flex items-center justify-center border py-1 border-black rounded-[4px]">
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
            <button>Submit</button>
          </div>
        </div>

      </form>
    </div>
  );
}

export default AddClothes;
