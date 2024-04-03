import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import TextareaAutosize from "react-textarea-autosize";
import axios from "axios";
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
  const [companyInfo, setCompanyInfo] = useState({
    name: "",
    city: "",
    description: "",
    category: "",
    address: "",
    contact: "",
    services: "",
    coverImage: "",
    logoImage: "",
  });
  const [coverPreview, setCoverPreview] = useState({
    coverImage: null,
    isUploaded: false,
  });

  const [logoPreview, setLogoPreview] = useState({
    logoImage: null,
    isUploaded: false,
  });
  const { userID } = useParams();
  const dispatch = useDispatch();

  const token = useSelector(userToken);
  const companyError = useSelector(errorCompany);
  const companyLoading = useSelector(isLoadingCompany);
  const currentUser = useSelector(user);
  const currentCompany = useSelector(company);

  useEffect(() => {
    dispatch(getUserCompany({ userID, token }));
  }, [dispatch, userID, token]);

  useEffect(() => {
    setCompanyInfo({
      ...currentCompany,
    });
    // setCoverPreview({
    //   coverImage: currentCompany.coverImage,
    // });
    // setLogoPreview({
    //   logoImage: currentCompany.logoImage,
    // });
  }, [currentUser, currentCompany]);

  const handleCompanyInfo = (e) => {
    setCompanyInfo({
      ...companyInfo,
      [e.target.id]: e.target.value,
    });
  };

  const handleCloudinaryCoverUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      import.meta.env.VITE_CLOADINARY_UPLOAD_PRESET
    );
    formData.append("public_id", "tectabi_cover_image");
    formData.append("api_key", import.meta.env.VITE_CLOADINARY_API_KEY);
    formData.append("folder", "findit");
    // formData.append("overwrite", true);

    try {
      const { data } = await axios.post(
        import.meta.env.VITE_CLOUDINARY_UPLOAD_API,
        formData
      );

      return data;
    } catch (error) {
      console.log("error upload", error);
      return error;
    }
  };

  const submitUpdateCompanyForm = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      for (let i = 0; i < Object.entries(companyInfo).length; i++) {
        formData.append(
          Object.keys(companyInfo)[i],
          Object.values(companyInfo)[i]
        );
      }

      if (coverPreview.isUploaded) {
        // const coverImage = await handleCloudinaryCoverUpload(
        //   companyInfo.coverImage
        // );
        // console.log(coverImage);

        formData.set("coverImage", JSON.stringify(coverPreview));
        dispatch(
          updateUserCompany({
            userID: currentUser._id,
            token,
            company: formData,
          })
        );
      } else if (logoPreview.isUploaded) {
        const logoImage = await handleCloudinaryCoverUpload(
          companyInfo.logoImage
        );
        console.log(logoImage);

        formData.set("logoImage", logoImage.secure_url);
        dispatch(
          updateUserCompany({
            userID: currentUser._id,
            token,
            company: formData,
          })
        );
      } else {
        dispatch(
          updateUserCompany({
            userID: currentUser._id,
            token,
            company: formData,
          })
        );
      }
    } catch (error) {}
  };

  const submitAddCompanyForm = (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let i = 0; i < Object.entries(companyInfo).length; i++) {
      formData.append(
        Object.keys(companyInfo)[i],
        Object.values(companyInfo)[i]
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
  const handleCoverUpload = async (e) => {
    const file = e.target.files[0];

    setCompanyInfo({
      ...companyInfo,
      coverImage: file,
    });

    setCoverPreview({
      [e.target.id]: URL.createObjectURL(file),
      isUploaded: true,
    });
  };

  const handleCoverRemove = () => {
    setCoverPreview({
      coverImage: "",
      isUploaded: false,
    });
    setCompanyInfo({
      ...companyInfo,
      coverImage: "",
    });
  };

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];

    setCompanyInfo({
      ...companyInfo,
      logoImage: file,
    });
    setLogoPreview({
      [e.target.id]: URL.createObjectURL(file),
      isUploaded: true,
    });
  };
  const handleLogoRemove = () => {
    setLogoPreview({
      logoImage: "",
      isUploaded: false,
    });
    setCompanyInfo({
      ...companyInfo,
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
            value={companyInfo.name ?? ""}
            onChange={handleCompanyInfo}
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
            value={companyInfo.city ?? ""}
            onChange={handleCompanyInfo}
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
            value={companyInfo.category ?? "Choose Category"}
            onChange={handleCompanyInfo}
          >
            <option disabled value="">
              Choose Category
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
            value={companyInfo.address ?? ""}
            onChange={handleCompanyInfo}
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
            value={companyInfo.contact ?? ""}
            onChange={handleCompanyInfo}
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
            value={companyInfo.services ?? ""}
            onChange={handleCompanyInfo}
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
            value={companyInfo.description ?? ""}
            onChange={handleCompanyInfo}
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
              onChange={handleCoverUpload}
            />
            <button
              type="button"
              className="upload-controls_button"
              onClick={handleCoverRemove}
            >
              Remove
            </button>
          </div>

          <div className="image-preview">
            {coverPreview.isUploaded ? (
              <img
                className="image-preview_image"
                src={coverPreview.coverImage}
                alt=""
              />
            ) : (
              <img
                className="image-preview_image"
                src={companyInfo.coverImage}
                alt=""
              />
            )}
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
              onChange={handleLogoUpload}
            />
            <button
              type="button"
              className="upload-controls_button"
              onClick={handleLogoRemove}
            >
              Remove
            </button>
          </div>
          <div className="image-preview">
            {logoPreview.isUploaded ? (
              <img
                className="image-preview_image"
                src={logoPreview.logoImage}
                alt=""
              />
            ) : (
              <img
                className="image-preview_image"
                src={companyInfo.logoImage}
                alt=""
              />
            )}
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
  );
};

export default CompanyProfile;
