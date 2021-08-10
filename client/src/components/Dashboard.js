import UserProfile from "./UserProfile";
import CompanyProfile from "./CompanyProfile";
import "./Dashboard.css";

const Dashboard = () => {
	return (
		<div className="dashboard-container">
			<UserProfile />
			<CompanyProfile />
		</div>
	);
};

export default Dashboard;
