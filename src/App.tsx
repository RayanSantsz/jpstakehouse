import { useEffect, useState } from 'react';
import { ArrowUpRight, MapPin, Menu as MenuIcon, Phone, Star, X } from 'lucide-react';

type Tab = 'menu' | 'reservas' | 'experiencia' | 'contato';
type Category = 'cortes' | 'bebidas' | 'cervejas' | 'sobremesas';
type MenuItem = { name: string; detail?: string; price?: string };

const photos = {
  hero: 'https://jpsteakhousesalvador.com/cdn/shop/files/WhatsAppImage2025-04-28at14.50.43_41f350d9-428d-490d-8f64-b04f785bfd22.jpg?v=1770839876&width=1600',
  menu: 'https://jpsteakhousesalvador.com/cdn/shop/files/WhatsAppImage2025-03-26at15.36.09.jpg?v=1770839875&width=1400',
  dining: 'https://jpsteakhousesalvador.com/cdn/shop/files/DSC2036.jpg?v=1770839877&width=1400',
  buffet: 'https://jpsteakhousesalvador.com/cdn/shop/files/DSC1861.jpg?v=1770839878&width=1400',
};
const heroVideoSource = import.meta.env.DEV ? '/outputs/assets/steak-sizzle.mp4' : './assets/steak-sizzle.mp4';

const menu: Record<Category, MenuItem[]> = {
  cortes: [
    { name: 'Picanha', detail: 'Capa de gordura generosa que mantém a carne suculenta na brasa.', price: 'RODÍZIO' },
    { name: 'Fraldinha', detail: 'Fibras longas, sabor marcante e grelha no ponto.', price: 'RODÍZIO' },
    { name: 'Cupim', detail: 'Marmoreio abundante e cocção lenta.', price: 'RODÍZIO' },
    { name: 'Alcatra', detail: 'Corte macio, versátil e de sabor equilibrado.', price: 'RODÍZIO' },
    { name: 'Cordeiro · paleta e pernil', detail: 'Carne macia de sabor característico.', price: 'RODÍZIO' },
    { name: 'Frango · coração e coxinha da asa', detail: 'Clássicos grelhados na brasa.', price: 'RODÍZIO' },
    { name: 'Suínos · costela, belly rib e linguiças', detail: 'Costela suína, linguiça apimentada e toscana.', price: 'RODÍZIO' },
    ...['Alcatra com queijo', 'Carne de Sol Angus', 'Baby Beef', 'Beef Ancho', 'Brisket Angus', 'Costela Bovina', 'Bife de Chorizo', 'Costela Prime Angus', 'Ancho com Gorgonzola', 'Assado de tiras Angus', 'Entranha Angus', 'Polpetone'].map((name) => ({ name, price: 'RODÍZIO' })),
  ],
  bebidas: [
    ['Caipiroska Nacional', '33,90'], ['Dry Martini', '33,90'], ['Whisky Sour', '33,90'], ['Umbuzada', '30,90'], ['Soda Baiana', '21,90'], ['Rosa do Sertão', '30,90'], ['Mara Tônica', '21,90'], ['Horizonte', '36,90'], ['Fresh Ginger', '22,90'], ['JP Especial', '37,90'], ['Pink Lemonade', '21,90'], ['Moscow Tropical', '32,90'], ['Soda Italiana', '22,90'], ['Sex on the Beach', '33,90'], ['Negroni', '35,90'], ['Mojito', '33,90'], ['Margarita', '33,90'], ['Gin Tônica', '33,90'], ['Caipirinha', '30,90'], ['Caipifruta', '30,90'], ['Aperol Spritz', '33,90'], ['Carajillo', '39,90'], ['JP Especial sem álcool', '31,90'], ['Coquetel de frutas sem álcool', '24,90'],
  ].map(([name, price]) => ({ name, price: `R$ ${price}` })),
  cervejas: [
    ['Chopp Heineken', '18,90'], ['Stella Pure Gold', '17,90'], ['Stella Artois 550 ml', '21,90'], ['Original 600 ml', '19,90'], ['Corona 330 ml', '18,90'], ['Heineken 600 ml', '27,90'], ['Heineken long neck', '18,90'], ['Amstel 600 ml', '17,90'], ['Chopp Brahma', '17,90'], ['Spaten 600 ml', '20,90'], ['Heineken Zero long neck', '18,90'], ['Corona Zero long neck', '18,90'],
  ].map(([name, price]) => ({ name, price: `R$ ${price}` })),
  sobremesas: [
    ['Doce Tentação', '35,90', 'Chocolate, frutas vermelhas e sorvete de morango.'], ['Morena Tropicana', '32,90', 'Manga, maracujá, frutas vermelhas e sorvete.'], ['Torta Rafaela', '32,90', 'Mousse de limão, abacaxi e creme de leite Ninho.'], ['Torta Kamila', '31,90', 'Brownie de banana e sorvete.'], ['Cheesecake Morango', '33,90', 'Torta de cream cheese.'], ['Cheesecake de doce de leite', '33,90', 'Frutas vermelhas e farofa de tuile.'], ['Churros Maria Antonella', '32,90', 'Doce de leite ou Nutella, morango e sorvete.'], ['Torta Sofia', '33,90', 'Chocolate, Nutella e frutas vermelhas.'], ['Secreto Supreme', '37,90', 'Brownie, sorvete e calda quente.'], ['Pudim de leite', '28,90', 'Chantininho, castanha e frutas vermelhas.'], ['Creme de papaya', '28,90', 'Com licor de cassis.'], ['Cocada com sorvete de tapioca', '32,90'], ['Cheesecake', '29,00', 'Geleia caseira de goiaba ou morango.'], ['Petit Gateau', '31,90', 'Bolinho morno de chocolate e sorvete.'], ['Abacaxi gelado', '9,90', 'Raspas de limão.'], ['Abacaxi grelhado', '10,90', 'Com canela.'],
  ].map(([name, price, detail]) => ({ name, price: `R$ ${price}`, detail })),
};

const categories: { id: Category; label: string }[] = [
  { id: 'cortes', label: 'Cortes' }, { id: 'bebidas', label: 'Bebidas' }, { id: 'cervejas', label: 'Cervejas' }, { id: 'sobremesas', label: 'Sobremesas' },
];
const nav: { id: Tab; label: string }[] = [
  { id: 'menu', label: 'Cardápio' }, { id: 'reservas', label: 'Reservas' }, { id: 'experiencia', label: 'A casa' }, { id: 'contato', label: 'Contato' },
];

function Brand() {
  return <a className="brand" href="#home" aria-label="JP SteakHouse Salvador, início">
    <svg viewBox="0 0 64 70" role="img" aria-label="JP SteakHouse">
      <circle className="brand-ring" cx="32" cy="29" r="27" /><circle className="brand-ring" cx="32" cy="29" r="22.5" />
      <text className="brand-letters" x="13" y="39">JP</text><text className="brand-small" x="8" y="65">STEAKHOUSE</text>
    </svg>
  </a>;
}

function ActionButton({ children, onClick, className = '' }: { children: React.ReactNode; onClick?: () => void; className?: string }) {
  return <button className={`action-button ${className}`} onClick={onClick}>{children}</button>;
}

function FoodMenu() {
  const [category, setCategory] = useState<Category>('cortes');
  const headings: Record<Category, string> = { cortes: 'Cortes nobres na brasa', bebidas: 'Drinks e coquetéis', cervejas: 'Cervejas e chopp', sobremesas: 'Sobremesas da casa' };
  return <>
    <span className="eyebrow-label">{headings[category]}</span>
    <div className="menu-categories" role="tablist" aria-label="Categorias do cardápio">
      {categories.map((item) => <button key={item.id} role="tab" aria-selected={category === item.id} className={category === item.id ? 'selected' : ''} onClick={() => setCategory(item.id)}>{item.label}</button>)}
    </div>
    <ul className="food-list" key={category}>{menu[category].map((item) => <li key={item.name}>
      <div className="food-title"><span>{item.name}</span><span>{item.price}</span></div>
      {item.detail && <p>{item.detail}</p>}
    </li>)}</ul>
    <a className="menu-full" href="https://jpsalvador.reservademesa.com.br/cardapio2" target="_blank" rel="noreferrer">Ver cardápio completo <ArrowUpRight size={15} /></a>
  </>;
}

function Visual({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  return <div className="visual"><img src={src} alt={alt} /><span className="panel-caption">{caption}</span></div>;
}

export default function App() {
  const [videoReady, setVideoReady] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab | null>(() => {
    const initial = window.location.hash.slice(1) as Tab;
    return nav.some((tab) => tab.id === initial) ? initial : null;
  });
  const isOpen = activeTab !== null;

  const openTab = (tab: Tab) => { setMobileMenuOpen(false); setActiveTab(tab); window.history.replaceState(null, '', `#${tab}`); };
  const closeTab = () => { setMobileMenuOpen(false); setActiveTab(null); window.history.replaceState(null, '', '#home'); };

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') closeTab(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return <main className={`stage ${isOpen ? 'is-open' : ''}`}>
    <img className="hero-photo" src={photos.hero} alt="Carnes na brasa da JP SteakHouse Salvador" />
    <video className={`hero-video ${videoReady ? 'is-ready' : ''}`} autoPlay muted loop playsInline preload="auto" aria-hidden="true" onPlaying={() => setVideoReady(true)}>
      <source src={heroVideoSource} type="video/mp4" />
    </video>
    <div className="hero-vignette" aria-hidden="true" />
    <Brand />
    <nav className="top-nav" aria-label="Navegação principal">
      {nav.map((item) => <button key={item.id} className={activeTab === item.id ? 'active' : ''} onClick={() => openTab(item.id)}>{item.label}</button>)}
    </nav>
    <button className={`mobile-menu-trigger ${mobileMenuOpen ? 'is-active' : ''}`} type="button" aria-label={mobileMenuOpen ? 'Fechar navegação' : 'Abrir navegação'} aria-expanded={mobileMenuOpen} aria-controls="mobile-nav-menu" onClick={() => setMobileMenuOpen((open) => !open)}>
      {mobileMenuOpen ? <X size={21} /> : <MenuIcon size={21} />}
    </button>
    <nav id="mobile-nav-menu" className={`mobile-nav-menu ${mobileMenuOpen ? 'is-open' : ''}`} aria-label="Navegação principal para celular" aria-hidden={!mobileMenuOpen}>
      {nav.map((item) => <button key={item.id} className={activeTab === item.id ? 'active' : ''} tabIndex={mobileMenuOpen ? 0 : -1} onClick={() => openTab(item.id)}>{item.label}<ArrowUpRight size={15} /></button>)}
    </nav>

    <section className="home-copy" id="home">
      <p className="home-eyebrow">Saboreie a tradição do<br className="desktop-break" /> verdadeiro churrasco</p>
      <h1>JP SteakHouse</h1>
      <div className="home-city">Salvador</div>
      <div className="rating"><b>4,8</b><span className="stars" aria-label="5 estrelas"><Star /><Star /><Star /><Star /><Star /></span></div>
    </section>
    <div className="ticker">
      <span className="address">R. Manoel Antônio Galvão, 32 · Pituaçu · Salvador - BA</span>
      <a href="tel:+557139013705"><Phone size={13} /> (71) 3901-3705</a>
      <a href="https://wa.me/557196976062" target="_blank" rel="noreferrer">WhatsApp <ArrowUpRight size={14} /></a>
      <a href="https://instagram.com/jpsteakhousesalvador/" target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={14} /></a>
    </div>

    <div className="shade" aria-hidden="true" />
    <aside className="panel" aria-hidden={!isOpen}>
      <ActionButton className="close-button" onClick={closeTab}><X size={15} /> Fechar</ActionButton>
      <nav className="panel-nav" aria-label="Navegação do painel">{nav.map((item) => <button key={item.id} className={activeTab === item.id ? 'active' : ''} onClick={() => openTab(item.id)}>{item.label}</button>)}</nav>

      <section className={`panel-view ${activeTab === 'menu' ? 'active' : ''}`} aria-label="Cardápio">
        <h2>Cardápio</h2><div className="panel-copy menu-copy"><FoodMenu /></div>
        <Visual src={photos.menu} alt="Carnes servidas à mesa na JP SteakHouse" caption="JP SteakHouse Salvador · Pituaçu" />
      </section>

      <section className={`panel-view ${activeTab === 'reservas' ? 'active' : ''}`} aria-label="Reservas e ofertas">
        <h2 className="serif-heading">Reservas</h2><div className="panel-copy reservation-copy">
          {[
            ['Rodízio individual · jantar', 'R$ 99,90', 'Oferta no site oficial'],
            ['Rodízio individual · almoço de domingo', 'R$ 169,90', 'Oferta no site oficial'],
            ['Rodízio para dois · almoço, qui a sáb', 'R$ 299,90', 'Oferta no site oficial'],
            ['Rodízio para dois · almoço, seg a qua', 'R$ 279,90', 'Oferta no site oficial'],
            ['Rodízio para dois · jantar', 'R$ 199,90', 'Oferta no site oficial'],
          ].map(([title, value, note]) => <article className="offer" key={title}><div><strong>{title}</strong><small>{note}</small></div><b>{value}</b></article>)}
          <p className="source-note">Valores promocionais consultados no site oficial; podem mudar. Bebidas e sobremesas não estão incluídas em todos os vouchers.</p>
          <a className="outline-link" href="https://jpsalvador.reservademesa.com.br/booking" target="_blank" rel="noreferrer"><span>Fazer reserva</span><ArrowUpRight size={16} /></a>
        </div><Visual src={photos.dining} alt="Ambiente e buffet da JP SteakHouse Salvador" caption="Reserve sua mesa · JP Salvador" />
      </section>

      <section className={`panel-view ${activeTab === 'experiencia' ? 'active' : ''}`} aria-label="A casa">
        <h2 className="serif-heading">A casa</h2><div className="panel-copy experience-copy">
          <p>Em 19 de fevereiro de 2025, a JP SteakHouse abriu suas portas em Salvador para trazer ao Pituaçu uma nova forma de viver o rodízio.</p>
          <p>A casa nasceu com a experiência da rede em carnes nobres e ganhou um jeito próprio de receber a Bahia: salão amplo, piano ao vivo, vista para o mar e uma mesa que reúne brasa, buffet, saladas, pratos quentes e sushi.</p>
          <p>Desde então, cada visita é pensada para transformar um almoço ou jantar em uma ocasião especial, com atendimento próximo, cortes preparados no ponto e espaço para celebrar.</p>
          <p className="story-signature">JP SteakHouse Salvador<br />Pituaçu · Bahia</p>
        </div><Visual src={photos.buffet} alt="Buffet de saladas e acompanhamentos" caption="Uma experiência premium em Salvador" />
      </section>

      <section className={`panel-view ${activeTab === 'contato' ? 'active' : ''}`} aria-label="Contato e localização">
        <h2 className="serif-heading">Contato</h2><div className="panel-copy contact-copy">
          <div className="contact-block"><small>Endereço</small><div>R. Manoel Antônio Galvão, 32<br />Pituaçu · Salvador - BA<br />CEP 41741-550</div></div>
          <div className="contact-block"><small>Telefone</small><a href="tel:+557139013705">(71) 3901-3705</a></div>
          <div className="contact-block"><small>WhatsApp</small><a href="https://wa.me/557196976062" target="_blank" rel="noreferrer">(71) 9697-6062</a></div>
          <div className="contact-block"><small>Horários</small><div>Abre às 11h30<br />Pico: 16h–23h</div></div>
          <div className="socials"><a href="https://instagram.com/jpsteakhousesalvador/" target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={14} /></a><span>118,5 mil seguidores</span></div>
          <a className="map-link" href="https://www.google.com/maps/search/?api=1&query=JP+SteakHouse+Salvador" target="_blank" rel="noreferrer"><MapPin size={16} /> Abrir no Google Maps <ArrowUpRight size={14} /></a>
        </div><Visual src={photos.dining} alt="Interior da JP SteakHouse Salvador" caption="Pituaçu · Salvador · Bahia" />
      </section>
    </aside>
    <div className="grain" aria-hidden="true" />
  </main>;
}
