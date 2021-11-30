const yearEl = document.querySelector('.year');
const mobileNavBtn = document.querySelector('.btn-mobile-nav');
const headerEl = document.querySelector('.header');
const allLinks = document.querySelectorAll('a:link');
const sectionHeroEl = document.querySelector('.section-hero');

// auto set current year
const currYear = new Date().getFullYear();
yearEl.textContent = currYear;

// toggle menu in mobile phone
mobileNavBtn.addEventListener('click', function () {
	headerEl.classList.toggle('nav-open');
});

// smooth scrolling
allLinks.forEach(link => {
	link.addEventListener('click', function (e) {
		e.preventDefault();

		const href = link.getAttribute('href');

		if (href === '#') {
			window.scrollTo({
				top: 0,
				behavior: 'smooth',
			});
		}

		if (href !== '#' && href.startsWith('#')) {
			const section = document.querySelector(href);
			section.scrollIntoView({ behavior: 'smooth' });
		}

		// close navigation on mobile
		if (link.classList.contains('main-nav-link')) {
			headerEl.classList.toggle('nav-open');
		}
	});
});

// sticky navigation
const obs = new IntersectionObserver(
	function (entries) {
		const ent = entries[0];

		if (!ent.isIntersecting) {
			document.body.classList.add('sticky');
		}

		if (ent.isIntersecting) {
			document.body.classList.remove('sticky');
		}
	},
	{
		// In the viewport
		root: null,
		threshold: 0,
		rootMargin: '-80px',
	}
);
obs.observe(sectionHeroEl);

///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
	var flex = document.createElement('div');
	flex.style.display = 'flex';
	flex.style.flexDirection = 'column';
	flex.style.rowGap = '1px';

	flex.appendChild(document.createElement('div'));
	flex.appendChild(document.createElement('div'));

	document.body.appendChild(flex);
	var isSupported = flex.scrollHeight === 1;
	flex.parentNode.removeChild(flex);
	console.log(isSupported);

	if (!isSupported) document.body.classList.add('no-flexbox-gap');
}
checkFlexGap();
