// Function to fetch price list data from the server
function fetchPriceList() {
  fetch('/api/price_list')
    .then(response => response.json()) // Assuming the server returns JSON data
    .then(data => {
      // Process the fetched data (e.g., display it in the price list table)
      displayPriceList(data);
    })
    .catch(error => {
      console.error('Error fetching price list:', error);
    });
}

// Function to display the price list on the webpage
function displayPriceList(priceListData) {
  const tableBody = document.querySelector('#prices tbody');
  tableBody.innerHTML = ''; // Clear existing table body content

  // Iterate over each price list item and create table rows
  priceListData.forEach(item => {
      const row = document.createElement('tr');
      row.innerHTML = `
          <th>${item.location}</th>
          <td><input type="text" value="${item.economy}" class="price-input" data-location="${item.location}" data-type="economy"></td>
          <td><input type="text" value="${item.business}" class="price-input" data-location="${item.location}" data-type="business"></td>
          <td><input type="text" value="${item.economyVan}" class="price-input" data-location="${item.location}" data-type="economyVan"></td>
          <td><input type="text" value="${item.businessVan}" class="price-input" data-location="${item.location}" data-type="businessVan"></td>
          <td><input type="text" value="${item.executive}" class="price-input" data-location="${item.location}" data-type="executive"></td>
      `;
      tableBody.appendChild(row);
  });

  // Add event listener to handle input changes
  document.querySelectorAll('.price-input').forEach(input => {
      input.addEventListener('change', updatePrice);
  });
}

// Function to update price on input change
function updatePrice(event) {
  const location = event.target.getAttribute('data-location');
  const type = event.target.getAttribute('data-type');
  const value = event.target.value;

  // Send updated price to the server
  fetch('/api/update_price', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ location, type, value }),
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Failed to update price');
      }
      return response.json();
  })
  .then(data => {
      // Handle success
      console.log('Price updated successfully:', data);
  })
  .catch(error => {
      console.error('Error updating price:', error);
  });
}

// Fetch price list when the page loads
window.addEventListener('load', fetchPriceList);
