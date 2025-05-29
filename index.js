// slider banner
 
// Vanilla JS Slider for .why-oa-slider
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

  // Dots
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
  // Scroll to card
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


  //

    const slides = document.querySelectorAll('.slider-slide');
  const nextBtn = document.querySelector('.slider-arrow.right');
  const prevBtn = document.querySelector('.slider-arrow.left');

  let currentIndex = 0;
  const totalSlides = slides.length;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove('active');
    });
    slides[index].classList.add('active');
  }

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % totalSlides;
    showSlide(currentIndex);
  });

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    showSlide(currentIndex);
  });

  // Tự động chạy sau mỗi 5 giây
  setInterval(() => {
    currentIndex = (currentIndex + 1) % totalSlides;
    showSlide(currentIndex);
  }, 2000);

  // Hiển thị slide đầu tiên ngay khi tải
  showSlide(currentIndex);
  window.addEventListener("resize", () => {
    slider.style.transition = "none";
    slider.style.transform = `translateX(-${itemWidth * currentIndex}px)`;
  });