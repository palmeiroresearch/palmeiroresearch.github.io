/* =============================================================
   palmeiromed.com — contenido compartido
   Única fuente de verdad del texto del sitio.
   Las tres variantes de diseño leen de aquí.
   ============================================================= */
window.SITE = {

  person: {
    name: 'Ahmed Andrés Aguilera Palmeiro',
    shortName: 'Palmeiro',
    wordmark: 'PALMEIRO',
    initials: 'AP',
    role: 'Residente de Medicina Interna',
    roleShort: 'R1 · Medicina Interna',
    place: 'La Habana, Cuba',
    discipline: 'Ingeniería de software clínico',
    org: 'PalmeiroResearch'
  },

  hero: {
    kicker: 'Residente de Medicina Interna · Desarrollador',
    // El titular se parte en dos para que cada variante lo trate a su manera
    titleLead: 'Software clínico que',
    titleAccent: 'funciona sin internet',
    lede: 'Construyo calculadoras, visores de imagen y herramientas de guardia pensadas para el hospital real: sin señal, sin servidor, a las tres de la madrugada. No son maquetas — se usan en turnos reales en La Habana.',
    ctaPrimary: { label: 'Ver los proyectos', href: '#proyectos' },
    ctaSecondary: { label: 'Hablemos', href: '#contacto' },
    status: 'En línea'
  },

  stats: [
    { value: 4,   suffix: '',  label: 'apps en producción' },
    { value: 829, suffix: '',  label: 'fármacos en el formulario' },
    { value: 60,  suffix: '',  label: 'calculadoras clínicas' },
    { value: 0,   suffix: '',  label: 'dependencias de internet' }
  ],

  // Ficha tipo cabecera de revista / panel de datos
  facts: [
    ['Formación',  'Medicina · Ciencia de datos'],
    ['Herramientas', 'Python · PyTorch · SQL · JS'],
    ['Trayectoria', 'UCI 2012–2015 → Medicina Interna'],
    ['Ubicación',  'La Habana, Cuba']
  ],

  story: {
    eyebrow: 'El porqué',
    lede: 'Antes de escribir una línea de código pasé tres años poniendo vías y vigilando monitores en una unidad de cuidados intensivos.',
    body: [
      'Ese oficio enseña algo que ningún framework enseña: a las tres de la madrugada, cansado, sin señal y con un paciente descompensándose, la herramienta que ayuda es la que ya está en el bolsillo. No la que depende de internet, ni la que pide registrarse, ni la que tarda ocho segundos en cargar.',
      'Por eso cada app de este sitio nació de una guardia concreta donde hizo falta algo así y no existía. Se escribieron en el hospital, se corrigieron en el hospital y siguen corriendo en los mismos servicios donde se probaron la primera vez. Si una herramienta no sobrevive a una guardia, no llega a este sitio.'
    ],
    quote: 'La mejor herramienta clínica es la que ya está en tu bolsillo cuando se cae la red.',
    timeline: [
      { when: '2012–2015', what: 'Cuidados intensivos', detail: 'Tres años de monitorización y procederes a pie de cama. El origen de todo lo demás.' },
      { when: '2016–2022', what: 'Medicina + datos',    detail: 'Formación médica en paralelo con ciencia de datos: Python, machine learning, SQL.' },
      { when: '2023',      what: 'Primera herramienta',  detail: 'CliniCalc empieza como una calculadora de filtrado glomerular para uso propio en guardia.' },
      { when: 'Hoy',       what: 'Residencia + 4 apps',  detail: 'Residente de Medicina Interna. Cuatro herramientas en producción, mantenidas entre turnos.' }
    ]
  },

  principles: [
    {
      icon: 'offline',
      title: 'Offline primero',
      text: 'Todo se guarda en el dispositivo: Service Worker, IndexedDB, cero llamadas de red para el uso diario. Si se cae la red, la herramienta sigue entera.'
    },
    {
      icon: 'stethoscope',
      title: 'Validado en guardia',
      text: 'Nada se publica sin haberse usado en un turno real. El criterio no es que compile — es que sirva con un paciente delante.'
    },
    {
      icon: 'feather',
      title: 'Liviano por obligación',
      text: 'Sin frameworks ni build step. Dependencias autoalojadas y actualizaciones de contenido por parches de unos pocos KB, pensadas para conexiones malas.'
    },
    {
      icon: 'flag',
      title: 'Datos del país',
      text: 'Tablas de crecimiento cubanas, Formulario Nacional de Medicamentos, protocolos locales. Las referencias que de verdad se usan aquí.'
    }
  ],

  projects: [
    {
      id: 'clinicalc',
      index: '01',
      name: 'CliniCalc',
      modality: 'CALC',
      kind: 'Calculadoras y protocolos',
      url: 'https://clinicalc.palmeiromed.com/',
      host: 'clinicalc.palmeiromed.com',
      tagline: 'La calculadora de cabecera',
      desc: 'Sesenta calculadoras y protocolos clínicos en una sola PWA offline: renal, electrolitos, gasometría, cardiología, neurología y cuidados críticos.',
      long: 'Incluye guía antibiótica empírica para 88 patologías, calculadora de vasoactivos intravenosos y guías de manejo escalonado para paro cardíaco, sepsis, ictus, arritmias y dengue. Pantalla principal reordenable y biblioteca de favoritos.',
      specs: [
        ['Módulos', '60 calculadoras'],
        ['Guía antibiótica', '88 patologías'],
        ['Protocolos', 'Paro · sepsis · ictus · dengue'],
        ['Versión', '1.8.0']
      ],
      tags: ['PWA', 'Offline', 'Vasoactivos', 'Favoritos'],
      metric: { value: 60, label: 'calculadoras' },
      icon: 'calc',
      accent: '#0e7c6e'
    },
    {
      id: 'tacv',
      index: '02',
      name: 'TAC Viewer',
      modality: 'DICOM',
      kind: 'Imagen médica',
      url: 'https://tacv.palmeiromed.com/',
      host: 'tacv.palmeiromed.com',
      tagline: 'Un visor DICOM en el navegador',
      desc: 'Visor de tomografía que abre estudios DICOM sin instalar nada: ventana/nivel, mediciones y reconstrucción multiplanar dentro de una pestaña.',
      long: 'Mediciones de distancia, ángulo y ROI con sonda de Unidades Hounsfield, presets de ventana y ajuste automático desde el histograma, MPR triplanar, multi-ventana RGB para hemorragia e ictus precoz, panel de series y exportación a PNG o HTML.',
      specs: [
        ['Reconstrucción', 'MPR triplanar'],
        ['Mediciones', 'Distancia · ángulo · ROI · HU'],
        ['Ventanas', 'Presets + auto W/L + RGB'],
        ['Exporta', 'PNG · HTML']
      ],
      tags: ['DICOM', 'MPR', 'Hounsfield', 'Sin instalación'],
      metric: { value: 3, label: 'planos (MPR)' },
      icon: 'scan',
      accent: '#4f5bd5'
    },
    {
      id: 'pharmacu',
      index: '03',
      name: 'Formulario Cuba',
      modality: 'FARM',
      kind: 'Vademécum nacional',
      url: 'https://pharmacu.palmeiromed.com/',
      host: 'pharmacu.palmeiromed.com',
      tagline: 'El Formulario Nacional, en el bolsillo',
      desc: 'Consulta rápida del Formulario Nacional de Medicamentos de Cuba: 829 fármacos con indicaciones, posología, contraindicaciones e interacciones, totalmente offline.',
      long: 'Búsqueda por nombre comercial, denominación internacional, categoría o indicación, con búsqueda difusa de respaldo. Todo el formulario se guarda en el dispositivo (IndexedDB) tras la primera carga. Actualizaciones de contenido por parches de unos KB, importación manual del archivo cuando la conexión falla, y app nativa de Android con actualizaciones OTA propias.',
      specs: [
        ['Fármacos', '829 registros'],
        ['Almacenamiento', 'IndexedDB · 100% local'],
        ['Actualizaciones', 'Parches de unos KB'],
        ['Plataformas', 'PWA + Android nativo']
      ],
      tags: ['PWA', 'Android', 'IndexedDB', 'Búsqueda difusa'],
      metric: { value: 829, label: 'fármacos' },
      icon: 'pill',
      accent: '#b4673b'
    },
    {
      id: 'percuba',
      index: '04',
      name: 'PerCuba',
      modality: 'PEDS',
      kind: 'Antropometría pediátrica',
      url: 'https://percuba.palmeiromed.com/',
      host: 'percuba.palmeiromed.com',
      tagline: 'Percentiles con tablas cubanas',
      desc: 'Percentiles antropométricos pediátricos calculados sobre las tablas de crecimiento cubanas, con interpretación automática del resultado.',
      long: 'Peso para la edad, talla para la edad, circunferencia cefálica, índice de masa corporal y peso para la talla, diferenciados por sexo, de cero a diecinueve años. Funciona completamente offline.',
      specs: [
        ['Referencia', 'Tablas cubanas'],
        ['Índices', 'Peso · talla · PC · IMC'],
        ['Rango', '0 a 19 años'],
        ['Lectura', 'Interpretación automática']
      ],
      tags: ['PWA', 'Offline', 'Estándares cubanos', 'Por sexo'],
      metric: { value: 5, label: 'índices' },
      icon: 'child',
      accent: '#1f7fa8'
    }
  ],

  contact: {
    eyebrow: 'Contacto',
    title: 'Para colaborar, revisar código o preguntar por cualquiera de los proyectos.',
    lede: 'Respondo a propuestas de colaboración clínica o técnica, reportes de errores y preguntas de cualquier colega que esté usando alguna de las herramientas.',
    rows: [
      { label: 'Correo',   value: 'palmeiro.research@gmail.com', href: 'mailto:palmeiro.research@gmail.com', icon: 'mail' },
      { label: 'Teléfono', value: '+53 5303 2939',               href: 'tel:+5353032939',                    icon: 'phone' },
      { label: 'Lugar',    value: 'La Habana, Cuba',              href: null,                                  icon: 'pin' }
    ]
  },

  nav: [
    { label: 'Proyectos',  href: '#proyectos' },
    { label: 'El porqué',  href: '#porque' },
    { label: 'Método',     href: '#metodo' },
    { label: 'Contacto',   href: '#contacto' }
  ],

  footer: {
    disclaimer: 'Las herramientas de este sitio son guías de consulta rápida. No sustituyen el criterio clínico profesional ni la ficha técnica oficial de cada fármaco o procedimiento.',
    line: 'palmeiromed.com · La Habana, Cuba'
  },

  /* Set de iconos en línea (sin dependencias) — trazo de 1.6, grid de 24 */
  icons: {
    calc:       '<rect x="4" y="2.5" width="16" height="19" rx="2.5"/><path d="M8 7h8M8 12h3M13 12h3M8 16.5h3M13 16.5h3"/>',
    scan:       '<path d="M3 8V5.5A2.5 2.5 0 0 1 5.5 3H8M16 3h2.5A2.5 2.5 0 0 1 21 5.5V8M21 16v2.5A2.5 2.5 0 0 1 18.5 21H16M8 21H5.5A2.5 2.5 0 0 1 3 18.5V16"/><circle cx="12" cy="12" r="3.4"/>',
    pill:       '<rect x="2.6" y="8.4" width="18.8" height="7.2" rx="3.6" transform="rotate(-45 12 12)"/><path d="M9.4 9.4l5.2 5.2"/>',
    child:      '<circle cx="12" cy="5.6" r="2.6"/><path d="M12 8.2v6.4M12 14.6l-3 6.4M12 14.6l3 6.4M7.5 11h9"/>',
    offline:    '<path d="M3 4l18 16"/><path d="M5.5 10.5a9 9 0 0 1 4-2.2M2.2 7.4A13 13 0 0 1 6 5M18.6 10.7a9 9 0 0 0-3-2.1M21.8 7.4a13 13 0 0 0-4.4-2.6"/><path d="M9.2 14.4a5 5 0 0 1 5.6 0"/><circle cx="12" cy="18.6" r="1.1"/>',
    stethoscope:'<path d="M5 3v5.5a4.5 4.5 0 0 0 9 0V3"/><path d="M3.4 3h3M12.6 3h3"/><path d="M9.5 13v2.6a4.4 4.4 0 0 0 8.8 0v-2"/><circle cx="18.6" cy="11.1" r="2.2"/>',
    feather:    '<path d="M20.3 3.7a5.5 5.5 0 0 0-7.8 0L5 11.2V19h7.8l7.5-7.5a5.5 5.5 0 0 0 0-7.8z"/><path d="M3 21l8.5-8.5M15.5 8.5l-5 5M18 11H13"/>',
    flag:       '<path d="M5 3v18"/><path d="M5 4.5h11.5l-1.8 4 1.8 4H5"/>',
    mail:       '<rect x="2.5" y="4.5" width="19" height="15" rx="2.5"/><path d="M3.2 6.6l8.8 6.2 8.8-6.2"/>',
    phone:      '<path d="M6.8 3.5h-.9A2.4 2.4 0 0 0 3.5 6c.3 7.6 6.9 14.2 14.5 14.5a2.4 2.4 0 0 0 2.5-2.4v-.9a1.6 1.6 0 0 0-1.2-1.6l-2.9-.7a1.6 1.6 0 0 0-1.6.6l-.8 1a12.6 12.6 0 0 1-5-5l1-.8a1.6 1.6 0 0 0 .6-1.6l-.7-2.9a1.6 1.6 0 0 0-1.6-1.2z"/>',
    pin:        '<path d="M12 21.5s7-6.1 7-11.1a7 7 0 1 0-14 0c0 5 7 11.1 7 11.1z"/><circle cx="12" cy="10.2" r="2.6"/>',
    arrow:      '<path d="M4 12h15M13 6l6 6-6 6"/>',
    external:   '<path d="M14 4h6v6M20 4l-8.5 8.5"/><path d="M18 14v4.5A1.5 1.5 0 0 1 16.5 20h-11A1.5 1.5 0 0 1 4 18.5v-11A1.5 1.5 0 0 1 5.5 6H10"/>',
    sun:        '<circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.2M12 19.3v2.2M4.6 4.6l1.6 1.6M17.8 17.8l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.6 19.4l1.6-1.6M17.8 6.2l1.6-1.6"/>',
    moon:       '<path d="M20.5 14.3A8.8 8.8 0 0 1 9.7 3.5a8.8 8.8 0 1 0 10.8 10.8z"/>'
  }
};
