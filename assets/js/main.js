/* HOKKARI · comportamento do site. Os dados vêm de config.js (window.HOKKARI). */
(function () {
  "use strict";
  var C = window.HOKKARI;
  if (!C) return;

  var $$ = function (sel) { return Array.prototype.slice.call(document.querySelectorAll(sel)); };
  var brl = function (v) { return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }); };
  var waLink = function (msg) { return "https://wa.me/" + C.whatsapp + "?text=" + encodeURIComponent(msg); };

  // ---- Links de WhatsApp (produtos, B2B, geral) ----
  $$("[data-wa]").forEach(function (a) {
    var key = a.getAttribute("data-wa");
    var msg = C.produtos[key] ? C.produtos[key].mensagem : C.mensagens[key] || C.mensagens.geral;
    a.href = waLink(msg);
  });
  $$("[data-wa-display]").forEach(function (el) { el.textContent = C.whatsappDisplay; });

  // ---- Cardápio, Instagram, endereço, horários ----
  $$("[data-cardapio]").forEach(function (a) { a.href = C.cardapioUrl; });
  $$("[data-ig]").forEach(function (a) { a.href = "https://instagram.com/" + C.instagram; });
  $$("[data-ig-display]").forEach(function (el) { el.textContent = "@" + C.instagram; });

  var e = C.endereco;
  $$("[data-endereco]").forEach(function (el) {
    el.innerHTML = "";
    [e.rua, e.bairro + ", " + e.cidade + " - " + e.uf, e.cep].forEach(function (line, i) {
      if (i) el.appendChild(document.createElement("br"));
      el.appendChild(document.createTextNode(line));
    });
  });
  $$("[data-maps]").forEach(function (a) {
    a.href = "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent(e.rua + ", " + e.cidade + " - " + e.uf + ", " + e.cep);
  });
  $$("[data-horarios]").forEach(function (ul) {
    ul.innerHTML = "";
    C.horarios.forEach(function (h) {
      var li = document.createElement("li"); li.textContent = h; ul.appendChild(li);
    });
  });

  // ---- Preço e peso dos produtos ----
  Object.keys(C.produtos).forEach(function (k) {
    var p = C.produtos[k];
    $$('[data-preco="' + k + '"]').forEach(function (el) { el.textContent = brl(p.preco); });
    $$('[data-peso="' + k + '"]').forEach(function (el) { el.textContent = p.peso; });
  });
  $$("[data-ano]").forEach(function (el) { el.textContent = new Date().getFullYear(); });

  // ---- Dados estruturados schema.org (Bakery + produtos) ----
  if (document.body.hasAttribute("data-no-schema") === false) {
    var schema = {
      "@context": "https://schema.org",
      "@type": "Bakery",
      name: "Hokkari",
      description: "Panificação japonesa moderna. Shokupan premium, pães artesanais orientais, café e lanches.",
      url: C.siteUrl,
      image: C.siteUrl + "/assets/img/og-image.jpg",
      telephone: "+" + C.whatsapp,
      priceRange: "R$",
      servesCuisine: ["Japonesa", "Padaria", "Café"],
      address: {
        "@type": "PostalAddress",
        streetAddress: e.rua,
        addressLocality: e.cidade,
        addressRegion: e.uf,
        postalCode: e.cep,
        addressCountry: "BR"
      },
      sameAs: ["https://instagram.com/" + C.instagram],
      hasMenu: new URL(C.cardapioUrl, location.href).href,
      makesOffer: Object.keys(C.produtos).map(function (k) {
        var p = C.produtos[k];
        return {
          "@type": "Offer",
          price: p.preco.toFixed(2),
          priceCurrency: "BRL",
          availability: "https://schema.org/InStock",
          itemOffered: { "@type": "Product", name: p.nome, weight: p.peso, brand: { "@type": "Brand", name: "Hokkari" } }
        };
      })
    };
    if (C.horariosSchema.length) schema.openingHours = C.horariosSchema;
    var s = document.createElement("script");
    s.type = "application/ld+json";
    s.textContent = JSON.stringify(schema);
    document.head.appendChild(s);
  }

  // ---- Menu mobile ----
  var toggle = document.querySelector(".menu-toggle");
  var nav = document.getElementById("menu");
  if (toggle && nav) {
    var setOpen = function (open) {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
      nav.classList.toggle("is-open", open);
    };
    toggle.addEventListener("click", function () { setOpen(toggle.getAttribute("aria-expanded") !== "true"); });
    nav.addEventListener("click", function (ev) { if (ev.target.closest("a")) setOpen(false); });
    document.addEventListener("keydown", function (ev) {
      if (ev.key === "Escape" && nav.classList.contains("is-open")) { setOpen(false); toggle.focus(); }
    });
  }

  // ---- Header com borda ao rolar ----
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () { header.classList.toggle("is-scrolled", window.scrollY > 8); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // ---- Cardápio: destaca a categoria visível no menu de categorias ----
  var chips = $$(".menu-nav a");
  if (chips.length && "IntersectionObserver" in window) {
    var byId = {};
    chips.forEach(function (a) { byId[a.getAttribute("href").slice(1)] = a; });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        chips.forEach(function (a) { a.classList.remove("is-active"); a.removeAttribute("aria-current"); });
        var a = byId[en.target.id];
        if (!a) return;
        a.classList.add("is-active"); a.setAttribute("aria-current", "true");
        a.parentNode.parentNode.scrollTo({ left: a.offsetLeft - 20, behavior: "smooth" });
      });
    }, { rootMargin: "-30% 0px -60% 0px" });
    $$(".menu-group").forEach(function (sec) { spy.observe(sec); });
  }

  // ---- Revelação suave ao rolar ----
  var items = $$(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("is-visible"); });
  }
})();
