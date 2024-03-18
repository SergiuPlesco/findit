import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import {
  errorUser,
  isLoadingUser,
  user,
} from "../redux/slices/UserProfileSlice";
import { getUser, updateUserInfo } from "../redux/services/UserProfileServices";
import { userToken } from "../redux/slices/AuthSlice";

const UserProfile = () => {
  const { userID } = useParams();
  const token = useSelector(userToken);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser({ userID, token }));
  }, [dispatch, userID, token]);

  const userError = useSelector(errorUser);
  const userLoading = useSelector(isLoadingUser);
  const currentUser = useSelector(user);
  const [userForm, setUserForm] = useState({});

  useEffect(() => {
    setUserForm({
      ...currentUser,
    });
  }, [currentUser]);

  const handleUserForm = (e) => {
    e.preventDefault();
    setUserForm({
      ...userForm,
      [e.target.id]: e.target.value,
    });
  };

  const submitUserForm = (e) => {
    e.preventDefault();
    dispatch(
      updateUserInfo({ userID: currentUser._id, token, user: userForm })
    );
  };

  if (userError) {
    return <div>{userError}</div>;
  }
  if (userLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="user-container">
      <h3 className="dashboard-title">User Details</h3>
      <form>
        <div className="field-container">
          <label className="field-container_label" htmlFor="firstname">
            Firstname:
          </label>
          <input
            className="field-container_input"
            id="firstname"
            type="text"
            value={userForm.firstname ?? ""}
            onChange={handleUserForm}
          />
        </div>
        <div className="field-container">
          <label className="field-container_label" htmlFor="lastname">
            Lastname:
          </label>
          <input
            className="field-container_input"
            id="lastname"
            type="text"
            value={userForm.lastname ?? ""}
            onChange={handleUserForm}
          />
        </div>
        <div className="field-container">
          <label className="field-container_label" htmlFor="email">
            Email:
          </label>
          <input
            className="field-container_input"
            id="email"
            type="text"
            value={userForm.email ?? ""}
            onChange={handleUserForm}
          />
        </div>
        <div className="button-container">
          <button className="button" type="submit" onClick={submitUserForm}>
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserProfile;
