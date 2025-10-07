package com.example.corporateapp.Controller;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.corporateapp.Model.Booking;
import com.example.corporateapp.Model.Flight;
import com.example.corporateapp.Repository.BookingRepo;
import com.example.corporateapp.Repository.FlightRepo;
import com.example.corporateapp.Service.TravelService;




@RestController
@RequestMapping("/api")
public class ApiController {
@Autowired
private FlightRepo flightRepo;

@Autowired
private BookingRepo bookingRepo;

    private final TravelService travelService;
    public ApiController(TravelService travelService) { this.travelService = travelService; }

  
@GetMapping("/search/flights")
public List<Flight> searchFlights(
    @RequestParam String from,
    @RequestParam String to,
    @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
    return travelService.searchFlights(from, to, date);
}
@PostMapping("/book")
@ResponseBody
public Booking book(@RequestBody Booking booking) {
    booking.setCreatedAt(LocalDateTime.now());

    // Fetch flight by ID
    Flight flight = flightRepo.findById(booking.getFlightId()).orElse(null);

    if (flight != null) {
        booking.setAmount(flight.getPrice());
    } else {
        booking.setAmount(0.0); // fallback if flight not found
    }

    return bookingRepo.save(booking);
}

    /*@GetMapping("/search/flights")
public List<Flight> searchFlights(@RequestParam String from,
                                  @RequestParam String to,
                                  @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
    return travelService.searchFlights(from, to, date);
}*/


   /*  @PostMapping("/book")
    public Booking book(@RequestBody Booking booking) {
        return travelService.createBooking(booking);
    }*/

    /*@GetMapping("/bookings")
    public List<Booking> getBookings() {
        return travelService.getAllBookings();
    }*/

    @GetMapping("/bookings")
public String showBookings(Model model) {
    List<Booking> bookings = travelService.getAllBookings();
    model.addAttribute("bookings", bookings);
    return "bookings"; // matches bookings.html in templates folder
}

    @GetMapping("/all")
public List<Flight> allFlights() {
    return travelService.getAllFlights();
}


}