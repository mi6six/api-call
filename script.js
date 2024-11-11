// script.js
let page = 1;
let imagesPerPage = getImagesPerPage(); // Set images per page based on screen size

document.addEventListener("DOMContentLoaded", () => {
  const imageContainer = document.getElementById("image-container");
  const prevButton = document.getElementById("prev");
  const nextButton = document.getElementById("next");

  // Fetch and display images
  const fetchImages = async (pageNum, limit) => {
    try {
      const response = await fetch(`https://picsum.photos/v2/list?page=${pageNum}&limit=${limit}`);
      if (!response.ok) {
        if (response.status === 404) throw new Error("Images not found.");
        else if (response.status === 503) throw new Error("Service unavailable.");
        else throw new Error("An error occurred. Please try again.");
      }
      const images = await response.json();
      displayImages(images);
    } catch (error) {
      imageContainer.innerHTML = `<p>Error: ${error.message}</p>`;
    }
  };

  // Display images in the image container
  const displayImages = (images) => {
    imageContainer.innerHTML = "";
    images.forEach((image) => {
      const img = document.createElement("img");
      img.src = `https://picsum.photos/id/${image.id}/400/300`;
      img.alt = image.author;
      imageContainer.appendChild(img);
    });
  };

  // Determine images per page based on screen width
  function getImagesPerPage() {
    if (window.innerWidth > 1200) return 10; // Large screens
    if (window.innerWidth > 768) return 6;   // Medium screens
    return 3;                               // Small screens
  }

  // Handle pagination buttons
  prevButton.addEventListener("click", () => {
    if (page > 1) {
      page--;
      fetchImages(page, imagesPerPage);
      nextButton.disabled = false;
    }
    prevButton.disabled = page === 1;
  });

  nextButton.addEventListener("click", () => {
    page++;
    fetchImages(page, imagesPerPage);
    prevButton.disabled = false;
  });

  // Update imagesPerPage if window is resized
  window.addEventListener("resize", () => {
    imagesPerPage = getImagesPerPage();
    fetchImages(page, imagesPerPage); // Refresh images on resize
  });

  // Initial fetch
  fetchImages(page, imagesPerPage);
});
