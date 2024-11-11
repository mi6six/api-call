// script.js
let page = 1;

document.addEventListener("DOMContentLoaded", () => {
  const imageContainer = document.getElementById("image-container");
  const prevButton = document.getElementById("prev");
  const nextButton = document.getElementById("next");

  // Fetch and display images
  const fetchImages = async (pageNum) => {
    try {
      const response = await fetch(`https://picsum.photos/v2/list?page=${pageNum}&limit=5`);
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

  // Handle pagination buttons
  prevButton.addEventListener("click", () => {
    if (page > 1) {
      page--;
      fetchImages(page);
      nextButton.disabled = false;
    }
    prevButton.disabled = page === 1;
  });

  nextButton.addEventListener("click", () => {
    page++;
    fetchImages(page);
    prevButton.disabled = false;
  });

  // Initial fetch
  fetchImages(page);
});
