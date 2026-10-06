'use strict';

// Page content remains readable without JavaScript. Only titles and viewers need it.
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.classList.add('js-motion');
  const walls = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        walls.unobserve(entry.target);
      }
    });
  }, { threshold: 0.45 });
  document.querySelectorAll('.wall').forEach(wall => walls.observe(wall));
}

const viewer = document.querySelector('#viewer');
const content = document.querySelector('#viewer-content');
const title = document.querySelector('#viewer-title');
let opener;

function emptyView(label, message) {
  const panel = document.createElement('div');
  panel.className = 'empty-view';
  const heading = document.createElement('span');
  heading.className = 'eyebrow';
  heading.textContent = label;
  const paragraph = document.createElement('p');
  paragraph.textContent = message;
  panel.append(heading, paragraph);
  content.append(panel);
}

// Pre-rendered PDF pages keep the book in this tab, including on phones and
// when index.html is opened directly. Only the selected page is requested.
function openBook(button) {
  const count = Number(button.dataset.pageCount);
  let page = 1;
  const reader = document.createElement('div');
  reader.className = 'book-reader';
  const controls = document.createElement('div');
  controls.className = 'book-controls';
  const previous = document.createElement('button');
  previous.textContent = 'Précédente';
  previous.setAttribute('aria-label', 'Page précédente');
  const position = document.createElement('span');
  position.className = 'book-position';
  position.setAttribute('aria-live', 'polite');
  const next = document.createElement('button');
  next.textContent = 'Suivante';
  next.setAttribute('aria-label', 'Page suivante');
  const zoom = document.createElement('button');
  zoom.textContent = 'Agrandir la page';
  zoom.setAttribute('aria-pressed', 'false');
  const sheet = document.createElement('div');
  sheet.className = 'book-sheet';
  sheet.tabIndex = 0;
  sheet.setAttribute('aria-label', 'Page du livre, zone de lecture');
  const image = document.createElement('img');
  image.decoding = 'async';
  sheet.append(image);
  const save = document.createElement('a');
  save.className = 'book-save';
  save.href = button.dataset.book;
  save.download = 'Livre 50 ans Miteux.pdf';
  save.textContent = 'Enregistrer le PDF';
  function showPage() {
    image.alt = `Page ${page} sur ${count} du livre Pour Miteux`;
    image.src = `${button.dataset.pages}${page}.webp`;
    position.textContent = `Page ${page} / ${count}`;
    previous.disabled = page === 1;
    next.disabled = page === count;
    sheet.scrollTop = 0;
    sheet.scrollLeft = 0;
  }
  previous.addEventListener('click', () => { if (page > 1) { page--; showPage(); } });
  next.addEventListener('click', () => { if (page < count) { page++; showPage(); } });
  zoom.addEventListener('click', () => {
    const expanded = sheet.classList.toggle('is-expanded');
    zoom.setAttribute('aria-pressed', String(expanded));
    zoom.textContent = expanded ? 'Afficher la page entière' : 'Agrandir la page';
  });
  reader.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight' && page < count) { event.preventDefault(); page++; showPage(); }
    if (event.key === 'ArrowLeft' && page > 1) { event.preventDefault(); page--; showPage(); }
  });
  controls.append(previous, position, next, zoom);
  reader.append(controls, sheet, save);
  content.append(reader);
  showPage();
}

document.addEventListener('click', event => {
  const button = event.target.closest('[data-photo], [data-video], [data-book]');
  if (!button) return;
  opener = button;
  content.replaceChildren();
  if (button.hasAttribute('data-book')) {
    title.textContent = button.dataset.title || 'Le livre de ta sœur';
    const source = button.dataset.book;
    if (button.dataset.pages) {
      openBook(button);
    } else if (source) {
      const frame = document.createElement('iframe');
      frame.title = 'Le livre de ta sœur';
      frame.src = source;
      const link = document.createElement('a');
      link.href = source;
      link.target = '_blank';
      link.rel = 'noopener';
      link.className = 'pdf-link';
      link.textContent = 'Ouvrir le livre dans un nouvel onglet';
      content.append(frame, link);
    } else {
      emptyView('Le livre est à venir', 'Ses pages s’ouvriront ici, au cœur de la galerie, lorsque le livre aura été ajouté.');
    }
  } else if (button.hasAttribute('data-video')) {
    title.textContent = button.dataset.title || 'Un message pour toi';
    const source = button.dataset.video;
    if (source) {
      // The source is attached only after a deliberate click. No preloading in the gallery.
      const video = document.createElement('video');
      video.controls = true;
      video.preload = 'none';
      video.playsInline = true;
      if (button.dataset.poster) video.poster = button.dataset.poster;
      video.src = source;
      if (button.dataset.captions) {
        const track = document.createElement('track');
        track.kind = 'captions';
        track.srclang = 'fr';
        track.label = 'Français';
        track.src = button.dataset.captions;
        video.append(track);
      }
      content.append(video);
    } else {
      emptyView('Message vidéo à venir', 'Le message sera disponible ici lorsque la vidéo aura été ajoutée.');
    }
  } else {
    title.textContent = 'Un souvenir';
    const image = button.querySelector('img');
    if (image) {
      const large = document.createElement('img');
      large.src = button.dataset.full || image.currentSrc || image.src;
      large.alt = image.alt;
      content.append(large);
    } else {
      emptyView('Photographie à venir', 'La photographie pourra être contemplée ici en grand format.');
    }
  }
  // Photos have no visible supporting text; keep the dialog title accessible.
  title.classList.toggle('sr-only', button.hasAttribute('data-photo'));
  viewer.showModal();
  document.body.classList.add('viewer-open');
});

document.querySelector('.close-viewer').addEventListener('click', () => viewer.close());
viewer.addEventListener('click', event => {
  const bounds = viewer.getBoundingClientRect();
  if (event.target === viewer && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) viewer.close();
});
viewer.addEventListener('close', () => {
  const video = content.querySelector('video');
  if (video) {
    video.pause();
    video.removeAttribute('src');
    video.load();
  }
  content.replaceChildren();
  document.body.classList.remove('viewer-open');
  opener?.focus({ preventScroll: true });
});
