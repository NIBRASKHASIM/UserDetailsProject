import React, { useEffect, useState } from "react";
import { addUser, updateUser } from "../Redux/userSlice";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

function EditUserForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [userForm, setUserForm] = useState({
    id: "",
    first_name: "",
    last_name: "",
    email: "",
    image: "",
  });

  const users = useSelector((state) => state.user.users);

  useEffect(() => {
    const userId = router.query.id;
    const selectedUser = users.find((user) => user.id.toString() === userId);

    if (selectedUser) {
      setUserForm(selectedUser);
    }
  }, [router.query.id, users]);

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

  const handleUpdateUser = (e) => {
    e.preventDefault();
    dispatch(updateUser(userForm));
    router.push("/");
  };

  return (
    <form onSubmit={(e) => handleUpdateUser(e)}>
      <div className="form-group">
        <label for="exampleInputEmail1">Id</label>
        <input
          required
          onChange={(e) => handleChange(e)}
          type="number"
          className="form-control"
          id="id"
          value={userForm.id}
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
          id="first_name"
          value={userForm.first_name}
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
          id="last_name"
          value={userForm.last_name}
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
          value={userForm.email}
          aria-describedby="emailHelp"
          placeholder="Enter email"
        />
      </div>
      <div className="form-group">
        <label for="exampleInputPassword1">Avatar</label>
        <input
          onChange={(e) => handleChange(e)}
          type="file"
          className="form-control"
          placeholder="No file chosen"
          id="image"
        />
      </div>
      <button type="submit" className="my-2 btn btn-primary">
        Update
      </button>
    </form>
  );
}

export default EditUserForm;
