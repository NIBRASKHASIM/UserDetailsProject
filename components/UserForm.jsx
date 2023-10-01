import React, { useState } from "react";
import { addUser } from "../Redux/userSlice";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

function UserForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [userForm, setUserForm] = useState({
    id: "",
    first: "",
    second: "",
    email: "",
    image: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    const newData = { ...userForm };
    if (e.target.id === "image") {
      newData[e.target.id] = e.target.files[0];
      setUserForm({ ...newData });
    } else {
      newData[e.target.id] = e.target.value;
      setUserForm({ ...newData });
    }
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    const newUser = {
      id: userForm.id,
      first_name: userForm.first,
      last_name: userForm.last,
      email: userForm.email,
      avatar: userForm.image,
    };

    dispatch(addUser(newUser));
    router.push("/");
  };

  return (
    <form onSubmit={(e) => handleAddUser(e)}>
      <div className="form-group">
        <label for="exampleInputEmail1">Id</label>
        <input
          required
          onChange={(e) => handleChange(e)}
          type="number"
          className="form-control"
          id="id"
          placeholder="Enter Id"
        />
      </div>
      <div className="form-group">
        <label for="exampleInputEmail1">First Name</label>
        <input
          required
          onChange={(e) => handleChange(e)}
          type="text"
          className="form-control"
          id="first"
          aria-describedby="emailHelp"
          placeholder="Enter First Name"
        />
      </div>
      <div className="form-group">
        <label for="exampleInputEmail1">Second Name</label>
        <input
          required
          onChange={(e) => handleChange(e)}
          type="text"
          className="form-control"
          id="second"
          aria-describedby="emailHelp"
          placeholder="Enter Second Name"
        />
      </div>
      <div className="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input
          required
          onChange={(e) => handleChange(e)}
          type="email"
          className="form-control"
          id="email"
          aria-describedby="emailHelp"
          placeholder="Enter email"
        />
      </div>
      <div className="form-group">
        <label for="exampleInputPassword1">Avatar</label>
        <input
          required
          onChange={(e) => handleChange(e)}
          type="file"
          className="form-control"
          placeholder="No file chosen"
          id="image"
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

export default UserForm;
