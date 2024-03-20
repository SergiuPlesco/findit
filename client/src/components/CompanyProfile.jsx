import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import TextareaAutosize from "react-textarea-autosize";

import {
  errorCompany,
  isLoadingCompany,
  user,
  company,
} from "../redux/slices/UserProfileSlice";
import {
  getUserCompany,
  addUserCompany,
  updateUserCompany,
  deleteUserCompany,
} from "../redux/services/UserProfileServices";
import { userToken } from "../redux/slices/AuthSlice";
import Categories from "../default_data/Categories";
import Cities from "../default_data/CitiesUK";

const CompanyProfile = () => {
  const { userID } = useParams();
  const token = useSelector(userToken);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserCompany({ userID, token }));
  }, [dispatch, userID, token]);

  const companyError = useSelector(errorCompany);
  const companyLoading = useSelector(isLoadingCompany);
  const currentUser = useSelector(user);
  const currentCompany = useSelector(company);
  const [companyForm, setCompanyForm] = useState({});

  useEffect(() => {
    setCompanyForm({
      ...currentCompany,
    });
  }, [currentUser, currentCompany]);

  const handleCompanyForm = (e) => {
    e.preventDefault();
    setCompanyForm({
      ...companyForm,
      [e.target.id]: e.target.value,
    });
  };

  const submitUpdateCompanyForm = async (e) => {
    const formData = new FormData();
    for (let i = 0; i < Object.entries(companyForm).length; i++) {
      formData.append(
        Object.keys(companyForm)[i],
        Object.values(companyForm)[i]
      );
    }
    e.preventDefault();
    dispatch(
      updateUserCompany({
        userID: currentUser._id,
        token,
        company: formData,
      })
    );
  };

  const submitAddCompanyForm = (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let i = 0; i < Object.entries(companyForm).length; i++) {
      formData.append(
        Object.keys(companyForm)[i],
        Object.values(companyForm)[i]
      );
    }
    dispatch(
      addUserCompany({ userID: currentUser._id, token, company: formData })
    );
  };

  const deleteCompany = (e) => {
    e.preventDefault();
    dispatch(deleteUserCompany({ userID: currentUser._id, token }));
  };
  const handleImageUpload = async (e) => {
    try {
      setCompanyForm({
        ...companyForm,
        [e.target.id]: e.target.files[0],
      });
    } catch (error) {
      console.log(error);
    }
  };

  const removeCoverImage = (e) => {
    e.preventDefault();
    setCompanyForm({
      ...companyForm,
      coverImage: "",
    });
  };
  const removeLogoImage = (e) => {
    e.preventDefault();
    setCompanyForm({
      ...companyForm,
      logoImage: "",
    });
  };

  if (companyError) {
    return <div>{companyError}</div>;
  }

  if (companyLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="company-container">
        <h3 className="dashboard-title">Company Details</h3>
        <form>
          <div className="field-container">
            <label className="field-container_label" htmlFor="name">
              Name:
            </label>
            <input
              className="field-container_input"
              id="name"
              type="text"
              value={companyForm.name ?? ""}
              onChange={handleCompanyForm}
            />
          </div>
          <div className="field-container">
            <label className="field-container_label" htmlFor="city">
              City:
            </label>
            <select
              className="field-container_input"
              id="city"
              type="select"
              value={companyForm.city ?? ""}
              onChange={handleCompanyForm}
            >
              <option disabled value="">
                Choose City
              </option>
              {Cities.map((city) => {
                return (
                  <option key={city} value={city}>
                    {city}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="field-container">
            <label className="field-container_label" htmlFor="category">
              Category
            </label>
            <select
              className="field-container_input"
              id="category"
              type="text"
              value={companyForm.category ?? "Choose Category"}
              onChange={handleCompanyForm}
            >
              <option disabled value="">
                Choose City
              </option>
              {Categories.map((obj) => {
                return (
                  <option key={obj.category} value={obj.category}>
                    {obj.category}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="field-container">
            <label className="field-container_label" htmlFor="address">
              Address:
            </label>
            <input
              className="field-container_input"
              id="address"
              type="text"
              value={companyForm.address ?? ""}
              onChange={handleCompanyForm}
            />
          </div>
          <div className="field-container">
            <label className="field-container_label" htmlFor="contact">
              Contact:
            </label>
            <input
              className="field-container_input"
              id="contact"
              type="text"
              value={companyForm.contact ?? ""}
              onChange={handleCompanyForm}
            />
          </div>
          <div className="field-container">
            <label className="field-container_label" htmlFor="services">
              Services:
            </label>
            <input
              className="field-container_input"
              id="services"
              type="text"
              value={companyForm.services ?? ""}
              onChange={handleCompanyForm}
            />
          </div>
          <div className="field-container">
            <label className="field-container_label" htmlFor="description">
              Description:
            </label>
            <TextareaAutosize
              className="field-container_input textarea-autosize"
              id="description"
              type="text"
              value={companyForm.description ?? ""}
              onChange={handleCompanyForm}
            ></TextareaAutosize>
          </div>
          <div className="field-container">
            <label className="field-container_label" htmlFor="coverImage">
              Cover Image:
            </label>
            <div className="upload-controls">
              <input
                type="file"
                id="coverImage"
                className="field-container_input"
                accept="image/*"
                onChange={handleImageUpload}
              />
              <button
                className="upload-controls_button"
                onClick={removeCoverImage}
              >
                Remove
              </button>
            </div>

            <div className="image-preview">
              <img
                className="image-preview_image"
                src={`${import.meta.env.VITE_IMAGES_URL}/${
                  companyForm.coverImage
                }`}
                alt=""
              />
            </div>
          </div>
          <div className="field-container">
            <label className="field-container_label" htmlFor="logoImage">
              Logo Image:
            </label>
            <div className="upload-controls">
              <input
                type="file"
                id="logoImage"
                className="field-container_input"
                accept="image/*"
                onChange={handleImageUpload}
              />
              <button
                className="upload-controls_button"
                onClick={removeLogoImage}
              >
                Remove
              </button>
            </div>
            <div className="image-preview">
              <img
                className="image-preview_image"
                src={`${import.meta.env.VITE_IMAGES_URL}/${
                  companyForm.logoImage
                }`}
                alt=""
              />
            </div>
          </div>
          <div className="button-container">
            {currentCompany ? (
              <>
                <button
                  className="button"
                  type="button"
                  onClick={submitUpdateCompanyForm}
                >
                  Update
                </button>
                <button className="button" onClick={deleteCompany}>
                  Delete company
                </button>
              </>
            ) : (
              <>
                <button className="button" onClick={submitAddCompanyForm}>
                  Add company
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanyProfile;
