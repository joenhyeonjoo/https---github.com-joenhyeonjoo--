document.addEventListener(`DOMContentLoaded`, function () {
  // 탭메뉴 구현
  const submenuTab = document.querySelectorAll(`.in_menu li`);
  const submenuBox = document.querySelector(`.sub_menu_box`);
  const subMenus = document.querySelectorAll(`.sub_menu`);

  submenuTab.forEach((li) => {
    li.addEventListener(`mouseenter`, () => {
      submenuBox.classList.add(`active`);

      subMenus.forEach((tab) => tab.classList.remove(`active`));

      const target = li.dataset.tab;
      const changeTab = document.getElementById(target);
      changeTab.classList.add(`active`);
    });
  });

  submenuBox.addEventListener(`mouseleave`, function () {
    this.classList.remove(`active`);
  });

  // sec_2 스와이퍼
  var swiper = new Swiper(".mySwiper", {
    loop: true,
    speed: 400,

    autoplay: {
      delay: 1500,
      reverseDirection: false,
    },

    breakpoints: {
      760: {
        slidesPerView: 1,
        spaceBetween: 0,
        slidesPerGroup: 1,
      },
      960: {
        slidesPerView: 2,
        spaceBetween: 10,
        slidesPerGroup: 1,
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 16,
        slidesPerGroup: 1,
      },
    },

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
  });

  const swiper2 = new Swiper(".swiper-container", {
    effect: "fade",
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    fadeEffect: {
      crossFade: true,
    },
  });

  // 스크롤 전체 스무스하게설정
  const scroll = new LocomotiveScroll({
    el: document.querySelector("[data-scroll-container]"),
    smooth: true,
    multiplier: 2.5, // 기본값은 1, 숫자가 크면 스크롤이 더 빠름
  });

  // 텍스트 고정
  gsap.registerPlugin(ScrollTrigger);

  // LocomotiveScroll과 ScrollTrigger 연동
  ScrollTrigger.scrollerProxy("[data-scroll-container]", {
    scrollTop(value) {
      return arguments.length
        ? scroll.scrollTo(value, { duration: 0, disableLerp: true })
        : // disableLerp: true를 주면 애니메이션 보정 없이 바로 이동
          scroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    pinType: document.querySelector("[data-scroll-container]").style.transform
      ? "transform"
      : "fixed",
  });

  scroll.on("scroll", ScrollTrigger.update);

  ScrollTrigger.create({
    trigger: ".FlexibleTitle",
    scroller: "[data-scroll-container]", // Locomotive Scroll 쓰니까

    start: "top 70%", // 요소의 상단이 화면의 70% 지점에 닿으면 시작
    end: "bottom-=150 top", // 요소의 하단이 화면의 맨 위에 닿으면 끝 (bottom+=200 으로 하단에서부터 위치조절!)
    pin: true,
    pinSpacing: false,
    scrub: true,
    // markers: true, // 미커
  });

  // in_box 배경 확대 효과
  const inBoxes = document.querySelectorAll(".banner .in_box");

  scroll.on("scroll", (instance) => {
    const scrollY = instance.scroll.y;

    inBoxes.forEach((box) => {
      // 스크롤 위치에 따라 백그라운드 사이즈 조정
      let size = 100 + scrollY * 0.02; // 기본 100%에서 천천히 커지게
      if (size > 120) size = 120; // 최대 120%까지만 확대

      box.style.backgroundSize = `${size}%`;
    });
  });

  // 텍스트 마스킹 순차 애니메이션
  const maskWraps = document.querySelectorAll(".text-mask-wrap");

  maskWraps.forEach((wrap) => {
    const targets = wrap.querySelectorAll(".text-mask-inner");

    gsap
      .timeline({
        scrollTrigger: {
          trigger: wrap,
          scroller: "[data-scroll-container]",
          start: "top 90%", // 시작 시점
          toggleActions: "play none none none", // 스크롤시 1번만 실행
          // scrub: true,    // 스크롤 내릴 때마다 애니메이션 비율 조정
          // markers: true, // 디버깅용
        },
      })
      .to(targets, {
        y: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.15, // 한 줄씩 0.2초 간격으로 순차 실행
      });
  });

  // -----------------------------------------------------------------------

  const accordionBox = document.querySelectorAll(`.accordion_box li`);

  for (let btn of accordionBox) {
    btn.addEventListener(`mouseenter`, function () {
      const subBox = this.querySelector(`.sub_box`);
      subBox.style.maxHeight = `${subBox.scrollHeight}px`;
    });

    btn.addEventListener(`mouseleave`, function () {
      const subBox = this.querySelector(`.sub_box`);

      subBox.style.maxHeight = ``;
    });
  }

  // ------------------------------------------------------------------------

  const menuBox = document.querySelector(`.in_menu`);
  const menuBtn = document.querySelector(`#hamburger`);

  menuBtn.addEventListener(`click`, function () {
    this.classList.toggle(`active`);

    const hasClass = this.classList.contains(`active`);
    if (hasClass) {
      menuBox.classList.add(`active`);
    } else {
      menuBox.classList.remove(`active`);
    }
  });
});
