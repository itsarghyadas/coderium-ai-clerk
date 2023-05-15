import React from "react";
import dashboardData from "../data/dashboard.data";
import DashboardItem from "../components/DashboardItem";
import Navbar from "../components/Navbar";

function Dashboard() {
  return (
    <div>
      <div className="nav-component">
        <Navbar />
      </div>
      <div className=" m-auto h-screen max-w-screen-lg px-4 py-10">
        <div className="dashboard-body m-auto px-2 py-20">
          <div className="dashboard-body-content">
            <div className="option relative m-auto flex flex-col justify-center gap-8 lg:flex-row">
              {dashboardData.map((item) => (
                <DashboardItem
                  key={item.title}
                  title={item.title}
                  details={item.details}
                  link={item.link}
                  linkName={item.linkName}
                  id={item.id}
                  version={item.version}
                  steps={item.test}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
