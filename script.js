let totalImages = 100; // Assume there are at least this many random images available
const imagesPerPage = 6; // Display 6 images per request
const imageGrid = document.getElementById('imageGrid');
const prevButton = document.getElementById('prevPage');
const nextButton = document.getElementById('nextPage');
const errorDiv = document.getElementById('error');

// Function to fetch images
function fetchImages() {
    imageGrid.innerHTML = ''; // Clear existing images
    errorDiv.textContent = ''; // Clear previous errors

    // Loop to fetch multiple random images
    for (let i = 0; i < imagesPerPage; i++) {
        const randomParam = Math.floor(Math.random() * totalImages) + 1; // Generate a random number
        const imgUrl = `https://picsum.photos/200/300?random=${randomParam}`; // Construct the image URL

        fetch(imgUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error ${response.status}: Unable to fetch image.`);
                }
                const imgElement = document.createElement('img');
                imgElement.src = imgUrl;
                imgElement.alt = `Random Image`;
                imgElement.className = "w-full h-auto object-cover rounded";

                const imageCard = document.createElement('div');
                imageCard.classList.add('bg-white', 'shadow-lg', 'rounded', 'overflow-hidden');
                imageCard.appendChild(imgElement);
                imageGrid.appendChild(imageCard);
            })
            .catch(error => {
                errorDiv.textContent = error.message;
            });
    }

    // Update pagination state
    prevButton.disabled = false; // No paging is implemented for random images
    nextButton.disabled = false; // Enable next button since we can fetch more random images
}

// Fetch random images on button click
document.getElementById('fetchImage').addEventListener('click', () => {
    fetchImages(); // Fetch new images randomly
});

// Initial load
fetchImages();
