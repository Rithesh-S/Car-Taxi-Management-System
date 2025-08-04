package com.examly.springapp.service;

import org.springframework.stereotype.Service;

import com.examly.springapp.exception.InvalidLicenseException;
import com.examly.springapp.exception.InvalidPhoneException;
import com.examly.springapp.model.Driver;
import com.examly.springapp.repository.DriverRepo;

import java.util.List;

@Service
public class DriverService {

    private DriverRepo driverRepo;

    DriverService(DriverRepo driverRepo) {
        this.driverRepo = driverRepo;
    }

    public Driver addDriver(Driver driver) {
        if (!driver.getPhone().matches("\\d{10}")) {
            throw new InvalidPhoneException("Invalid phone number");
        }
        if (!driver.getLicenseNumber().matches("[A-Z]{2}\\d{8}")) {
            throw new InvalidLicenseException("Invalid license number");
        }
        return driverRepo.save(driver);
    }

    public List<Driver> getAllDrivers() {
        return driverRepo.findAll();
    }
}
