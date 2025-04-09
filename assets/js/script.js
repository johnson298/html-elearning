document.addEventListener("DOMContentLoaded", function () {
	// Get the header element
	const header = document.querySelector(".header");
	let headerHeight = header.offsetHeight; // Get the header height
	let ticking = false; // For scroll performance

	// Function to handle scroll events
	function handleScroll() {
		const currentScrollTop = window.scrollY;

		// Add or remove sticky class based on scroll position
		if (currentScrollTop > 50) {
			// If scrolling down past threshold and header is not already sticky
			if (!header.classList.contains("sticky-active")) {
				// Remove returning class if it exists
				header.classList.remove("returning");
				// Add sticky-active class
				header.classList.add("sticky-active");
			}
		} else {
			// If at top or scrolling back up to top
			if (header.classList.contains("sticky-active")) {
				// Add returning class for animation
				header.classList.add("returning");

				// Wait for animation to complete before removing sticky-active
				setTimeout(() => {
					header.classList.remove("sticky-active");
					header.classList.remove("returning");
				}, 100); // Match this with the animation duration
			}
		}

		// Keep the scrolled class for visual changes (if needed)
		if (currentScrollTop > 50) {
			header.classList.add("scrolled");
		} else {
			header.classList.remove("scrolled");
		}

		ticking = false;
	}

	// Add scroll event listener with requestAnimationFrame for performance
	window.addEventListener("scroll", function () {
		if (!ticking) {
			window.requestAnimationFrame(function () {
				handleScroll();
			});
			ticking = true;
		}
	});

	// Initial check
	handleScroll();

	// Recalculate header height on window resize
	window.addEventListener("resize", function () {
		headerHeight = header.offsetHeight;
		handleScroll();
	});
});
