// assets/js/newsletters.js

async function fetchNewsletters() {
  // Read API key and file ID from config.js
  const apiKey = CONFIG.API_KEY;
  const folderId = CONFIG.FOLDER_IDS.newsletters;

  try {
    console.log('Fetching newsletters...');
    const response = await fetch(`https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&fields=files(id,name,webViewLink)`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('API response received:', response);
    console.log('Data fetched:', data);
    displayNewsletters(data.files);
    console.log('Displaying newsletters:', data.files);

  } catch (error) {
    console.error('Error fetching newsletters:', error);
    // Handle the error appropriately (e.g., display an error message to the user)
    const newsletterContainer = document.getElementById('newsletter-container');
    if (newsletterContainer) {
      newsletterContainer.innerHTML = '<p class="text-danger">Failed to load newsletters. Please try again later.</p>';
    }
  }
}

function displayNewsletters(newsletters) {
  const newsletterContainer = document.getElementById('newsletter-container');

  if (!newsletterContainer) {
    console.error('Newsletter container not found!');
    return;
  }

  newsletterContainer.innerHTML = '';

  newsletters.forEach(newsletter => {
    const newsletterItem = document.createElement('div');
    newsletterItem.classList.add('newsletter-item');

    const titleElement = document.createElement('h2');
    titleElement.textContent = newsletter.name;

    const linkElement = document.createElement('a');
    linkElement.href = `https://drive.google.com/uc?export=download&id=${newsletter.id}`;
    linkElement.textContent = 'Download Newsletter';
    linkElement.target = '_blank';

    newsletterItem.appendChild(titleElement);
    newsletterItem.appendChild(linkElement);

    newsletterContainer.appendChild(newsletterItem);
  });
}

// Call the function to fetch and display newsletters when the page loads
window.addEventListener('load', fetchNewsletters);