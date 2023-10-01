import Head from "next/head";
import Image from "next/image";
import Axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "../Redux/userSlice";
import Link from "next/link";
export default function Home() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  useEffect(() => {
    Axios.get("https://reqres.in/api/users ")
      .then((res) => {
        dispatch(setUsers(res.data.data));
        console.log("res", res);
      })
      .catch(() => {
        console.log("error occured");
      });
  }, [dispatch]);

  return (
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
              <div class="col-xs-7">
                <Link href="/add-users" class="btn btn-primary">
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
                    <button type="button" class="btn btn-secondary">
                      Edit
                    </button>
                  </td>
                  <td>
                    <button type="button" class="btn btn-danger">
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
  );
}
