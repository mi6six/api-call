let currentPage = 1;
let totalPages = 10; // Modify based on available images
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
        const imageId = (currentPage - 1) * imagesPerPage + i + 1;
        if (imageId > totalPages) break; // Prevent going over total available images

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

    // Manage pagination state
    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage >= Math.ceil(totalPages / imagesPerPage);
}

function changePage(direction) {
    if (direction === 'next') {
        currentPage++;
    } else if (direction === 'prev') {
        currentPage--;
    }
    fetchImages();
}

// Event listeners for pagination buttons
prevButton.addEventListener('click', () => changePage('prev'));
nextButton.addEventListener('click', () => changePage('next'));

// Initial load
fetchImages();
