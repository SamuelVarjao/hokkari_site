/* =========================================================================
   HOKKARI · CONFIGURAÇÃO CENTRAL
   Edite SOMENTE este arquivo para trocar número, endereço, links e preços.
   Tudo no site (botões, rodapé, dados estruturados) é preenchido a partir daqui.
   ========================================================================= */
window.HOKKARI = {
  // WhatsApp com DDI (55) + DDD + número, apenas dígitos
  whatsapp: "5511952429788",
  whatsappDisplay: "(11) 95242-9788",

  // Página do cardápio virtual (troque pela URL definitiva quando existir)
  cardapioUrl: "cardapio.html",

  instagram: "hokkari.br",

  endereco: {
    rua: "Alameda Cunha Bueno, 410",
    bairro: "Jardim Imperador",
    cidade: "Suzano",
    uf: "SP",
    cep: "08673-240",
  },

  // [HORARIOS] — preencha com o horário real. Ex.: "Ter a Dom · 8h às 19h"
  horarios: ["Horário de funcionamento em breve"],
  // Formato schema.org (opcional). Ex.: ["Tu-Su 08:00-19:00"]
  horariosSchema: [],

  // URL pública do site (usada no Open Graph e nos dados estruturados)
  siteUrl: "https://www.hokkari.com.br",

  produtos: {
    branco: {
      nome: "Shokupan Branco",
      preco: 20.0,
      peso: "500g", // [PESO]
      mensagem:
        "Olá, Hokkari! Gostaria de encomendar o Shokupan Branco (R$ 20,00). Prefiro: [ ] inteiro [ ] fatiado.",
    },
    integral: {
      nome: "Shokupan Integral",
      preco: 20.0,
      peso: "500g", // [PESO]
      mensagem:
        "Olá, Hokkari! Gostaria de encomendar o Shokupan Integral (R$ 20,00). Prefiro: [ ] inteiro [ ] fatiado.",
    },
  },

  mensagens: {
    geral: "Olá, Hokkari! Gostaria de fazer uma encomenda.",
    b2b: "Olá! Tenho uma cafeteria e quero conhecer o Kit Descoberta Hokkari.",
  },
};
