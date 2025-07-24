document.addEventListener("DOMContentLoaded", () => {
  // 전체화면 버튼 클릭 시 전체화면 전환
  const fullscreenButton = document.getElementById("fullscreen-button");

  if (fullscreenButton) {
    fullscreenButton.addEventListener("click", () => {
      const doc = document.documentElement;
      if (!document.fullscreenElement) {
        doc.requestFullscreen()
          .then(() => {
            console.log("전체화면 활성화");
          })
          .catch((err) => {
            console.error(`전체화면 전환 실패: ${err.message}`);
          });
      } else {
        document.exitFullscreen()
          .then(() => {
            console.log("전체화면 종료");
          })
          .catch((err) => {
            console.error(`전체화면 종료 실패: ${err.message}`);
          });
      }
    });
  } else {
    console.error("fullscreen-button 요소를 찾을 수 없습니다.");
  }
});

document.addEventListener("DOMContentLoaded", () => {

  // 네비게이션 로고 클릭 시 메인 로고로 스크롤
  const navLogoItems = document.querySelectorAll(".nav-logo img");

  navLogoItems.forEach((item) => {
    item.addEventListener("click", (event) => {
      event.preventDefault(); 

      // 메인 로고를 클릭하면 그 위치로 이동
      const targetClass = item.className.replace("-logo", "-main-logo");
      const targetElement = document.querySelector(`.${targetClass}`);

      if (targetElement) {
        // 대상의 위치 계산
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = targetPosition - 110;

        smoothScrollTo(offsetPosition, 800); // 부드러운 스크롤 실행
      } else {
        console.warn(`Element with class '${targetClass}' not found!`);
      }
    });
  });

  // 부드러운 스크롤 함수
  function smoothScrollTo(targetPosition, duration) {
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = ease(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    // easeInOutQuad 이징 함수
    function ease(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // 메인 로고 클릭 시 첫 번째 페이지로 스크롤
  const mainLogo = document.querySelector(".main-logo"); 
  const targetElement = document.querySelector("#firstpage");
  const navBarHeight = 110;

  if (mainLogo && targetElement) {
    mainLogo.addEventListener("click", (event) => {
      event.preventDefault(); // 기본 동작 방지

      const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navBarHeight;
      
      smoothScrollTo(targetPosition, 1000); // 부드러운 스크롤
    });
  } else {
    console.warn("main-logo 또는 #firstpage 요소를 찾을 수 없습니다.");
  }

  // 부드러운 스크롤 함수
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

    // Ease-In-Out-Quad 이징 함수
    function easeInOutQuad(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
  }
});


document.addEventListener("DOMContentLoaded", () => {
  // 이미지지에 마우스를 올리면 3D 회전 효과 적용
  const posters = document.querySelectorAll('.HowSweet-img-box > img');

  posters.forEach(poster => {
      const overlay = poster.querySelector('.overlay');
      
      // 마우스 움직임에 따른 회전 효과
      poster.addEventListener('mousemove', (e) => {
          const rect = poster.getBoundingClientRect();
          const x = e.clientX - rect.left; 
          const y = e.clientY - rect.top; 

          // 회전 값 계산
          const rotateY = ((x / rect.width) - 0.5) * 40;
          const rotateX = ((y / rect.height) - 0.5) * -40;
          poster.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });

      // 마우스가 벗어날 때 원래 상태로 복귀
      poster.addEventListener('mouseleave', () => {
          poster.style.transition = "transform 0.5s ease";
          poster.style.transform = 'perspective(1000px) rotate(0deg)';
      });

      if (overlay) {
          overlay.addEventListener('transitionend', () => {
              poster.style.transition = "transform 0.5s ease";
          });
      }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // 이미지 클릭 시 효과 적용
  const image = document.querySelector(".HowSweet-EP-img");

  image.addEventListener("click", () => {
    if (image.classList.contains("clicked")) {
      image.classList.remove("clicked");
      image.classList.add("reverse");
      setTimeout(() => {
        image.classList.remove("reverse"); // 애니메이션 종료 후 상태 초기화
      }, 500); // 애니메이션 종료 후 초기화
    } else {
      image.classList.add("clicked");
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // 클릭 시 링크를 새 창으로 열기
  const box = document.querySelector(".introduction-logo");

  box.addEventListener("click", () => {
    window.open("https://namu.wiki/w/NewJeans", "_blank");
  });
});

// 각 박스를 클릭하면 다른 링크로 이동
document.addEventListener("DOMContentLoaded", () => {
  const box = document.querySelector(".box3");

  box.addEventListener("click", () => {
    window.open("https://namu.wiki/w/Get%20Up(NewJeans)", "_blank");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const box = document.querySelector(".box10");

  box.addEventListener("click", () => {
    window.open("https://www.youtube.com/watch?v=jOTfBlKSQYY", "_blank");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const box = document.querySelector(".box14");

  box.addEventListener("click", () => {
    window.open("https://www.youtube.com/watch?v=ArmDp-zijuc", "_blank");
  });
});


// 슬라이드 기능을 위한 코드
const container = document.querySelector('.container');
const slides = Array.from(document.querySelectorAll('.slide'));
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');

// 슬라이드의 위치를 업데이트하는 함수
function updateSlides() {
  slides.forEach((slide, index) => {
    const offset = index - Math.floor(slides.length / 2); 
    const translateZ = -Math.abs(offset) * 100;
    const translateX = offset * 300;
    slide.style.transform = `translateX(${translateX}px) translateZ(${translateZ}px)`;
    slide.style.opacity = 1 - Math.abs(offset) * 0.2; // 가까운 슬라이드는 더 선명하게
  });
}

// 슬라이드를 뒤로 넘기기
prev.addEventListener('click', () => {
  const firstSlide = slides.shift(); // 첫 번째 슬라이드를 배열에서 빼기
  slides.push(firstSlide); // 배열 끝에 다시 추가
  updateSlides(); // 슬라이드 업데이트
});

// 슬라이드를 앞으로 넘기기
next.addEventListener('click', () => {
  const lastSlide = slides.pop(); // 마지막 슬라이드를 배열에서 빼기
  slides.unshift(lastSlide); // 배열 앞에 다시 추가
  updateSlides(); // 슬라이드 업데이트
});

// 초기 슬라이드 설정
updateSlides();

// 오디오 재생 및 진행 상태 표시
const audio = document.getElementById("track1");
const playStopButton = document.getElementById("play-stop-button");
const progressBar = document.getElementById("progress-bar");

playStopButton.addEventListener("click", () => {
    if (audio.paused) {
        audio.play(); // 오디오 재생
        playStopButton.innerHTML = '<i class="fa-solid fa-stop"></i>'; // 정지 버튼으로 변경
    } else {
        audio.pause(); // 오디오 정지
        audio.currentTime = 0; // 오디오 시작 위치로 설정
        playStopButton.innerHTML = '<i class="fa-solid fa-play"></i>'; // 재생 버튼으로 변경
    }
});

// 오디오의 진행 상황에 맞춰 스크롤바 업데이트
audio.addEventListener("timeupdate", () => {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progress;
});

// 사용자가 스크롤바를 조정하면 오디오의 재생 위치 변경
progressBar.addEventListener("input", () => {
    const newTime = (progressBar.value / 100) * audio.duration;
    audio.currentTime = newTime;
});

document.addEventListener("DOMContentLoaded", () => {
  const playStopButtons = document.querySelectorAll('[id^="play-stop-button"]');
  const progressBars = document.querySelectorAll('[id^="progress-bar"]');
  const audios = document.querySelectorAll('[id^="track"]');
  const slides = Array.from(document.querySelectorAll('.slide')); // 슬라이드 배열로 변환
  const prev = document.querySelector('.prev');
  const next = document.querySelector('.next');
  let currentIndex = 0; // 현재 슬라이드 인덱스

  // 모든 오디오 정지 함수
  const pauseAllAudios = () => {
    audios.forEach((audio, index) => {
      if (!audio.paused) {
        audio.pause(); // 오디오 정지
        audio.currentTime = 0; // 오디오 시작 위치로 설정
        playStopButtons[index].innerHTML = '<i class="fa-solid fa-play"></i>'; // 재생 버튼으로 변경
      }
    });
  };

  // 슬라이드 업데이트 함수
  const updateSlides = () => {
    slides.forEach((slide, index) => {
      slide.style.order = (index - currentIndex + slides.length) % slides.length;
    });
  };

    // prev 버튼 클릭
    prev.addEventListener('click', () => {
    pauseAllAudios(); // 음악 멈추기
    currentIndex = (currentIndex - 1 + slides.length) % slides.length; 
    updateSlides();
  });

  // next 버튼 클릭
  next.addEventListener('click', () => {
    pauseAllAudios(); // 음악 멈추기
    currentIndex = (currentIndex + 1) % slides.length; 
    updateSlides();
  });

  // 오디오 제어
  playStopButtons.forEach((button, index) => {
    const audio = audios[index];
    const progressBar = progressBars[index];

    button.addEventListener("click", () => {
      pauseAllAudios(); // 다른 음악 정지
      if (audio.paused) {
        audio.play(); // 오디오 재생
        button.innerHTML = '<i class="fa-solid fa-stop"></i>';
      } else {
        audio.pause(); // 오디오 정지
        audio.currentTime = 0; // 오디오 시작 위치로 설정
        button.innerHTML = '<i class="fa-solid fa-play"></i>';
      }
    });

    audio.addEventListener("timeupdate", () => {
      const progress = (audio.currentTime / audio.duration) * 100;
      progressBar.value = progress; // 진행 상황 반영
    });

    progressBar.addEventListener("input", () => {
      const newTime = (progressBar.value / 100) * audio.duration;
      audio.currentTime = newTime; // 사용자가 진행 상황을 바꾸면 오디오 위치도 변경
    });
  });

  // 초기 슬라이드 상태 설정
  updateSlides();
});

