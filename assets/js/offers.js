(function () {
  function formatBRL(value) {
    return Number(value).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  }

  const wrapper = document.getElementById("offers-swiper-wrapper");
  if (!wrapper) return;

  fetch("assets/data/offers.json", { cache: "no-cache" })
    .then((res) => {
      if (!res.ok) throw new Error("Failed to load offers.json");
      return res.json();
    })
    .then((items) => {
      if (!Array.isArray(items)) return;
      const frag = document.createDocumentFragment();

      items.forEach((item) => {
        const slide = document.createElement("div");
        slide.className = "swiper-slide";

        slide.innerHTML = `
              <div class="single-service-signle-wrapper">
                  <div class="product-image">
                      <img class="image" src="${item.icon}" alt="${item.title}">
                  </div>
                  <div class="information">
                      <h5 class="title">${item.title || ""}</h5>
                      <p class="price">${formatBRL(item.price) || ""} <span class="price-each">cada</span></p>
                  </div>
              </div>
          `;
        frag.appendChild(slide);
      });

      wrapper.innerHTML = "";
      wrapper.appendChild(frag);
    })
    .catch((err) => {
      console.error(err);
    });
})();
