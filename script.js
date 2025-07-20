document.addEventListener('DOMContentLoaded', () => {

  const gallery = document.getElementById('gallery');
  const searchInput = document.getElementById('search-input');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');

  let imagesData = [];

  async function loadGallery() {
    try {
      const response = await fetch('images.json');
      imagesData = await response.json();
      renderGallery(imagesData);
    } catch (err) {
      console.error('Could not load images.json', err);
    }
  }

  function renderGallery(data) {
    gallery.innerHTML = '';
    data.forEach((img, index) => {
      const item = document.createElement('div');
      item.className = 'photo-item';
      item.dataset.name = img.name.toLowerCase();
      item.dataset.desc = img.description.toLowerCase();

      // ─── Assign mosaic spans ───
      // Example logic: every 7th image is 2×2, every 5th is 2×1, every 3rd is 1×2
      if (index % 7 === 0) {
        item.classList.add('span2x2');
      } else if (index % 5 === 0) {
        item.classList.add('span2x2');
      } else if (index % 3 === 0) {
        // item.classList.add('span1x2');
      }

      const card = document.createElement('div');
      card.className = 'photo-card';

      const imageElement = document.createElement('img');
      imageElement.src = img.url;
      imageElement.alt = img.name;
      imageElement.loading = 'lazy';
      imageElement.addEventListener('click', () => openLightbox(img));
      card.appendChild(imageElement);

      const info = document.createElement('div');
      info.className = 'photo-info';

      const title = document.createElement('h3');
      title.textContent = img.name;

      const desc = document.createElement('p');
      desc.textContent = img.description;

      info.appendChild(title);
      info.appendChild(desc);

      item.appendChild(card);
      item.appendChild(info);
      gallery.appendChild(item);
    });
  }

  /* Lightbox functions */
  function openLightbox(img) {
    lightboxImg.src = img.url;
    lightboxImg.alt = img.name;
    lightboxCaption.textContent = img.name + ' - ' + img.description;
    lightbox.classList.remove('hidden');
  }

  function closeLightbox() {
    lightbox.classList.add('hidden');
    lightboxImg.src = '';
  }

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  /* Filter / Search logic */
  searchInput.addEventListener('input', () => {
    const term = searchInput.value.trim().toLowerCase();
    const filtered = imagesData.filter(img => {
      return (
        img.name.toLowerCase().includes(term) ||
        img.description.toLowerCase().includes(term)
      );
    });
    renderGallery(filtered);
  });

  loadGallery();

});