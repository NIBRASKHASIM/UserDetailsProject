import Head from "next/head";
import Image from "next/image";
import Axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeUser, setUsers } from "../Redux/userSlice";
import Link from "next/link";
import { Modal } from "antd";
export default function Home() {
  const dispatch = useDispatch();
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [show, setShow] = useState(false);
  const users = useSelector((state) => state.user.users);
  useEffect(() => {
    if (users.length === 0) {
      Axios.get("https://reqres.in/api/users ")
        .then((res) => {
          dispatch(setUsers(res.data.data));
          console.log("res", res);
        })
        .catch(() => {
          console.log("error occured");
        });
    }
  }, []);
  console.log("result", users);

  const showDeleteHandler = (index) => {
    setSelectedIndex(index);
    setShow(true);
  };
  // const userDeleteHandler = (index) => {
  //   dispatch(removeUser(selectedIndex));
  //   setSelectedIndex(null);
  //   setShow(false);
  // };

  return (
    <>
      <Modal
        title="Confirm Deletion"
        open={show}
        onOk={userDeleteHandler}
        onCancel={() => setShow(false)}
        okText="Delete"
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete?</p>
      </Modal>
      <div className="container">
        <div className="table-responsive">
          <div className="table-wrapper">
            <div className="table-title">
              <div className="row">
                <div className="col-xs-5">
                  <h2>
                    User <b>Management</b>
                  </h2>
                </div>
                <div className="col-xs-7">
                  <Link href="/add-users" className="btn btn-primary">
                    <span>Add New User</span>
                  </Link>
                </div>
              </div>
            </div>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {users?.map((item, index) => (
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>
                      <a href="#">
                        <img
                          src={item.avatar}
                          className="avatar"
                          alt="Avatar"
                          width="46px"
                          height="46px"
                        />{" "}
                        {item.first_name} {item.last_name}
                      </a>
                    </td>
                    <td>{item.email}</td>
                    <td>
                      <button type="button" className="btn btn-secondary">
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => showDeleteHandler(index)}
                        type="button"
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
