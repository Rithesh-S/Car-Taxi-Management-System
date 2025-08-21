import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import api from '../api/axiosInstance';
import { MagnifyingGlassIcon, PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline';
import Pagination from '../components/ui/Pagination'; 
import ConfirmationModal from '../components/ui/ConfirmationModal';

// Skeleton Loader Component (can be kept as is)
const DriverTableSkeleton = () => (
  <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 animate-pulse">
        {/* ... skeleton content ... */}
      </table>
  </div>
);

function ViewDrivers() {
    const [drivers, setDrivers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [driversPerPage] = useState(2); // You can adjust this value

    // State for the delete confirmation modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [driverToDelete, setDriverToDelete] = useState(null);

    useEffect(() => {
        const fetchDrivers = async () => {
            setLoading(true);
            try {
                // Use the new protected endpoint
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
        // Update UI instantly by filtering out the deleted driver
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

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
            <div className="w-full max-w-7xl mx-auto">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800">Driver Fleet</h2>
                    <p className="mt-2 text-md text-gray-500">View, search, and manage all registered drivers.</p>
                </div>

                <div className="mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="relative w-full md:w-80">
                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search by name, city, license..."
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Link to="/admin/add-driver">
                      <button className="w-full md:w-auto inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-sm hover:bg-blue-700">
                        <PlusIcon className="h-5 w-5"/>
                        Add Driver
                      </button>
                    </Link>
                </div>

                <div className="bg-white shadow-md rounded-xl overflow-hidden">
                    {loading ? (
                        <DriverTableSkeleton />
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                       {["Driver Name", "City", "Phone", "Vehicle", "License", "Area", "Actions"].map((header) => (
                                          <th key={header} scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{header}</th>
                                       ))}
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {currentDrivers.length > 0 ? (
                                        currentDrivers.map((driver) => (
                                            <tr key={driver.driverId} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 text-sm font-medium text-gray-900">{driver.driverName}</td>
                                                <td className="px-6 py-4 text-sm text-gray-600">{driver.city}</td>
                                                <td className="px-6 py-4 text-sm text-gray-600">{driver.phone}</td>
                                                <td className="px-6 py-4 text-sm text-gray-600">{driver.vehicleType}</td>
                                                <td className="px-6 py-4">
                                                    <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">{driver.licenseNumber}</span>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-600">{driver.assignedArea}</td>
                                                <td className="px-6 py-4 text-sm font-medium">
                                                    <div className="flex items-center gap-4">
                                                        <Link to={`/admin/edit-driver/${driver.driverId}`} className="text-blue-600 hover:text-blue-900" title="Edit">
                                                            <PencilIcon className="h-5 w-5" />
                                                        </Link>
                                                        <button onClick={() => openDeleteModal(driver)} className="text-red-600 hover:text-red-900" title="Delete">
                                                            <TrashIcon className="h-5 w-5" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="7" className="px-6 py-12 text-center text-sm text-gray-500">No drivers found.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
                {!loading && (
                    <Pagination
                        driversPerPage={driversPerPage}
                        totalDrivers={filteredDrivers.length}
                        paginate={paginate}
                        currentPage={currentPage}
                    />
                )}
            </div>
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

export default ViewDrivers;