import React, { FC, useEffect, useState, useRef } from 'react';
import { useFormik } from 'formik';
import './User_Details.scss';
import * as Yup from 'yup';
import userModel from '../../Model/userModel';

interface UserDetailsProps {
  addUser: (userToAdd: userModel) => void;
}

const User_Details: FC<UserDetailsProps> = (props) => {
  const myFormik = useFormik({
    initialValues: {
      name:'' ,
      id: 0,
      username: '',
      email:'' 
    },
    onSubmit: (valueForm: userModel) => {
      props.addUser(valueForm);
      myFormik.resetForm();
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required('Enter name').min(2),
      id: Yup.number().required('Press id'),
      username: Yup.string().required('Enter username').min(2),
      email: Yup.string().required('Put email').email('Wrong email')
    })
  });

  return (
    <div className="container">
      <div className="row">
        <div className=" col-lg-4">
          <div className="">
            <div className="login-box">
              <h2>User Details</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  myFormik.handleSubmit(e);
                }}
              >
                <div className="user-box">
                  <input
                    type="text"
                    name="name"
                    value={myFormik.values.name}
                    onChange={myFormik.handleChange}
                    className={
                      myFormik.errors.name
                        ? 'form-control is-invalid'
                        : 'form-control'
                    }
                  />
                  {myFormik.errors.name ? (
                    <small>{myFormik.errors.name}</small>
                  ) : (
                    ''
                  )}
                  <label>Name</label>
                </div>
                <div className="user-box">
                  <input
                    type="text"
                    name="id"
                    value={myFormik.values.id}
                    onChange={myFormik.handleChange}
                    className={
                      myFormik.errors.id
                        ? 'form-control is-invalid'
                        : 'form-control'
                    }
                  />
                  {myFormik.errors.id ? (
                    <small>{myFormik.errors.id}</small>
                  ) : (
                    ''
                  )}
                  <label>ID</label>
                </div>
                <div className="user-box">
                  <input
                    type="text"
                    name="username"
                    value={myFormik.values.username}
                    onChange={myFormik.handleChange}
                    className={
                      myFormik.errors.username
                        ? 'form-control is-invalid'
                        : 'form-control'
                    }
                  />
                  {myFormik.errors.username ? (
                    <small>{myFormik.errors.username}</small>
                  ) : (
                    ''
                  )}
                  <label>Username</label>
                </div>
                <div className="user-box">
                  <input
                    type="text"
                    name="email"
                    value={myFormik.values.email}
                    onChange={myFormik.handleChange}
                    className={
                      myFormik.errors.email
                        ? 'form-control is-invalid'
                        : 'form-control'
                    }
                  />
                  {myFormik.errors.email ? (
                    <small>{myFormik.errors.email}</small>
                  ) : (
                    ''
                  )}
                  <label>Email</label>
                </div>
                <button type="submit" className="btn btn-warning mt-5">
                  <span>Add User</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User_Details;
