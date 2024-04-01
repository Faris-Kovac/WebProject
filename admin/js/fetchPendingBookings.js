// JavaScript code for populating and managing pending bookings in the admin dashboard

// Function to fetch and populate pending bookings
function fetchPendingBookings() {
    // Make an API call to retrieve pending bookings from the server
    fetch('/api/pending-bookings')
        .then(response => response.json())
        .then(data => {
            // Once data is received, populate the pending bookings list
            populatePendingBookings(data);
        })
        .catch(error => {
            console.error('Error fetching pending bookings:', error);
        });
}

// Function to populate the pending bookings list
function populatePendingBookings(bookings) {
    const pendingBookingsList = document.getElementById('pending-bookings-list');
    // Clear existing list items
    pendingBookingsList.innerHTML = '';
    // Loop through the bookings and create list items
    bookings.forEach(booking => {
        const listItem = document.createElement('div');
        listItem.classList.add('list-group-item');
        listItem.innerHTML = `
            <h5 class="mb-1">${booking.user}</h5>
            <p class="mb-1">${booking.car} - ${booking.pickupLocation}</p>
            <button class="btn btn-primary btn-sm" onclick="confirmBooking(${booking.id})">Confirm</button>
        `;
        pendingBookingsList.appendChild(listItem);
    });
}

// Function to confirm a booking
function confirmBooking(bookingId) {
    // Make an API call to update the booking status to confirmed
    fetch(`/api/confirm-booking/${bookingId}`, { method: 'PUT' })
        .then(response => {
            if (response.ok) {
                // If the update is successful, fetch pending bookings again to refresh the list
                fetchPendingBookings();
            } else {
                console.error('Failed to confirm booking');
            }
        })
        .catch(error => {
            console.error('Error confirming booking:', error);
        });
}

// Fetch pending bookings when the admin dashboard loads
fetchPendingBookings();
