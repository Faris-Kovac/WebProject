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
        <td><i class="">${item.economy}</i></td>
        <td><i class="">${item.business}</i></td>
        <td><i class="">${item.economyVan}</i></td>
        <td><i class="">${item.businessVan}</i></td>
        <td><i class="">${item.executive}</i></td>
      `;
      tableBody.appendChild(row);
    });
  }
  
  // Fetch price list when the page loads
  window.addEventListener('load', fetchPriceList);
  