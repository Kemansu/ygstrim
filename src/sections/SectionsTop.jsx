/* ===========================================================
   Секции: Шапка · Hero · Преимущества
   =========================================================== */
import { useState, useEffect } from "react";
import { Icon } from "../icons.jsx";
import { Reveal } from "../components.jsx";
import logoUrl from "../assets/logo.png";
import heroUrl from "../assets/hero.jpg";

export const NAV = [
  ["Главная", "#top"],
  ["Каталог", "#catalog"],
  ["О компании", "#about"],
  ["Партнёры", "#brands"],
  ["Сотрудничество", "#why"],
  ["Вакансии", "#footer"],
  ["Контакты", "#footer"],
];

export const PHONE = "+7 (863) 305-13-30";
export const PHONE_HREF = "tel:+78633051330";

/* ---------- Логотип ---------- */
export function Logo() {
  return (
    <a href="#top" className="logo" aria-label="Юг-Стрим">
      <img className="logo__img" src={logoUrl} alt="Юг-Стрим" />
    </a>
  );
}

/* ---------- Шапка ---------- */
export function Header({ onPrice }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // блокируем прокрутку на <html>, а не на <body>:
    // overflow:hidden на body ломает position:sticky шапки (её отбрасывает наверх)
    document.documentElement.classList.toggle("no-scroll", open);
    return () => document.documentElement.classList.remove("no-scroll");
  }, [open]);

  return (
    <>
      <header className={`hdr ${scrolled ? "hdr--solid" : ""}`}>
        <div className="container hdr__row">
        <Logo />
        <nav className="hdr__nav">
          {NAV.map(([label, href]) => (
            <a key={label} href={href} onClick={() => setOpen(false)}>{label}</a>
          ))}
        </nav>
        <div className="hdr__actions">
          <a href={PHONE_HREF} className="hdr__phone">
            <Icon.phone /> <span>{PHONE}</span>
          </a>
          <a href="#footer" className="hdr__tg" aria-label="Telegram"><Icon.telegram /></a>
          <button className="btn btn-primary btn-sm hdr__cta" onClick={onPrice}>Запросить прайс</button>
          <button className="hdr__burger" onClick={() => setOpen(!open)} aria-label="Меню">
            {open ? <Icon.close /> : <Icon.menu />}
          </button>
        </div>
        </div>
      </header>

      {/* Мобильное меню — ВНЕ <header>: иначе backdrop-filter шапки
          (.hdr--solid) делает её containing block для position:fixed и
          схлопывает меню при прокрутке */}
      <div className={`mnav ${open ? "mnav--open" : ""}`}>
        <nav>
          {NAV.map(([label, href]) => (
            <a key={label} href={href} onClick={() => setOpen(false)}>{label} <Icon.arrow /></a>
          ))}
        </nav>
        <div className="mnav__foot">
          <a href={PHONE_HREF} className="mnav__phone"><Icon.phone /> {PHONE}</a>
          <button className="btn btn-primary btn-block" onClick={() => { setOpen(false); onPrice(); }}>Запросить прайс-лист</button>
        </div>
      </div>
    </>
  );
}

/* ---------- Hero ---------- */
export function Hero({ onCallback, onPrice }) {
  return (
    <section className="hero" id="top">
      <div className="container hero__grid">
        <div className="hero__content">
          <Reveal as="span" className="eyebrow">Официальный дилер заводов Беларуси</Reveal>
          <Reveal delay="1"><h1 className="h-display hero__title">
            Белорусские продукты оптом с доставкой по&nbsp;Югу России
          </h1></Reveal>
          <Reveal delay="2"><p className="lead hero__lead">
            Прямые поставки с&nbsp;более чем 15&nbsp;заводов Беларуси. Свыше 300&nbsp;наименований
            молочки, колбас, деликатесов и&nbsp;бакалеи — со&nbsp;склада в&nbsp;Ростове-на-Дону,
            собственным автотранспортом по&nbsp;всему Югу.
          </p></Reveal>
          <Reveal delay="3" className="hero__cta">
            <button className="btn btn-primary btn-lg" onClick={onCallback}>
              <Icon.phone /> Заказать обратный звонок
            </button>
            <button className="btn btn-outline btn-lg" onClick={onPrice}>
              Запросить прайс-лист <Icon.arrow />
            </button>
          </Reveal>
          <Reveal delay="4" className="hero__trust">
            {[["300+", "наименований"], ["15+", "заводов-партнёров"], ["1000+", "клиентов"]].map(([n, l]) => (
              <div key={l} className="hero__stat">
                <strong>{n}</strong><span>{l}</span>
              </div>
            ))}
          </Reveal>
        </div>

        <Reveal delay="2" className="hero__media">
          <img className="hero__photo" src={heroUrl} alt="Сотрудник «Юг-Стрим» на складе" />
          <div className="hero__badge hero__badge--1">
            <span className="hero__badge-ic"><Icon.shield /></span>
            <div><strong>Прямые поставки</strong><em>без посредников, с заводов</em></div>
          </div>
          <div className="hero__badge hero__badge--2">
            <span className="hero__badge-ic"><Icon.truck /></span>
            <div><strong>Своя логистика</strong><em>ЮФО · Ставрополье · Крым</em></div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- 3 преимущества ---------- */
const ADV = [
  { ic: "box", title: "Ассортимент", lead: "Более 300 наименований в наличии и под заказ — молочка, колбасы, деликатесы, бакалея, кондитерка и напитки.", tag: "300+ позиций" },
  { ic: "truck", title: "Доставка", lead: "Собственный автотранспорт по ЮФО, Ставрополью, Крыму и Донбассу. Чёткие сроки и контроль температуры.", tag: "Своя логистика" },
  { ic: "handshake", title: "Сотрудничество", lead: "Гибкие цены под объём, отсрочка для постоянных партнёров и взаимовыгодные условия для сетей и HoReCa.", tag: "Гибкие условия" },
];

export function Advantages() {
  return (
    <section className="section-tight adv">
      <div className="container">
        <div className="adv__grid">
          {ADV.map((a, i) => {
            const I = Icon[a.ic];
            return (
              <Reveal key={a.title} delay={String(i + 1)} className="adv__card card">
                <span className="adv__ic"><I /></span>
                <span className="adv__tag">{a.tag}</span>
                <h3 className="adv__title">{a.title}</h3>
                <p className="adv__lead">{a.lead}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
