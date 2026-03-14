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
      
      // Shuffle array for random photo order
      imagesData.sort(() => Math.random() - 0.5);
      
      renderGallery(imagesData);
    } catch (err) {
      console.error('Could not load images.json', err);
    }
  }

  // Set current year in footer
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  function renderGallery(data) {
    gallery.innerHTML = '';
    data.forEach((img, index) => {
      const item = document.createElement('div');
      item.className = 'photo-item';
      item.dataset.name = img.name.toLowerCase();
      item.dataset.desc = img.description.toLowerCase();

      if (index % 7 === 0) {
        item.classList.add('span2x2');
      } else if (index % 5 === 0) {
        item.classList.add('span2x2');
      }

      const card = document.createElement('div');
      card.className = 'photo-card';

      const imageElement = document.createElement('img');
      imageElement.src = 'pics/small/' + img.url;
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

  // lightbox
  function openLightbox(img) {
    lightboxImg.src = 'pics/full/' + img.url;
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

  // filter / search
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