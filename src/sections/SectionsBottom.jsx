/* ===========================================================
   Секции: О компании · CTA-прайс · Футер
   =========================================================== */
import { Icon } from "../icons.jsx";
import { Reveal, LeadForm } from "../components.jsx";
import { Logo, NAV, PHONE, PHONE_HREF } from "./SectionsTop.jsx";
import warehouseUrl from "../assets/warehouse.jpg";

const ABOUT_POINTS = [
  { ic: "shield", t: "Честность", d: "Прозрачные цены и договорённости, которые мы соблюдаем." },
  { ic: "handshake", t: "Партнёрство", d: "Растём вместе с клиентом — от первой поставки к многолетней работе." },
  { ic: "leaf", t: "Качество", d: "Натуральные белорусские продукты с заводским контролем." },
];

export function About() {
  return (
    <section className="section about" id="about">
      <div className="container about__grid">
        <Reveal className="about__media">
          <img className="about__photo" src={warehouseUrl} alt="Склад «Юг-Стрим» — отгрузка продукции" loading="lazy" />
          <div className="about__mission">
            <Icon.leaf />
            <p>«Создаём долгосрочные отношения на&nbsp;основе честности и&nbsp;взаимного уважения»</p>
          </div>
        </Reveal>

        <div className="about__content">
          <Reveal as="span" className="eyebrow">О компании</Reveal>
          <Reveal delay="1"><h2 className="section-title about__title">
            «Юг-Стрим» — ваш надёжный поставщик белорусских продуктов на&nbsp;Юге России
          </h2></Reveal>
          <Reveal delay="2"><p className="lead about__lead">
            Мы — оптово-розничная компания и официальный дилер белорусских заводов-производителей.
            С базы в&nbsp;Ростове-на-Дону снабжаем магазины, торговые сети, ИП и&nbsp;HoReCa
            качественной продукцией с&nbsp;прямых поставок — без лишних посредников и наценок.
          </p></Reveal>
          <div className="about__points">
            {ABOUT_POINTS.map((p, i) => {
              const I = Icon[p.ic];
              return (
                <Reveal key={p.t} delay={String(i + 2)} className="about__point">
                  <span className="about__point-ic"><I /></span>
                  <div>
                    <h4>{p.t}</h4>
                    <p>{p.d}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- CTA: запрос прайс-листа ---------- */
export function PriceCTA({ onSubmit }) {
  return (
    <section className="section-tight pricecta" id="price">
      <div className="container">
        <div className="pricecta__panel">
          <div className="pricecta__left">
            <Reveal as="span" className="eyebrow on-dark">Запрос прайс-листа</Reveal>
            <Reveal delay="1"><h2 className="section-title" style={{ color: "#fff" }}>
              Получите актуальный прайс<br />на&nbsp;все 500+&nbsp;позиций
            </h2></Reveal>
            <Reveal delay="2"><p className="lead" style={{ color: "rgba(255,255,255,0.85)" }}>
              Оставьте контакты — менеджер вышлет полный прайс с&nbsp;оптовыми ценами
              и&nbsp;условиями доставки в&nbsp;течение рабочего дня.
            </p></Reveal>
            <Reveal delay="3" className="pricecta__bullets">
              {["Оптовые цены под ваш объём", "Условия доставки по вашему городу", "Без обязательств и спама"].map((b) => (
                <span key={b} className="pricecta__bullet"><Icon.check /> {b}</span>
              ))}
            </Reveal>
          </div>
          <Reveal delay="2" className="pricecta__formwrap">
            <div className="pricecta__formcard">
              <h3 className="pricecta__formtitle">Запросить прайс-лист</h3>
              <p className="pricecta__formsub">Заполните форму — это займёт 15&nbsp;секунд</p>
              <LeadForm withConsent source="price" submitLabel="Получить прайс" onDone={onSubmit} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- Футер ---------- */
const STORES = [
  "г. Ростов-на-Дону, пр. Стачки, 31 — оптовый склад",
  "г. Ростов-на-Дону, ул. Малиновского, 25 — розница",
  "г. Ростов-на-Дону, пр. Космонавтов, 2/2 — розница",
];

const GEO = "Ростов-на-Дону · Волгодонск · Новороссийск · Пятигорск · Кисловодск · Ялта · ЮФО · Ставрополье · Крым · ДНР / ЛНР";

export function Footer({ onPrice, onCallback }) {
  return (
    <footer className="footer" id="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <Logo dark />
            <p className="footer__about">
              Оптово-розничная компания. Официальный дилер белорусских
              заводов-производителей продуктов питания. Доставка по&nbsp;Югу России.
            </p>
            <div className="footer__cta">
              <button className="btn btn-primary btn-sm" onClick={onPrice}>Запросить прайс</button>
              <button className="btn btn-outline on-dark btn-sm" onClick={onCallback}>Обратный звонок</button>
            </div>
          </div>

          <div className="footer__col">
            <h5>Разделы</h5>
            <nav>
              {NAV.map(([l, h]) => <a key={l} href={h}>{l}</a>)}
            </nav>
          </div>

          <div className="footer__col">
            <h5>Контакты</h5>
            <a href={PHONE_HREF} className="footer__contact"><Icon.phone /> {PHONE}</a>
            <a href="mailto:info@ugstrim.ru" className="footer__contact"><Icon.mail /> info@ugstrim.ru</a>
            <a href="#footer" className="footer__contact"><Icon.telegram /> Telegram-канал</a>
            <p className="footer__hours">Пн–Пт 9:00–18:00 · Сб 9:00–14:00</p>
          </div>

          <div className="footer__col">
            <h5>Розничные магазины</h5>
            {STORES.map((s) => (
              <span key={s} className="footer__store"><Icon.pin /> {s}</span>
            ))}
          </div>
        </div>

        <div className="footer__geo">
          <span className="footer__geo-label">География поставок</span>
          <span className="footer__geo-list">{GEO}</span>
        </div>

        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} ООО «Юг-Стрим». Все права защищены.</span>
          <div className="footer__legal">
            <a href="#" onClick={(e)=>e.preventDefault()}>Политика конфиденциальности</a>
            <a href="#" onClick={(e)=>e.preventDefault()}>Публичная оферта</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
