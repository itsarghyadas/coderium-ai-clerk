import React from "react";
import dashboardData from "../data/dashboard.data";
import DashboardItem from "../components/DashboardItem";
import Navbar from "../components/Navbar";
import { UserProfile } from "@clerk/clerk-react";

function Dashboard() {
  return (
    <div>
      <div className="nav-component">
        <Navbar />
      </div>
      <div className=" m-auto max-w-screen-lg px-4 py-10 lg:py-6">
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
                  image={item.image}
                />
              ))}
            </div>
          </div>
          <div className="my-10">
            <UserProfile
              appearance={{
                elements: {
                  card: {
                    width: "48.5%",
                    maxWidth: "100%",
                    margin: "0",
                    boxShadow: "0px 0px 25px -12px rgb(31 38 135 / 30%);",
                    border: "1px solid #dfdfdf6e",
                    borderRadius: "7px",
                  },
                  pageScrollBox: {
                    padding: "10px 20px 15px 20px",
                    backgroundColor: "white",
                    overflow: "hidden",
                  },
                  scrollBox: {
                    borderRadius: "7px",
                  },
                  rootBox: {
                    width: "100%",
                  },
                  profilePage: {
                    gap: "1rem",
                  },
                  profileSectionTitle: {
                    fontFamily: "Melodrama-Variable, sans-serif",
                    borderBottom: "1px dashed #dfdfdf5e",
                  },
                  profileSectionTitleText: {
                    fontWeight: "bold",
                    fontSize: "1rem",
                  },
                  headerTitle: {
                    fontWeight: "700",
                    color: "red",
                    fontSize: "1.5rem",
                  },
                  headerSubtitle: {
                    fontWeight: "600",
                    color: "gray",
                    fontSize: "0.95rem",
                  },
                  page: {
                    minHeight: "0",
                  },
                  navbar: {
                    display: "none",
                  },
                  navbarMobileMenuRow: {
                    display: "none",
                  },
                  navbarMobileMenuButton: {
                    display: "none !important",
                  },
                  profileSection__username: {
                    display: "none",
                  },
                  profileSection__emailAddresses: {
                    display: "none",
                  },
                  profileSection__connectedAccounts: {
                    display: "none",
                  },
                  profilePage__security: {
                    display: "none",
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
