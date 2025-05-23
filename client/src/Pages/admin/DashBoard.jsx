import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { FaUsers, FaCity, FaBoxOpen, FaTags, FaClipboardList } from 'react-icons/fa';
import UserList from './UserList';
import useOverflow from '../../utils/useOverflow';
import CityList from './CityList';
import PackegesList from './PackegesList';
import BookingList from './BookingList';
import OfferList from './OfferList';

export default function DashBoard() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    useOverflow(sidebarOpen);

    const [activeTab, setActiveTab] = useState("users");

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        setSidebarOpen(false);
    };

    return (
        <Layout>
            <div className={`admin-sidebar glass-card py-2 px-2 ${sidebarOpen ? "show" : ""}`}>
                <ul className="nav flex-column gap-2">
                    <li className="nav-item">
                        <button className={`nav-link btn btn-link text-start w-100 ${activeTab === "users" ? "active" : ""}`} onClick={() => handleTabClick("users")}>
                            <FaUsers className="me-2" /> Users
                        </button>
                    </li>
                    <li className="nav-item">
                        <button className={`nav-link btn btn-link text-start w-100 ${activeTab === "cities" ? "active" : ""}`} onClick={() => handleTabClick("cities")}>
                            <FaCity className="me-2" /> Cities
                        </button>
                    </li>
                    <li className="nav-item">
                        <button className={`nav-link btn btn-link text-start w-100 ${activeTab === "packages" ? "active" : ""}`} onClick={() => handleTabClick("packages")}>
                            <FaBoxOpen className="me-2" /> Packages
                        </button>
                    </li>
                    <li className="nav-item">
                        <button className={`nav-link btn btn-link text-start w-100 ${activeTab === "offers" ? "active" : ""}`} onClick={() => handleTabClick("offers")}>
                            <FaTags className="me-2" /> Offers
                        </button>
                    </li>
                    <li className="nav-item">
                        <button className={`nav-link btn btn-link text-start w-100 ${activeTab === "bookings" ? "active" : ""}`} onClick={() => handleTabClick("bookings")}>
                            <FaClipboardList className="me-2" /> Bookings
                        </button>
                    </li>
                </ul>
                <button className='admin-toggle btn btn-outline-secondary' onClick={() => setSidebarOpen(!sidebarOpen)}></button>
            </div>

            {activeTab === "users" && <UserList />}
            {activeTab === "cities" && <CityList />}
            {activeTab === "packages" && <PackegesList />}
            {activeTab === "bookings" && <BookingList />}
            {activeTab === "offers" && <OfferList />}

        </Layout>
    );
}
