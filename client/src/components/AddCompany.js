import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userToken } from "../redux/slices/AuthSlice";
import { addUserCompany } from "../redux/services/UserProfileServices";
import Categories from "../default_data/Categories";
import Cities from "../default_data/Cities";
import TextareaAutosize from "react-textarea-autosize";
import { user } from "../redux/slices/UserProfileSlice";
import FileBase from "react-file-base64";

const AddCompany = () => {
	const token = useSelector(userToken);
	const currentUser = useSelector(user);

	const dispatch = useDispatch();
	const [companyForm, setCompanyForm] = useState({
		name: "",
		city: "",
		category: "",
		address: "",
		contact: "",
		services: "",
		description: "",
		heroImage: "",
	});

	const handleCompanyForm = (e) => {
		e.preventDefault();
		setCompanyForm({
			...companyForm,
			[e.target.id]: e.target.value,
		});
	};

	const submitAddCompanyForm = (e) => {
		e.preventDefault();
		dispatch(addUserCompany({ userID: currentUser._id, token, company: companyForm }));
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
		<div className="company-container">
			<h3 className="dashboard-title">Add company</h3>

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
						type="select"
						value={companyForm.category ?? ""}
						onChange={handleCompanyForm}
					>
						<option disabled value="">
							Choose City
						</option>
						{Categories.map((category) => {
							return (
								<option key={category} value={category}>
									{category}
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
				<div className="field-container cover-image-contaier">
					<label className="field-container_label" htmlFor="services">
						Cover Image:
					</label>
					<FileBase
						className="field-container_input"
						id="coverImage"
						type="file"
						multiple={false}
						onDone={({ base64 }) => setCompanyForm({ ...companyForm, coverImage: base64 })}
					/>
					<div>
						<img style={{ width: "200px" }} src={companyForm.coverImage} alt="" />
						<button onClick={removeCoverImage}>Remove cover image</button>
					</div>
				</div>
				<div className="field-container logo-image-contaier">
					<label className="field-container_label" htmlFor="services">
						Logo Image:
					</label>
					<FileBase
						className="field-container_input"
						id="logoImage"
						type="file"
						multiple={false}
						onDone={({ base64 }) => setCompanyForm({ ...companyForm, logoImage: base64 })}
					/>
					<div>
						<img style={{ width: "100px" }} src={companyForm.logoImage} alt="" />
						<button onClick={removeLogoImage}>Remove logo</button>
					</div>
				</div>
				<div className="button-container">
					<button className="button" type="submit" onClick={submitAddCompanyForm}>
						Add
					</button>
				</div>
			</form>
		</div>
	);
};

export default AddCompany;
