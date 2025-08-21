import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import api from '../api/axiosInstance';
import { MagnifyingGlassIcon, PencilIcon, TrashIcon, PlusIcon, EyeIcon } from '@heroicons/react/24/outline';
import Pagination from '../components/ui/Pagination'; 
import ConfirmationModal from '../components/ui/ConfirmationModal';

// Enhanced Skeleton Loader Component
const DriverTableSkeleton = () => (
  <div className="animate-pulse">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div key={item} className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="h-6 bg-gray-200 rounded-full w-32"></div>
            <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
          </div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-4/5"></div>
            <div className="h-4 bg-gray-200 rounded w-3/5"></div>
            <div className="h-4 bg-gray-200 rounded w-2/5"></div>
          </div>
          <div className="flex justify-between mt-6 pt-4 border-t border-gray-100">
            <div className="h-8 bg-gray-200 rounded w-20"></div>
            <div className="h-8 bg-gray-200 rounded w-20"></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

function ViewDrivers() {
    const [drivers, setDrivers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [driversPerPage] = useState(6); // Changed to 6 for better grid layout

    // State for the delete confirmation modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [driverToDelete, setDriverToDelete] = useState(null);

    useEffect(() => {
        const fetchDrivers = async () => {
            setLoading(true);
            try {
                const response = await api.get("/admin/drivers");
                setDrivers(response.data);
            } catch (error) {
                console.error("Error fetching drivers:", error);
            } finally {
                setTimeout(() => setLoading(false), 500);
            }
        };
        fetchDrivers();
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    const openDeleteModal = (driver) => {
      setDriverToDelete(driver);
      setIsModalOpen(true);
    };

    const closeDeleteModal = () => {
      setDriverToDelete(null);
      setIsModalOpen(false);
    };

    const handleDelete = async () => {
      if (!driverToDelete) return;
      try {
        await api.delete(`/admin/drivers/${driverToDelete.driverId}`);
        setDrivers(drivers.filter(d => d.driverId !== driverToDelete.driverId));
      } catch (error) {
        console.error(`Error deleting driver with ID: ${driverToDelete.driverId}`, error);
      } finally {
        closeDeleteModal();
      }
    };

    const filteredDrivers = drivers.filter(driver =>
        Object.values(driver).some(
            value => value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        ));

    const indexOfLastDriver = currentPage * driversPerPage;
    const indexOfFirstDriver = indexOfLastDriver - driversPerPage;
    const currentDrivers = filteredDrivers.slice(indexOfFirstDriver, indexOfLastDriver);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Get status badge color
    const getStatusColor = (status) => {
      switch (status?.toLowerCase()) {
        case 'active': return 'bg-green-100 text-green-800';
        case 'inactive': return 'bg-red-100 text-red-800';
        case 'on-leave': return 'bg-yellow-100 text-yellow-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                        Driver Fleet Management
                    </h1>
                    <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
                        Manage your entire driver fleet with comprehensive tools and real-time insights
                    </p>
                </div>

                {/* Stats and Actions Section */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 mb-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-4">
                            <div className="bg-blue-100 p-3 rounded-xl">
                                <UserGroupIcon className="h-8 w-8 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-800">{drivers.length}</h3>
                                <p className="text-sm text-gray-600">Total Drivers</p>
                            </div>
                        </div>

                        <div className="flex-1 max-w-md">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search drivers by name, city, license..."
                                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>

                        <Link to="/admin/add-driver" className="w-full md:w-auto">
                            <button className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-md hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:-translate-y-0.5">
                                <PlusIcon className="h-5 w-5"/>
                                Add New Driver
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Drivers Grid */}
                <div className="mb-8">
                    {loading ? (
                        <DriverTableSkeleton />
                    ) : (
                        <>
                            {currentDrivers.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {currentDrivers.map((driver) => (
                                        <div key={driver.driverId} className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                                            <div className="p-6">
                                                {/* Driver Header */}
                                                <div className="flex items-center justify-between mb-4">
                                                    <h3 className="text-xl font-semibold text-gray-800 truncate">
                                                        {driver.driverName}
                                                    </h3>
                                                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(driver.status)}`}>
                                                        {driver.status || 'Active'}
                                                    </span>
                                                </div>

                                                {/* Driver Details */}
                                                <div className="space-y-3">
                                                    <div className="flex items-center text-gray-600">
                                                        <MapPinIcon className="h-4 w-4 mr-2 text-blue-500" />
                                                        <span className="text-sm">{driver.city}, {driver.assignedArea}</span>
                                                    </div>
                                                    <div className="flex items-center text-gray-600">
                                                        <PhoneIcon className="h-4 w-4 mr-2 text-green-500" />
                                                        <span className="text-sm">{driver.phone}</span>
                                                    </div>
                                                    <div className="flex items-center text-gray-600">
                                                        <TruckIcon className="h-4 w-4 mr-2 text-purple-500" />
                                                        <span className="text-sm">{driver.vehicleType}</span>
                                                    </div>
                                                    <div className="flex items-center text-gray-600">
                                                        <IdentificationIcon className="h-4 w-4 mr-2 text-orange-500" />
                                                        <span className="text-sm font-mono">{driver.licenseNumber}</span>
                                                    </div>
                                                </div>

                                                {/* Action Buttons */}
                                                <div className="flex justify-between mt-6 pt-4 border-t border-gray-100">
                                                    <Link 
                                                        to={`/admin/edit-driver/${driver.driverId}`}
                                                        className="inline-flex items-center gap-1 px-4 py-2 text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
                                                    >
                                                        <PencilIcon className="h-4 w-4" />
                                                        Edit
                                                    </Link>
                                                    <button 
                                                        onClick={() => openDeleteModal(driver)}
                                                        className="inline-flex items-center gap-1 px-4 py-2 text-red-600 hover:text-red-800 font-medium transition-colors duration-200"
                                                    >
                                                        <TrashIcon className="h-4 w-4" />
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-12 text-center">
                                    <div className="text-gray-400 mb-4">
                                        <UserGroupIcon className="h-16 w-16 mx-auto" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-700 mb-2">No drivers found</h3>
                                    <p className="text-gray-500 mb-6">Try adjusting your search criteria or add a new driver.</p>
                                    <Link to="/admin/add-driver">
                                        <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-md hover:from-blue-700 hover:to-indigo-700 transition-all duration-200">
                                            <PlusIcon className="h-5 w-5"/>
                                            Add Your First Driver
                                        </button>
                                    </Link>
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* Pagination */}
                {/* {!loading && filteredDrivers.length > 0 && (
                    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
                        <Pagination
                            driversPerPage={driversPerPage}
                            totalDrivers={filteredDrivers.length}
                            paginate={paginate}
                            currentPage={currentPage}
                        />
                    </div>
                )} */}
            </div>

            {/* Confirmation Modal */}
            <ConfirmationModal 
                isOpen={isModalOpen}
                onClose={closeDeleteModal}
                onConfirm={handleDelete}
                title="Delete Driver"
                message={`Are you sure you want to delete ${driverToDelete?.driverName}? This action cannot be undone.`}
            />
        </div>
    );
}

// Additional icons needed for the component
const UserGroupIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
);

const TruckIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
);

const IdentificationIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
    </svg>
);

const MapPinIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const PhoneIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
);

export default ViewDrivers;