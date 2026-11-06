/**
 * LÓGICA ESPECÍFICA DO SETOR — DESENVOLVIDO PELA EQUIPE DISCENTE
 * Disciplina: Programação 2 (Extensão BSI / UEMG Carangola)
 * 
 * Escreva aqui as funções em JavaScript ES6+ puro necessárias para o seu setor
 * (ex: sanfonas de FAQ, busca interna, filtros de documentos, cópia de chaves pix/e-mails, etc.).
 */

document.addEventListener('DOMContentLoaded', () => {
  console.log('Script do Setor inicializado com sucesso.');

  const mapStage = document.querySelector('.nae-map-stage');
  const mapPin = mapStage?.querySelector('.nae-map-pin');
  const locationPreview = mapStage?.querySelector('.nae-location-preview');
  const carousel = locationPreview?.querySelector('.nae-location-carousel');
  const imageLightbox = document.querySelector('.nae-location-lightbox');

  if (mapStage && mapPin && locationPreview && carousel) {
    const slides = Array.from(carousel.querySelectorAll('.nae-location-slide'));
    const previewTitle = locationPreview.querySelector('#nae-location-preview-title');
    const locationReference = locationPreview.querySelector('.nae-location-reference');
    const carouselStatus = locationPreview.querySelector('.nae-location-carousel-status');
    let activeSlide = 0;

    const showSlide = (index) => {
      activeSlide = (index + slides.length) % slides.length;
      slides.forEach((slide, slideIndex) => {
        slide.hidden = slideIndex !== activeSlide;
      });
      previewTitle.textContent = `${slides[activeSlide].dataset.label} — Bloco 1`;
      locationReference.textContent = slides[activeSlide].dataset.reference;
      carouselStatus.textContent = `${activeSlide + 1} de ${slides.length}`;
    };

    const setPreviewOpen = (isOpen) => {
      mapPin.setAttribute('aria-expanded', String(isOpen));
      mapPin.classList.toggle('is-open', isOpen);
      locationPreview.hidden = !isOpen;
    };

    mapPin.addEventListener('pointerenter', (event) => {
      if (event.pointerType === 'mouse') {
        setPreviewOpen(true);
      }
    });

    mapStage.addEventListener('pointerleave', (event) => {
      if (event.pointerType === 'mouse' && !mapStage.contains(document.activeElement)) {
        setPreviewOpen(false);
      }
    });

    mapStage.addEventListener('focusin', () => setPreviewOpen(true));
    mapStage.addEventListener('focusout', (event) => {
      if (!mapStage.contains(event.relatedTarget)) {
        setPreviewOpen(false);
      }
    });

    mapPin.addEventListener('click', () => setPreviewOpen(true));

    carousel.querySelector('.nae-location-carousel-control--previous')
      .addEventListener('click', () => showSlide(activeSlide - 1));
    carousel.querySelector('.nae-location-carousel-control--next')
      .addEventListener('click', () => showSlide(activeSlide + 1));

    if (imageLightbox) {
      const lightboxImage = imageLightbox.querySelector('.nae-location-lightbox-image');
      const closeLightbox = imageLightbox.querySelector('.nae-location-lightbox-close');

      carousel.querySelectorAll('.nae-location-image-trigger').forEach((trigger) => {
        trigger.addEventListener('click', () => {
          const image = trigger.querySelector('img');
          lightboxImage.src = image.currentSrc || image.src;
          lightboxImage.alt = image.alt;
          imageLightbox.showModal();
        });
      });

      closeLightbox.addEventListener('click', () => imageLightbox.close());
      imageLightbox.addEventListener('click', (event) => {
        if (event.target === imageLightbox) {
          imageLightbox.close();
        }
      });
      imageLightbox.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
          imageLightbox.close();
        }
      });
    }

    mapStage.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        setPreviewOpen(false);
      } else if (event.key === 'ArrowLeft') {
        showSlide(activeSlide - 1);
      } else if (event.key === 'ArrowRight') {
        showSlide(activeSlide + 1);
      }
    });

    document.addEventListener('click', (event) => {
      if (!mapStage.contains(event.target)) {
        setPreviewOpen(false);
      }
    });
  }

  // Exemplo: Função para interatividade dos estudantes
  // initExemploSetor();
});
