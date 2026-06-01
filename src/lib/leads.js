/* ===========================================================
   Отправка заявок с форм (звонок / прайс).

   Сейчас это ЗАГЛУШКА: ничего не уходит на сервер, просто
   имитируется успешная отправка с задержкой.

   ▸ Чтобы подключить реальную обработку — замените тело
     функции submitLead. Ниже заготовлены два варианта:
     Telegram-бот и обычный POST на свой бэкенд/Formspree.
     Раскомментируйте нужный и удалите блок-заглушку.
   =========================================================== */

/**
 * @typedef {Object} Lead
 * @property {"callback"|"price"} source — откуда заявка
 * @property {string} name — имя
 * @property {string} phone — телефон
 */

/**
 * Отправка заявки. Бросает ошибку, если не удалось отправить.
 * @param {Lead} lead
 * @returns {Promise<void>}
 */
export async function submitLead(lead) {
  // ---- ЗАГЛУШКА (удалить при подключении реальной отправки) ----
  console.info("[lead] заявка (заглушка):", lead);
  await new Promise((r) => setTimeout(r, 700));
  return;

  // ---- ВАРИАНТ 1. Telegram-бот ----
  // const TOKEN = import.meta.env.VITE_TG_TOKEN;     // токен бота из @BotFather
  // const CHAT_ID = import.meta.env.VITE_TG_CHAT_ID; // id чата/канала менеджера
  // const labels = { callback: "Обратный звонок", price: "Запрос прайс-листа" };
  // const text =
  //   `🟢 Новая заявка: ${labels[lead.source] || lead.source}\n` +
  //   `Имя: ${lead.name}\nТелефон: ${lead.phone}`;
  // const res = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ chat_id: CHAT_ID, text }),
  // });
  // if (!res.ok) throw new Error("Не удалось отправить заявку");

  // ---- ВАРИАНТ 2. POST на свой бэкенд / Formspree ----
  // const res = await fetch(import.meta.env.VITE_LEADS_ENDPOINT, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json", Accept: "application/json" },
  //   body: JSON.stringify(lead),
  // });
  // if (!res.ok) throw new Error("Не удалось отправить заявку");
}
