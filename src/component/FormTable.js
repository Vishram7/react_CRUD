import React from "react";
import "../App.css"
import { MdClose } from "react-icons/md";

const FormTable = ({handleSubmit, handleOnChange, handleClose, rest}) => {
    return(
        <div className="addContainer">
          
        <form onSubmit={handleSubmit}>

        <div className="close-btn" onClick={handleClose}><MdClose/></div>
          <label htmlFor="name">Name : </label>
          <input type="text" id="name" name="name" value={rest.name} onChange={handleOnChange} required/>

          <label htmlFor="email">Email : </label>
          <input type="email" id="email" name="email" value={rest.email} onChange={handleOnChange} required/>

          <label htmlFor="mobile">Mobile : </label>
          <input type="text" id="mobile" name="mobile" value={rest.mobile} onChange={handleOnChange} minLength="10" maxLength="10" required/>

          <button className="btn">Submit</button>

        </form>
      </div>
    )
}

export default FormTable