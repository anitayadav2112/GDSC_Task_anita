import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import axios from "axios";
import { toast } from "react-toastify";

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users");
      if (response.status === 200) {
        setData(response.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const onDeleteUser =async(email)=>{
         
     const response=await axios.delete(`http://localhost:5000/user/${email}`);
     if(response.status==200)
     {
        toast.success(response.data);
     }
  }

  const onEditUser =async(email)=>{
         
    const response=await axios.put(`http://localhost:5000/user/${email}`,data);
    if(response.status==200)
    {
       toast.success(response.data);
    }
 }

  console.log("data=>", data);

  return (
    <div style={{ marginTop: "150px" }}>

      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>No.</th>
            <th style={{ textAlign: "center" }}>Name</th>
            <th style={{ textAlign: "center" }}>Email</th>
            <th style={{ textAlign: "center" }}>Contact</th>
          </tr>
        </thead>
        <tbody>
          {data && data.map((item, index) => (
            <tr key={index}>
              <th scope="rows">{index + 1}</th>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.contact}</td>
              <td>
                <Link to={`/update/${item.id}`}>
                <button className="btn btn-edit"onClick={()=>onDeleteUser(item.email)}>Edit</button>
                </Link>
                 
                <button className="btn btn-delete"onClick={()=>onDeleteUser(item.email)}>Delete</button>

                <Link to={`/view/${item.id}`}>
                <button className="btn btn-view">View</button>
                </Link>

                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
