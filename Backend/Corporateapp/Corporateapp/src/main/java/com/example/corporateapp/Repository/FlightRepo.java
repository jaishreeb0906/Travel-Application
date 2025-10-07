package com.example.corporateapp.Repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.corporateapp.Model.Flight;

public interface FlightRepo extends JpaRepository<Flight, Long> {
    List<Flight> findByOriginIgnoreCaseAndDestinationIgnoreCaseAndDate(String origin, String destination, LocalDate date);
}