// URL of the API endpoint for fetching products
const productsURL = "https://fakestoreapi.com/products";


// DOM element for displaying products
const sectionElement = document.querySelector(".products");

/**
 * Function to fetch API data.
 * @returns {Promise} Promise object representing the fetched data.
 */
async function fetchAPIData() {
  // Check if the browser is online
  if (navigator.onLine) {
    try {
      // Fetch data from the API endpoint
      const response = await fetch(productsURL);
      // Check if the response is successful
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      // Parse the JSON response
      const data = response.json();
     
      return data;
    } catch (error) {
      // Handle errors when fetching data
      sectionElement.innerHTML = "<h2>Oops! Something went wrong</h2>";
      console.error("Error fetching data:", error);
      throw error;
    }
  } else {
    // Handle case when the browser is offline
    sectionElement.innerHTML =
      "<h2>No Internet, Please check the internet and try again</h2>";
  }
}



// Export the fetchAPIData function
export { fetchAPIData };
