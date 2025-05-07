document.addEventListener('DOMContentLoaded', () => {
    async function loadGallery() {
      try {
        const response = await fetch('images.json');
        const images = await response.json();
        const gallery = document.getElementById('gallery');
        images.forEach(img => {
          const item = document.createElement('div');
          item.className = 'photo-item';
  
          const card = document.createElement('div');
          card.className = 'photo-card';
  
          const imageElement = document.createElement('img');
          imageElement.src = img.url;
          imageElement.alt = img.name;
          imageElement.loading = 'lazy';
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
      } catch (err) {
        console.error('Could not load images.json', err);
      }
    }
  
    loadGallery();
  });