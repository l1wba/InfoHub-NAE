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

  if (mapStage && mapPin && locationPreview) {
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

    mapStage.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        setPreviewOpen(false);
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
