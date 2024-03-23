// !! IMPORTANT !!
// ? This Fake API URL is created by "json-server"
// Open terminal and run command "json-server --watch db.json --port 4000" to run the fake API server

import './App.css';
import React, { useEffect, useState } from 'react'

function App() {
  // Creating States for Updating User Data
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newMobile, setNewMobile] = useState("");

  // Creating States for Saving New User Data
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [userId, setUserId] = useState("");

  // Creating "users" state to store the data of Users
  const [users, setUser] = useState([]); // Here Default Value of "users" is an Empty String

  useEffect(() => {
    // Fetching Users on Loading the App
    getUsers();
  }, []);


  function getUsers() { 
    fetch("http://localhost:4000/users")
      .then((result) => {
        result.json()
          // Printing the JSON Data Received
          .then((resp) => {
            console.log(`API Response : \n`, resp);
            // Assigning the Received data to "users" state
            setUser(resp);
          });
      });
  }

  // Printing the Users Data in "users" state
  console.log(`Users : \n`, users);

  function saveData() {
    let formdata = { name, email, mobile }
    console.warn(`New User Data : \n`, formdata);

    let data = ({ name, email, mobile });
    // Printing New Saved User Details
    console.warn(`Form User Object : \n`, data);

    fetch("http://localhost:4000/users", {
      // POST method For Saving Data
      method: "POST", 
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(data)

    }).then((resp) => {
      // Printing API Response
      console.warn("String Response of API : \n", resp);

      resp.json().then((result) => {

        console.warn("User Data Object : \n", result);

        // Fetching Users on Successfully Saving the New User
        getUsers();
      });
    });

    // Clearing Form Data after Successfully Saving User Data
    clearNewUser();
  }

  function deleteUser(id) {
    fetch(`http://localhost:4000/users/${id}`, {
      method: "DELETE",
    }).then((result) => {
      result.json().then((resp) => {

        // Printing Response Received from API
        console.log(`API Response : \n`, resp);

        // Refreshing Users List After User Deletion
        getUsers();
      });
    });
  }

  function selectUser(id) {
    // "id - 1" is done bcoz Index No starts from 0
    let data = users[id - 1];
    setNewName(data.name);
    setNewEmail(data.email);
    setNewMobile(data.mobile);
    setUserId(data.id);
  }


  function updateUser() {
    let newData = { name: newName, email: newEmail, mobile: newMobile }
    // Printing Updated User Data
    console.log(`Updated User Details : \n`, newData);

    fetch(`http://localhost:4000/users/${userId}`, {
      method: "PUT",
      headers: {
        "Accept": "application/json",
        "content-type": "application/json"
      },
      body: JSON.stringify(newData)

    }).then((result) => {
      result.json().then((resp) => {

        // Printing Response Received from API
        console.log(`API Response : \n`, resp);

        getUsers();
      });
    });

    // Clearing Form Data after successfully Updating User Details
    clearData();
  }

  function clearData() {
    setNewName("");
    setNewEmail("");
    setNewMobile("");
  }

  function clearNewUser() {
    setName("");
    setEmail("");
    setMobile("");
  }

  return (
    <div className="App">
      <h1>User Table </h1>
      <table border="2" align="center" width="80%" bgcolor="lightblue" cellPadding="2" cellSpacing="2">
        <tbody>
          <tr bgcolor="grey">
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th colSpan={2}>Operations</th>
          </tr>
          {
            // * Here "id" is the Unique Key
            users.map((item) =>
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.mobile}</td>
                <td><button onClick={() => deleteUser(item.id)}>Delete</button></td>
                <td><button onClick={() => selectUser(item.id)}>Update</button></td>
              </tr>
            )
          }
        </tbody>
      </table>
      <br /> <br />
      <div className="App">
        <h1>Save New User Form</h1>
        {/* Name Field */}
        <input type="text" name="name" value={name} onChange={(e) => { setName(e.target.value) }} placeholder="Enter Name" />
        <br /> <br />

        {/* Email Field */}
        <input type="text" name="email" value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder="Enter Email" />
        <br /> <br />

        {/* Mobile No Field */}
        <input type="text" name="mobile" value={mobile} onChange={(e) => { setMobile(e.target.value) }} placeholder="Enter Mobile No" />
        <br /> <br />

        {/* Submit Button */}
        <button type="button" onClick={saveData} >Save New User</button>
        <br /> <br />
        <button type="button" onClick={clearNewUser} >Clear Form</button>
      </div>

      <div className="App">
        <h1>Update User Form</h1>
        {/* Name Field */}
        <input type="text" name="name" value={newName} placeholder="Enter Name" onChange={(e) => setNewName(e.target.value)} />
        <br /> <br />

        {/* Email Field */}
        <input type="text" name="email" value={newEmail} placeholder="Enter Email" onChange={(e) => setNewEmail(e.target.value)} />
        <br /> <br />

        {/* Mobile No Field */}
        <input type="text" name="mobile" value={newMobile} placeholder="Enter Mobile No" onChange={(e) => setNewMobile(e.target.value)} />
        <br /> <br />

        {/* Submit Button */}
        <button onClick={updateUser} >Update User</button>
        <br /> <br />
        <button type="button" onClick={clearData} >Clear Data</button>
      </div>
    </div>
  );
}
export default App;
