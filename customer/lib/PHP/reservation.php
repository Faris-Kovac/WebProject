<?php
// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $fullName = $_POST["full-name"];
    $email = $_POST["email"];
    $pickupLocation = $_POST["pickup-location"];
    $dropoffLocation = $_POST["dropoff-location"];
    $passengerCount = $_POST["passenger-count"];
    $luggageCount = $_POST["luggage-count"];
    $carSelection = $_POST["car-selection"];
    $transferType = $_POST["transfer-type"];

    // Insert data into MySQL database (replace with your database credentials)
    $servername = "localhost";
    $username = "username";
    $password = "password";
    $dbname = "your_database";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Prepare SQL statement
    $sql = "INSERT INTO reservations (full_name, email, pickup_location, dropoff_location, passenger_count, luggage_count, car_selection, transfer_type)
            VALUES ('$fullName', '$email', '$pickupLocation', '$dropoffLocation', '$passengerCount', '$luggageCount', '$carSelection', '$transferType')";

    // Execute SQL statement
    if ($conn->query($sql) === TRUE) {
        echo "Reservation submitted successfully!";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    // Close connection
    $conn->close();
}
?>
