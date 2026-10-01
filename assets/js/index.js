(function () {
    'use strict';

    /* ===== CV ===== */

    var CV_PATH = 'assets/Asmaa-Mahmoud-El-Hosary-CV.pdf';
    var CV_FILENAME = 'Asmaa-Mahmoud-El-Hosary-CV.pdf';

    document.querySelectorAll('[data-cv]').forEach(function (a) {
        a.setAttribute('href', CV_PATH);
        a.setAttribute('download', CV_FILENAME);
    });


    /* ===== Theme Toggle ===== */

    var root = document.documentElement;
    var toggle = document.getElementById('theme-toggle');
    var metaTheme = document.getElementById('theme-color');
    var media = window.matchMedia('(prefers-color-scheme: dark)');

    function applyTheme(theme) {
        var dark = theme === 'dark';

        root.classList.toggle('dark', dark);

        var label = dark
            ? 'Switch to light theme'
            : 'Switch to dark theme';

        toggle.setAttribute('aria-label', label);
        toggle.setAttribute('title', label);
        toggle.setAttribute('aria-pressed', String(dark));

        if (metaTheme) {
            metaTheme.setAttribute(
                'content',
                dark ? '#0e0f11' : '#ffffff'
            );
        }
    }

    function saved() {
        try {
            return localStorage.getItem('theme');
        } catch (e) {
            return null;
        }
    }

    applyTheme(root.classList.contains('dark') ? 'dark' : 'light');

    toggle.addEventListener('click', function () {
        var next = root.classList.contains('dark')
            ? 'light'
            : 'dark';

        root.classList.add('theme-anim');
        applyTheme(next);

        try {
            localStorage.setItem('theme', next);
        } catch (e) {}

        setTimeout(function () {
            root.classList.remove('theme-anim');
        }, 450);
    });

    // Follow system theme until the visitor chooses one manually
    if (media.addEventListener) {
        media.addEventListener('change', function (e) {
            if (!saved()) {
                applyTheme(e.matches ? 'dark' : 'light');
            }
        });
    }


    /* ===== Mobile Menu ===== */

    var burger = document.getElementById('burger');
    var mobile = document.getElementById('mobile');

    function setMenu(open) {
        mobile.classList.toggle('open', open);

        burger.setAttribute('aria-expanded', String(open));

        burger.setAttribute(
            'aria-label',
            open ? 'Close menu' : 'Open menu'
        );

        burger.firstElementChild.className = open
            ? 'fa-solid fa-xmark'
            : 'fa-solid fa-bars';
    }

    burger.addEventListener('click', function () {
        setMenu(!mobile.classList.contains('open'));
    });

    mobile.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
            setMenu(false);
        });
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && mobile.classList.contains('open')) {
            setMenu(false);
            burger.focus();
        }
    });

    window.addEventListener('resize', function () {
        if (window.innerWidth > 980) {
            setMenu(false);
        }
    });


    /* ===== Active Section ===== */

    var map = [
        ['hero-section', 'hero-section'],
        ['about', 'about'],
        ['skills-section', 'skills-section'],
        ['portfolio', 'portfolio'],
        ['experience', 'experience'],
        ['services', 'experience'],
        ['testimonials', 'contact'],
        ['contact', 'contact']
    ];

    var navLinks = document.querySelectorAll(
        '.links a, .mobile a:not(.btn)'
    );

    var ticking = false;

    function spy() {
        var y = window.scrollY + 140;
        var cur = map[0][1];

        map.forEach(function (item) {
            var el = document.getElementById(item[0]);

            if (el && el.offsetTop <= y) {
                cur = item[1];
            }
        });

        if (
            window.innerHeight + window.scrollY >=
            document.body.offsetHeight - 4
        ) {
            cur = 'contact';
        }

        navLinks.forEach(function (a) {
            var active = a.getAttribute('href') === '#' + cur;

            a.classList.toggle('active', active);

            if (active) {
                a.setAttribute('aria-current', 'true');
            } else {
                a.removeAttribute('aria-current');
            }
        });

        ticking = false;
    }

    window.addEventListener(
        'scroll',
        function () {
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(spy);
            }
        },
        { passive: true }
    );

    spy();


    /* ===== Project Filters ===== */

    var btns = document.querySelectorAll('.portfolio-filter');
    var items = document.querySelectorAll('.portfolio-item');

    btns.forEach(function (button) {
        button.addEventListener('click', function () {
            var filter = button.dataset.filter;

            btns.forEach(function (item) {
                var active = item === button;

                item.classList.toggle('active', active);
                item.setAttribute('aria-pressed', String(active));
            });

            items.forEach(function (item) {
                item.hidden = !(
                    filter === 'all' ||
                    item.dataset.category === filter
                );
            });
        });
    });


    /* ===== Reveal Animation ===== */

    var rv = document.querySelectorAll('.rv');

    if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        var element = entry.target;

                        element.classList.add('in');
                        io.unobserve(element);

                        setTimeout(function () {
                            element.style.transitionDelay = '';
                        }, 900);
                    }
                });
            },
            {
                threshold: 0.12
            }
        );

        rv.forEach(function (element, index) {
            element.style.transitionDelay =
                (index % 4) * 60 + 'ms';

            io.observe(element);
        });
    } else {
        rv.forEach(function (element) {
            element.classList.add('in');
        });
    }

})();