import React from "react";
import UserForm from "../components/UserForm";

function addUsers() {
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
            </div>
          </div>
          <UserForm />
        </div>
      </div>
    </div>
  );
}

export default addUsers;
