/* ===========================================================
   Корневое приложение — состояние, модалки, тосты
   =========================================================== */
import { useState, useCallback } from "react";
import { Icon } from "./icons.jsx";
import { Modal, Toast, LeadForm } from "./components.jsx";
import { Header, Hero, Advantages } from "./sections/SectionsTop.jsx";
import { Catalog, WhyUs, Brands } from "./sections/SectionsMid.jsx";
import { About, PriceCTA, Footer } from "./sections/SectionsBottom.jsx";

export default function App() {
  const [modal, setModal] = useState(null); // 'callback' | 'price' | null
  const [toast, setToast] = useState(null);

  const openCallback = useCallback(() => setModal("callback"), []);
  const openPrice = useCallback(() => setModal("price"), []);
  const close = useCallback(() => setModal(null), []);

  const finish = useCallback((kind) => {
    setModal(null);
    setToast(kind === "callback"
      ? "Заявка принята — перезвоним в течение 15 минут"
      : "Спасибо! Прайс-лист придёт в течение рабочего дня");
  }, []);

  return (
    <>
      <Header onPrice={openPrice} />
      <main>
        <Hero onCallback={openCallback} onPrice={openPrice} />
        <Advantages />
        <Catalog onPrice={openPrice} />
        <WhyUs onCallback={openCallback} />
        <Brands />
        <About />
        <PriceCTA onSubmit={() => finish("price")} />
      </main>
      <Footer onPrice={openPrice} onCallback={openCallback} />

      <Modal open={modal === "callback"} onClose={close}>
        <div className="modal__icon"><Icon.phone /></div>
        <h3 style={{ fontSize: 26, marginBottom: 6 }}>Заказать обратный звонок</h3>
        <p style={{ fontSize: 14.5, color: "var(--ink-soft)", marginBottom: 22 }}>
          Оставьте номер — менеджер перезвонит в течение 15 минут в рабочее время.
        </p>
        <LeadForm withConsent source="callback" submitLabel="Жду звонка" onDone={() => finish("callback")} />
      </Modal>

      <Modal open={modal === "price"} onClose={close}>
        <div className="modal__icon"><Icon.tag /></div>
        <h3 style={{ fontSize: 26, marginBottom: 6 }}>Запросить прайс-лист</h3>
        <p style={{ fontSize: 14.5, color: "var(--ink-soft)", marginBottom: 22 }}>
          Вышлем актуальный прайс на 300+ позиций с оптовыми ценами и условиями доставки.
        </p>
        <LeadForm withConsent source="price" submitLabel="Получить прайс" onDone={() => finish("price")} />
      </Modal>

      {toast && <Toast message={toast} onHide={() => setToast(null)} />}
    </>
  );
}
