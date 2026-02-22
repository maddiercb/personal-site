const container = document.getElementById("reviewCards");

reviews.forEach(review => {
  const cardWrapper = document.createElement("div");
  cardWrapper.classList.add("review-col");

  cardWrapper.innerHTML = `
    <div class="review-card">

      <div class="review-image">
        <img src="${review.image}" alt="${review.title}">
      </div>

      <div class="review-body">
        <h3 class="review-title">${review.title}</h3>

        <p class="review-details">
          ${review.location} · ${review.date}
        </p>

        <p class="review-excerpt">
          ${review.excerpt}
        </p>

        <a href="${review.link}" target="_blank" class="review-button">
          ${review.linkText} 
        </a>
      </div>

    </div>
  `;

  container.appendChild(cardWrapper);
});