import { SITE } from "@/lib/siteData";

const VALUES = [
  {
    title: "Freshness First",
    desc: "Every fruit, vegetable, and dairy item is sourced daily and quality-checked before it reaches your doorstep.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2C7.6 2 4 5.6 4 10c0 5.4 8 12 8 12s8-6.6 8-12c0-4.4-3.6-8-8-8zm0 11a3 3 0 110-6 3 3 0 010 6z" /></svg>
    ),
  },
  {
    title: "Fast Delivery",
    desc: "Most orders reach you within hours, not days — because groceries can't wait.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></svg>
    ),
  },
  {
    title: "Fair Pricing",
    desc: "No hidden markups. We work directly with suppliers to keep prices honest and transparent.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M12 7v10M9 9.5a2.5 2.5 0 012.5-2.5h1a2.5 2.5 0 010 5h-1a2.5 2.5 0 000 5h1a2.5 2.5 0 002.5-2.5" /></svg>
    ),
  },
];

export const metadata = { title: `About Us — ${SITE.name}` };

export default function AboutUsPage() {
  return (
    <div>
      <div className="static-hero">
        <h1>About {SITE.name}</h1>
        <p>Your everyday grocery store, reimagined for the way you actually shop.</p>
      </div>

      <div className="page-container">
        <div className="about-stats">
          <div className="stat"><div className="num">50K+</div><div className="label">Happy Customers</div></div>
          <div className="stat"><div className="num">5,000+</div><div className="label">Products</div></div>
          <div className="stat"><div className="num">120+</div><div className="label">Cities Served</div></div>
          <div className="stat"><div className="num">4.7★</div><div className="label">Average Rating</div></div>
        </div>

        <div className="about-body">
          <p>
            {SITE.name} started with a simple idea — grocery shopping shouldn't be a chore. What began as a
            single neighbourhood store has grown into a platform that brings fresh produce, daily essentials,
            and household needs to thousands of homes every day, without the queues or the guesswork.
          </p>
          <p>
            We work directly with local farmers, trusted brands, and quality-focused suppliers to make sure
            what lands on your doorstep is exactly what you'd pick out yourself — fresh, honestly priced,
            and delivered on time.
          </p>
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 4 }}>What We Stand For</h2>
        <div className="values-grid">
          {VALUES.map((v) => (
            <div className="value-card" key={v.title}>
              <div className="icon-box">{v.icon}</div>
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
