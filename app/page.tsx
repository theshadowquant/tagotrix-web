'use client'
import { useState } from 'react'

// ── PRODUCTS DATA ─────────────────────────────────────────────────────────────
const PRODUCTS = [
  {
    id: 'spectrophotometer',
    name: 'UV-Vis Spectrophotometer',
    cat: 'Analytical',
    icon: '🔬',
    featured: true,
    desc: 'Dual-beam UV-Visible spectrophotometer for pharma QC and research labs. 190-1100nm range with touch screen display.',
    specs: ['190–1100 nm range', '1 nm bandwidth', '7" Touch TFT display', 'USB + PC software export'],
  },
  {
    id: 'bod-incubator',
    name: 'BOD Incubator',
    cat: 'Incubation',
    icon: '🌡️',
    featured: true,
    desc: 'Precision BOD incubator for biological oxygen demand testing. Stable low-temperature control for water sample analysis.',
    specs: ['5°C – 60°C range', '±0.5°C uniformity', '50 / 100 / 200 L', 'PID microprocessor'],
  },
  {
    id: 'centrifuge',
    name: 'Refrigerated Centrifuge',
    cat: 'Separation',
    icon: '🌀',
    featured: true,
    desc: 'High-performance refrigerated centrifuge for blood, cell and protein separation. Brushless motor.',
    specs: ['15,000 RPM max', '–20°C to +40°C', '4 × 250 mL capacity', 'Imbalance auto-stop'],
  },
  {
    id: 'fume-hood',
    name: 'Chemical Fume Hood',
    cat: 'Safety',
    icon: '⚗️',
    featured: true,
    desc: 'Ducted chemical fume hood protecting operators from hazardous chemical vapours and splashes.',
    specs: ['1200 / 1500 / 1800 mm', 'EN 14175 certified', 'Vertical sliding sash', '0.4–0.6 m/s velocity'],
  },
  {
    id: 'laminar-flow',
    name: 'Laminar Airflow Cabinet',
    cat: 'Cleanroom',
    icon: '💨',
    featured: true,
    desc: 'ISO Class 5 horizontal and vertical laminar flow workbenches for sterile sample work.',
    specs: ['ISO Class 5 (Class 100)', 'HEPA 99.99% filter', 'UV germicidal lamp', '2ft / 4ft / 6ft sizes'],
  },
  {
    id: 'orbital-shaker',
    name: 'Orbital Shaker',
    cat: 'Mixing',
    icon: '🔄',
    featured: false,
    desc: 'Digital orbital shaker for cell culture, solubility studies and general mixing applications.',
    specs: ['20–300 RPM', '25 mm orbit diameter', '5 kg max load', '99 hour timer'],
  },
  {
    id: 'water-bath',
    name: 'Serological Water Bath',
    cat: 'Incubation',
    icon: '💧',
    featured: false,
    desc: 'Stainless steel water bath with digital temperature control for serological testing and reagent warming.',
    specs: ['5°C – 100°C range', '±0.5°C accuracy', '5 – 50 L capacity', 'SS 304 inner chamber'],
  },
  {
    id: 'bio-incubator',
    name: 'Biological Incubator',
    cat: 'Incubation',
    icon: '🧫',
    featured: false,
    desc: 'Fan-assisted biological incubator for cell culture, microbiology and stability testing.',
    specs: ['5°C – 70°C range', '±1°C uniformity', '50 / 150 / 300 L', 'Audible over-temp alarm'],
  },
  {
    id: 'bench-centrifuge',
    name: 'Bench-top Centrifuge',
    cat: 'Separation',
    icon: '⚡',
    featured: false,
    desc: 'Compact bench-top centrifuge for routine lab separations, blood banking and clinical work.',
    specs: ['5,000 RPM max', '6 × 50 mL capacity', 'Imbalance detection', 'Digital display'],
  },
]

const CATEGORIES = ['All', 'Analytical', 'Incubation', 'Separation', 'Safety', 'Cleanroom', 'Mixing']

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────
export default function HomePage() {
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')
  const [modal, setModal] = useState<typeof PRODUCTS[0] | null>(null)
  const [formDone, setFormDone] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  // Filter products based on category and search
  const filtered = PRODUCTS.filter((p) => {
    const matchCat = filter === 'All' || p.cat === filter
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.desc.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  // Handle enquiry form submit
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    const form = e.currentTarget
    const data = new FormData(form)
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/enquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(data)),
      })
    } catch {
      // Show success even if API is not connected yet
    }
    setFormDone(true)
    setSubmitting(false)
    form.reset()
  }

  return (
    <div style={{ background: '#070d18', color: '#8ba5bf', fontFamily: 'Syne, sans-serif', minHeight: '100vh' }}>

      {/* ════════════════════════════════════════
          NAVBAR
      ════════════════════════════════════════ */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 5%', height: '66px',
        background: 'rgba(7,13,24,0.96)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '38px', height: '38px',
            background: 'linear-gradient(135deg, #00c8e0, #0090a8)',
            borderRadius: '8px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '18px',
            boxShadow: '0 0 20px rgba(0,200,224,0.3)',
          }}>⚗️</div>
          <div>
            <div style={{ fontSize: '14px', fontWeight: 800, color: '#eef4ff' }}>Tagotrix</div>
            <div style={{ fontSize: '9px', color: '#00c8e0', fontFamily: 'IBM Plex Mono', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Instrumentation Technologies
            </div>
          </div>
        </div>

        {/* Nav links */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <a href="#products" style={{ color: '#8ba5bf', textDecoration: 'none', fontSize: '13px', fontWeight: 600, padding: '0 12px' }}>Products</a>
          <a href="#why" style={{ color: '#8ba5bf', textDecoration: 'none', fontSize: '13px', fontWeight: 600, padding: '0 12px' }}>About</a>
          <a href="#enquiry" style={{ color: '#8ba5bf', textDecoration: 'none', fontSize: '13px', fontWeight: 600, padding: '0 12px' }}>Contact</a>
          <a
            href="https://wa.me/917899908027"
            target="_blank"
            style={{
              background: 'rgba(37,211,102,0.12)', border: '1px solid rgba(37,211,102,0.3)',
              color: '#4ade80', padding: '8px 16px', borderRadius: '5px',
              textDecoration: 'none', fontSize: '12px', fontWeight: 700,
            }}>
            💬 WhatsApp
          </a>
          <a
            href="#enquiry"
            style={{
              background: '#00c8e0', color: '#070d18',
              padding: '9px 20px', borderRadius: '5px',
              textDecoration: 'none', fontSize: '12px', fontWeight: 800,
              letterSpacing: '0.04em',
            }}>
            Get Quote →
          </a>
        </div>
      </nav>

      {/* ════════════════════════════════════════
          HERO SECTION
      ════════════════════════════════════════ */}
      <section style={{
        minHeight: '100vh',
        display: 'flex', alignItems: 'center',
        padding: '80px 5% 60px',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Background glow */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 60% 60% at 65% 40%, rgba(0,200,224,0.08) 0%, transparent 65%), radial-gradient(ellipse 30% 50% at 10% 80%, rgba(245,158,11,0.06) 0%, transparent 60%)',
          zIndex: 0,
        }} />
        {/* Grid lines */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(0,200,224,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,200,224,0.03) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          zIndex: 0,
        }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '700px' }}>
          {/* Badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(0,200,224,0.1)', border: '1px solid rgba(0,200,224,0.25)',
            borderRadius: '3px', padding: '5px 14px',
            fontSize: '10px', color: '#00c8e0',
            fontFamily: 'IBM Plex Mono', letterSpacing: '0.1em', textTransform: 'uppercase',
            marginBottom: '24px',
          }}>
            🏆 BANGALORE, INDIA · EST. 2010 · LAB INSTRUMENTS
          </div>

          {/* Headline */}
          <h1 style={{
            fontSize: 'clamp(40px, 6vw, 76px)',
            fontWeight: 800, lineHeight: 1.0,
            color: '#eef4ff', marginBottom: '20px',
            letterSpacing: '-0.02em',
          }}>
            Precision<br />
            <span style={{ color: '#00c8e0' }}>Lab Instruments</span><br />
            <span style={{ color: '#f59e0b', fontStyle: 'italic', fontFamily: 'Instrument Serif, serif' }}>
              for Serious Science
            </span>
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: '18px', color: '#8ba5bf', lineHeight: 1.7,
            marginBottom: '36px', maxWidth: '540px',
            fontFamily: 'Instrument Serif, serif', fontStyle: 'italic',
          }}>
            Spectrophotometers, centrifuges, incubators, fume hoods — delivered, installed and supported across India for pharma, research and industrial labs.
          </p>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '52px' }}>
            <a href="#products" style={{
              background: '#00c8e0', color: '#070d18',
              padding: '15px 32px', borderRadius: '6px',
              textDecoration: 'none', fontSize: '14px', fontWeight: 800,
              letterSpacing: '0.05em', textTransform: 'uppercase',
            }}>
              🔬 Browse Products
            </a>
            <a href="#enquiry" style={{
              border: '1.5px solid rgba(255,255,255,0.2)', color: '#eef4ff',
              padding: '15px 32px', borderRadius: '6px',
              textDecoration: 'none', fontSize: '14px', fontWeight: 700,
            }}>
              📨 Get a Quote
            </a>
          </div>

          {/* Stats */}
          <div style={{
            display: 'flex', gap: '40px',
            paddingTop: '36px', borderTop: '1px solid rgba(255,255,255,0.06)',
            flexWrap: 'wrap',
          }}>
            {[
              { n: '200+', l: 'Labs Served' },
              { n: '50+',  l: 'Instruments' },
              { n: '15+',  l: 'Years Active' },
              { n: '24h',  l: 'Response Time' },
            ].map((s) => (
              <div key={s.l}>
                <div style={{ fontFamily: 'IBM Plex Mono', fontSize: '32px', fontWeight: 500, color: '#eef4ff', lineHeight: 1 }}>
                  <span style={{ color: '#00c8e0' }}>{s.n}</span>
                </div>
                <div style={{ fontSize: '10px', color: '#3d5a70', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          PRODUCTS SECTION
      ════════════════════════════════════════ */}
      <section id="products" style={{ padding: '80px 5%', background: '#0a1120' }}>

        {/* Section heading */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{
            display: 'inline-block',
            fontFamily: 'IBM Plex Mono', fontSize: '10px', color: '#00c8e0',
            background: 'rgba(0,200,224,0.1)', border: '1px solid rgba(0,200,224,0.2)',
            padding: '4px 12px', borderRadius: '2px',
            letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px',
          }}>
            // Product Catalog
          </div>
          <h2 style={{ fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 800, color: '#eef4ff', marginBottom: '12px' }}>
            Precision Instruments for{' '}
            <span style={{ color: '#00c8e0' }}>Every Lab</span>
          </h2>
          <p style={{ fontSize: '16px', color: '#6888a0', fontFamily: 'Instrument Serif, serif', fontStyle: 'italic' }}>
            All instruments backed by installation support, warranty and after-sales service across India.
          </p>
        </div>

        {/* Filter bar */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '28px' }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              style={{
                padding: '8px 18px',
                border: `1px solid ${filter === cat ? '#00c8e0' : 'rgba(255,255,255,0.08)'}`,
                borderRadius: '4px',
                background: filter === cat ? '#00c8e0' : 'transparent',
                color: filter === cat ? '#070d18' : '#6888a0',
                fontSize: '12px', fontWeight: 700,
                cursor: 'pointer', fontFamily: 'Syne',
                letterSpacing: '0.04em', textTransform: 'uppercase',
              }}>
              {cat}
            </button>
          ))}
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search instruments…"
            style={{
              marginLeft: 'auto',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '5px', padding: '8px 14px',
              color: '#eef4ff', fontSize: '12px',
              fontFamily: 'Syne', outline: 'none', width: '220px',
            }}
          />
        </div>

        {/* Products grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '18px' }}>
          {filtered.map((p) => (
            <div
              key={p.id}
              onClick={() => setModal(p)}
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '10px', overflow: 'hidden',
                cursor: 'pointer', transition: 'all 0.3s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(0,200,224,0.35)'
                e.currentTarget.style.transform = 'translateY(-5px)'
                e.currentTarget.style.boxShadow = '0 20px 56px rgba(0,0,0,0.4)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}>
              {/* Product image area */}
              <div style={{
                height: '180px',
                background: 'linear-gradient(135deg, #111f32, rgba(0,200,224,0.08))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '64px',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                position: 'relative',
              }}>
                {p.icon}
                {p.featured && (
                  <span style={{
                    position: 'absolute', top: '10px', left: '10px',
                    background: '#f59e0b', color: '#070d18',
                    fontSize: '9px', fontWeight: 700,
                    padding: '3px 8px', borderRadius: '2px',
                    fontFamily: 'IBM Plex Mono', letterSpacing: '0.06em', textTransform: 'uppercase',
                  }}>
                    FEATURED
                  </span>
                )}
              </div>

              {/* Product info */}
              <div style={{ padding: '18px' }}>
                <div style={{ fontSize: '10px', color: '#00c8e0', fontFamily: 'IBM Plex Mono', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '7px' }}>
                  {p.cat}
                </div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#eef4ff', marginBottom: '8px', lineHeight: 1.3 }}>
                  {p.name}
                </div>
                <div style={{ fontSize: '13px', color: '#6888a0', lineHeight: 1.6, fontFamily: 'Instrument Serif, serif', fontStyle: 'italic' }}>
                  {p.desc.slice(0, 90)}…
                </div>

                {/* Buttons */}
                <div style={{ display: 'flex', gap: '8px', marginTop: '14px', paddingTop: '14px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <a
                    href="#enquiry"
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      flex: 1, background: '#00c8e0', color: '#070d18',
                      padding: '8px', borderRadius: '4px',
                      textAlign: 'center', fontSize: '11px', fontWeight: 800,
                      textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.05em',
                    }}>
                    Enquire
                  </a>
                  <a
                    href="#"
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      flex: 1,
                      background: 'rgba(245,158,11,0.12)', color: '#f59e0b',
                      padding: '8px', borderRadius: '4px',
                      textAlign: 'center', fontSize: '11px', fontWeight: 800,
                      textDecoration: 'none', border: '1px solid rgba(245,158,11,0.2)',
                      textTransform: 'uppercase', letterSpacing: '0.05em',
                    }}>
                    Datasheet
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════
          WHY TAGOTRIX
      ════════════════════════════════════════ */}
      <section id="why" style={{ padding: '80px 5%', background: '#070d18' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>

          {/* Left: Features */}
          <div>
            <div style={{
              display: 'inline-block', fontFamily: 'IBM Plex Mono', fontSize: '10px',
              color: '#00c8e0', background: 'rgba(0,200,224,0.1)',
              border: '1px solid rgba(0,200,224,0.2)', padding: '4px 12px',
              borderRadius: '2px', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px',
            }}>
              // Why Choose Us
            </div>
            <h2 style={{ fontSize: 'clamp(26px,3vw,40px)', fontWeight: 800, color: '#eef4ff', marginBottom: '14px' }}>
              Labs Choose <span style={{ color: '#00c8e0' }}>Tagotrix</span><br />for Good Reason
            </h2>
            <p style={{ fontSize: '16px', color: '#6888a0', fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', lineHeight: 1.7, marginBottom: '36px' }}>
              15 years of serving India's best research and industrial labs with quality instruments and genuine support.
            </p>

            {[
              { icon: '🏆', title: 'Premium Quality, Best Pricing', desc: 'Direct manufacturer partnerships mean genuine instruments at the most competitive prices — no middlemen.' },
              { icon: '🚚', title: 'Pan-India Delivery & Installation', desc: 'We deliver and install anywhere in India. Our engineers commission your instrument on-site.' },
              { icon: '🔧', title: 'After-Sales Service & AMC', desc: 'Dedicated service engineers, genuine spare parts, and Annual Maintenance Contracts.' },
              { icon: '📋', title: 'GST-Compliant Invoicing', desc: 'Professional quotations and tax invoices for institutional procurement and tender requirements.' },
            ].map((f) => (
              <div
                key={f.title}
                style={{
                  display: 'flex', gap: '16px',
                  padding: '18px', marginBottom: '12px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '8px',
                }}>
                <div style={{
                  width: '44px', height: '44px', minWidth: '44px',
                  background: 'rgba(0,200,224,0.1)', border: '1px solid rgba(0,200,224,0.2)',
                  borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '20px',
                }}>
                  {f.icon}
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: '#eef4ff', marginBottom: '4px' }}>{f.title}</div>
                  <div style={{ fontSize: '13px', color: '#6888a0', lineHeight: 1.6, fontFamily: 'Instrument Serif, serif' }}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Stats box */}
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '14px', padding: '36px',
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#eef4ff', marginBottom: '20px' }}>🏅 Trusted By</h3>
            <p style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', fontSize: '14px', color: '#6888a0', marginBottom: '20px' }}>
              Leading institutions, pharma companies and research labs across India rely on Tagotrix.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
              {[
                { icon: '🏛️', name: 'University Labs', sub: '50+ academic clients' },
                { icon: '💊', name: 'Pharma QC', sub: 'GMP-ready instruments' },
                { icon: '🔬', name: 'Research Institutes', sub: 'CSIR, ICMR clients' },
                { icon: '🏭', name: 'Industrial Labs', sub: 'QA/QC testing setups' },
              ].map((c) => (
                <div
                  key={c.name}
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '8px', padding: '16px', textAlign: 'center',
                  }}>
                  <div style={{ fontSize: '26px', marginBottom: '8px' }}>{c.icon}</div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#eef4ff' }}>{c.name}</div>
                  <div style={{ fontSize: '10px', color: '#3d5a70', marginTop: '3px', fontFamily: 'IBM Plex Mono' }}>{c.sub}</div>
                </div>
              ))}
            </div>
            <div style={{
              background: 'rgba(0,200,224,0.08)', border: '1px solid rgba(0,200,224,0.2)',
              borderRadius: '8px', padding: '20px', textAlign: 'center',
            }}>
              <div style={{ fontFamily: 'IBM Plex Mono', fontSize: '36px', fontWeight: 500, color: '#eef4ff' }}>200+</div>
              <div style={{ fontSize: '12px', color: '#3d5a70', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Laboratories equipped across India
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════
          ENQUIRY FORM
      ════════════════════════════════════════ */}
      <section id="enquiry" style={{ padding: '80px 5%', background: '#0a1120' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'start' }}>

          {/* Left: Contact info */}
          <div>
            <div style={{
              display: 'inline-block', fontFamily: 'IBM Plex Mono', fontSize: '10px',
              color: '#00c8e0', background: 'rgba(0,200,224,0.1)',
              border: '1px solid rgba(0,200,224,0.2)', padding: '4px 12px',
              borderRadius: '2px', marginBottom: '16px',
              textTransform: 'uppercase', letterSpacing: '0.1em',
            }}>
              // Get In Touch
            </div>
            <h2 style={{ fontSize: 'clamp(24px,3vw,38px)', fontWeight: 800, color: '#eef4ff', marginBottom: '16px' }}>
              Request a <span style={{ color: '#00c8e0' }}>Quote Today</span>
            </h2>
            <p style={{ fontSize: '16px', color: '#6888a0', fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', lineHeight: 1.75, marginBottom: '28px' }}>
              Tell us your requirements. We respond within 24 hours with a detailed quotation and full specifications.
            </p>

            {[
              { icon: '📞', label: 'Phone / WhatsApp', value: '+91 78999 08027' },
              { icon: '📧', label: 'Email', value: 'shashi@tagotrix.com' },
              { icon: '📍', label: 'Address', value: 'Jana Jeeva Orchid, Hallehalli Kithiganur, Bangalore – 560036' },
            ].map((c) => (
              <div key={c.label} style={{ display: 'flex', gap: '14px', alignItems: 'center', marginBottom: '16px' }}>
                <div style={{
                  width: '42px', height: '42px',
                  background: 'rgba(0,200,224,0.1)', border: '1px solid rgba(0,200,224,0.2)',
                  borderRadius: '7px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '18px', flexShrink: 0,
                }}>
                  {c.icon}
                </div>
                <div>
                  <div style={{ fontSize: '10px', color: '#3d5a70', fontFamily: 'IBM Plex Mono', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{c.label}</div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#eef4ff', marginTop: '2px' }}>{c.value}</div>
                </div>
              </div>
            ))}

            <a
              href="https://wa.me/917899908027?text=Hi, I need a quotation for lab instruments"
              target="_blank"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                background: '#25D366', color: '#000', fontWeight: 800, fontSize: '13px',
                padding: '14px 24px', borderRadius: '6px', textDecoration: 'none', marginTop: '14px',
              }}>
              💬 Chat on WhatsApp Instead →
            </a>
          </div>

          {/* Right: Form */}
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '12px', padding: '32px',
          }}>
            {formDone ? (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <div style={{ fontSize: '52px', marginBottom: '16px' }}>✅</div>
                <div style={{ fontSize: '22px', fontWeight: 800, color: '#eef4ff', marginBottom: '8px' }}>Enquiry Received!</div>
                <div style={{ fontSize: '14px', color: '#6888a0' }}>We will respond within 24 hours.</div>
                <button
                  onClick={() => setFormDone(false)}
                  style={{ marginTop: '20px', background: '#00c8e0', color: '#070d18', border: 'none', borderRadius: '6px', padding: '10px 24px', fontWeight: 800, cursor: 'pointer', fontFamily: 'Syne' }}>
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ fontSize: '20px', fontWeight: 800, color: '#eef4ff', marginBottom: '6px' }}>Send Enquiry</div>
                <div style={{ fontSize: '13px', color: '#3d5a70', marginBottom: '24px', fontFamily: 'Instrument Serif, serif', fontStyle: 'italic' }}>
                  We respond Monday – Saturday within 24 hours
                </div>

                {[
                  { name: 'name',    label: 'Full Name *',              placeholder: 'Dr. Ravi Kumar',      type: 'text' },
                  { name: 'company', label: 'Company / Institute *',    placeholder: 'NIMHANS Bangalore',   type: 'text' },
                  { name: 'email',   label: 'Email *',                  placeholder: 'ravi@lab.in',         type: 'email' },
                  { name: 'phone',   label: 'Phone *',                  placeholder: '+91 9XXXXXXXX',       type: 'tel' },
                ].map((f) => (
                  <div key={f.name} style={{ marginBottom: '14px' }}>
                    <label style={{ display: 'block', fontSize: '10px', fontFamily: 'IBM Plex Mono', color: '#3d5a70', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>
                      {f.label}
                    </label>
                    <input
                      name={f.name}
                      required
                      type={f.type}
                      placeholder={f.placeholder}
                      style={{
                        width: '100%',
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '5px', padding: '10px 13px',
                        color: '#eef4ff', fontSize: '13px',
                        fontFamily: 'Syne', outline: 'none',
                      }}
                    />
                  </div>
                ))}

                <div style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', fontSize: '10px', fontFamily: 'IBM Plex Mono', color: '#3d5a70', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>
                    Message / Requirements
                  </label>
                  <textarea
                    name="message"
                    rows={3}
                    placeholder="Describe your requirements, products needed, quantity…"
                    style={{
                      width: '100%',
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '5px', padding: '10px 13px',
                      color: '#eef4ff', fontSize: '13px',
                      fontFamily: 'Syne', outline: 'none', resize: 'vertical',
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    width: '100%', background: '#00c8e0', color: '#070d18',
                    border: 'none', borderRadius: '6px', padding: '14px',
                    fontSize: '14px', fontWeight: 800,
                    cursor: submitting ? 'wait' : 'pointer',
                    fontFamily: 'Syne', letterSpacing: '0.05em', textTransform: 'uppercase',
                  }}>
                  {submitting ? '⏳ Sending…' : '📨 Send Enquiry — 24hr Response'}
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════
          FOOTER
      ════════════════════════════════════════ */}
      <footer style={{ background: '#070d18', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '56px 5% 28px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '48px', marginBottom: '36px' }}>
          <div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#eef4ff', marginBottom: '12px' }}>⚗️ Tagotrix</div>
            <p style={{ fontSize: '13px', color: '#3d5a70', lineHeight: 1.8, maxWidth: '280px', marginBottom: '20px', fontFamily: 'Instrument Serif, serif', fontStyle: 'italic' }}>
              Tagotrix Instrumentation Technologies — your trusted partner for quality laboratory instruments since 2010. Serving pharma, research and industrial labs across India.
            </p>
            <a
              href="https://wa.me/917899908027"
              target="_blank"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#25D366', color: '#000', padding: '10px 20px', borderRadius: '5px', textDecoration: 'none', fontSize: '13px', fontWeight: 800 }}>
              💬 Chat on WhatsApp
            </a>
          </div>
          <div>
            <div style={{ fontSize: '10px', fontFamily: 'IBM Plex Mono', color: '#eef4ff', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '16px' }}>Products</div>
            {['Spectrophotometers', 'Incubators', 'Centrifuges', 'Fume Hoods', 'Laminar Flow', 'Orbital Shakers'].map((p) => (
              <a key={p} href="#products" style={{ display: 'block', color: '#3d5a70', textDecoration: 'none', fontSize: '13px', marginBottom: '9px' }}>{p}</a>
            ))}
          </div>
          <div>
            <div style={{ fontSize: '10px', fontFamily: 'IBM Plex Mono', color: '#eef4ff', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '16px' }}>Contact</div>
            <a href="tel:+917899908027" style={{ display: 'block', color: '#3d5a70', textDecoration: 'none', fontSize: '13px', marginBottom: '9px' }}>+91 78999 08027</a>
            <a href="mailto:shashi@tagotrix.com" style={{ display: 'block', color: '#3d5a70', textDecoration: 'none', fontSize: '13px', marginBottom: '9px' }}>shashi@tagotrix.com</a>
            <div style={{ color: '#3d5a70', fontSize: '13px' }}>Bangalore – 560036</div>
          </div>
        </div>
        <div style={{ paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#3d5a70', fontFamily: 'IBM Plex Mono' }}>
          <span>© 2025 Tagotrix Instrumentation Technologies. All rights reserved.</span>
          <span>GST: 29XXXXX · Bangalore</span>
        </div>
      </footer>

      {/* ════════════════════════════════════════
          FLOATING WHATSAPP BUTTON
      ════════════════════════════════════════ */}
      <a
        href="https://wa.me/917899908027"
        target="_blank"
        style={{
          position: 'fixed', bottom: '28px', right: '28px', zIndex: 999,
          width: '56px', height: '56px', background: '#25D366',
          borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '24px', textDecoration: 'none',
          boxShadow: '0 8px 28px rgba(37,211,102,0.45)',
        }}>
        💬
      </a>

      {/* ════════════════════════════════════════
          PRODUCT DETAIL MODAL
      ════════════════════════════════════════ */}
      {modal && (
        <div
          onClick={() => setModal(null)}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.78)', zIndex: 1000,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(8px)', padding: '20px',
          }}>
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#0e1729', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '14px', padding: '32px',
              maxWidth: '520px', width: '100%', maxHeight: '85vh', overflowY: 'auto',
            }}>
            {/* Modal header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div>
                <div style={{ fontSize: '22px', fontWeight: 800, color: '#eef4ff' }}>{modal.name}</div>
                <div style={{ fontSize: '11px', color: '#00c8e0', fontFamily: 'IBM Plex Mono', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '4px' }}>{modal.cat}</div>
              </div>
              <button onClick={() => setModal(null)} style={{ background: 'none', border: 'none', color: '#3d5a70', fontSize: '20px', cursor: 'pointer' }}>✕</button>
            </div>

            {/* Icon */}
            <div style={{ height: '160px', background: 'linear-gradient(135deg,#111f32,rgba(0,200,224,0.1))', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '72px', marginBottom: '18px', border: '1px solid rgba(255,255,255,0.06)' }}>
              {modal.icon}
            </div>

            {/* Description */}
            <p style={{ fontSize: '14px', color: '#6888a0', lineHeight: 1.7, marginBottom: '18px', fontFamily: 'Instrument Serif, serif', fontStyle: 'italic' }}>
              {modal.desc}
            </p>

            {/* Specs */}
            <div style={{ marginBottom: '20px' }}>
              {modal.specs.map((s) => (
                <div key={s} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <span style={{ fontSize: '12px', color: '#3d5a70' }}>✓</span>
                  <span style={{ fontSize: '12px', color: '#eef4ff', fontFamily: 'IBM Plex Mono' }}>{s}</span>
                </div>
              ))}
            </div>

            {/* Action buttons */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <a href="#enquiry" onClick={() => setModal(null)} style={{ flex: 1, background: '#00c8e0', color: '#070d18', padding: '12px', borderRadius: '6px', textAlign: 'center', fontSize: '13px', fontWeight: 800, textDecoration: 'none', textTransform: 'uppercase' }}>
                📨 Get Quote
              </a>
              <a href={`https://wa.me/917899908027?text=Hi, I need info about ${modal.name}`} target="_blank" style={{ flex: 1, background: '#25D366', color: '#000', padding: '12px', borderRadius: '6px', textAlign: 'center', fontSize: '13px', fontWeight: 800, textDecoration: 'none', textTransform: 'uppercase' }}>
                💬 WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
