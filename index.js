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

document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector('.testimonials-slider');
  const items = Array.from(slider.querySelectorAll('.testimonial-item'));
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');

  // Thông số cố định cho 3 item
  const VISIBLE = 3;
  let current = 0;
  let autoSlideInterval = null;
  let isAnimating = false;

  // Tạo clone cho hiệu ứng seamless
  function setupClones() {
    // Xóa clone cũ nếu có
    slider.querySelectorAll('.clone').forEach(clone => clone.remove());
    // Clone cuối lên đầu
    for (let i = items.length - VISIBLE; i < items.length; i++) {
      const clone = items[i].cloneNode(true);
      clone.classList.add('clone');
      slider.insertBefore(clone, slider.firstChild);
    }
    // Clone đầu xuống cuối
    for (let i = 0; i < VISIBLE; i++) {
      const clone = items[i].cloneNode(true);
      clone.classList.add('clone');
      slider.appendChild(clone);
    }
  }

  function getItemWidth() {
    let item = slider.querySelector('.testimonial-item');
    if (!item) return 320;
    let gap = parseInt(getComputedStyle(slider).gap || 0, 10);
    return item.offsetWidth + gap;
  }

  function moveTo(idx, withTransition = true) {
    let itemWidth = getItemWidth();
    slider.style.transition = withTransition ? "transform 0.55s cubic-bezier(.7,1.3,.2,1)" : "none";
    slider.style.transform = `translateX(${-itemWidth * (idx + VISIBLE)}px)`;
    current = idx;
  }

  function nextSlide() {
    if (isAnimating) return;
    isAnimating = true;
    moveTo(current + 1, true);
    setTimeout(() => {
      const max = items.length - VISIBLE;
      if (current + 1 > max - 1) {
        // Không animate, nhảy về đầu ngay lập tức, không giật
        moveTo(0, false);
      } else {
        current++;
      }
      isAnimating = false;
    }, 560);
    restartAuto();
  }

  function prevSlide() {
    if (isAnimating) return;
    isAnimating = true;
    moveTo(current - 1, true);
    setTimeout(() => {
      const max = items.length - VISIBLE;
      if (current - 1 < 0) {
        moveTo(max - 1, false);
      } else {
        current--;
      }
      isAnimating = false;
    }, 560);
    restartAuto();
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

  // Xử lý khi kết thúc animation để cập nhật lại current (cực mượt)
  slider.addEventListener('transitionend', () => {
    const max = items.length - VISIBLE;
    if (current > max - 1) {
      moveTo(0, false);
    }
    if (current < 0) {
      moveTo(max - 1, false);
    }
  });

  prevBtn.addEventListener('click', prevSlide);
  nextBtn.addEventListener('click', nextSlide);
  window.addEventListener('resize', handleResize);

  // INIT
  setupClones();
  moveTo(0, false);
  autoSlide();

});
 const track = document.querySelector('.category-track');
  const items = Array.from(track.children);

  // Tự động clone để tạo hiệu ứng vòng lặp
  items.forEach(item => {
    const clone = item.cloneNode(true);
    track.appendChild(clone);
  });


  //
  const slides = document.querySelectorAll('.slider-slide');
  const prevBtn = document.querySelector('.slider-arrow.left');
  const nextBtn = document.querySelector('.slider-arrow.right');
  let current = 0;
  let autoSlide;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove('active');
      if (i === index) {
        slide.classList.add('active');
      }
    });
  }

  function nextSlide() {
    current = (current + 1) % slides.length;
    showSlide(current);
  }

  function prevSlide() {
    current = (current - 1 + slides.length) % slides.length;
    showSlide(current);
  }

  function startAutoSlide() {
    autoSlide = setInterval(nextSlide, 4000); // chuyển slide mỗi 4 giây
  }

  function resetAutoSlide() {
    clearInterval(autoSlide);
    startAutoSlide();
  }

  prevBtn.addEventListener('click', () => {
    prevSlide();
    resetAutoSlide();
  });

  nextBtn.addEventListener('click', () => {
    nextSlide();
    resetAutoSlide();
  });

  // Khởi động
  showSlide(current);
  startAutoSlide();
