document.addEventListener("DOMContentLoaded", () => {
  // ===== 전체화면 버튼 =====
  const fullscreenButton = document.getElementById("fullscreen-button");
  if (fullscreenButton) {
    fullscreenButton.addEventListener("click", () => {
      const doc = document.documentElement;
      if (!document.fullscreenElement) {
        doc.requestFullscreen().catch((err) => {
          console.error(`전체화면 전환 실패: ${err.message}`);
        });
      } else {
        document.exitFullscreen().catch((err) => {
          console.error(`전체화면 종료 실패: ${err.message}`);
        });
      }
    });
  }

  // ===== 부드러운 스크롤 함수 =====
  function smoothScrollTo(targetPosition, duration) {
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function easeInOutQuad(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
  }

  // ===== 네비게이션 로고 클릭 시 스크롤 =====
  const navBarHeight = 110;
  const navLogoItems = document.querySelectorAll(".nav-logo img");
  navLogoItems.forEach((item) => {
    item.addEventListener("click", (event) => {
      event.preventDefault();
      const targetClass = item.className.replace("-logo", "-main-logo");
      const targetElement = document.querySelector(`.${targetClass}`);
      if (targetElement) {
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
        smoothScrollTo(targetPosition - navBarHeight, 800);
      }
    });
  });

  // ===== 메인 로고 클릭 시 첫 페이지 스크롤 =====
  const mainLogo = document.querySelector(".main-logo");
  const firstPage = document.querySelector("#firstpage");
  if (mainLogo && firstPage) {
    mainLogo.addEventListener("click", (event) => {
      event.preventDefault();
      const targetPosition = firstPage.getBoundingClientRect().top + window.scrollY - navBarHeight;
      smoothScrollTo(targetPosition, 1000);
    });
  }

  // ===== HowSweet 이미지 3D 효과 =====
  const posters = document.querySelectorAll('.HowSweet-img-box > img');
  posters.forEach(poster => {
    poster.addEventListener('mousemove', (e) => {
      const rect = poster.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateY = ((x / rect.width) - 0.5) * 40;
      const rotateX = ((y / rect.height) - 0.5) * -40;
      poster.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    poster.addEventListener('mouseleave', () => {
      poster.style.transition = "transform 0.5s ease";
      poster.style.transform = 'perspective(1000px) rotate(0deg)';
    });
  });

  // ===== HowSweet EP 이미지 클릭 효과 =====
  const howSweetImg = document.querySelector(".HowSweet-EP-img");
  if (howSweetImg) {
    howSweetImg.addEventListener("click", () => {
      if (howSweetImg.classList.contains("clicked")) {
        howSweetImg.classList.remove("clicked");
        howSweetImg.classList.add("reverse");
        setTimeout(() => howSweetImg.classList.remove("reverse"), 500);
      } else {
        howSweetImg.classList.add("clicked");
      }
    });
  }

  // ===== 외부 링크 클릭 =====
  const introLogo = document.querySelector(".introduction-logo");
  if (introLogo) {
    introLogo.addEventListener("click", () => {
      window.open("https://namu.wiki/w/NewJeans", "_blank");
    });
  }

  const box3 = document.querySelector(".box3");
  if (box3) {
    box3.addEventListener("click", () => {
      window.open("https://namu.wiki/w/Get%20Up(NewJeans)", "_blank");
    });
  }

  const box10 = document.querySelector(".box10");
  if (box10) {
    box10.addEventListener("click", () => {
      window.open("https://www.youtube.com/watch?v=jOTfBlKSQYY", "_blank");
    });
  }

  const box14 = document.querySelector(".box14");
  if (box14) {
    box14.addEventListener("click", () => {
      window.open("https://www.youtube.com/watch?v=ArmDp-zijuc", "_blank");
    });
  }

  // ===== 앨범 슬라이더 =====
  const slides = Array.from(document.querySelectorAll('.slide'));
  const audio = document.getElementById('album-audio');
  const ctrlPrev = document.querySelector('.ctrl-prev');
  const ctrlNext = document.querySelector('.ctrl-next');
  const pausePlayBtn = document.querySelector('.pause-play-btn');

  let isPlaying = false;

  // 중앙 슬라이드 인덱스 (항상 배열의 가운데)
  function getCenterIndex() {
    return Math.floor(slides.length / 2);
  }

  // 슬라이드 위치 업데이트
  function updateSlides() {
    slides.forEach((slide, index) => {
      const offset = index - getCenterIndex();
      const translateZ = -Math.abs(offset) * 100;
      const translateX = offset * 300;
      const scale = 1.2 - Math.abs(offset) * 0.1;
      slide.style.transform = `translateX(${translateX}px) translateZ(${translateZ}px) scale(${Math.max(scale, 0.7)})`;
      slide.style.opacity = 1 - Math.abs(offset) * 0.15;
      slide.style.zIndex = 10 - Math.abs(offset);
    });
  }

  // 중앙 곡 재생
  function playCenterTrack() {
    const centerSlide = slides[getCenterIndex()];
    const src = centerSlide.dataset.src;
    audio.src = src;
    audio.currentTime = 0;
    audio.play();
    isPlaying = true;
    pausePlayBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
  }

  // 다음 슬라이드로 + 바로 재생
  function goNext() {
    const firstSlide = slides.shift();
    slides.push(firstSlide);
    updateSlides();
    playCenterTrack();
  }

  // 이전 슬라이드로 + 바로 재생
  function goPrev() {
    const lastSlide = slides.pop();
    slides.unshift(lastSlide);
    updateSlides();
    playCenterTrack();
  }

  // 컨트롤 버튼
  if (ctrlPrev) ctrlPrev.addEventListener('click', goPrev);
  if (ctrlNext) ctrlNext.addEventListener('click', goNext);

  if (pausePlayBtn) {
    pausePlayBtn.addEventListener('click', () => {
      if (isPlaying && !audio.paused) {
        audio.pause();
        pausePlayBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
      } else if (audio.src) {
        audio.play();
        pausePlayBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
        isPlaying = true;
      } else {
        playCenterTrack();
      }
    });
  }

  // 곡 끝나면 아이콘 변경
  audio.addEventListener('ended', () => {
    isPlaying = false;
    pausePlayBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
  });

  // 초기 슬라이드 설정
  updateSlides();
});
