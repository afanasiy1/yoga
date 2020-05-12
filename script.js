'use strict';
window.addEventListener('DOMContentLoaded', () => {

    const tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }
    hideTabContent(1);

    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    info.addEventListener('click', event => {
        const target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            for (let i = 0; i < tab.length; i++) {
                if (target === tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });

    //timer
    const deadline = '2020-06-22';

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date());
        let seconds = Math.floor((t / 1000) % 60);
        let minutes = Math.floor((t / 1000 / 60) % 60);
        let hours = Math.floor((t / (1000 * 60 * 60)));
        if (hours >= 0 && hours < 10) {
            hours = '0' + hours;
        } else if (hours < 0) {
            hours = '00';
        }
        if (minutes >= 0 && minutes < 10) {
            minutes = '0' + minutes;
        }  else if (minutes < 0) {
            minutes = '00';
        }
        if (seconds >= 0 && seconds < 10) {
            seconds = '0' + seconds;
        }  else if (seconds < 0) {
            seconds = '00';
        }
        return {
            'toral': t,
            hours,
            minutes,
            seconds
        };
    }

    function setClock(id, endtime) {
        const timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds');
        const timeInterval = setInterval(updateClock, 1000);

        function updateClock() {
            const t = getTimeRemaining(endtime);
            hours.textContent = t.hours;
            minutes.textContent = t.minutes;
            seconds.textContent = t.seconds;

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }

        }
    }
    setClock('timer', deadline);

    /// POPUP
    const popup = () => {
        const popupBTN = document.querySelector('.description-btn');
        const overlay = document.querySelector('.overlay');
        const close = document.querySelector('.popup-close');

        popupBTN.addEventListener('click', () => {
            overlay.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
        close.addEventListener('click', () => {
            overlay.style.display = 'none';
            document.body.style.overflow = '';
        });
    };
    popup();
    const popup2 = () => {
        const popupBTN = document.querySelector('.more ');
        const overlay = document.querySelector('.overlay');
        const close = document.querySelector('.popup-close');

        popupBTN.addEventListener('click', () => {
            overlay.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
        close.addEventListener('click', () => {
            overlay.style.display = 'none';
            document.body.style.overflow = '';
        });
    };
    popup2();
    // send form
    const sendForm = () => {
        const message = {
            loading: 'загрузка...',
            success: 'спасибо! скоро мы с вами свяжемся!',
            failure: 'что-то пошло не так...'
        };
        const form = document.getElementById('form'),
            input = form.getElementsByTagName('input'),
            statusMessage = document.createElement('div');

        statusMessage.classList.add('status');

        form.addEventListener('submit', event => {
            event.preventDefault();
            form.appendChild(statusMessage);

            const request = new XMLHttpRequest();
            request.open('POST', 'server.php');
            request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

            const formData = new FormData(form);
            const obj = {};
            formData.forEach((value, key) => {
                obj[key] = value;
            });
            const json = JSON.stringify(obj);
            request.send(json);

            request.addEventListener('readystatechange', () => {
                if (request.readyState < 4) {
                    statusMessage.innerHTML = message.loading;
                } else if (request.readyState === 4 && request.status === 200) {
                    statusMessage.innerHTML = message.success;
                } else {
                    statusMessage.innerHTML = message.failure;
                }
            });
            for (let i = 0; i < input.length; i++) {
                input[i].value = '';
            }
        });

    };
    sendForm();



    // SLIDERRRRRRR
    const slider = ()  => {

        let slideIndex = 1;
        const slides = document.querySelectorAll('.slider-item');
        const prev = document.querySelector('.prev');
        const next = document.querySelector('.next');
        const dotsWrap = document.querySelector('.slider-dots');
        const dots = document.querySelectorAll('.dot');

        const showSlides = n => {
            if (n > slides.length) {
                slideIndex = 1;
            }
            if (n < 1) {
                slideIndex = slides.length;
            }

            slides.forEach(item => item.style.display = 'none');

            dots.forEach(item => item.classList.remove('dot-active'));

            slides[slideIndex - 1].style.display = 'block';

            dots[slideIndex - 1].classList.add('dot-active');

        };
        showSlides(slideIndex);


        const plusSildes = n => {
            showSlides(slideIndex += n);
        };
        const currentSlide = n => {
            showSlides(slideIndex = n);
        };

        prev.addEventListener('click', () => {
            plusSildes(-1);
        });
        next.addEventListener('click', () => {
            plusSildes(1);
        });

        dotsWrap.addEventListener('click', event => {
            for (let i = 0; i < dots.length + 1; i++) {
                if (event.target.classList.contains('dot') && event.target === dots[i - 1]) {
                    currentSlide(i);
                }
            }
        });
    };
    slider();

    // CALCULATORRRRRRRRRRR

    const calc = () => {

        const persons = document.querySelectorAll('.counter-block-input')[0];
        const restDays = document.querySelectorAll('.counter-block-input')[1];
        const place = document.getElementById('select');
        const totalValue = document.getElementById('total');
        let personsSum = 0;
        let daysSum = 0;
        let total = 0;

        totalValue.innerHTML = 0;

        persons.addEventListener('change', function() {
            personsSum = +this.value;
            total = (daysSum + personsSum) * 4000;

            if (restDays.value === '') {
                totalValue.innerHTML = 0;
            } else {
                totalValue.innerHTML = total;
            }
        });

        restDays.addEventListener('change', function() {
            daysSum = +this.value;
            total = (daysSum + personsSum) * 4000;

            if (persons.value === '') {
                totalValue.innerHTML = 0;
            } else {
                totalValue.innerHTML = total;
            }
        });

        place.addEventListener('change', function() {
            if (restDays.value === '' || persons.value === '') {
                totalValue.innerHTML = 0;
            } else {
                const a = total;
                totalValue.innerHTML = a * this.options[this.selectedIndex].value;
            }
        });
    };
    calc();

    //scroll
    const scroll = () => {
        const closeBtn = document.querySelector('.close-btn');
        const anchors = document.querySelectorAll('a[href^="#"]');

        for (const anchor of anchors) {
            anchor.addEventListener('click', e => {
                e.preventDefault();
                if (e.target !== closeBtn) {
                    const blockID = anchor.getAttribute('href');
                    document.querySelector(blockID).scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        }
    };
    scroll();











});

