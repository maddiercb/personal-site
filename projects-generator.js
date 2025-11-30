// projects-generator.js

document.addEventListener("DOMContentLoaded", () => {
    initProjectGallery();
});

function initProjectGallery() {
    const cardsContainer = document.getElementById("projectCards");
    const modalsContainer = document.getElementById("projectModals");

    if (!cardsContainer || !modalsContainer) return;

    cardsContainer.innerHTML = "";
    modalsContainer.innerHTML = "";

    projects.forEach(p => {
        if (!p.include) return;

        // Build card and modal
        cardsContainer.appendChild(createProjectCard(p));
        modalsContainer.appendChild(createModal(p));
    });
}

function createProjectCard(p) {
    const card = document.createElement("div");
    card.className = "card" + (p.comingSoon ? " coming-soon" : "");
    card.dataset.bsToggle = "modal";
    card.dataset.bsTarget = `#${p.abbrev}cardModal`;

    const coverPath = `images/${p.folder}/${p.cover}`;

    card.innerHTML = `
        ${p.comingSoon ? '<div class="ribbon">Coming Soon!</div>' : ''}
        <img src="${coverPath}" class="card-img-top" loading="lazy" alt="${p.title}">
        <div class="card-body">
            <h5 class="card-title"><em>${p.title}</em></h5>
            <p class="card-text">${p.byline}</p>
        </div>
    `;

    // Fade-in cover image after load
    const img = card.querySelector("img");
    img.onload = () => img.classList.add("loaded");

    return card;
}

function createModal(p) {
    const modal = document.createElement("div");
    modal.className = "modal fade";
    modal.id = `${p.abbrev}cardModal`;
    modal.tabIndex = -1;
    modal.setAttribute("aria-hidden", "true");

    const carouselId = `${p.abbrev}carouselCard`;

    // Build carousel items
    let carouselItems = "";
    (p.images || []).forEach((filename, i) => {
        const src = `images/${p.folder}/${filename}`;
        carouselItems += `
            <div class="carousel-item ${i === 0 ? "active" : ""}">
                <img src="${src}" class="d-block w-100" loading="lazy" alt="">
            </div>
        `;
    });

    modal.innerHTML = `
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-body">
                    <!-- Carousel -->
                    <div id="${carouselId}" class="carousel slide" data-bs-ride="carousel">
                        <div class="carousel-inner">
                            ${carouselItems}
                        </div>

                        <button class="carousel-control-prev" 
                            type="button" data-bs-target="#${carouselId}" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>

                        <button class="carousel-control-next"
                            type="button" data-bs-target="#${carouselId}" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>

                    <p class="mt-4">
                        ${p.modalHTML}
                    </p>
                </div>
            </div>
        </div>
    `;

    // Preload carousel images and fade in
    modal.querySelectorAll("img").forEach(img => {
        img.onload = () => img.classList.add("loaded");
    });

    return modal;
}
