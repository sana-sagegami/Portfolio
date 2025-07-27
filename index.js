// ポートフォリオサイトの機能
document.addEventListener("DOMContentLoaded", function () {
  // スムーズスクロール（古いブラウザ対応）
  const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
  smoothScrollLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId !== "#") {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: "smooth",
          });
        }
      }
    });
  });

  // パララックス効果（星の動き）
  window.addEventListener("scroll", function () {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll(".star");

    parallaxElements.forEach((element, index) => {
      const speed = 0.5 + index * 0.1;
      const yPos = -(scrolled * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
  });

  // インターセクションオブザーバーでアニメーション最適化
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
      }
    });
  }, observerOptions);

  // アニメーション対象要素の監視
  const animatedElements = document.querySelectorAll(
    ".profile-container, .details-grid, .skills-container"
  );
  animatedElements.forEach((element) => {
    observer.observe(element);
  });
});

// タッチデバイス対応
if ("ontouchstart" in window) {
  document.body.classList.add("touch-device");
}

// パフォーマンス最適化
window.addEventListener("load", function () {
  // 画像の遅延読み込み
  const images = document.querySelectorAll("img[data-src]");
  const imageObserver = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
});
