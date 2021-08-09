import UserProfile from "./UserProfile";
import CompanyProfile from "./CompanyProfile";
import "./Dashboard.css";
// return commit 164f476

const Dashboard = () => {
	return (
		<div className="dashboard-container">
			<UserProfile />
			<CompanyProfile />
		</div>
	);
};

export default Dashboard;
