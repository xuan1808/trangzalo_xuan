

// quan tri zalo oa
document.addEventListener('DOMContentLoaded', function () {
  const slider = document.getElementById('whyOASlider');
  const leftBtn = document.querySelector('.why-oa-slider-arrow.left');
  const rightBtn = document.querySelector('.why-oa-slider-arrow.right');
  const dotsWrap = document.getElementById('whyOADots');
  const cards = Array.from(slider.children);
  const cardCount = cards.length;
  let current = 0;
  let autoInterval;
  let cardWidth = cards[0].offsetWidth + parseInt(getComputedStyle(slider).gap || 32);


  function renderDots() {
    dotsWrap.innerHTML = '';
    for (let i = 0; i < cardCount; i++) {
      const dot = document.createElement('div');
      dot.className = 'why-oa-slider-dot' + (i === current ? ' active' : '');
      dot.addEventListener('click', () => {
        goTo(i);
      });
      dotsWrap.appendChild(dot);
    }
  }

  function goTo(idx) {
    current = idx;
    cardWidth = cards[0].offsetWidth + parseInt(getComputedStyle(slider).gap || 32);
    slider.scrollTo({ left: cardWidth * idx, behavior: 'smooth' });
    renderDots();
  }

  // Prev/Next
  leftBtn.addEventListener('click', function () {
    current = (current - 1 + cardCount) % cardCount;
    goTo(current);
    resetAuto();
  });
  rightBtn.addEventListener('click', function () {
    current = (current + 1) % cardCount;
    goTo(current);
    resetAuto();
  });
  // Autoplay
  function autoPlay() {
    autoInterval = setInterval(() => {
      current = (current + 1) % cardCount;
      goTo(current);
    }, 3300);
  }
  function resetAuto() {
    clearInterval(autoInterval);
    autoPlay();
  }
  // Drag/Swipe
  let isDown = false;
  let startX, scrollLeft;
  slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('dragging');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });
  slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('dragging');
  });
  slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('dragging');
    // Snap to nearest card
    let idx = Math.round(slider.scrollLeft / cardWidth);
    goTo(idx);
    resetAuto();
  });
  slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (startX - x);
    slider.scrollLeft = scrollLeft + walk;
  });

  // Touch
  slider.addEventListener('touchstart', (e) => {
    isDown = true;
    startX = e.touches[0].pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });
  slider.addEventListener('touchend', () => {
    isDown = false;
    let idx = Math.round(slider.scrollLeft / cardWidth);
    goTo(idx);
    resetAuto();
  });
  slider.addEventListener('touchmove', (e) => {
    if (!isDown) return;
    const x = e.touches[0].pageX - slider.offsetLeft;
    const walk = (startX - x);
    slider.scrollLeft = scrollLeft + walk;
  });

  // Resize
  window.addEventListener('resize', () => {
    cardWidth = cards[0].offsetWidth + parseInt(getComputedStyle(slider).gap || 32);
    goTo(current);
  });

  // Init
  renderDots();
  goTo(0);
  autoPlay();
});



// slider đnahs giá kahcs hàng 
document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector('.testimonials-slider');
  const items = Array.from(slider.querySelectorAll('.testimonial-item'));
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');

  const VISIBLE = 3;
  let current = 0;
  let autoSlideInterval = null;
  let isTransitioning = false;

  const TOTAL_ITEMS = items.length;
  let totalClones = 0;

  function getItemWidth() {
    const item = slider.querySelector('.testimonial-item');
    const gap = parseInt(getComputedStyle(slider).gap || 0, 10);
    return item.offsetWidth + gap;
  }

  function clearClones() {
    slider.querySelectorAll('.clone').forEach(el => el.remove());
  }

  function setupClones() {
    clearClones();
    const head = items.slice(0, VISIBLE);
    const tail = items.slice(-VISIBLE);

    head.forEach(el => {
      const clone = el.cloneNode(true);
      clone.classList.add('clone');
      slider.appendChild(clone);
    });

    tail.forEach(el => {
      const clone = el.cloneNode(true);
      clone.classList.add('clone');
      slider.insertBefore(clone, slider.firstChild);
    });

    totalClones = VISIBLE * 2;
  }

  function moveTo(index, withTransition = true) {
    const itemWidth = getItemWidth();
    slider.style.transition = withTransition ? "transform 0.55s ease" : "none";
    slider.style.transform = `translateX(-${itemWidth * (index + VISIBLE)}px)`;
    current = index;
  }

  function nextSlide() {
    if (isTransitioning) return;
    isTransitioning = true;
    moveTo(current + 1);
  }

  function prevSlide() {
    if (isTransitioning) return;
    isTransitioning = true;
    moveTo(current - 1);
  }

  function autoSlide() {
    autoSlideInterval = setInterval(nextSlide, 4000);
  }

  function restartAuto() {
    clearInterval(autoSlideInterval);
    autoSlide();
  }

  function handleResize() {
    setupClones();
    moveTo(current, false);
  }

  slider.addEventListener('transitionend', () => {
    const max = TOTAL_ITEMS - VISIBLE;
    if (current > max - 1) {
      moveTo(0, false); // về đầu
    }
    if (current < 0) {
      moveTo(max - 1, false); // về cuối
    }
    isTransitioning = false;
  });

  prevBtn.addEventListener('click', () => {
    prevSlide();
    restartAuto();
  });

  nextBtn.addEventListener('click', () => {
    nextSlide();
    restartAuto();
  });

  window.addEventListener('resize', handleResize);

  // INIT
  setupClones();
  moveTo(0, false);
  autoSlide();
});




// banner slider
document.addEventListener('DOMContentLoaded', function () {
  let slides = document.querySelectorAll('.slider-slide');
  let current = 0;
  let leftBtn = document.querySelector('.slider-arrow.left');
  let rightBtn = document.querySelector('.slider-arrow.right');
  let timer;

  function showSlide(idx) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === idx);
    });
    current = idx;
  }

  function nextSlide() {
    showSlide((current + 1) % slides.length);
  }
  function prevSlide() {
    showSlide((current - 1 + slides.length) % slides.length);
  }

  rightBtn.addEventListener('click', () => {
    nextSlide();
    resetAuto();
  });
  leftBtn.addEventListener('click', () => {
    prevSlide();
    resetAuto();
  });

  function startAuto() {
    timer = setInterval(nextSlide, 3500);
  }
  function resetAuto() {
    clearInterval(timer);
    startAuto();
  }

  showSlide(current);
  startAuto();
});
// quy trình 
// Vanilla JS slider for 4-step process, show 3 at a time, slide left/right
document.addEventListener('DOMContentLoaded', function () {
  const items = Array.from(document.querySelectorAll('.timeline-item'));
  const track = document.querySelector('.timeline-track');
  const prevBtn = document.querySelector('.slider-btn.prev');
  const nextBtn = document.querySelector('.slider-btn.next');
  let current = 0; // index of the first visible item

  function render() {
    items.forEach((el, idx) => {
      el.classList.remove('active', 'prev', 'next');
      el.style.display = 'none';
    });
    // Always show 3 items (current, current+1, current+2), highlight current+1 as 'active'
    for (let i = 0; i < 3; i++) {
      let idx = current + i;
      if (idx >= items.length) continue;
      items[idx].style.display = '';
      if (i === 0) items[idx].classList.add('prev');
      else if (i === 1) items[idx].classList.add('active');
      else if (i === 2) items[idx].classList.add('next');
    }
    // Move the track (not strictly needed if hiding/showing)
    // track.style.transform = `translateX(-${current * (items[0].offsetWidth + 30)}px)`;
    prevBtn.disabled = current === 0;
    nextBtn.disabled = current >= items.length - 3;
  }

  prevBtn.addEventListener('click', function () {
    if (current > 0) {
      current--;
      render();
    }
  });
  nextBtn.addEventListener('click', function () {
    if (current < items.length - 3) {
      current++;
      render();
    }
  });
  render();
});