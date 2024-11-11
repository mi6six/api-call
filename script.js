let currentPage = 1;
let totalPages = 10; // Adjust this based on available images
const imagesPerPage = 6; // Display 6 images per page
const imageGrid = document.getElementById('imageGrid');
const prevButton = document.getElementById('prevPage');
const nextButton = document.getElementById('nextPage');
const errorDiv = document.getElementById('error');

function fetchImages() {
    imageGrid.innerHTML = ''; // Clear existing images
    errorDiv.textContent = ''; // Clear previous errors

    // Loop to fetch multiple images
    for (let i = 0; i < imagesPerPage; i++) {
        const imageId = Math.floor(Math.random() * totalPages) + 1; // Generate a random image ID

        fetch(`https://picsum.photos/id/${imageId}/300/200`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error ${response.status}: Unable to fetch image.`);
                }
                const imgElement = document.createElement('img');
                imgElement.src = `https://picsum.photos/id/${imageId}/300/200`;
                imgElement.alt = `Random Image ${imageId}`;
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
    prevButton.disabled = currentPage === 1;
    nextButton.disabled = false; // Enable next button since we can load more new random images
}

function changePage(direction) {
    if (direction === 'next') {
        currentPage++;
    } else if (direction === 'prev') {
        currentPage--;
    }
    
    fetchImages(); // Fetch new images on page change
}

// Event listeners for the buttons
prevButton.addEventListener('click', () => changePage('prev'));
nextButton.addEventListener('click', () => changePage('next'));

// Fetch random images on button click
document.getElementById('fetchImage').addEventListener('click', () => {
    currentPage = 1; // Reset to the first page
    fetchImages(); // Fetch new images
});

// Initial load
fetchImages();
