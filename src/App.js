import logo from './logo.svg';
import './App.css';
import {MdClose} from "react-icons/md"
import { useEffect, useState } from 'react';
import axios from 'axios'
import FormTable from './component/FormTable';

axios.defaults.baseURL = "http://localhost:4000/"

function App() {
  const [addSection, setaddSection] = useState(false)
  const [FormData, setFormData] = useState({
    name:"",
    email:"",
    mobile:""
  })

  const [dataList, setdataList] = useState([])

  //edit

  const [editSection, seteditSection] = useState(false)
  const [FormDataEdit, setFormDataEdit] = useState({
    name:"",
    email:"",
    mobile:"",
    id:""
  })
  

 

  const handleSubmit = async(e) => {
    e.preventDefault()
    const data = await axios.post("/create", FormData)

    //console.log(data)
    if(data){
      setaddSection(false)
      //alert("data saved successfully")
      getFetchData()
      setFormData({
        name: "",
        email: "",
        mobile: ""
      })
    }

  }

  const getFetchData = async() => {
    const data = await axios.get("/")
    //console.log(data)
    if(data){
      setdataList(data.data.data)
    }
  }

  useEffect(() => {
    getFetchData()
  }, [])

  const handleDelete = async(id) => {
    const data = await axios.delete("/delete/"+id)
    
    if(data){
      getFetchData()
      //alert('data deleted')
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    const data = await axios.put("/update", FormDataEdit)
    if(data){
      getFetchData()
      //alert('data deleted')
      seteditSection(false)
    }
  }

  const handleEdit= (el) => {
    setFormDataEdit(el)
    seteditSection(true)
  }

  const handleOnChange =(e) => {
    const {value, name} = e.target
    setFormData((preve) => {
      return{
        ...preve,
        [name]:value
      }
    })
  }

  const handleEditOnChange = async(e) => {
    const {value,name} = e.target
    setFormDataEdit((preve) => {
      return{
        ...preve,
        [name]:value
      }
    })

  }

  return (
    <>
      <div className="container">
        <button className="btn btn-add" onClick={() => setaddSection(true)}>Add</button>

      {
        addSection && (
        <FormTable 
        handleSubmit={handleSubmit}
        handleOnChange={handleOnChange} 
        handleClose={() => setaddSection(false)}
        rest={FormData}
        />
        
      )
    }

    {
      editSection && (
        <FormTable 
        handleSubmit={handleUpdate} 
        handleOnChange={handleEditOnChange} 
        handleClose={() => seteditSection(false)}
        rest={FormDataEdit}
        />

      )
    }

    <div className='tableContainer'>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>

            </th>
          </tr>
        </thead>
        <tbody>
          { dataList[0] ? (
            dataList.map((el) => {
              return(
                <tr>
                  <td>{el.name}</td>
                  <td>{el.email}</td>
                  <td>{el.mobile}</td>
                  <td>
                  <button className='btn btn-edit' onClick={() => handleEdit(el) }>Edit</button>
                  <button className='btn btn-delete' onClick={() => handleDelete(el._id)}>Delete</button>
                  </td>
                </tr>
              )
            }))
            :(
              <p style={{textAlign: "center"}}>no data</p>
            )
          }
        </tbody>
      </table>

    </div>

        
    </div>
    </>
  );
}

export default App;
