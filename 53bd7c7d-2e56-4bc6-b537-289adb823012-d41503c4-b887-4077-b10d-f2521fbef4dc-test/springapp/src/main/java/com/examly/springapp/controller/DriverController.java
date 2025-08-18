package com.examly.springapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.examly.springapp.model.Driver;
import com.examly.springapp.service.DriverService;

import java.util.List;

@RestController
public class DriverController {

    @Autowired
    private DriverService driverService;

    @PostMapping("/addDriver")
    public ResponseEntity<Driver> addDriver(@RequestBody Driver driver) {
        Driver savedDriver = driverService.addDriver(driver);
        return ResponseEntity.ok(savedDriver);
    }

    @GetMapping("/getAllDrivers")
    public ResponseEntity<List<Driver>> getAllDrivers() {
        List<Driver> drivers = driverService.getAllDrivers();
        if (drivers.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(drivers);
    }
}
