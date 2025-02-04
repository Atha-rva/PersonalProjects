// Select Elements
const galleryItems = document.querySelectorAll(".gallery-item");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const closeBtn = document.querySelector(".close");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

let currentImageIndex = 0;

// Open Lightbox
function openLightbox(index) {
  currentImageIndex = index;
  const imageSrc = galleryItems[index].src;
  lightboxImage.src = imageSrc;
  lightbox.style.display = "flex";
}

// Close Lightbox
function closeLightbox() {
  lightbox.style.display = "none";
}

// Show Previous Image
function showPrev() {
  currentImageIndex =
    currentImageIndex === 0 ? galleryItems.length - 1 : currentImageIndex - 1;
  updateLightboxImage();
}

// Show Next Image
function showNext() {
  currentImageIndex =
    currentImageIndex === galleryItems.length - 1 ? 0 : currentImageIndex + 1;
  updateLightboxImage();
}

// Update Lightbox Image
function updateLightboxImage() {
  const imageSrc = galleryItems[currentImageIndex].src;
  lightboxImage.src = imageSrc;
}

// Event Listeners
galleryItems.forEach((item, index) => {
  item.addEventListener("click", () => openLightbox(index));
});

closeBtn.addEventListener("click", closeLightbox);
prevBtn.addEventListener("click", showPrev);
nextBtn.addEventListener("click", showNext);

// Close lightbox when clicking outside the image
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});
