const galleryImages = [
    { id: 1, src: '../img/1.avif', category: 'nature', alt: 'Nature image 1' },
    { id: 2, src: '../img/2.avif', category: 'architecture', alt: 'Architecture image 1' },
    { id: 3, src: '../img/3.avif', category: 'food', alt: 'Food image 1' },
    { id: 4, src: '../img/4.avif', category: 'nature', alt: 'Nature image 2' },
    { id: 5, src: '../img/5.avif', category: 'architecture', alt: 'Architecture image 2' },
    { id: 6, src: '../img/6.avif', category: 'food', alt: 'Food image 2' },
];

document.addEventListener('DOMContentLoaded', initializeGallery);

function initializeGallery() {
    const galleryContainer = document.getElementById('gallery');
    const categoryButtons = document.querySelectorAll('.filter-btn');
    const loadingSpinner = document.getElementById('loading');

    setupCategoryButtons(categoryButtons);
    
    showImagesForCategory('all');

    function setupCategoryButtons(buttons) {
        buttons.forEach(button => {
            button.addEventListener('click', handleCategoryClick);
            button.addEventListener('keydown', handleButtonKeyPress);
        });
    }

    function handleCategoryClick(event) {
        const clickedButton = event.currentTarget;
        updateButtonStyles(clickedButton);
        const selectedCategory = clickedButton.getAttribute('data-category');
        showImagesForCategory(selectedCategory);
    }

    function handleButtonKeyPress(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            event.currentTarget.click();
        }
    }

    function updateButtonStyles(activeButton) {
        categoryButtons.forEach(button => {
            button.classList.remove('bg-blue-500', 'text-white');
            button.classList.add('bg-gray-200', 'text-gray-700');
        });
        activeButton.classList.remove('bg-gray-200', 'text-gray-700');
        activeButton.classList.add('bg-blue-500', 'text-white');
    }

    function showImagesForCategory(category) {
        toggleLoading(true);

        setTimeout(() => {
            const imagesToShow = filterImagesByCategory(category);
            displayImages(imagesToShow);
            toggleLoading(false);
        }, 500);
    }

    function filterImagesByCategory(category) {
        return category === 'all' 
            ? galleryImages 
            : galleryImages.filter(img => img.category === category);
    }

    function displayImages(imagesToShow) {
        galleryContainer.innerHTML = '';
        imagesToShow.forEach(image => {
            galleryContainer.appendChild(createImageCard(image));
        });
    }

    function createImageCard(image) {
        const card = document.createElement('div');
        card.className = 'group relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105';
        card.setAttribute('data-category', image.category);
        
        card.innerHTML = `
            <img 
                src="${image.src}" 
                alt="${image.alt}"
                class="w-full h-64 object-cover"
                loading="lazy"
            >
            <div class="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <p class="text-white text-lg font-semibold">${image.category}</p>
            </div>
        `;
        return card;
    }

    function toggleLoading(show) {
        if (show) {
            loadingSpinner.classList.remove('hidden');
            galleryContainer.classList.add('opacity-0');
        } else {
            loadingSpinner.classList.add('hidden');
            galleryContainer.classList.remove('opacity-0');
        }
    }
}
