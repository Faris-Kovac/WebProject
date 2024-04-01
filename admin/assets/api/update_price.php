<?php
// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the JSON data sent with the request
    $data = json_decode(file_get_contents('php://input'), true);

    // Validate the JSON data
    if (isset($data['location'], $data['type'], $data['value'])) {
        // Sanitize and validate the input data
        $location = filter_var($data['location'], FILTER_SANITIZE_STRING);
        $type = filter_var($data['type'], FILTER_SANITIZE_STRING);
        $value = filter_var($data['value'], FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);

        // Perform any additional validation if needed

        // Update the price in the database (replace this with your database update logic)
        $success = updatePriceInDatabase($location, $type, $value);

        // Respond with success or error message
        if ($success) {
            http_response_code(200);
            echo json_encode(array('message' => 'Price updated successfully'));
        } else {
            http_response_code(500);
            echo json_encode(array('error' => 'Failed to update price'));
        }
    } else {
        // Invalid JSON data
        http_response_code(400);
        echo json_encode(array('error' => 'Invalid JSON data'));
    }
} else {
    // Invalid request method
    http_response_code(405);
    echo json_encode(array('error' => 'Method Not Allowed'));
}

// Function to update price in the database (replace this with your database update logic)
function updatePriceInDatabase($location, $type, $value)
{
    // Implement your database update logic here
    // Example:
    // $db = new PDO('mysql:host=localhost;dbname=your_database', 'username', 'password');
    // $query = "UPDATE prices SET value = :value WHERE location = :location AND type = :type";
    // $statement = $db->prepare($query);
    // $success = $statement->execute(array(':value' => $value, ':location' => $location, ':type' => $type));
    // return $success;

    // For demonstration purposes, this function always returns true
    return true;
}

