

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
const track = document.querySelector('.testimonial-track');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let index = 0;
const items = document.querySelectorAll('.testimonial-item');

// Số lượng phần tử hiển thị cùng lúc (tùy vào responsive)
function getVisibleItems() {
  return window.innerWidth < 900 ? 1 : 3;
}

function updateSlider() {
  const visibleItems = getVisibleItems();
  const itemWidth = items[0].offsetWidth + 30; // bao gồm margin-right
  track.style.transform = `translateX(-${index * itemWidth}px)`;
}

// Sự kiện khi nhấn nút "Tiếp"
nextBtn.addEventListener('click', () => {
  const visibleItems = getVisibleItems();
  if (index < items.length - visibleItems) {
    index++;
  } else {
    index = 0;
  }
  updateSlider();
});

// Sự kiện khi nhấn nút "Trước"
prevBtn.addEventListener('click', () => {
  const visibleItems = getVisibleItems();
  if (index > 0) {
    index--;
  } else {
    index = items.length - visibleItems;
  }
  updateSlider();
});

// Cập nhật lại khi thay đổi kích thước cửa sổ
window.addEventListener('resize', updateSlider);

// Khởi tạo ban đầu
updateSlider();

// Tự động trượt mỗi 4 giây
setInterval(() => {
  const visibleItems = getVisibleItems();
  if (index < items.length - visibleItems) {
    index++;
  } else {
    index = 0;
  }
  updateSlider();
}, 4000);



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
