(function () {
  function createWhatsappLink(loja) {
    // Remove spaces, parentheses, and hyphens from the whatsapp number
    const waNumber = loja.whatsapp.replace(/[\s()-.]/g, '');
    return `https://wa.me/+55${waNumber}?text=Olá Loja ${loja.loja}, preciso de informações.`;
  }

  function createStoreActionButton (loja) {
    if (loja.whatsapp !== "") {
      return `<a href="${createWhatsappLink(loja)}" target="_blank" class="store-action col-12"><i class="fab fa-whatsapp"></i></a>`
    } else {
      return `<span class="store-action">L${loja.loja}</span>`;
    }
  }

  const container = document.getElementById('our-stores');
  container.innerHTML = ''; // Limpa o conteúdo

  fetch("assets/data/store.json", { cache: "no-cache" })
    .then((res) => {
      if (!res.ok) throw new Error("Failed to load offers.json");
      return res.json();
    })
    .then((lojas) => {
      if (!Array.isArray(lojas)) return;

      lojas.forEach(loja => {
        const lojaDiv = document.createElement('div');
        lojaDiv.classList.add('col-lg-4');
        lojaDiv.classList.add('col-md-6');
        lojaDiv.classList.add('col-sm-12');

        lojaDiv.innerHTML = `
         <div class="store">
            <div class="store-action-button">
                ${createStoreActionButton(loja)}
            </div>
            
            <div class="store-detail-container">
                <div class="store-name">
                    <h6>${loja.cidade}</h6>
                    <span>Loja ${loja.loja}</span>
                </div>
                <div class="store-details">
                    <a href="#" target="_blank" class="col-12"><strong>Telefone fixo:</strong> ${loja.telefoneFixo || 'N/A'}</a>
                    <a href="#" target="_blank" class="col-12"><strong>Whatsapp:</strong> ${loja.whatsapp || 'N/A'}</a>
                    <a href="#" target="_blank" class="col-12"><strong>Endereço:</strong> ${loja.endereco || 'N/A'}</a>
                </div>
                <div class="store-working-hours">
                    <div class="opening-time-inner col-12">
                      <div class="single-opening">
                        <p class="day"><strong>Dias úteis</strong></p>
                        <p class="time">08.00 - 18:00</p>
                      </div>
                      <div class="single-opening">
                        <p class="day"><strong>Sábado</strong></p>
                        <p class="time">08:00 - 13.00</p>
                      </div>
                      <div class="single-opening">
                        <p class="day"><strong>Domingo</strong></p>
                        <p class="time">Fechado</p>
                      </div>
                    </div>
                </div>
            </div>
          </div>
        `;

        container.appendChild(lojaDiv);
      });
    })
    .catch((err) => {
      console.error(err);
    });
})();
