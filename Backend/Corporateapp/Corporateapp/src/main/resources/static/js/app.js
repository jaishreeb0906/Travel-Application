document.getElementById("searchForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const from = document.getElementById("from").value.trim();
  const to = document.getElementById("to").value.trim();
  const rawDate = document.getElementById("date").value;
  const formattedDate = rawDate;

  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "<p>Loading flights...</p>";

  const url = `/api/search/flights?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&date=${encodeURIComponent(formattedDate)}`;

  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error("Network response was not ok: " + response.status);
      return response.json();
    })
    .then(data => {
      resultsDiv.innerHTML = "";

      if (!data || data.length === 0) {
        resultsDiv.innerHTML = "<p>No flights found.</p>";
        return;
      }

      resultsDiv.innerHTML = data.map(flight => `
        <div class="flight-card" data-flight-id="${flight.flight_id || flight.id || ''}">
          <div class="left">
            <div class="logo">${(flight.airline || 'XX').slice(0, 2).toUpperCase()}</div>
            <div class="meta">
              <div class="route">${flight.origin || ''} → ${flight.destination || ''}</div>
              <div class="time">${flight.departure_time || ''} — ${flight.arrival_time || ''} • ${flight.duration || '1h 19m'}</div>
              <div class="details">
                <span class="badge">${flight.stops === 0 ? 'Non-stop' : `${flight.stops}+ Stops`}</span>
                <span class="miles">${flight.distance || '—'} mi</span>
                <span class="date">${flight.date || ''}</span>
                <span class="seats">${flight.seats_available || flight.seats || ''} seats</span>
              </div>
            </div>
          </div>
          <div class="price">
            <div class="amt">₹${flight.price || ''}</div>
            <button class="btn-select-flight">Continue</button>
          </div>
        </div>
      `).join("");

      document.querySelectorAll('.btn-select-flight').forEach(btn => {
        btn.addEventListener('click', function () {
          const card = this.closest('.flight-card');
          const fid = card && card.getAttribute('data-flight-id');

          const flightData = {
            flight_id: fid,
            airline: card.querySelector('.logo')?.textContent || '',
            origin: card.querySelector('.route')?.textContent.split('→')[0].trim() || '',
            destination: card.querySelector('.route')?.textContent.split('→')[1].trim() || '',
            departure_time: card.querySelector('.time')?.textContent.split('—')[0].trim() || '',
            arrival_time: card.querySelector('.time')?.textContent.split('—')[1]?.split('•')[0].trim() || '',
            duration: card.querySelector('.time')?.textContent.split('•')[1]?.trim() || '',
            price: card.querySelector('.amt')?.textContent.replace(/[₹,]/g, '').trim() || ''
          };

          localStorage.setItem('selectedFlight', JSON.stringify(flightData));
          redirectToBooking(fid);
        });
      });
    })
    .catch(error => {
      console.error("Error fetching flights:", error);
      resultsDiv.innerHTML = "<p>Error loading flights.</p>";
    });
});

function redirectToBooking(flightId) {
  const url = `/booking-form.html?flightId=${encodeURIComponent(flightId)}`;
  window.location.href = url;
}




















/*document.getElementById("searchForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const from = document.getElementById("from").value.trim();
  const to = document.getElementById("to").value.trim();
  const rawDate = document.getElementById("date").value;
  const formattedDate = rawDate;

  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "<p>Loading flights...</p>";

  const url = `/api/search/flights?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&date=${encodeURIComponent(formattedDate)}`;

  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error("Network response was not ok: " + response.status);
      return response.json();
    })
    .then(data => {
      resultsDiv.innerHTML = "";

      if (!data || data.length === 0) {
        resultsDiv.innerHTML = "<p>No flights found.</p>";
        return;
      }

resultsDiv.innerHTML = data.map(flight => `
  <div class="flight-card" data-flight-id="${flight.flight_id || flight.id || ''}">
    <div class="left">
      <div class="logo">${(flight.airline || 'XX').slice(0, 2).toUpperCase()}</div>
      <div class="meta">
        <div class="route">${flight.origin || ''} → ${flight.destination || ''}</div>
        <div class="time">${flight.departure_time || ''} — ${flight.arrival_time || ''} • ${flight.duration || '1h 19m'}</div>
        <div class="details">
          <span class="badge">${flight.stops === 0 ? 'Non-stop' : `${flight.stops}+ Stops`}</span>
          <span class="miles">${flight.distance || '—'} mi</span>
          <span class="date">${flight.date || ''}</span>
          <span class="seats">${flight.seats_available || flight.seats || ''} seats</span>
        </div>
      </div>
    </div>
    <div class="price">
      <div class="amt">₹${flight.price || ''}</div>
      <button class="btn-select-flight">Continue</button>
    </div>
  </div>
`).join("");

      document.querySelectorAll('.btn-select-flight').forEach(btn => {
  btn.addEventListener('click', function () {
    const card = this.closest('.flight-card');
    const fid = card && card.getAttribute('data-flight-id');
    if (fid) redirectToBooking(fid);
  });
});

    })
    .catch(error => {
      console.error("Error fetching flights:", error);
      resultsDiv.innerHTML = "<p>Error loading flights.</p>";
    });
});

function redirectToBooking(flightId) {
  const url = `/booking-form.html?flightId=${encodeURIComponent(flightId)}`;
  window.location.href = url;
}*/



