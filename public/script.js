// Path to the PDF file
const pdfUrl = '/pdfs/5.pdf';

// Function to fetch and display the offer message or PDF
async function fetchOffer() {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token'); // Retrieve token from query parameters

  try {
    const response = await axios.get(`/offer/${token}`);

    // Check if the offer has already been accessed or is expired
    if (response.data.expired) {
      document.getElementById('offer-content').innerText = 'This offer has expired.';
      document.getElementById('response-buttons').style.display = 'none'; // Hide buttons
    } else {
      // Render PDF if the offer is valid
      renderPDF();
    }
  } catch (error) {
    console.error('Error fetching offer:', error);
    document.getElementById('offer-content').innerText = 'Access denied or offer has expired.';
    document.getElementById('response-buttons').style.display = 'none';
  }
}

// Function to render the PDF in the offer-content area
async function renderPDF() {
  try {
    const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
    const page = await pdf.getPage(1);
    const scale = 1.5;
    const viewport = page.getViewport({ scale: scale });

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    document.getElementById('offer-content').appendChild(canvas);

    const renderContext = {
      canvasContext: context,
      viewport: viewport
    };

    await page.render(renderContext).promise;
  } catch (error) {
    console.error('Error loading PDF:', error);
    document.getElementById('offer-content').innerText = 'Failed to load the offer document.';
  }
}

// Function to respond to the offer
async function respondToOffer(responseType) {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');

  try {
    // Sending the accept or reject response
    await axios.post(`/offer/${token}/respond`, { response: responseType });

    // Show an expired message and hide buttons after accepting
    document.getElementById('offer-content').innerText = 'This offer has expired.';
    document.getElementById('response-buttons').style.display = 'none'; // Hide buttons
  } catch (error) {
    console.error('Error submitting response:', error);
    document.getElementById('response-message').innerText = 'Failed to record response. Please try again.';
  }
}

// Fetch the offer message when the page loads
window.onload = fetchOffer;
