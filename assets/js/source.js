// Initialize the first tab
let currentTab = 1;
showTab(currentTab);

function showTab(tabNumber) {
	// Hide all tabs
	const tabs = document.querySelectorAll(".tab-content");
	tabs.forEach((tab) => {
		tab.classList.remove("active");
	});

	// Show the current tab
	document.getElementById(`tab-${tabNumber}`).classList.add("active");

	document.querySelector(".payment-header-b").style.display = tabNumber === 1 ? "block" : "none";

	// Update steps
	updateSteps(tabNumber);
}

function updateSteps(tabNumber) {
	// Reset all steps
	const steps = document.querySelectorAll(".step");
	steps.forEach((step, index) => {
		const stepNum = index + 1;
		step.classList.remove("active", "completed");

		const circle = step.querySelector(".step-circle");
		if (stepNum < tabNumber) {
			// Previous steps are completed
			step.classList.add("completed");
			circle.innerHTML = '<i class="bi bi-check"></i>';
		} else if (stepNum === tabNumber) {
			// Current step is active
			step.classList.add("active");
			circle.innerHTML = stepNum;
		} else {
			// Future steps are neither active nor completed
			circle.innerHTML = stepNum;
		}
	});

	// Mark all steps as completed when on the success page
	if (tabNumber === 3) {
		steps.forEach((step) => {
			step.classList.add("completed");
			const circle = step.querySelector(".step-circle");
			circle.innerHTML = '<i class="bi bi-check"></i>';
		});
	}
}

function nextTab() {
	if (currentTab < 3) {
		currentTab++;
		showTab(currentTab);
	}
}

function prevTab() {
	if (currentTab > 1) {
		currentTab--;
		showTab(currentTab);
	}
}

// Add countdown timer functionality
function startTimer(duration, display) {
	let timer = duration,
		minutes,
		seconds;
	const interval = setInterval(function () {
		minutes = parseInt(timer / 60, 10);
		seconds = parseInt(timer % 60, 10);

		minutes = minutes < 10 ? "0" + minutes : minutes;
		seconds = seconds < 10 ? "0" + seconds : seconds;

		display.textContent = minutes + ":" + seconds;

		if (--timer < 0) {
			clearInterval(interval);
			display.textContent = "00:00";
			// Handle timer expiration
			alert("Thời gian thanh toán đã hết. Vui lòng thử lại.");
		}
	}, 1000);
}

// Start the timer when the page loads (15 minutes)
window.onload = function () {
	const fifteenMinutes = 60 * 15;
	const display = document.querySelector(".timer");

	// Format display initially
	let minutes = parseInt(fifteenMinutes / 60, 10);
	let seconds = parseInt(fifteenMinutes % 60, 10);
	minutes = minutes < 10 ? "0" + minutes : minutes;
	seconds = seconds < 10 ? "0" + seconds : seconds;
	display.textContent = minutes + ":" + seconds;

	// Only start the timer when tab 2 is active
	document.addEventListener("click", function () {
		if (currentTab === 2 && !window.timerStarted) {
			startTimer(fifteenMinutes, display);
			window.timerStarted = true;
		}
	});
};

// Toggle password visibility
document.querySelector(".bi-eye")?.addEventListener("click", function () {
	const passwordField = document.getElementById("password");
	const type = passwordField.getAttribute("type") === "password" ? "text" : "password";
	passwordField.setAttribute("type", type);
	this.classList.toggle("bi-eye");
	this.classList.toggle("bi-eye-slash");
});

// Coupon functionality
document.getElementById("showCoupons").addEventListener("click", function (e) {
	e.preventDefault();
	const couponList = document.getElementById("couponList");
	if (couponList.style.display === "none") {
		couponList.style.display = "flex";
	} else {
		couponList.style.display = "none";
	}
});

// Add click event to all coupon buttons
const couponButtons = document.querySelectorAll(".coupon-btn");
couponButtons.forEach((button) => {
	button.addEventListener("click", function () {
		const couponCode = this.getAttribute("data-code");
		document.getElementById("couponInput").value = couponCode;

		// Optional: Auto-apply the coupon
		// document.getElementById('applyCoupon').click();
	});
});

// Apply coupon button click
document.getElementById("applyCoupon").addEventListener("click", function () {
	const couponCode = document.getElementById("couponInput").value.trim();
	if (couponCode) {
		// Here you would normally verify the coupon with a backend
		// For demo purposes, we'll simulate a discount based on the coupon code
		let discountAmount = 0;

		if (couponCode === "GIAM150K") {
			discountAmount = 150000;
		} else if (couponCode === "GIAM100K") {
			discountAmount = 100000;
		} else if (couponCode === "GIAM50K") {
			discountAmount = 50000;
		} else if (couponCode === "GIAM15OK") {
			discountAmount = 150000;
		}

		if (discountAmount > 0) {
			const originalPrice = 4000000;
			const discountedPrice = originalPrice - discountAmount;

			// Update displayed price
			document.querySelectorAll(".price")[0].textContent = `${discountedPrice.toLocaleString(
				"vi-VN",
			)} VND`;
			document.querySelectorAll(".price")[1].textContent = `${discountedPrice.toLocaleString(
				"vi-VN",
			)} VND`;

			alert(
				`Mã giảm giá ${couponCode} đã được áp dụng. Bạn được giảm ${discountAmount.toLocaleString(
					"vi-VN",
				)} VND`,
			);
		} else {
			alert("Mã giảm giá không hợp lệ hoặc đã hết hạn");
		}
	} else {
		alert("Vui lòng nhập mã giảm giá");
	}
});

// Function to download the QR code image
document.getElementById("download-qr-code").addEventListener("click", function () {
	// Create link element
	const link = document.createElement("a");
	link.href = document.getElementById("payment-qr-code").src;
	link.download = "payment-qr-code.png";

	// Trigger download
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
});

// Open login modal when page loads
// document.addEventListener("DOMContentLoaded", function () {
//   // Get the button that opens the login modal
//   const openLoginModalBtn = document.getElementById("open-login-modal");

//   // Trigger a click on the button to open the login modal
//   if (openLoginModalBtn) {
//     setTimeout(function () {
//       openLoginModalBtn.click();
//     }, 500); // Small delay to ensure everything is loaded
//   }
// });

// Tab switching functionality
document.addEventListener("DOMContentLoaded", function () {
	// Password toggle functionality
	const toggleButtons = document.querySelectorAll(".password-toggle");

	toggleButtons.forEach((button) => {
		button.addEventListener("click", function () {
			const input = this.previousElementSibling;
			const icon = this.querySelector("i");

			if (input.type === "password") {
				input.type = "text";
				icon.classList.replace("bi-eye-slash", "bi-eye");
			} else {
				input.type = "password";
				icon.classList.replace("bi-eye", "bi-eye-slash");
			}
		});
	});
});

// Countdown Timer for Pre-Sell Promotion
document.addEventListener("DOMContentLoaded", function () {
	// Set the target date (replace with your actual target date)
	const targetDate = new Date();
	targetDate.setDate(targetDate.getDate() + 2); // 2 days from now
	targetDate.setHours(targetDate.getHours() + 14); // 14 hours from now
	targetDate.setMinutes(targetDate.getMinutes() + 14); // 14 minutes from now

	// Elements
	const dayElement = document.querySelector(".time-day");
	const hourElement = document.querySelector(".time-hour");
	const minuteElement = document.querySelector(".time-minute");

	function updateCountdown() {
		// Get current date and time
		const currentDate = new Date();

		// Calculate the difference in milliseconds
		const difference = targetDate - currentDate;

		// If countdown is over
		if (difference <= 0) {
			dayElement.textContent = "00";
			hourElement.textContent = "00";
			minuteElement.textContent = "00";
			clearInterval(timerInterval);
			return;
		}

		// Calculate days, hours, minutes
		const days = Math.floor(difference / (1000 * 60 * 60 * 24));
		const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

		// Update the DOM elements
		dayElement.textContent = days < 10 ? "0" + days : days;
		hourElement.textContent = hours < 10 ? "0" + hours : hours;
		minuteElement.textContent = minutes < 10 ? "0" + minutes : minutes;
	}

	// Initial call
	updateCountdown();

	// Update every minute
	const timerInterval = setInterval(updateCountdown, 1000);
});

document.addEventListener("DOMContentLoaded", function () {
	const faqCards = document.querySelectorAll(".faq-card");

	// Set initial state for first card
	const firstCard = document.querySelector(".faq-card.active");
	if (firstCard) {
		const firstAnswer = firstCard.querySelector(".faq-answer");
		firstAnswer.style.maxHeight = firstAnswer.scrollHeight + 10 + "px";
	}

	faqCards.forEach((card) => {
		const question = card.querySelector(".faq-question");
		const answer = card.querySelector(".faq-answer");

		question.addEventListener("click", function () {
			const isActive = card.classList.contains("active");
			const icon = card.querySelector(".faq-icon");

			// Close all cards
			faqCards.forEach((c) => {
				c.classList.remove("active");
				c.querySelector(".faq-icon").textContent = "+";
				c.querySelector(".faq-answer").style.maxHeight = "0";
			});

			// Toggle current card
			if (!isActive) {
				card.classList.add("active");
				icon.textContent = "−";
				answer.style.maxHeight = answer.scrollHeight + 10 + "px";
			}
		});
	});
});
