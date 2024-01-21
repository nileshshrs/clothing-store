import React from 'react'
import "../../../global css/admincrud.scss"
import { AiOutlineClose } from 'react-icons/ai'

const AddClothes = ({ open, form }) => {
  return (
    <div className={form ? 'clothes-form' : 'clothes-form open-form'}>
      <button className="close-btn" onClick={open}>
        <AiOutlineClose className="text-lg text-black" />
      </button>
      <form >

        <h3>
          Add Clothes
        </h3>
        <div className='input-container'>

        </div>
      </form>
    </div>
  )
}

export default AddClothes