import React from 'react'
import "../../../global css/admincrud.scss"
import { AiOutlineClose } from 'react-icons/ai'

const AddClothes = ({ open, form }) => {
  return (
    <form className={form ? 'clothes-form' : 'clothes-form slide'}>
      <button className="close-btn" onClick={open}>
        <AiOutlineClose className="text-lg text-black" />
      </button>
      <h3>
        Add Clothes
      </h3>
      <div className='input-container'>

      </div>
    </form>
  )
}

export default AddClothes