import { useMemo, useState } from 'react'

/* ============================================================
   ШАБЛОН САЙТА РУМИ
   - Шрифты и цвета меняются в src/index.css (блок :root)
   - Картинки: замените пути в объекте IMAGES ниже
   - Тексты лежат прямо в разметке каждой страницы
   ============================================================ */

const IMAGES = {
  hero: '', // например '/images/hero.jpg'
  modelBanner: '',
  businessBanner: '',
  manifest: '',
  salon: '',
  partnerBanner: '',
}

type Page = 'home' | 'salons' | 'business' | 'model' | 'manifest' | 'tariffs' | 'account' | 'dashboard'
/* Роль после входа: клиент — светлая тема, салон — тёмная бизнес-панель */
type Role = null | 'client' | 'business'

const NAV: { id: Page; label: string }[] = [
  { id: 'home', label: 'Главная' },
  { id: 'salons', label: 'Салоны' },
  { id: 'business', label: 'Для бизнеса' },
  { id: 'model', label: 'Стать моделью' },
  { id: 'manifest', label: 'Манифест' },
  { id: 'tariffs', label: 'Тарифы и информация' },
]

/* Слот под изображение: пустой — показывает подпись, с src — картинку */
function Img({ src, label, className = '' }: { src?: string; label: string; className?: string }) {
  return src ? (
    <img src={src} alt={label} className={`img-slot ${className}`} />
  ) : (
    <div className={`img-slot img-empty ${className}`}>
      <span>{label}</span>
    </div>
  )
}

function Header({ page, go, role }: { page: Page; go: (p: Page) => void; role: Role }) {
  const [open, setOpen] = useState(false)
  return (
    <header className="header">
      <div className="wrap header-row">
        <button className="logo" onClick={() => go('home')}>
          руми<i>.</i>
        </button>
        <nav className={open ? 'open' : ''}>
          {NAV.map((n) => (
            <button key={n.id} className={page === n.id ? 'active' : ''} onClick={() => { go(n.id); setOpen(false) }}>
              {n.label}
            </button>
          ))}
        </nav>
        <div className="header-end">
          {role === 'business' ? (
            <button className={`pill pill-biz ${page === 'dashboard' ? 'on' : ''}`} onClick={() => go('dashboard')}>
              <span className="live-dot" />
              <span className="biz-full">Бизнес-управление</span>
              <span className="biz-short">Салон</span>
            </button>
          ) : (
            <button className="pill pill-dark" onClick={() => go('account')}>{role === 'client' ? 'Кабинет' : 'Войти'}</button>
          )}
          <button className="burger" onClick={() => setOpen(!open)} aria-label="Меню">
            <span /><span />
          </button>
        </div>
      </div>
    </header>
  )
}

/* Бирка с логотипом: покачивается, при наведении раскрывает инфо */
function Tag() {
  return (
    <div className="tag" tabIndex={0}>
      <div className="tag-string" />
      <div className="tag-card">
        <div className="tag-hole" />
        <b>руми.</b>
        <small>твой доступ к красоте</small>
        <div className="tag-more">
          <span>30 секунд</span>
          <span>4 клика</span>
          <span>0 звонков</span>
        </div>
      </div>
    </div>
  )
}

function SectionHead({ kicker, title, text }: { kicker?: string; title: React.ReactNode; text?: string }) {
  return (
    <div className="section-head">
      {kicker && <span className="kicker">{kicker}</span>}
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  )
}

function SearchBar({ compact }: { compact?: boolean }) {
  return (
    <form className={`search ${compact ? 'search-compact' : ''}`} onSubmit={(e) => e.preventDefault()}>
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></svg>
      <input placeholder="Маникюр, стрижка, окрашивание, брови…" />
      <button className="pill pill-berry">Найти</button>
    </form>
  )
}

const SALONS = [
  { name: 'Долговременный прикорневой объем • Пампинг', address: 'пер. Карповский, 20А', rating: '0.0', reviews: 0, tags: ['Волосы', 'Укладка'] },
  { name: 'Название салона', address: 'Адрес салона', rating: '4.9', reviews: 128, tags: ['Маникюр', 'Брови'] },
  { name: 'Название салона', address: 'Адрес салона', rating: '4.8', reviews: 64, tags: ['Окрашивание'] },
]

type Salon = (typeof SALONS)[number]
type Book = (s: Salon) => void

function SalonCard({ s, view, book }: { s: Salon; view: 'list' | 'grid'; book: Book }) {
  return (
    <article className={`salon salon-${view}`}>
      <Img src={IMAGES.salon} label="Фото салона" className="salon-img" />
      <div className="salon-body">
        <div className="salon-tags">{s.tags.map((t) => <span key={t}>{t}</span>)}</div>
        <h3>{s.name}</h3>
        <p>{s.address}</p>
        <div className="salon-foot">
          <span className="rating">★ {s.rating} <small>({s.reviews} отзывов)</small></span>
          <button className="pill pill-line" onClick={() => book(s)}>Записаться</button>
        </div>
      </div>
    </article>
  )
}

function Steps({ items }: { items: [string, string][] }) {
  return (
    <ol className="steps">
      {items.map(([t, d], i) => (
        <li key={t}>
          <span className="step-num">0{i + 1}</span>
          <h3>{t}</h3>
          <p>{d}</p>
        </li>
      ))}
    </ol>
  )
}

/* ---------------- ГЛАВНАЯ ---------------- */
function Home({ go, book }: { go: (p: Page) => void; book: Book }) {
  return (
    <>
      <section className="hero wrap">
        <div className="hero-text">
          <span className="kicker">Мастера и салоны в одном приложении</span>
          <h1>руми. Твой доступ <em>к красоте</em></h1>
          <SearchBar />
          <p className="micro">30 секунд · 4 клика · 0 звонков</p>
        </div>
        <Img src={IMAGES.hero} label="Главное фото / иллюстрация" className="hero-img" />
      </section>

      <section className="wrap section">
        <div className="howto">
          <div>
            <SectionHead title={<>Как записаться<em>?</em></>} text="Подберём салон и услуги для вас. Без лишних забот." />
          </div>
          <ul className="howto-list">
            {[
              ['Салон', 'Выберите подходящий салон с нужным мастером.'],
              ['Услуга', 'Выберите, что нужно сделать.'],
              ['Время', 'Возьмите свободное окно.'],
              ['Готово', 'Приходите. Напоминание придёт само.'],
            ].map(([t, d], i) => (
              <li key={t}><span>{i + 1}</span><div><b>{t}</b><p>{d}</p></div></li>
            ))}
          </ul>
        </div>
      </section>

      <section className="wrap section">
        <div className="row-head">
          <SectionHead title="Популярные салоны" text="Лучшие салоны красоты по отзывам пользователей руми" />
          <button className="link" onClick={() => go('salons')}>Смотреть все салоны →</button>
        </div>
        <div className="salon-grid">{SALONS.map((s, i) => <SalonCard key={i} s={s} view="grid" book={book} />)}</div>
      </section>

      <section className="wrap section">
        <Img src={IMAGES.partnerBanner} label="Рекламный баннер партнёра (Т‑Банк)" className="banner" />
      </section>

      <section className="wrap section">
        <div className="feature feature-model">
          <div>
            <span className="kicker kicker-light">Для прекрасных и смелых, как ты!</span>
            <h2>Стань моделью не через агентство, а <em>в один клик</em>.</h2>
            <p>Помоги мастеру собрать портфолио и получи классную услугу намного дешевле.</p>
            <div className="big-stat"><small>Скидка до</small><b>100%</b></div>
            <button className="pill pill-white" onClick={() => go('model')}>Оформить подписку</button>
          </div>
          <ul className="perks">
            <li><b>Первыми</b> получаете лучшие окна записи</li>
            <li><b>Первые</b> тестируете процедуры и техники</li>
            <li><b>Профессиональные</b> фото после визита</li>
          </ul>
        </div>
      </section>

      <section className="wrap section">
        <div className="feature feature-biz">
          <div>
            <span className="kicker">Для бизнеса</span>
            <h2>Управлять салоном с нами <em>проще</em>.</h2>
            <p>Одно окно и всё под рукой: расписание, оплата, клиенты, аналитика. Подключение за 15 минут. Первые 14 дней бесплатно.</p>
            <button className="pill pill-berry" onClick={() => go('business')}>Подробнее</button>
          </div>
          <div className="mini-grid">
            {[['Расписание', 'Записи мастеров — в одном окне.'], ['Клиенты', 'История, заметки, повторные визиты.'], ['Оплата', 'Касса, отчёты — внутри.'], ['Аналитика', 'От расчёта материалов до масштабирования.']].map(([t, d]) => (
              <div key={t}><b>{t}</b><p>{d}</p></div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

/* ---------------- САЛОНЫ ---------------- */
function Salons({ book }: { book: Book }) {
  const [view, setView] = useState<'list' | 'grid'>('list')
  return (
    <section className="wrap page-top">
      <div className="salons-bar">
        <h1 className="h-page">Салоны красоты</h1>
        <SearchBar compact />
      </div>
      <div className="filters">
        <div className="chips">
          {['Все', 'Маникюр', 'Волосы', 'Брови', 'Ресницы', 'Косметология', 'Массаж'].map((c, i) => (
            <button key={c} className={i === 0 ? 'on' : ''}>{c}</button>
          ))}
        </div>
        <div className="view-toggle">
          <button className={view === 'list' ? 'on' : ''} onClick={() => setView('list')}>Плашки</button>
          <button className={view === 'grid' ? 'on' : ''} onClick={() => setView('grid')}>Плитка</button>
        </div>
      </div>
      <p className="count">Найдено: {SALONS.length}</p>
      <div className={view === 'grid' ? 'salon-grid' : 'salon-list'}>
        {SALONS.map((s, i) => <SalonCard key={i} s={s} view={view} book={book} />)}
      </div>
    </section>
  )
}

/* ---------------- ДЛЯ БИЗНЕСА ---------------- */
function Business({ go }: { go: (p: Page) => void }) {
  const pains = [
    ['Новым мастерам не хватает клиентов', 'Программа «Модели» заполняет слоты. Мастера набирают практику и портфолио, салон получает оборот вместо простоя.', 'Загрузка без затрат на рекламу'],
    ['Записи срываются, клиенты не приходят', 'Онлайн-предоплата через Т‑Банк закрепляет бронь. Оплативший клиент почти всегда доходит.', 'Неявок меньше до 50%'],
    ['Нужны новые клиенты', 'Салон попадает в маркетплейс руми — витрину, куда люди приходят искать, где постричься.', 'Клиенты из поиска без бюджета'],
    ['Клиенты не звонят, чтобы записаться', 'Онлайн-запись за 4 клика — без звонков и форм, в любое время суток.', 'До 40% записей — вне рабочих часов'],
    ['Касса, чеки и 54‑ФЗ', 'Эквайринг, терминал и онлайн-касса Т‑Банка подключаются из коробки. Чеки формируются автоматически.', 'Подключение за 1 день, 0 ₽'],
    ['Непонятно, что приносит деньги', 'Дашборды: выручка, загрузка мастеров, средний чек, возвраты клиентов.', 'Решения по цифрам'],
  ]
  const compare = [
    ['Подключение эквайринга и кассы', 'Из коробки, 0 ₽', 'Доплата + настройка'],
    ['Поток новых клиентов', 'Маркетплейс руми', 'Только ваша база'],
    ['Заполнение пустых окон', 'Программа «Модели»', 'Нет'],
    ['Запись для клиента', '4 клика', 'Формы, звонки'],
    ['Бесплатный период', '14 дней', 'Зависит от сервиса'],
  ]
  return (
    <>
      <section className="wrap page-top biz-hero">
        <div>
          <span className="kicker">Коммерческое предложение</span>
          <h1 className="h-page">Платформа, которая <em>приводит клиентов</em> и управляет салоном</h1>
          <p className="lead">Запись, оплаты, касса, команда и аналитика — в одном окне. Плюс поток новых клиентов из маркетплейса.</p>
          <div className="btns">
            <button className="pill pill-berry" onClick={() => go('account')}>Подключить салон</button>
            <button className="pill pill-line" onClick={() => go('tariffs')}>Смотреть тарифы</button>
          </div>
        </div>
        <div className="stats">
          {[['−50%', 'неявок клиентов'], ['4 клика', 'до записи'], ['0 ₽', 'подключение кассы'], ['5%', 'кешбэк клиентам']].map(([b, s]) => (
            <div key={b}><b>{b}</b><span>{s}</span></div>
          ))}
        </div>
      </section>

      <section className="wrap section">
        <SectionHead kicker="Зачем это салону" title={<>Боль → <em>решение</em></>} />
        <div className="pains">
          {pains.map(([p, s, r]) => (
            <article key={p}>
              <h3>{p}</h3>
              <p>{s}</p>
              <span className="result">{r}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="wrap section">
        <SectionHead kicker="Сравнение" title={<>Почему руми, <em>а не другие</em></>} />
        <div className="compare">
          <div className="compare-row compare-head"><span>Что важно салону</span><span>руми</span><span>Другие CRM</span></div>
          {compare.map(([a, b, c]) => (
            <div className="compare-row" key={a}><span>{a}</span><b>{b}</b><span className="muted">{c}</span></div>
          ))}
        </div>
      </section>

      <section className="wrap section">
        <SectionHead kicker="Как подключиться" title="От заявки до публикации" />
        <Steps items={[['Заявка', 'Название и адрес'], ['Заполнение', 'Услуги, мастера, часы'], ['Модерация', '1–2 рабочих дня'], ['Тариф', '14 дней бесплатно']]} />
      </section>

      <section className="wrap section">
        <div className="cta">
          <h2>Подключите салон <em>за 15 минут</em></h2>
          <p>Первые 14 дней — бесплатно.</p>
          <button className="pill pill-white" onClick={() => go('account')}>Подключить салон</button>
        </div>
      </section>
    </>
  )
}

/* ---------------- ТАРИФЫ (переиспользуются) ---------------- */
const MODEL_PLANS = [
  { name: 'Старт', sub: 'Для тех, кто хочет попробовать', price: '490 ₽', per: '/мес', list: ['До 3 записей в месяц', 'Скидка 30% на услуги', 'Доступ к начинающим мастерам', 'Базовое портфолио'] },
  { name: 'Про', sub: 'Самый популярный выбор', price: '990 ₽', per: '/мес', hot: true, list: ['До 8 записей в месяц', 'Скидка 50% на все услуги', 'Приоритетная запись', 'Доступ к топ-мастерам', 'Расширенное портфолио', 'Эксклюзивные процедуры'] },
  { name: 'Премиум', sub: 'Максимум возможностей', price: '1 990 ₽', per: '/мес', list: ['Безлимитные записи', 'Скидка до 70%', 'VIP-приоритет на запись', 'Доступ ко всем мастерам', 'Персональный менеджер', 'Фотосессии для портфолио', 'Ранний доступ к новым салонам'] },
]
const SALON_PLANS = [
  { name: 'Лайт', sub: 'До 5 сотрудников', price: '250 ₽', per: 'за сотрудника/мес', list: ['Оплата только за сотрудников', 'Управление расписанием', 'Онлайн-запись клиентов', 'Базовая аналитика'] },
  { name: 'Бизнес', sub: '5–10 сотрудников', price: '3 500 ₽', per: '/мес', hot: true, list: ['Расширенная аналитика', 'Приоритет в выдаче', 'Акции и лояльность', 'Персональная поддержка'] },
  { name: 'Корпоративный', sub: '10–20 сотрудников', price: '6 990 ₽', per: '/мес', list: ['Мульти-филиалы', 'VIP-поддержка', 'Индивидуальные интеграции', 'Выделенный менеджер'] },
  { name: 'Индивидуальный', sub: 'Более 20 сотрудников', price: 'По запросу', per: '', list: ['Всё из «Корпоративного»', 'Индивидуальные условия', 'Персональный SLA'] },
]

function Plans({ plans, cta }: { plans: typeof MODEL_PLANS; cta: string }) {
  return (
    <div className={`plans plans-${plans.length}`}>
      {plans.map((p) => (
        <article key={p.name} className={p.hot ? 'plan hot' : 'plan'}>
          {p.hot && <span className="badge">Популярный</span>}
          <h3>{p.name}</h3>
          <p className="muted">{p.sub}</p>
          <div className="price">{p.price}<small>{p.per}</small></div>
          <ul>{p.list.map((l) => <li key={l}>{l}</li>)}</ul>
          <button className={`pill ${p.hot ? 'pill-white' : 'pill-line'}`}>{cta}</button>
        </article>
      ))}
    </div>
  )
}

const FAQ = [
  ['Что значит «стать моделью»?', 'Это доступ к специальным ценам на услуги мастеров, которые совершенствуют навыки. Вы получаете скидки, приоритетную запись и эксклюзивные предложения.'],
  ['Кто может стать моделью?', 'Любой желающий, достигший 18 лет. Опыт не нужен — вы просто записываетесь на услуги по сниженной цене.'],
  ['Могу ли я отменить подписку?', 'Да, в любой момент в настройках профиля. Оплата за следующий месяц списана не будет.'],
  ['Какие услуги доступны по подписке?', 'Все услуги платформы: стрижки, окрашивание, маникюр, педикюр, массаж и другие. Список зависит от мастеров.'],
  ['Как мастера выбирают моделей?', 'Мастера публикуют запросы на модели для отработки техник или портфолио. Вы откликаетесь на подходящие.'],
  ['Что входит в портфолио?', 'Профессиональные фото ваших образов, созданные мастерами.'],
]

function Faq() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className="faq">
      {FAQ.map(([q, a], i) => (
        <div key={q} className={open === i ? 'faq-item open' : 'faq-item'}>
          <button onClick={() => setOpen(open === i ? null : i)}>{q}<span>+</span></button>
          <p>{a}</p>
        </div>
      ))}
    </div>
  )
}

/* ---------------- СТАТЬ МОДЕЛЬЮ ---------------- */
function Model() {
  return (
    <>
      <section className="wrap page-top model-hero">
        <div>
          <span className="kicker">Подписка «Модель»</span>
          <h1 className="h-page">Стань моделью <em>в руми</em></h1>
          <p className="lead">Получай услуги от лучших мастеров по сниженным ценам. Пробуй новые процедуры, помогай мастерам расти и создавай образ мечты.</p>
          <div className="btns"><a className="pill pill-berry" href="#plans">Смотреть тарифы</a></div>
        </div>
        <Img src={IMAGES.modelBanner} label="Фото модели" className="model-img" />
      </section>
      <section className="wrap section">
        <SectionHead kicker="Как это работает" title="4 простых шага" text="От регистрации до записи — всё просто и быстро" />
        <Steps items={[['Зарегистрируйся', 'Создай аккаунт и заполни профиль — расскажи о себе, загрузи фото.'], ['Выбери подписку', 'Тариф, который подходит именно тебе — от Старт до Премиум.'], ['Найди мастера', 'По рейтингу, отзывам и услугам. Фильтр по расстоянию.'], ['Запишись', 'Выбери удобное время и получи услугу со скидкой.']]} />
      </section>
      <section className="wrap section" id="plans">
        <SectionHead kicker="Тарифы" title="Выбери свой план" text="Три тарифа на любой бюджет — от пробного до безлимитного" />
        <Plans plans={MODEL_PLANS} cta="Оформить подписку" />
      </section>
      <section className="wrap section faq-wrap">
        <SectionHead kicker="Вопросы" title="Частые вопросы" />
        <Faq />
      </section>
    </>
  )
}

/* ---------------- МАНИФЕСТ ---------------- */
function Manifest({ go }: { go: (p: Page) => void }) {
  return (
    <>
      <section className="manifest">
        <div className="wrap manifest-inner">
          <span className="kicker kicker-light">Манифест</span>
          <h1>Мы убрали из красоты всё лишнее. Остались <em>вы и мастер</em>.</h1>
        </div>
      </section>
      <section className="wrap section manifest-body">
        <div className="manifest-cols">
          <p className="drop">Раньше, чтобы записаться к парикмахеру, нужно было найти мастера и номер, дозвониться, объяснить, кто вы и что хотите, и запомнить время записи.</p>
          <p>Теперь — четыре клика. <b>Салон. Услуга. Время. Готово.</b> Всё остальное мы оставили на своей стороне: расписание, напоминания, оплату, общение с мастером, аналитику для салона.</p>
        </div>
        <Img src={IMAGES.manifest} label="Атмосферное фото / иллюстрация" className="manifest-img" />
        <h2 className="center">Что мы <em>убрали</em></h2>
        <ul className="removed">
          {['Звонки в салон', 'Голосовая почта', 'Ожидание на линии', 'Уточнения по СМС', 'Десять полей в форме', 'Регистрации, которые ни на что не влияют'].map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
        <blockquote>Для клиентов — 4 клика до записи. Для салонов — всё для управления в одном окне.</blockquote>
        <div className="center"><button className="pill pill-berry" onClick={() => go('salons')}>Найти салон</button></div>
      </section>
      <section className="wrap section">
        <div className="news">
          <span className="news-logo">Т</span>
          <div>
            <span className="muted">Новость · Партнёрство с Т‑Банком</span>
            <h3>Мы стали партнёрами Т‑Банка</h3>
            <p>Поможем зарегистрировать ИП или ООО, открыть расчётный счёт, подключить приём платежей и использовать другие инструменты для бизнеса.</p>
          </div>
        </div>
      </section>
    </>
  )
}

/* ---------------- ТАРИФЫ И ИНФОРМАЦИЯ ---------------- */
function Tariffs() {
  const [tab, setTab] = useState<'plans' | 'docs' | 'help'>('plans')
  const docs = [
    ['Пользовательское соглашение', 'Регистрация, записи, права и обязанности сторон.'],
    ['Политика обработки персональных данных', 'Какие данные собираем, зачем, как храним и удаляем.'],
    ['Согласие на обработку ПДн', 'Текст согласия при регистрации и записи.'],
    ['Оферта для клиентов', 'Доступ к сервису, абонентская плата, расчёты и возвраты.'],
    ['Оферта для салонов', 'Лицензия на бизнес-панель и вознаграждение.'],
    ['Политика cookie', 'Какие cookie ставит сайт и как ими управлять.'],
  ]
  return (
    <section className="wrap page-top">
      <h1 className="h-page">Тарифы <em>и информация</em></h1>
      <p className="lead">Все тарифы платформы, документы и подсказки по работе с сайтом — в одном месте.</p>
      <div className="view-toggle tabs">
        <button className={tab === 'plans' ? 'on' : ''} onClick={() => setTab('plans')}>Тарифы</button>
        <button className={tab === 'docs' ? 'on' : ''} onClick={() => setTab('docs')}>Документы</button>
        <button className={tab === 'help' ? 'on' : ''} onClick={() => setTab('help')}>Инструкции</button>
      </div>
      {tab === 'plans' && (
        <>
          <SectionHead title="Для владельцев салонов" text="Тариф подстраивается под число мастеров. Первые 14 дней — бесплатно." />
          <Plans plans={SALON_PLANS} cta="Подключить салон" />
          <div className="section" />
          <SectionHead title="Для моделей" text="Доступ к записям на отработку техник со скидкой." />
          <Plans plans={MODEL_PLANS} cta="Оформить подписку" />
        </>
      )}
      {tab === 'docs' && (
        <div className="docs">
          <p className="muted">Действующая редакция от 18 августа 2026.</p>
          {docs.map(([t, d]) => <a key={t} href="#"><b>{t}</b><span>{d}</span><i>→</i></a>)}
        </div>
      )}
      {tab === 'help' && (
        <>
          <SectionHead title="Путь клиента" />
          <Steps items={[['Выбрать салон', 'По городу и услуге'], ['Выбрать услугу', 'И мастера'], ['Выбрать время', 'Из свободных окон'], ['Записаться', 'Запись в «Мои записи»']]} />
          <div className="section" />
          <SectionHead title="Путь салона" />
          <Steps items={[['Заявка', 'Название и адрес'], ['Заполнение', 'Услуги, мастера, часы'], ['Модерация', '1–2 рабочих дня'], ['Тариф и публикация', '14 дней бесплатно']]} />
        </>
      )}
    </section>
  )
}

/* ---------------- ВХОД / РЕГИСТРАЦИЯ ---------------- */
function Auth({ onLogin }: { onLogin: (r: Exclude<Role, null>) => void }) {
  const [role, setRole] = useState<Exclude<Role, null>>('client')
  const [step, setStep] = useState<'phone' | 'code'>('phone')
  const biz = role === 'business'
  return (
    <section className="wrap page-top auth">
      <div className="auth-card">
        <span className="logo">руми<i>.</i></span>
        {step === 'phone' ? (
          <>
            <h1>{biz ? 'Кабинет салона' : 'Вход в руми'}</h1>
            <div className="view-toggle role-toggle">
              <button className={!biz ? 'on' : ''} onClick={() => setRole('client')}>Я клиент</button>
              <button className={biz ? 'on' : ''} onClick={() => setRole('business')}>Я управляю салоном</button>
            </div>
            <p className="muted">
              {biz ? 'Запись, касса, мастера и аналитика — после входа откроется бизнес-панель.' : 'Введите телефон — пришлём код. Записи и скидки будут в кабинете.'}
            </p>
            {biz && <input placeholder="Название салона" />}
            <input placeholder="+7 (___) ___-__-__" inputMode="tel" />
            <button className="pill pill-berry" onClick={() => setStep('code')}>Получить код</button>
            {biz && <small className="muted">Первые 14 дней — бесплатно. Карта не нужна.</small>}
          </>
        ) : (
          <>
            <h1>Код из СМС</h1>
            <p className="muted">Отправили на +7 900 000‑00‑00</p>
            <input placeholder="• • • •" inputMode="numeric" maxLength={4} className="code-input" />
            <button className="pill pill-berry" onClick={() => onLogin(role)}>{biz ? 'Открыть бизнес-панель' : 'Войти'}</button>
            <button className="link" onClick={() => setStep('phone')}>Изменить номер</button>
          </>
        )}
        <small className="muted">Нажимая кнопку, вы соглашаетесь с пользовательским соглашением и политикой обработки ПДн</small>
      </div>
    </section>
  )
}

/* ---------------- КАБИНЕТ КЛИЕНТА (светлая тема) ---------------- */
function Account({ logout, go }: { logout: () => void; go: (p: Page) => void }) {
  return (
    <section className="wrap page-top account">
      <aside className="acc-side">
        <Img label="Аватар" className="avatar" />
        <h3>Имя Фамилия</h3>
        <p className="muted">+7 900 000‑00‑00</p>
        <span className="badge static">Подписка «Про»</span>
        <nav>
          {['Мои записи', 'Избранное', 'Портфолио', 'Подписка', 'Настройки'].map((n, i) => <button key={n} className={i === 0 ? 'on' : ''}>{n}</button>)}
        </nav>
        <button className="link" onClick={logout}>Выйти</button>
      </aside>
      <div className="acc-main">
        <div className="row-head">
          <h1 className="h-page">Мои записи</h1>
          <button className="pill pill-berry" onClick={() => go('salons')}>Новая запись</button>
        </div>
        <div className="acc-stats">
          {[['2', 'предстоящие'], ['14', 'всего визитов'], ['50%', 'ваша скидка']].map(([b, s]) => <div key={s}><b>{b}</b><span>{s}</span></div>)}
        </div>
        {[['Пт, 14 мар · 12:30', 'Маникюр + покрытие', 'Название салона · Мастер Анна'], ['Вт, 18 мар · 18:00', 'Окрашивание', 'Название салона · Мастер Ольга']].map(([d, s, m]) => (
          <div className="booking" key={d}>
            <div className="booking-date">{d}</div>
            <div><b>{s}</b><p className="muted">{m}</p></div>
            <button className="pill pill-line">Перенести</button>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ---------------- ОКНО ЗАПИСИ ----------------
   Услуги, мастера и время — демо-данные, замените на свои */
const SERVICES = [
  { id: 'm1', cat: 'Маникюр', name: 'Маникюр + гель-лак', min: 90, price: 2200 },
  { id: 'm2', cat: 'Маникюр', name: 'Снятие покрытия', min: 20, price: 400 },
  { id: 'm3', cat: 'Маникюр', name: 'Дизайн, 2 ногтя', min: 15, price: 300 },
  { id: 'h1', cat: 'Волосы', name: 'Женская стрижка', min: 60, price: 2500 },
  { id: 'h2', cat: 'Волосы', name: 'Прикорневой объём', min: 120, price: 4800 },
  { id: 'h3', cat: 'Волосы', name: 'Укладка', min: 45, price: 1500 },
  { id: 'b1', cat: 'Брови', name: 'Коррекция и окрашивание', min: 40, price: 1300 },
]
const MASTERS = [
  { id: 'any', name: 'Любой мастер', role: 'Ближайшее свободное время', rating: '', model: false },
  { id: 'anna', name: 'Анна', role: 'Топ-мастер · 8 лет', rating: '4.9', model: false },
  { id: 'olga', name: 'Ольга', role: 'Мастер · 4 года', rating: '4.8', model: false },
  { id: 'ksenia', name: 'Ксения', role: 'Мастер-стажёр · для моделей', rating: '5.0', model: true },
]
const SLOTS = ['10:00', '10:30', '11:00', '11:30', '12:00', '13:00', '13:30', '14:30', '15:00', '16:00', '16:30', '17:30', '18:00', '19:00', '19:30']
const STEP_NAMES = ['Услуги', 'Мастер', 'Время', 'Подтверждение']
const rub = (n: number) => `${n.toLocaleString('ru-RU')} ₽`
const dur = (m: number) => (m >= 60 ? `${Math.floor(m / 60)} ч${m % 60 ? ` ${m % 60} мин` : ''}` : `${m} мин`)

function BookingModal({ salon, onClose, go }: { salon: Salon; onClose: () => void; go: (p: Page) => void }) {
  const [step, setStep] = useState(0)
  const [picked, setPicked] = useState<string[]>([])
  const [master, setMaster] = useState('any')
  const [day, setDay] = useState(0)
  const [time, setTime] = useState<string | null>(null)
  const [pay, setPay] = useState<'prepay' | 'salon'>('prepay')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  const days = useMemo(() => Array.from({ length: 14 }, (_, i) => { const d = new Date(); d.setDate(d.getDate() + i); return d }), [])
  const services = SERVICES.filter((s) => picked.includes(s.id))
  const m = MASTERS.find((x) => x.id === master)!
  const sum = services.reduce((a, s) => a + s.price, 0)
  const total = m.model ? Math.round(sum / 2) : sum
  const minutes = services.reduce((a, s) => a + s.min, 0)
  const dayOff = days[day].getDay() === 1 // понедельник — выходной (пример)
  // Демо-занятость: часть слотов занята, прошедшее время сегодня скрыто
  const slots = SLOTS.filter((t) => day > 0 || Number(t.slice(0, 2)) > new Date().getHours()).map((t, i) => ({ t, busy: (i * 7 + day * 3 + master.length) % 4 === 0 }))
  const ok = [picked.length > 0, true, !!time && !dayOff, name.trim().length > 1 && phone.replace(/\D/g, '').length >= 10][step]
  const dateLabel = days[day].toLocaleDateString('ru-RU', { weekday: 'short', day: 'numeric', month: 'long' })
  const toggle = (id: string) => setPicked(picked.includes(id) ? picked.filter((x) => x !== id) : [...picked, id])

  return (
    <div className="modal" onClick={onClose} onKeyDown={(e) => e.key === 'Escape' && onClose()}>
      <div className="modal-card" role="dialog" aria-modal="true" aria-label="Запись в салон" onClick={(e) => e.stopPropagation()}>
        <button className="modal-x" onClick={onClose} aria-label="Закрыть" autoFocus>×</button>

        {step === 4 ? (
          <div className="bk-done">
            <div className="bk-check">✓</div>
            <h2>Вы записаны<em>!</em></h2>
            <p className="muted">{dateLabel}, {time} · {salon.address}</p>
            <div className="bk-done-card">
              {services.map((s) => <div key={s.id}><span>{s.name}</span><b>{rub(m.model ? s.price / 2 : s.price)}</b></div>)}
              <div><span>Мастер</span><b>{m.name}</b></div>
              <div><span>{pay === 'prepay' ? 'Предоплата внесена' : 'Оплата'}</span><b>{pay === 'prepay' ? rub(Math.round(total * 0.3)) : 'в салоне'}</b></div>
            </div>
            <p className="bk-note">Напомним за 24 часа и за 2 часа до визита. Бесплатная отмена — не позднее чем за 12 часов.</p>
            <div className="btns">
              <button className="pill pill-berry" onClick={() => { onClose(); go('account') }}>Мои записи</button>
              <button className="pill pill-line">Добавить в календарь</button>
            </div>
          </div>
        ) : (
          <div className="bk">
            <div className="bk-main">
              <div className="bk-salon">
                <Img src={IMAGES.salon} label="Фото" className="bk-salon-img" />
                <div><b>{salon.name}</b><span className="muted">{salon.address} · ★ {salon.rating}</span></div>
              </div>
              <ol className="bk-steps">
                {STEP_NAMES.map((n, i) => (
                  <li key={n} className={i === step ? 'on' : i < step ? 'done' : ''}>
                    <button disabled={i > step} onClick={() => setStep(i)}><span>{i < step ? '✓' : i + 1}</span>{n}</button>
                  </li>
                ))}
              </ol>

              {step === 0 && (
                <div className="bk-body">
                  <h2>Что делаем<em>?</em></h2>
                  {[...new Set(SERVICES.map((s) => s.cat))].map((cat) => (
                    <div key={cat} className="bk-group">
                      <h4>{cat}</h4>
                      {SERVICES.filter((s) => s.cat === cat).map((s) => (
                        <button key={s.id} className={`bk-service ${picked.includes(s.id) ? 'on' : ''}`} onClick={() => toggle(s.id)}>
                          <span className="bk-box" />
                          <span className="bk-service-name">{s.name}<small>{dur(s.min)}</small></span>
                          <b>{rub(s.price)}</b>
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              )}

              {step === 1 && (
                <div className="bk-body">
                  <h2>К кому<em>?</em></h2>
                  <div className="bk-masters">
                    {MASTERS.map((x) => (
                      <button key={x.id} className={`bk-master ${master === x.id ? 'on' : ''}`} onClick={() => { setMaster(x.id); setTime(null) }}>
                        {x.id === 'any' ? <span className="bk-any">✦</span> : <Img label={x.name[0]} className="bk-ava" />}
                        <b>{x.name}</b>
                        <small>{x.role}</small>
                        {x.rating && <span className="rating">★ {x.rating}</span>}
                        {x.model && <span className="bk-flag">−50% для моделей</span>}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="bk-body">
                  <h2>Когда удобно<em>?</em></h2>
                  <div className="bk-days">
                    {days.map((d, i) => (
                      <button key={i} className={`${day === i ? 'on' : ''} ${d.getDay() === 1 ? 'off' : ''}`} onClick={() => { setDay(i); setTime(null) }}>
                        <small>{i === 0 ? 'сегодня' : i === 1 ? 'завтра' : d.toLocaleDateString('ru-RU', { weekday: 'short' })}</small>
                        <b>{d.getDate()}</b>
                      </button>
                    ))}
                  </div>
                  {dayOff ? (
                    <p className="bk-empty">В этот день салон не работает. Выберите другой день.</p>
                  ) : slots.length === 0 ? (
                    <p className="bk-empty">На сегодня окна закончились — посмотрите завтра.</p>
                  ) : (
                    [['Утро', 0, 12], ['День', 12, 17], ['Вечер', 17, 24]].map(([label, from, to]) => {
                      const list = slots.filter((s) => { const h = Number(s.t.slice(0, 2)); return h >= (from as number) && h < (to as number) })
                      return list.length ? (
                        <div key={label} className="bk-group">
                          <h4>{label}</h4>
                          <div className="bk-slots">
                            {list.map((s) => (
                              <button key={s.t} disabled={s.busy} className={time === s.t ? 'on' : ''} onClick={() => setTime(s.t)}>{s.t}</button>
                            ))}
                          </div>
                        </div>
                      ) : null
                    })
                  )}
                </div>
              )}

              {step === 3 && (
                <div className="bk-body">
                  <h2>Почти готово</h2>
                  <div className="bk-form">
                    <label>Имя<input value={name} onChange={(e) => setName(e.target.value)} placeholder="Как к вам обращаться" /></label>
                    <label>Телефон<input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+7 (___) ___-__-__" inputMode="tel" /></label>
                    <label className="wide">Пожелания мастеру<textarea rows={2} placeholder="Например: аллергия, референс, длина…" /></label>
                  </div>
                  <h4 className="bk-h4">Оплата</h4>
                  <div className="bk-pay">
                    <button className={pay === 'prepay' ? 'on' : ''} onClick={() => setPay('prepay')}>
                      <b>Предоплата 30%</b><small>{rub(Math.round(total * 0.3))} через Т‑Банк · время закрепится за вами</small>
                    </button>
                    <button className={pay === 'salon' ? 'on' : ''} onClick={() => setPay('salon')}>
                      <b>В салоне</b><small>Картой или наличными после визита</small>
                    </button>
                  </div>
                  <p className="bk-note">Бесплатная отмена или перенос — не позднее чем за 12 часов. Предоплату вернём автоматически.</p>
                </div>
              )}
            </div>

            <aside className="bk-sum">
              <h4>Ваша запись</h4>
              {services.length ? (
                <ul>{services.map((s) => <li key={s.id}><span>{s.name}</span><b>{rub(s.price)}</b></li>)}</ul>
              ) : (
                <p className="muted">Выберите хотя бы одну услугу</p>
              )}
              <dl>
                <div><dt>Мастер</dt><dd>{m.name}</dd></div>
                <div><dt>Когда</dt><dd>{time ? `${dateLabel}, ${time}` : '—'}</dd></div>
                <div><dt>Длительность</dt><dd>{minutes ? dur(minutes) : '—'}</dd></div>
              </dl>
              {m.model && sum > 0 && <div className="bk-disc"><span>Скидка модели</span><b>−{rub(sum - total)}</b></div>}
              <div className="bk-total"><span>Итого</span><b>{rub(total)}</b></div>
              <button className="pill pill-berry" disabled={!ok} onClick={() => setStep(step + 1)}>
                {step === 3 ? (pay === 'prepay' ? `Оплатить ${rub(Math.round(total * 0.3))}` : 'Записаться') : 'Дальше'}
              </button>
              {step > 0 && <button className="link" onClick={() => setStep(step - 1)}>← Назад</button>}
            </aside>
          </div>
        )}
      </div>
    </div>
  )
}

/* ---------------- БИЗНЕС-УПРАВЛЕНИЕ (тёмная тема) ---------------- */
const DASH_NAV = ['Обзор', 'Расписание', 'Записи', 'Клиенты', 'Мастера', 'Услуги', 'Финансы', 'Настройки']
const STAFF = ['Анна', 'Ольга', 'Ксения', 'Мария']
// Записи в сетке: мастер, начало (кол-во получасов от 10:00), длина в получасах, тип
const EVENTS = [
  { m: 0, at: 0, len: 3, t: 'Маникюр + гель-лак', c: 'Екатерина С.', k: 'paid' },
  { m: 0, at: 4, len: 2, t: 'Снятие + дизайн', c: 'Алина М.', k: 'paid' },
  { m: 0, at: 9, len: 3, t: 'Маникюр', c: 'Новый клиент', k: 'pending' },
  { m: 1, at: 1, len: 4, t: 'Прикорневой объём', c: 'Дарья К.', k: 'paid' },
  { m: 1, at: 7, len: 2, t: 'Стрижка', c: 'Полина Р.', k: 'pending' },
  { m: 2, at: 2, len: 3, t: 'Маникюр · модель', c: 'Вика Л.', k: 'model' },
  { m: 2, at: 8, len: 3, t: 'Свободно для моделей', c: 'Откройте окно', k: 'open' },
  { m: 3, at: 0, len: 2, t: 'Брови', c: 'Ирина Т.', k: 'paid' },
  { m: 3, at: 5, len: 4, t: 'Окрашивание', c: 'Ольга Н.', k: 'paid' },
]
const HOURS = Array.from({ length: 10 }, (_, i) => `${10 + i}:00`)

function Schedule() {
  return (
    <div className="dash-card sched">
      <div className="dash-card-head">
        <h3>Расписание на сегодня</h3>
        <div className="legend"><span className="k-paid">Оплачено</span><span className="k-pending">Ожидает</span><span className="k-model">Модель</span></div>
      </div>
      <div className="sched-scroll">
        <div className="sched-grid" style={{ gridTemplateColumns: `56px repeat(${STAFF.length}, minmax(150px, 1fr))` }}>
          <span />
          {STAFF.map((s) => <b key={s} className="sched-staff">{s}</b>)}
          {HOURS.map((h, i) => <span key={h} className="sched-hour" style={{ gridRow: `${i * 2 + 2} / span 2` }}>{h}</span>)}
          {EVENTS.map((e, i) => (
            <div key={i} className={`ev k-${e.k}`} style={{ gridColumn: e.m + 2, gridRow: `${e.at + 2} / span ${e.len}` }}>
              <b>{e.t}</b><small>{e.c}</small>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Dashboard({ logout }: { logout: () => void }) {
  const [tab, setTab] = useState('Обзор')
  const today = new Date().toLocaleDateString('ru-RU', { weekday: 'long', day: 'numeric', month: 'long' })
  const week = [['Пн', 38], ['Вт', 52], ['Ср', 47], ['Чт', 61], ['Пт', 74], ['Сб', 92], ['Вс', 58]] as const
  return (
    <section className="dash">
      <aside className="dash-side">
        <div className="dash-salon">
          <Img label="Лого" className="dash-logo" />
          <div><b>Название салона</b><small>Тариф «Бизнес»</small></div>
        </div>
        <nav>
          {DASH_NAV.map((n) => <button key={n} className={tab === n ? 'on' : ''} onClick={() => setTab(n)}>{n}{n === 'Записи' && <i>3</i>}</button>)}
        </nav>
        <div className="trial">
          <small>Пробный период</small>
          <b>11 из 14 дней</b>
          <div className="bar"><span style={{ width: '78%' }} /></div>
          <button className="pill pill-berry">Выбрать тариф</button>
        </div>
        <button className="link" onClick={logout}>Выйти из кабинета</button>
      </aside>

      <div className="dash-main">
        <div className="dash-top">
          <div>
            <span className="muted cap">{today}</span>
            <h1>{tab === 'Обзор' ? <>Добрый день, <em>Мария</em></> : tab}</h1>
          </div>
          <div className="btns">
            <button className="pill pill-ghost">Страница салона ↗</button>
            <button className="pill pill-berry">+ Новая запись</button>
          </div>
        </div>

        {tab === 'Обзор' && (
          <>
            <div className="kpis">
              {[['Выручка сегодня', '48 300 ₽', '+12%'], ['Записей', '23', '+4'], ['Загрузка мастеров', '82%', '+6%'], ['Неявки', '2%', '−5%']].map(([l, v, d]) => (
                <div key={l}><span>{l}</span><b>{v}</b><small>{d} к прошлой неделе</small></div>
              ))}
            </div>
            <div className="dash-grid">
              <Schedule />
              <div className="dash-col">
                <div className="dash-card">
                  <div className="dash-card-head"><h3>Выручка за неделю</h3><span className="muted">тыс. ₽</span></div>
                  <div className="chart">
                    {week.map(([d, v], i) => (
                      <div key={d} className={i === 4 ? 'now' : ''}><span style={{ height: `${v}%` }}><i>{v}</i></span><small>{d}</small></div>
                    ))}
                  </div>
                </div>
                <div className="dash-card accent">
                  <h3>3 пустых окна сегодня</h3>
                  <p>Откройте их для моделей — мастера наберут практику, а салон получит оборот вместо простоя.</p>
                  <button className="pill pill-white">Открыть для моделей</button>
                </div>
                <div className="dash-card">
                  <div className="dash-card-head"><h3>Ожидают подтверждения</h3></div>
                  {[['12:30', 'Маникюр', 'Новый клиент · Анна'], ['13:30', 'Стрижка', 'Полина Р. · Ольга'], ['18:00', 'Окрашивание', 'Марина В. · Мария']].map(([t, s, c]) => (
                    <div className="req" key={t}><b>{t}</b><div><span>{s}</span><small>{c}</small></div><button aria-label="Подтвердить">✓</button></div>
                  ))}
                </div>
                <div className="dash-card tbank">
                  <span className="news-logo">Т</span>
                  <div><b>Касса и эквайринг</b><small><span className="live-dot" /> Подключено · чеки 54‑ФЗ</small></div>
                </div>
              </div>
            </div>
          </>
        )}

        {tab === 'Расписание' && <Schedule />}

        {tab === 'Клиенты' && (
          <div className="dash-card table">
            <div className="tr th"><span>Клиент</span><span>Визитов</span><span>Последний</span><span>Сумма</span></div>
            {[['Екатерина С.', 12, '2 дня назад', '31 400 ₽'], ['Дарья К.', 7, 'неделю назад', '28 900 ₽'], ['Алина М.', 4, 'сегодня', '9 600 ₽'], ['Ирина Т.', 9, 'месяц назад', '14 200 ₽']].map(([n, v, l, s]) => (
              <div className="tr" key={n}><b>{n}</b><span>{v}</span><span className="muted">{l}</span><span>{s}</span></div>
            ))}
          </div>
        )}

        {!['Обзор', 'Расписание', 'Клиенты'].includes(tab) && (
          <div className="dash-card dash-empty">
            <h3>Раздел «{tab}»</h3>
            <p className="muted">Место под содержимое раздела. Структура такая же, как у «Обзора»: карточки .dash-card внутри .dash-main.</p>
          </div>
        )}
      </div>
    </section>
  )
}

/* ---------------- ФУТЕР (реквизиты оставлены как на сайте) ---------------- */
function Footer({ go }: { go: (p: Page) => void }) {
  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <div>
          <span className="logo">руми<i>.</i></span>
          <p>Запись в салон за 4 клика. Управление салоном — в одном окне.</p>
        </div>
        <div><h4>Клиентам</h4><button onClick={() => go('salons')}>Салоны</button><button onClick={() => go('model')}>Стать моделью</button></div>
        <div><h4>Бизнесу</h4><button onClick={() => go('business')}>Подключить салон</button><a href="https://rrumi.ru/business/tbank/rko">Подключение РКО</a><a href="https://rrumi.ru/business/tbank/registration">Регистрация бизнеса</a><a href="https://rrumi.ru/business/tbank/credit">Кредиты для развития бизнеса</a></div>
        <div><h4>О сервисе</h4><button onClick={() => go('manifest')}>Манифест</button></div>
        <div><h4>Документы</h4><a href="https://rrumi.ru/terms">Пользовательское соглашение</a><a href="https://rrumi.ru/privacy">Политика обработки ПДн</a><a href="https://rrumi.ru/consent">Согласие на обработку ПДн</a><a href="https://rrumi.ru/offer">Оферта для клиентов</a><a href="https://rrumi.ru/license">Оферта для салонов</a><a href="https://rrumi.ru/cookies">Политика cookie</a><a href="https://rrumi.ru/legal">Все документы</a></div>
        <div><h4>Есть вопрос?</h4><a href="mailto:hello@rrumi.ru">Почта: hello@rrumi.ru</a><a href="https://t.me/rumi_beauty_bot">Telegram: @rumi_beauty_bot</a><span>MAX: @id7000036144_bot</span><a href="https://vk.ru/rrumii">ВКонтакте: vk.ru/rrumii</a><small>В Telegram, MAX и ВКонтакте ответим в том же чате — регистрация не нужна.</small></div>
      </div>
      <div className="wrap legal">
        <span>ООО «РУМИ»</span>
        <span>Россия, Томская область, г. Томск</span>
        <span>ОГРН 1267000004370 · ИНН 7000036144</span>
        <span>hello@rrumi.ru</span>
        <span>© 2026 руми. Все права защищены.</span>
      </div>
    </footer>
  )
}

export default function App() {
  const [page, setPageState] = useState<Page>('home')
  const [role, setRole] = useState<Role>(null)
  const [booking, setBooking] = useState<Salon | null>(null)
  const setPage = (p: Page) => {
    setPageState(p)
    window.scrollTo(0, 0)
  }
  const login = (r: Exclude<Role, null>) => { setRole(r); setPage(r === 'business' ? 'dashboard' : 'account') }
  const logout = () => { setRole(null); setPage('home') }
  // Бизнес-панель доступна только салону; остальные попадают на вход
  const view: Page = page === 'dashboard' && role !== 'business' ? 'account' : page === 'account' && role === 'business' ? 'dashboard' : page
  const dark = view === 'dashboard'
  return (
    <div className={dark ? 'app theme-dark' : 'app'}>
      <Header page={view} go={setPage} role={role} />
      <Tag />
      <main>
        {view === 'home' && <Home go={setPage} book={setBooking} />}
        {view === 'salons' && <Salons book={setBooking} />}
        {view === 'business' && <Business go={setPage} />}
        {view === 'model' && <Model />}
        {view === 'manifest' && <Manifest go={setPage} />}
        {view === 'tariffs' && <Tariffs />}
        {view === 'account' && (role ? <Account logout={logout} go={setPage} /> : <Auth onLogin={login} />)}
        {view === 'dashboard' && <Dashboard logout={logout} />}
      </main>
      {!dark && <Footer go={setPage} />}
      {booking && <BookingModal salon={booking} onClose={() => setBooking(null)} go={setPage} />}
    </div>
  )
}
