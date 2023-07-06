// https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
document.addEventListener("DOMContentLoaded", () => {
  console.log("jcommerce JS imported successfully!");
});

// star rating stars
document.addEventListener("DOMContentLoaded", function () {
  let ratingValue = 4;
  let starsHTML = "";

  for (let i = 1; i <= 5; i++) {
    if (i <= ratingValue) {
      starsHTML += '<i class="fas fa-star"></i>'; // Filled star
    } else {
      starsHTML += '<i class="far fa-star"></i>'; // Empty star
    }
  }

  const ratingElement = document.querySelector(".rating");
  ratingElement.innerHTML = starsHTML;
});

// favorites

// const heart = document.querySelector(".heart");
// heart.addEventListener('click', () => {

//   heart.classList.remove('far');
//   heart.classList.add('fas');
// })
