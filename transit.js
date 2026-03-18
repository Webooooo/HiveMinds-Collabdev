function getTransport(event) {
  event.preventDefault();

  const from = document.getElementById("from").value;
  const to = document.getElementById("to").value;

  const service = new google.maps.DirectionsService();

  const request = {
    origin: from,
    destination: to,
    travelMode: google.maps.TravelMode.TRANSIT,
    transitOptions: {
      departureTime: new Date(),
      modes: ['BUS'],           // Prefer buses only
      routingPreference: "FEWER_TRANSFERS"
    }
  };

  service.route(request, function(result, status) {
    const resultBox = document.querySelector(".transit-result");

    if (status === "OK") {
      const leg = result.routes[0].legs[0];
      const steps = leg.steps;

      let transportType = "Bus"; // For your campus project, we prefer buses only

      // Build Google Maps live link
      const mapsLink = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(from)}&destination=${encodeURIComponent(to)}&travelmode=transit`;

      resultBox.innerHTML = `
        <p><strong>Status:</strong> Route Found</p>
        <p><strong>Distance:</strong> ${leg.distance.text}</p>
        <p><strong>Estimated Time:</strong> ${leg.duration.text}</p>
        <p><strong>Transport:</strong> ${transportType}</p>
        <p><a href="${mapsLink}" target="_blank" class="facility-btn">View Live Route in Google Maps</a></p>
      `;

    } else {
      resultBox.innerHTML = `
        <p><strong>Status:</strong> No bus route found.</p>
        <p><strong>Distance:</strong> —</p>
        <p><strong>Estimated Time:</strong> —</p>
        <p><strong>Transport:</strong> —</p>
      `;
    }
  });
}