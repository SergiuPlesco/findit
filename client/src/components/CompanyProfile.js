import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import TextareaAutosize from "react-textarea-autosize";
import imageCompression from "browser-image-compression";
// React Image File Resize

import { error, isLoading, user, company } from "../redux/slices/UserProfileSlice";
import {
	getUserCompany,
	addUserCompany,
	updateUserCompany,
	deleteUserCompany,
} from "../redux/services/UserProfileServices";
import { userToken } from "../redux/slices/AuthSlice";
import Categories from "../default_data/Categories";
import Cities from "../default_data/Cities";

const CompanyProfile = () => {
	const { userID } = useParams();
	const token = useSelector(userToken);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getUserCompany({ userID, token }));
	}, [dispatch, userID, token]);

	const userError = useSelector(error);
	const userLoading = useSelector(isLoading);
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

	const submitUpdateCompanyForm = (e) => {
		e.preventDefault();
		dispatch(updateUserCompany({ userID: currentUser._id, token, company: companyForm }));
		console.log(companyForm);
	};

	const submitAddCompanyForm = (e) => {
		e.preventDefault();
		dispatch(addUserCompany({ userID: currentUser._id, token, company: companyForm }));
	};

	const deleteCompany = (e) => {
		e.preventDefault();
		console.log("company deleted");
		dispatch(deleteUserCompany({ userID: currentUser._id, token }));
	};
	const handleImageUpload = async (e) => {
		const imageFile = e.target.files[0];

		const options = {
			maxSizeMB: 0.5,
			maxWidthOrHeight: 1440,
			useWebWorker: true,
		};
		try {
			const compressedImage = await imageCompression(imageFile, options);
			const reader = new FileReader();
			reader.readAsDataURL(compressedImage);
			reader.onloadend = () => {
				const base64 = reader.result;
				setCompanyForm({
					...companyForm,
					[e.target.id]: base64,
				});
			};
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
	return (
		<>
			{userError && <div>{userError}</div>}
			{userLoading && <div>Loading...</div>}
			{companyForm && (
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
								Category:
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
								<button className="upload-controls_button" onClick={removeCoverImage}>
									Remove
								</button>
							</div>

							<div className="image-preview">
								<img className="image-preview_image" src={companyForm.coverImage} alt="" />
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
								<button className="upload-controls_button" onClick={removeLogoImage}>
									Remove
								</button>
							</div>
							<div className="image-preview">
								<img className="image-preview_image" src={companyForm.logoImage} alt="" />
							</div>
						</div>
						<div className="button-container">
							{companyForm ? (
								<>
									<button className="button" type="submit" onClick={submitUpdateCompanyForm}>
										Save
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
			)}
		</>
	);
};

export default CompanyProfile;
