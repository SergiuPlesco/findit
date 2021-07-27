import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { error, isLoading, user, company } from "../redux/slices/UserProfileSlice";
import {
	getUser,
	getUserCompany,
	updateUserInfo,
	updateUserCompany,
	addUserCompany,
	deleteUserCompany,
} from "../redux/services/UserProfileServices";
import { userToken } from "../redux/slices/AuthSlice";
import "./Dashboard.css";

const Dashboard = () => {
	const userError = useSelector(error);
	const userLoading = useSelector(isLoading);
	const currentUser = useSelector(user);
	const currentCompany = useSelector(company);

	const { userID } = useParams();
	const token = useSelector(userToken);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getUser({ userID, token }));
		dispatch(getUserCompany({ userID, token }));
	}, [dispatch, userID, token]);

	const [userForm, setUserForm] = useState({});
	const [companyForm, setCompanyForm] = useState({});

	useEffect(() => {
		setUserForm({
			...currentUser,
		});
		setCompanyForm({
			...currentCompany,
		});
	}, [currentUser, currentCompany]);

	const handleUserForm = (e) => {
		e.preventDefault();
		setUserForm({
			...userForm,
			[e.target.id]: e.target.value,
		});
	};

	const handleCompanyForm = (e) => {
		e.preventDefault();
		setCompanyForm({
			...companyForm,
			[e.target.id]: e.target.value,
		});
	};

	const submitUserForm = (e) => {
		e.preventDefault();
		dispatch(updateUserInfo({ userID: currentUser._id, token, user: userForm }));
	};

	const submitUpdateCompanyForm = (e) => {
		e.preventDefault();
		dispatch(updateUserCompany({ userID: currentUser._id, token, company: companyForm }));
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

	return (
		<div className="dashboard-container">
			{userError && <div>{userError}</div>}
			{userLoading && <div>Loading...</div>}
			{userForm && (
				<div className="user-container">
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
								Email
							</label>
							<input
								className="field-container_input"
								id="email"
								type="text"
								value={userForm.email ?? ""}
								onChange={handleUserForm}
							/>
						</div>
						<div>
							<button type="submit" onClick={submitUserForm}>
								Save
							</button>
						</div>
					</form>
				</div>
			)}
			{companyForm && currentCompany ? (
				<div className="company-container">
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
							<input
								className="field-container_input"
								id="city"
								type="text"
								value={companyForm.city ?? ""}
								onChange={handleCompanyForm}
							/>
						</div>
						<div className="field-container">
							<label className="field-container_label" htmlFor="category">
								Category:
							</label>
							<input
								className="field-container_input"
								id="category"
								type="text"
								value={companyForm.category ?? ""}
								onChange={handleCompanyForm}
							/>
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
							<input
								className="field-container_input"
								id="description"
								type="text"
								value={companyForm.description ?? ""}
								onChange={handleCompanyForm}
							/>
						</div>
						<div>
							<button type="submit" onClick={submitUpdateCompanyForm}>
								Save
							</button>
							<button onClick={deleteCompany}>Delete company</button>
						</div>
					</form>
				</div>
			) : (
				<div className="company-container">
					<h3>add company</h3>

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
							<input
								className="field-container_input"
								id="city"
								type="text"
								value={companyForm.city ?? ""}
								onChange={handleCompanyForm}
							/>
						</div>
						<div className="field-container">
							<label className="field-container_label" htmlFor="category">
								Category:
							</label>
							<input
								className="field-container_input"
								id="category"
								type="text"
								value={companyForm.category ?? ""}
								onChange={handleCompanyForm}
							/>
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
							<input
								className="field-container_input"
								id="description"
								type="text"
								value={companyForm.description ?? ""}
								onChange={handleCompanyForm}
							/>
						</div>
						<div>
							<button type="submit" onClick={submitAddCompanyForm}>
								Add
							</button>
						</div>
					</form>
				</div>
			)}
		</div>
	);
};

export default Dashboard;
