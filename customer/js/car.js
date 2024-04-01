// car.js

$(document).ready(function() {
    // Function to fetch car listings via AJAX
    function fetchCarListings() {
        $.ajax({
            type: 'GET',
            url: '/car_listings.json', // Specify the URL for fetching car listings
            success: function(response) {
                // Update the portfolio container with the fetched car listings
                $('.portfolio-container').html(response);
            },
            error: function(xhr, status, error) {
                // Handle errors
                console.error('Failed to fetch car listings. Error: ' + error);
            }
        });
    }

    // Fetch car listings when the page loads
    fetchCarListings();
});