package com.examly.springapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.model.Driver;
import com.examly.springapp.repository.DriverRepo;

import java.util.List;
import java.util.Optional;

@Service
public class DriverService {

    @Autowired
    private DriverRepo driverRepo;

    // CREATE a new driver
    public Driver addDriver(Driver driver) {
        // You can add validation logic here if needed
        return driverRepo.save(driver);
    }

    // READ all drivers
    public List<Driver> getAllDrivers() {
        return driverRepo.findAll();
    }

    // READ a single driver by ID
    public Optional<Driver> getDriverById(Integer id) {
        return driverRepo.findById(id);
    }

    // UPDATE a driver
    public Driver updateDriver(Integer id, Driver driverDetails) {
        Driver driver = driverRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Driver not found with id: " + id));

        driver.setDriverName(driverDetails.getDriverName());
        driver.setCity(driverDetails.getCity());
        driver.setPhone(driverDetails.getPhone());
        driver.setVehicleType(driverDetails.getVehicleType());
        driver.setLicenseNumber(driverDetails.getLicenseNumber());
        driver.setAssignedArea(driverDetails.getAssignedArea());
        
        return driverRepo.save(driver);
    }

    // DELETE a driver
    public void deleteDriver(Integer id) {
        if (!driverRepo.existsById(id)) {
            throw new RuntimeException("Driver not found with id: " + id);
        }
        driverRepo.deleteById(id);
    }
}