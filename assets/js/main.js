/**
* Template Name: Logis
* Template URL: https://bootstrapmade.com/logis-bootstrap-logistics-website-template/
* Updated: Jun 29 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });



  document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.querySelector('.gallery');
    const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const popup = document.querySelector('.popup');
    const popupImg = document.querySelector('.popup-img');
    const closeButton = document.querySelector('.close');
    const popupPrevButton = document.querySelector('.popup-prev');
    const popupNextButton = document.querySelector('.popup-next');

    let currentIndex = 0;
    let popupIndex = 0;
    let autoSlideInterval;
    const totalItems = galleryItems.length;

    // Clone the gallery items and append/prepend them to create a seamless loop
    galleryItems.forEach(item => gallery.appendChild(item.cloneNode(true)));
    galleryItems.forEach(item => gallery.prepend(item.cloneNode(true)));

    function getItemsToShow() {
        return window.innerWidth <= 768 ? 1 : 4;
    }

    function showGalleryItem(index) {
        const itemsToShow = getItemsToShow();
        const offset = index * (100 / itemsToShow);
        gallery.style.transition = 'transform 0.5s ease';
        gallery.style.transform = `translateX(-${offset}%)`;

        // Handle the infinite loop transition
        if (index >= totalItems || index < 0) {
            setTimeout(() => {
                gallery.style.transition = 'none';
                gallery.style.transform = `translateX(-${(totalItems + (index % totalItems)) * (100 / itemsToShow)}%)`;
                currentIndex = (index % totalItems) + totalItems;
            }, 500);
        }
    }

    function showPopup(index) {
        popup.style.display = 'flex';
        popupImg.src = galleryItems[index % totalItems].querySelector('img').src;
        popupIndex = index % totalItems;
        clearInterval(autoSlideInterval); // Stop auto-slide when popup is open
    }

    function closePopup() {
        popup.style.display = 'none';
        startAutoSlide(); // Resume auto-slide when popup is closed
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            currentIndex++;
            showGalleryItem(currentIndex);
        }, 3000); // Change image every 3 seconds
    }

    prevButton.addEventListener('click', () => {
        currentIndex--;
        showGalleryItem(currentIndex);
    });

    nextButton.addEventListener('click', () => {
        currentIndex++;
        showGalleryItem(currentIndex);
    });

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => showPopup(index));
    });

    closeButton.addEventListener('click', closePopup);
    
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            closePopup();
        }
    });

    popupPrevButton.addEventListener('click', () => {
        popupIndex = (popupIndex > 0) ? popupIndex - 1 : totalItems - 1;
        showPopup(popupIndex);
    });

    popupNextButton.addEventListener('click', () => {
        popupIndex = (popupIndex < totalItems - 1) ? popupIndex + 1 : 0;
        showPopup(popupIndex);
    });

    window.addEventListener('resize', () => {
        // Adjust the current index when resizing to ensure proper display
        showGalleryItem(currentIndex);
    });

    // Initialize the gallery by positioning it at the middle set of items
    gallery.style.transform = `translateX(-${totalItems * (100 / getItemsToShow())}%)`;
    currentIndex = totalItems;

    startAutoSlide(); // Start the auto-slide on page load
});






})();