"use client";
import { useState } from "react";

function ChevronIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export default function FaqAccordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="faq-list">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div className="faq-item" key={item.q}>
            <button
              type="button"
              className={`faq-question ${isOpen ? "open" : ""}`}
              onClick={() => setOpenIndex(isOpen ? -1 : i)}
              aria-expanded={isOpen}
            >
              {item.q}
              <ChevronIcon />
            </button>
            {isOpen && <p className="faq-answer">{item.a}</p>}
          </div>
        );
      })}
    </div>
  );
}
