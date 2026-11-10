/*
  CONTENIDO DEL SITIO
  -------------------
  Todo el texto, las fotos y los proyectos se editan desde este archivo.
  Las rutas son relativas a la raíz del sitio (donde está index.html).
  Si dejás una ruta vacía ("") o una lista vacía ([]), el sitio muestra un
  recuadro de relleno en su lugar.
*/
window.PORTFOLIO = {
  nombre: "Jorge Paquéz",
  rol: "Fotografía · Software · Diseño gráfico",

  // Cada elemento es un párrafo del resumen de la página principal.
  resumen: [
    "Soy de Rosario, Santa Fe, Argentina, y trabajo entre la imagen y el código. Me formé en diseño gráfico, fotografía y análisis de sistemas, las tres como carreras terciarias.",
    "Trabajo como analista de desarrollo de aplicaciones y, en paralelo, sigo adelante con mi verdadera pasión: la fotografía."
  ],

  // Tu foto, por ejemplo "assets/img/perfil/foto.jpg"
  foto: "assets/img/perfil/sobre-mi.jpg",

  // Correo que se muestra en los datos de contacto. El formulario no lo usa:
  // abre el chat de WhatsApp de "redes".
  email: "jorge.paquez@gmail.com",
  ubicacion: "Rosario, Santa Fe, Argentina",
  // Mapa de la sección de contacto (OpenStreetMap). "bbox" es el recuadro que
  // se muestra: oeste, sur, este, norte. Dejar "" para no mostrar el mapa.
  mapa: "https://www.openstreetmap.org/export/embed.html?bbox=-60.7700%2C-33.0200%2C-60.5900%2C-32.8800&layer=mapnik",
  // "icono" puede ser whatsapp, instagram, youtube, linkedin o github.
  // Las redes con "texto" van en su propia línea; las que no lo tienen se
  // agrupan en una sola fila de íconos. Las redes sin "url" no se muestran.
  redes: [
    { nombre: "WhatsApp", icono: "whatsapp", texto: "+54 341 7184601", url: "https://wa.me/5493417184601" },
    { nombre: "Instagram", icono: "instagram", url: "https://www.instagram.com/jpaquezph" },
    { nombre: "YouTube", icono: "youtube", url: "https://www.youtube.com/@jpaquezph" },
    { nombre: "LinkedIn", icono: "linkedin", url: "https://www.linkedin.com/in/jorge-paqu%C3%A9z-46628a65/" },
    { nombre: "GitHub", icono: "github", url: "" }
  ],

  /* SOBRE MÍ (sobre-mi.html), con formato de currículum en dos columnas.
     foto:      foto de la cabecera
     perfil:    párrafos de presentación
     archivoCv: PDF del currículum para el botón de descarga, por ejemplo
                "assets/documentos/cv.pdf"
     columnas:  las dos columnas de formación. Cada una tiene un título, una
                bajada, sus áreas y sus habilidades (etiquetas).
                Cada área tiene un título y sus ítems, sueltos ("items") o
                separados en "grupos" con subtítulo (Educación, Trabajo...).
                Cada ítem acepta: titulo, lugar, periodo, detalle y archivo
                (un certificado en assets/documentos/). Un grupo también
                puede llevar "cursos": una lista corta de nombres, sin más
                datos. Los grupos y las áreas vacíos no se muestran.
     idiomas:   etiquetas del pie de la página */
  cv: {
    // Foto de esta página. Si se deja vacía se usa la de la página principal.
    foto: "assets/img/perfil/sobre-mi-cv.jpg",
    perfil: [
      "¡Hola! Mi nombre es Jorge y soy de Rosario, Santa Fe, Argentina. Me apasionan el diseño gráfico y la fotografía, y con los años sumé el software: cursé las tres como carreras terciarias, diseño gráfico, fotografía y análisis de sistemas.",
      "A eso le agregué más de 50 cursos y especializaciones en estas áreas, que me dieron herramientas concretas para trabajar en rubros muy distintos.",
      "Acá abajo está mi recorrido completo, área por área. Te invito a recorrerlo y, si te sirve tenerlo a mano, a descargar mi CV."
    ],
    archivoCv: "assets/documentos/jorge-paquez-cv.pdf",
    columnas: [
      {
        titulo: "Formación creativa",
        bajada: "Fotografía y diseño gráfico.",
        areas: [
          {
            titulo: "Diseño gráfico",
            grupos: [
              {
                titulo: "Educación",
                items: [
                  {
                    titulo: "Técnico en diseño gráfico y comunicación visual",
                    lugar: "EPAVB N.° 3031 (Escuela Provincial de Artes Visuales Belgrano), Rosario",
                    periodo: "2011 – 2014 · hasta 2.º año"
                  }
                ]
              },
              {
                titulo: "Trabajo",
                items: [
                  {
                    titulo: "Diseñador autónomo",
                    lugar: "Estudio freelance Pedeefe, Rosario",
                    periodo: "Febrero 2017 – 2023",
                    detalle: "Piezas publicitarias, tarjetería, folletería, banners, publicidades web, marca, posicionamiento y seguimiento, manejo de redes sociales, mailing y diseños a medida."
                  },
                  {
                    titulo: "Voluntario",
                    lugar: "Sociedad de Fotógrafos Profesionales de Rosario",
                    periodo: "Mayo 2014 – octubre 2015",
                    detalle: "Piezas de diseño publicitario, mailing, fanpage, posicionamiento, presentaciones, marketing y análisis de mercado."
                  }
                ]
              }
            ]
          },
          {
            titulo: "Fotografía",
            grupos: [
              {
                titulo: "Educación",
                items: [
                  { titulo: "Técnico superior en fotografía", lugar: "ISET N.° 18, Rosario", periodo: "2014 · hasta 2.º año" }
                ]
              },
              {
                titulo: "Trabajo",
                items: [
                  {
                    titulo: "Fotógrafo autónomo",
                    lugar: "Estudio freelance Pedeefe, Rosario",
                    periodo: "Febrero 2017 – 2023",
                    detalle: "Fotografía de eventos sociales y empresariales, fotografía de productos, catálogos, producciones fotográficas y audiovisuales."
                  },
                  {
                    titulo: "Fotógrafo publicitario",
                    lugar: "Club Publicitario, Rosario",
                    periodo: "Junio 2021 – junio 2022"
                  },
                  {
                    titulo: "Fotógrafo inmobiliario",
                    lugar: "Dunod S.A., Rosario",
                    periodo: "Abril 2015 – octubre 2016",
                    detalle: "Fotografía de inmuebles y relaciones internas. Producciones audiovisuales."
                  },
                  {
                    titulo: "Voluntario",
                    lugar: "Sociedad de Fotógrafos Profesionales de Rosario (SFPR)",
                    periodo: "Mayo 2014 – octubre 2015",
                    detalle: "Relevamientos audiovisuales."
                  }
                ]
              }
            ]
          },
          {
            titulo: "Otras capacitaciones",
            grupos: [
              {
                titulo: "Fotografía",
                items: [
                  {
                    titulo: "Expositor en el concurso municipal de fotografía",
                    lugar: "Rosario",
                    periodo: "Agosto – septiembre 2013",
                    detalle: "Tercer puesto en la muestra «Recorrida por el cementerio», expuesta en las inmediaciones del cementerio El Salvador."
                  },
                  {
                    titulo: "Relevamiento fotográfico",
                    lugar: "Universidad Nacional de Rosario (UNR)",
                    periodo: "2019",
                    detalle: "Registro de un simulacro de catástrofe en eventos deportivos. Reconocido por Resolución 0830."
                  }
                ]
              },
              {
                titulo: "Cursos de fotografía",
                cursos: [
                  "Fotografía de retrato con luz natural · 2019",
                  "Photoshop para fotógrafos · 2019",
                  "Retoque de moda y belleza con Photoshop · 2019"
                ]
              },
              {
                titulo: "Diseño y experiencia de usuario",
                cursos: ["UX: leyes y fundamentos · 2023"]
              },
              {
                titulo: "Marketing y comunicación",
                cursos: [
                  "Google My Business · 2021",
                  "Experto en copywriting · 2020",
                  "Comercio electrónico · 2019",
                  "Venta en redes sociales · 2018"
                ]
              }
            ]
          }
        ],
        habilidades: ["Photoshop", "Lightroom", "Illustrator", "InDesign", "Inkscape", "CapCut", "Filmora", "OBS Studio", "Retoque fotográfico", "Edición publicitaria", "Maquetado", "Identidad visual", "Manuales de marca", "Redes sociales"]
      },
      {
        titulo: "Formación lógica",
        bajada: "Desarrollo y análisis de sistemas.",
        areas: [
          {
            titulo: "Software",
            grupos: [
              {
                titulo: "Educación",
                items: [
                  {
                    titulo: "Analista en sistemas",
                    lugar: "Escuela Superior N.° 49 «Cap. Justo José de Urquiza»",
                    periodo: "Febrero 2022 – 2024"
                  }
                ]
              },
              {
                titulo: "Trabajo",
                items: [
                  {
                    titulo: "Application Development Analyst",
                    lugar: "Accenture Argentina",
                    periodo: "Julio 2022 – actualidad",
                    detalle: "Gestión de incidentes críticos y monitoreo con AppDynamics en el equipo de integraciones y middleware, sobre Oracle SOA Suite. Gestión de cambios como change manager. Desarrollo de bots con Copilot Studio (Microsoft 365), herramientas de automatización con Teams y documentación técnica."
                  },
                  {
                    titulo: "Desarrollador web",
                    lugar: "Club Publicitario, Rosario",
                    periodo: "Junio 2021 – junio 2022"
                  },
                  {
                    titulo: "Operador",
                    lugar: "Sparta S.A. (Cyber Sparta), Rosario",
                    periodo: "Diciembre 2012 – abril 2014",
                    detalle: "Reparación y mantenimiento de PC, manejo de sistema contable, control de proveedores, caja, atención al público y control de mercaderías."
                  }
                ]
              }
            ]
          },
          {
            titulo: "Otras capacitaciones",
            grupos: [
              {
                titulo: "Inteligencia artificial",
                cursos: [
                  "Copilot Business Intelligence · 2026",
                  "IA responsable y ética de datos · 2026",
                  "Introducción a la inteligencia artificial · 2026",
                  "Generative AI · 2025",
                  "Prompt engineering · 2024"
                ]
              },
              {
                titulo: "Datos y bases de datos",
                cursos: [
                  "Fundamentos de análisis de datos · 2026",
                  "Analista de inteligencia empresarial · 2025",
                  "Database Fundamentals I · 2024",
                  "Optimización de consultas en SQL Server · 2024",
                  "Oracle SQL · 2023"
                ]
              },
              {
                titulo: "Arquitectura, nube e integración",
                cursos: [
                  "Diseño de sistemas y arquitectura de software · 2025",
                  "Conceptos de AWS · 2025",
                  "Agile y DevOps · 2025",
                  "Blockchain · 2025",
                  "Oracle SOA Suite 12c Advanced · 2023",
                  "AWS Solutions Architect: bases de datos · 2023"
                ]
              },
              {
                titulo: "Programación",
                cursos: [
                  "Curso profesional de Python · 2023",
                  "Python: Novice, Basics y novedades · 2022–2023",
                  "Curso profesional de Git · 2022",
                  "Introducción a la programación · 2022",
                  "Lógica de programación · 2022"
                ]
              },
              {
                titulo: "Seguridad",
                cursos: [
                  "API Security · 2022",
                  "Seguridad de aplicaciones: concientización y validación · 2022",
                  "Arquitectura segura de aplicaciones e IAM · 2022",
                  "Ciberseguridad en el teletrabajo · 2020"
                ]
              },
              {
                titulo: "Desarrollo web",
                cursos: ["Diseño y gestión de sitios en WordPress · 2020", "Plugin Elementor · 2020"]
              },
              {
                titulo: "Gestión y habilidades profesionales",
                cursos: [
                  "Liderazgo y gestión de equipos · 2025",
                  "COBE Fundamentals (ética profesional) · 2024",
                  "English Pronunciation Masterclass · 2023",
                  "Haz menos y logra más · 2023",
                  "Metodología de la investigación · 2023",
                  "Andragogía: el aprendizaje en los adultos · 2020",
                  "Oratoria · 2018"
                ]
              }
            ]
          }
        ],
        habilidades: [
          "Claude AI",
          "Prompt engineering",
          "Inteligencia artificial",
          "Copilot Studio",
          "Agente analista de Copilot",
          "RF-RNF",
          "Arquitectura de software",
          "Documentación técnica",
          "Testing",
          "Aplicaciones de escritorio",
          "Automatización",
          "Oracle SOA Suite",
          "Middleware",
          "Monitoreo",
          "Gestión de incidentes",
          "Gestión de cambios",
          "SQL",
          "AWS",
          "Python",
          "Git",
          "HTML"
        ]
      }
    ],
    // Habilidades blandas, tomadas de los cursos de gestión, comunicación y
    // marketing. Van en el pie de la página y en el PDF del currículum.
    blandas: [
      "Liderazgo",
      "Gestión de equipos",
      "Aprendizaje continuo",
      "Comunicación",
      "Enseñanza a adultos",
      "Gestión del tiempo",
      "Productividad",
      "Metodologías ágiles",
      "Investigación",
      "Ética profesional",
      "Venta y atención al cliente"
    ],
    idiomas: ["Español (nativo)", "Inglés (B1)"],
    // Se muestran junto a los idiomas, en «Otros datos» de Sobre mí y del CV descargable.
    otrosDatos: ["Movilidad propia", "Disponibilidad de trabajo on-site", "Disponibilidad para viajar"]
  },

  // Imagen de cada recuadro de "Secciones" en la página principal. Con
  // { src, fondo } la imagen se muestra entera sobre ese color, sin recortar.
  portadas: {
    fotografia: "assets/img/fotografia/naturaleza/mini/007.jpg",
    software: "assets/img/software/kakeibo/mockup-1.jpg",
    diseno: "assets/img/diseno/kakeibo/mockup-2.jpg"
  },

  /* FOTOGRAFÍA
     Las fotos se cargan con herramientas/importar_fotos.py, que las achica y
     las deja en assets/img/fotografia/<galeria>/. "galeria" es esa carpeta.
     Una categoría puede tener una galería directa o una lista de álbumes.
     "portada" es el número de foto que se usa como tapa del álbum. */
  fotografia: [
    {
      id: "naturaleza",
      titulo: "Naturaleza",
      descripcion: "Paisajes, lagos y montaña.",
      galeria: "naturaleza"
    },
    {
      id: "eventos",
      titulo: "Eventos",
      descripcion: "Eventos sociales, encuentros y música en vivo.",
      albumes: [
        {
          id: "street-car-meet-3",
          titulo: "Street Car Meet · Tercera edición",
          descripcion: "Club Obras Sanitarias, Granadero Baigorria.",
          galeria: "eventos/street-car-meet-3",
          portada: 8
        },
        {
          id: "graduacion-sagrado-corazon",
          titulo: "Graduación Sagrado Corazón",
          descripcion: "Salón Metropolitano.",
          galeria: "eventos/graduacion-sagrado-corazon",
          portada: 13
        },
        {
          id: "destino-casual-teatro-vorterix",
          titulo: "Destino Casual",
          descripcion: "Teatro Vorterix.",
          galeria: "eventos/destino-casual-teatro-vorterix",
          portada: 6
        },
        {
          id: "ateneo-cultural",
          titulo: "Festival Amiguero",
          descripcion: "Ateneo Cultural Néstor Kirchner.",
          galeria: "eventos/ateneo-cultural",
          portada: 10
        }
      ]
    },
    {
      id: "sesiones",
      titulo: "Sesiones",
      descripcion: "Sesiones de retrato en exteriores.",
      // PRUEBA: las fotos de las dos sesiones se muestran sueltas, sin álbumes.
      // Para volver a los álbumes: borrar la línea "galeria" y cambiar
      // "albumesGuardados" por "albumes".
      galeria: ["sesiones/hermanos-solis", "sesiones/abi-15-anos", "sesiones/mateo"],
      albumesGuardados: [
        {
          id: "hermanos-solis",
          titulo: "Hermanos Solís",
          descripcion: "Rosedal del Parque Independencia, Rosario.",
          galeria: "sesiones/hermanos-solis",
          portada: 1
        },
        {
          id: "abi-15-anos",
          titulo: "Abi · 15 años",
          descripcion: "Parque Villarino, Zavalla, y La Florida, Rosario.",
          galeria: "sesiones/abi-15-anos",
          portada: 8
        },
        {
          id: "mateo",
          titulo: "Mateo",
          descripcion: "Sesión de exterior.",
          galeria: "sesiones/mateo",
          portada: 1
        }
      ]
    },
    {
      id: "productos",
      titulo: "Productos",
      descripcion: "Fotografía de producto: joyas.",
      galeria: "productos"
    }
  ],

  /* SOFTWARE
     Cada proyecto tiene su propia página (software.html?p=<id>).
     capturas: imágenes en assets/img/software/, como ruta o { src, alt }
     portada:  imagen de la tarjeta en el listado; si falta se usa la primera captura
     enlaces:  [{ texto: "Ver repositorio", url: "https://..." }]
     ficha:    filas del apartado «Ficha técnica», como [rubro, detalle] */

  // Texto de presentación de la página principal de Software.
  softwareIntro: [
    "Aplicaciones y herramientas end-to-end: desde la idea, el relevamiento, el diseño y la arquitectura hasta el desarrollo. Desarrolladas con Claude (IA).",
    "Cada proyecto está versionado en Git, con su repositorio en GitHub, y se entrega como un programa instalable, listo para usar."
  ],

  // Filas de la ficha técnica que se repiten en todos los proyectos de software.
  // Herramientas usadas en todos los proyectos: suman una barra completa en el
  // stack del perfil lógico, aunque no figuren en la lista de cada proyecto.
  stackComun: ["Claude (IA)"],
  // Nivel propio (de 1 a 5) para algunas tecnologías del stack. Reemplaza a la
  // cuenta automática de proyectos en los que se usa.
  nivelStack: {
    "Claude (IA)": 4,
    Python: 3
  },
  // Tecnologías de los proyectos que no se muestran en el stack.
  ocultarStack: ["Phaser 3", "Vite", "Web Audio", "Robolectric", "ML Kit", "Room", "CustomTkinter", "Leaflet", "Jetpack Compose", "PySide6", "sherpa-onnx", "Pillow", "Dart"],
  // Tecnologías que se muestran juntas en una sola fila del stack, con el nivel
  // indicado: son distintas herramientas para una misma necesidad.
  gruposStack: [
    { nombre: "Android", nivel: 2, miembros: ["Android", "Kotlin", "Android WebView"] },
    { nombre: "Instaladores", nivel: 2, miembros: ["PyInstaller", "Inno Setup"] },
    { nombre: "Librerías especiales", nivel: 2, miembros: ["PDFium", "rawpy", "MarkItDown", "Whisper"] }
  ],

  fichaSoftware: [
    ["Alcance", "Proyecto end to end: de la idea y el diseño al programa terminado y listo para usar."],
    ["Desarrollo", "Código escrito con Claude (IA)."]
  ],

  software: [
    {
      id: "markdown",
      titulo: "Markdown",
      resumen: "Convertidor de escritorio que pasa Word, Excel, PowerPoint, PDF e imágenes a Markdown.",
      descripcion: [
        "Convertidor a Markdown es una app de escritorio para Windows y macOS que toma documentos de oficina y los convierte a archivos .md, uno por uno o de a carpetas enteras.",
        "Está pensada para quien no programa: se instala como cualquier programa, sin Python ni dependencias. Se agregan los archivos, se elige la carpeta de destino y se convierte con un botón."
      ],
      caracteristicas: [
        "Convierte .docx, .xlsx, .xls, .pptx, .pdf, .csv, .html, .json, .xml y .txt",
        "Imágenes (.png, .jpg, .gif, .bmp) con sus metadatos básicos",
        "Conversión por archivos sueltos o por carpeta completa",
        "Accesos rápidos a Escritorio, Documentos y Descargas como destino",
        "Instaladores para Windows y macOS generados automáticamente en cada cambio"
      ],
      tecnologias: ["Python", "Tkinter", "MarkItDown", "PyInstaller", "Inno Setup", "GitHub Actions"],
      ficha: [
        ["Lenguaje", "Python"],
        ["Interfaz", "Tkinter (ttk)"],
        ["Conversión", "MarkItDown"],
        ["Empaquetado", "PyInstaller, con instalador de Inno Setup para Windows y DMG para macOS"],
        ["Automatización", "GitHub Actions: compila los instaladores en cada cambio"]
      ],
      anio: "2026",
      enlaces: [],
      capturas: [
        { src: "assets/img/software/markdown/mockup-1.jpg", alt: "La aplicación convirtiendo archivos, en una notebook" },
        { src: "assets/img/software/markdown/mockup-2.jpg", alt: "De documentos de oficina a un archivo Markdown" },
        { src: "assets/img/software/markdown/mockup-3.jpg", alt: "Ícono, formatos soportados y conversión terminada" },
        { src: "assets/img/software/markdown/01.png", alt: "Ventana principal, con la lista vacía" },
        { src: "assets/img/software/markdown/02.png", alt: "Archivos agregados, pendientes de convertir" },
        { src: "assets/img/software/markdown/03.png", alt: "Escritorio elegido como carpeta de destino" },
        { src: "assets/img/software/markdown/04.png", alt: "Conversión en curso" },
        { src: "assets/img/software/markdown/05.png", alt: "Conversión terminada: 6 archivos convertidos" }
      ]
    },
    {
      id: "kakeibo",
      titulo: "Kakeibo",
      resumen: "App para Windows y Android que registra y analiza la economía del hogar, en pesos y en dólares, con los datos sincronizados entre la computadora y el celular.",
      descripcion: [
        "Kakeibo lleva los ingresos y egresos del hogar: movimientos, gastos fijos, tarjetas de crédito con cuotas, préstamos e inversiones, con un resumen general y un calendario de vencimientos. Tiene una versión de escritorio para Windows y una app para Android (APK), que comparten la misma lógica.",
        "Las dos versiones se enlazan: se vinculan una sola vez con un código de 6 dígitos y, desde ahí, lo que se carga en una aparece en la otra, siempre que se use el mismo usuario y los dos equipos estén conectados a la misma red Wi-Fi. Los datos no salen de la red de la casa y viajan cifrados. Ningún dispositivo pisa al otro: si el mismo dato cambió en los dos, el usuario elige con cuál quedarse.",
        "Los pesos y los dólares se mantienen siempre separados y los montos se guardan como enteros, sin errores de redondeo. Cada usuario tiene sus datos aparte, protegidos con contraseña, PIN y, en el celular, huella digital."
      ],
      caracteristicas: [
        "Versión de escritorio para Windows y app para Android",
        "Sincronización entre la computadora y el celular por la red Wi-Fi de la casa, cifrada y sin servidores externos",
        "Resumen con ingresos, egresos y balance por moneda (ARS y USD)",
        "Gastos fijos, con débito automático y aviso de vencimientos",
        "Tarjetas de crédito: resumen del mes y compras en cuotas",
        "Préstamos e inversiones: acciones, crypto y calendario de dividendos",
        "Ingreso con huella digital en el celular; usuarios con datos separados",
        "Modo claro y oscuro, copias de seguridad e instalador para Windows"
      ],
      tecnologias: ["Python", "Flet", "SQLite", "Android", "pytest", "Inno Setup"],
      ficha: [
        ["Plataforma", "Windows y Android"],
        ["Lenguaje", "Python"],
        ["Interfaz", "Flet: la misma base de código para escritorio y celular"],
        ["Datos", "SQLite local, con una base aparte para cada usuario"],
        ["Sincronización", "Por la red local (Wi-Fi), cifrada y firmada; vinculación con código de 6 dígitos y cambios para decidir cuando hay conflicto"],
        ["Pruebas", "pytest"],
        ["Empaquetado", "PyInstaller e instalador de Inno Setup para Windows; APK para Android"]
      ],
      anio: "2026",
      enlaces: [],
      capturas: [
        { src: "assets/img/software/kakeibo/mockup-1.jpg", alt: "Resumen general en modo oscuro, en una notebook" },
        { src: "assets/img/software/kakeibo/mockup-2.jpg", alt: "Modo claro y modo oscuro" },
        { src: "assets/img/software/kakeibo/mockup-3.jpg", alt: "Marca y sección Tarjetas" },
        { src: "assets/img/software/kakeibo/oscuro-resumen.png", alt: "Resumen general: ingresos, egresos y balance en pesos y dólares" },
        { src: "assets/img/software/kakeibo/oscuro-tarjetas.png", alt: "Tarjetas: total del mes, débitos automáticos y compras en cuotas" },
        { src: "assets/img/software/kakeibo/oscuro-gastos-fijos.png", alt: "Gastos fijos, con filtros y vencimientos" },
        { src: "assets/img/software/kakeibo/oscuro-inversiones.png", alt: "Inversiones: resumen y distribución" },
        { src: "assets/img/software/kakeibo/claro-resumen.png", alt: "Resumen general en modo claro" },
        { src: "assets/img/software/kakeibo/movil-resumen.png", alt: "Celular: resumen del mes, con lo pendiente de pagar y el balance por moneda (datos ficticios)" },
        { src: "assets/img/software/kakeibo/movil-movimientos.png", alt: "Celular: movimientos con buscador y filtro por tipo" },
        { src: "assets/img/software/kakeibo/movil-tarjetas.png", alt: "Celular: tarjetas de crédito y resumen del mes" },
        { src: "assets/img/software/kakeibo/movil-inversiones.png", alt: "Celular: inversiones, con totales y distribución" },
        { src: "assets/img/software/kakeibo/movil-sincronizacion.png", alt: "Celular: vinculación con la computadora por la red Wi-Fi" },
        { src: "assets/img/software/kakeibo/movil-claro-resumen.png", alt: "Celular: resumen en modo claro" }
      ]
    },
    {
      id: "cotizador-munay",
      titulo: "Gestor de emprendimiento",
      resumen: "Aplicación de escritorio para llevar un emprendimiento: cotizaciones, presupuestos, insumos, ventas y pedidos. Hecha para Munay.",
      descripcion: [
        "El gestor de Munay reúne el día a día de un emprendimiento en una sola ventana. Empezó como cotizador y hoy cubre todo el circuito: del costo de un producto al presupuesto para el cliente, la venta y la entrega.",
        "El cotizador arma el precio en tres pasos: el producto y la cantidad, la materia prima que lleva, y los otros costos con el margen de ganancia. Con eso se arma un presupuesto con los datos del emprendimiento, que se envía al cliente como imagen por WhatsApp de escritorio."
      ],
      caracteristicas: [
        "Cotización en tres pasos, con redondeo del precio final",
        "Presupuestos para el cliente, con vista previa y envío por WhatsApp como imagen",
        "Cálculo de cuántas piezas entran por hoja o pliego, con margen de corte",
        "Insumos con stock, aviso de mínimo y descuento automático al vender",
        "Productos guardados, historial de cotizaciones y presupuestos en espera",
        "Ventas con costo y ganancia, y calendario de pedidos próximos",
        "Copia de seguridad: exporta e importa todos los datos en un archivo"
      ],
      tecnologias: ["Python", "pywebview", "HTML", "CSS", "JavaScript", "PyInstaller"],
      ficha: [
        ["Lenguaje", "Python"],
        ["Interfaz", "HTML, CSS y JavaScript dentro de una ventana de pywebview"],
        ["Integración", "WhatsApp de escritorio: abre el chat y adjunta la imagen del presupuesto"],
        ["Datos", "Archivo local en la carpeta del usuario, con exportación e importación"],
        ["Empaquetado", "PyInstaller"]
      ],
      anio: "2026",
      enlaces: [],
      capturas: [
        { src: "assets/img/software/munay/mockup-1.jpg", alt: "El Cotizador abierto en una notebook" },
        { src: "assets/img/software/munay/mockup-2.jpg", alt: "Modo claro y modo oscuro" },
        { src: "assets/img/software/munay/mockup-3.jpg", alt: "Marca y registro de ventas" },
        { src: "assets/img/software/munay/claro-cotizar.png", alt: "Cotizar: producto, materia prima y precio final sugerido" },
        { src: "assets/img/software/munay/claro-productos.png", alt: "Productos guardados, con su costo y margen" },
        { src: "assets/img/software/munay/claro-insumos.png", alt: "Insumos, con costo unitario y stock" },
        { src: "assets/img/software/munay/claro-ventas.png", alt: "Ventas: total vendido, costo y ganancia" },
        { src: "assets/img/software/munay/claro-pedidos.png", alt: "Calendario de pedidos" }
      ]
    },
    {
      id: "fotique",
      titulo: "Fotique",
      resumen: "Sistema integral de gestión para estudios fotográficos: equipos, personal, clientes, proyectos y contratos.",
      descripcion: [
        "Fotique es una aplicación de escritorio que reúne la gestión de un estudio fotográfico: inventario de equipos, fotógrafos, clientes y proyectos, calendario, tarifario, contratos y respaldos.",
        "Funciona sin conexión, con una base de datos local, y tiene cuentas de usuario con roles de administrador y usuario. Las reglas de negocio están separadas de la interfaz y cubiertas con pruebas automáticas."
      ],
      caracteristicas: [
        "Inventario: ficha de cada equipo, asignaciones, historial de movimientos y alertas de service",
        "Fotógrafos: equipos tomados, trabajos con rol e historial de entregas",
        "Clientes y proyectos: seña, cobros y saldo automático",
        "Calendario unificado, tarifario y contratos generados desde plantillas",
        "Resumen general por período, con gráficos",
        "Usuarios y roles, recuperación de contraseña y respaldo de la base"
      ],
      tecnologias: ["Python", "CustomTkinter", "SQLite", "pytest", "PyInstaller"],
      ficha: [
        ["Lenguaje", "Python"],
        ["Interfaz", "CustomTkinter"],
        ["Datos", "SQLite, en una base local"],
        ["Pruebas", "pytest"],
        ["Empaquetado", "PyInstaller"]
      ],
      anio: "2026",
      enlaces: [],
      capturas: [
        { src: "assets/img/software/fotique/mockup-1.jpg", alt: "Resumen general en modo oscuro, en una notebook" },
        { src: "assets/img/software/fotique/mockup-2.jpg", alt: "Modo claro y modo oscuro" },
        { src: "assets/img/software/fotique/mockup-3.jpg", alt: "Marca y sección Clientes y proyectos" },
        { src: "assets/img/software/fotique/oscuro-resumen.png", alt: "Resumen general: inventario, próximos eventos y saldos por cobrar" },
        { src: "assets/img/software/fotique/oscuro-proyectos.png", alt: "Clientes y proyectos: seña, pagos y saldo" },
        { src: "assets/img/software/fotique/oscuro-inventario.png", alt: "Inventario de equipos, con asignaciones y alertas de service" },
        { src: "assets/img/software/fotique/oscuro-administrativo.png", alt: "Resumen administrativo: ingresos por tipo de proyecto" },
        { src: "assets/img/software/fotique/claro-resumen.png", alt: "Resumen general en modo claro" }
      ]
    },
    {
      id: "photosorter",
      titulo: "PhotoSorter",
      resumen: "Aplicación de escritorio que organiza fotografías en carpetas según su orientación, sin tocar los originales.",
      descripcion: [
        "PhotoSorter separa las fotos de una carpeta en Verticales, Horizontales y Cuadradas. Está pensada para alguien que no programa: descargar, instalar, abrir, elegir la carpeta y procesar.",
        "Las fotos se copian a su nuevo destino y los originales nunca se modifican. Si una imagen está dañada el proceso sigue y la app avisa cuál fue."
      ],
      caracteristicas: [
        "Selección de carpeta, con subcarpetas opcionales",
        "Clasificación automática: vertical, horizontal o cuadrada",
        "Lee JPG, PNG, TIFF, WebP y formatos RAW",
        "Avance en vivo: fotos encontradas, procesadas, errores y tiempo restante",
        "Vista previa y galería de lo que se va procesando",
        "Procesamiento por lotes para miles de fotos"
      ],
      tecnologias: ["Python", "PySide6", "Pillow", "rawpy", "PyInstaller"],
      ficha: [
        ["Lenguaje", "Python"],
        ["Interfaz", "PySide6 (Qt)"],
        ["Imágenes", "Pillow y rawpy, para leer también formatos RAW"],
        ["Empaquetado", "PyInstaller"]
      ],
      anio: "2026",
      enlaces: [],
      capturas: [
        { src: "assets/img/software/photosorter/mockup-1.jpg", alt: "PhotoSorter con una carpeta ya organizada, en una notebook" },
        { src: "assets/img/software/photosorter/mockup-2.jpg", alt: "Mientras procesa y con las fotos ya separadas" },
        { src: "assets/img/software/photosorter/mockup-3.jpg", alt: "Marca y ventana principal" },
        { src: "assets/img/software/photosorter/01-inicial.png", alt: "Ventana principal, antes de elegir la carpeta" },
        { src: "assets/img/software/photosorter/02-procesando.png", alt: "Procesando: avance en vivo, vista previa y galería" },
        { src: "assets/img/software/photosorter/03-finalizado.png", alt: "Proceso finalizado, con el resumen por orientación" },
        { src: "assets/img/software/photosorter/04-vertical.png", alt: "Una foto vertical elegida desde la galería" },
        { src: "assets/img/software/photosorter/05-errores.png", alt: "Detalle de un archivo dañado, sin frenar el proceso" }
      ]
    },
    {
      id: "catalogoya",
      titulo: "CatalogoYa",
      resumen: "App Android para administrar ventas por catálogo de varias empresas desde un solo lugar.",
      descripcion: [
        "CatalogoYa ordena el trabajo de quien vende por catálogo para varias marcas a la vez: empresas, campañas, clientes, productos y stock, pedidos y pagos, la recepción de la mercadería y los catálogos en PDF.",
        "Funciona sin Internet, sin telemetría y sin publicidad. Los contactos se eligen desde el selector del sistema, la app se bloquea con la seguridad del teléfono y las copias de seguridad quedan en un archivo que guarda el usuario."
      ],
      caracteristicas: [
        "Varias empresas y campañas, cada una con su ciclo: borrador, abierta, cerrada, recibida y archivada",
        "Clientes manuales o desde los contactos, con historial y saldo",
        "Pedidos con descuentos y pagos múltiples, saldo a favor y entrega que descuenta stock una sola vez",
        "Recepción parcial o completa, con faltantes y sobrantes",
        "Catálogos PDF por campaña y carga de productos desde el catálogo",
        "Compartir pedidos, saldos y PDF por WhatsApp; calendario con recordatorios",
        "Bloqueo con huella o credencial del dispositivo y backup ZIP verificado"
      ],
      tecnologias: ["Kotlin", "Jetpack Compose", "Room", "SQLite", "Robolectric"],
      ficha: [
        ["Plataforma", "Android 8.0 o superior"],
        ["Lenguaje", "Kotlin"],
        ["Interfaz", "Jetpack Compose"],
        ["Datos", "Room (SQLite), con esquema exportado para migraciones"],
        ["Pruebas", "62 pruebas de dominio, base de datos y backup (JUnit y Robolectric)"],
        ["Privacidad", "Sin permiso de Internet: todos los datos quedan en el teléfono"]
      ],
      anio: "2026",
      enlaces: [],
      capturas: [
        { src: "assets/img/software/catalogoya/mockup-1.jpg", alt: "Pantalla de inicio, pedidos y productos en el celular" },
        { src: "assets/img/software/catalogoya/mockup-2.jpg", alt: "Lista de pedidos y detalle de un pedido" },
        { src: "assets/img/software/catalogoya/mockup-3.jpg", alt: "Marca y calendario de la app" },
        { src: "assets/img/software/catalogoya/01-inicio.png", alt: "Inicio: empresa, campaña activa, saldos y stock bajo (datos ficticios)" },
        { src: "assets/img/software/catalogoya/02-pedidos.png", alt: "Pedidos por entregar y por cobrar" },
        { src: "assets/img/software/catalogoya/03-pedido.png", alt: "Detalle de un pedido, con productos y pagos" },
        { src: "assets/img/software/catalogoya/04-productos.png", alt: "Productos y stock" },
        { src: "assets/img/software/catalogoya/05-clientes.png", alt: "Clientes" },
        { src: "assets/img/software/catalogoya/06-calendario.png", alt: "Calendario y notas" }
      ]
    },
    {
      id: "transcriptor",
      titulo: "Transcriptor",
      resumen: "App Android que transcribe audio a texto en español dentro del teléfono, sin cuentas ni servidores.",
      descripcion: [
        "Transcriptor convierte grabaciones en texto con marcas de tiempo, procesando todo en el propio teléfono. Los audios nunca salen del dispositivo: Internet solo se usa una vez, para descargar el modelo de reconocimiento.",
        "Además de transcribir archivos, tiene un modo en vivo que graba del micrófono y muestra el texto mientras se habla."
      ],
      caracteristicas: [
        "Transcripción de archivos en español, con marcas de tiempo por segmento",
        "Dos modelos a elegir: rápido (160 MB) o preciso (375 MB)",
        "Modo en vivo: texto mientras se habla, con un modelo de streaming",
        "Detector de voz para saltear silencios",
        "Cola de trabajos largos que sigue en segundo plano",
        "Lee MP3, M4A/AAC, WAV, FLAC, OGG, Opus, AMR y el audio de los videos"
      ],
      tecnologias: ["Kotlin", "Jetpack Compose", "Whisper", "sherpa-onnx"],
      ficha: [
        ["Plataforma", "Android"],
        ["Lenguaje", "Kotlin"],
        ["Interfaz", "Jetpack Compose"],
        ["Reconocimiento", "Whisper cuantizado sobre sherpa-onnx, con detector de voz Silero"],
        ["En vivo", "Modelo de streaming Kroko"],
        ["Privacidad", "Todo se procesa en el teléfono; los modelos se verifican con SHA-256"]
      ],
      anio: "2026",
      enlaces: [],
      capturas: [
        { src: "assets/img/software/transcriptor/mockup-1.jpg", alt: "Transcripción, lista de audios y motor de voz" },
        { src: "assets/img/software/transcriptor/mockup-2.jpg", alt: "Lista de transcripciones y texto con marcas de tiempo" },
        { src: "assets/img/software/transcriptor/mockup-3.jpg", alt: "Marca y elección del motor de voz" },
        { src: "assets/img/software/transcriptor/01-inicio.png", alt: "Lista de transcripciones (datos ficticios)" },
        { src: "assets/img/software/transcriptor/02-transcripcion.png", alt: "Transcripción con marcas de tiempo y reproductor" },
        { src: "assets/img/software/transcriptor/03-motor.png", alt: "Elección del motor de voz" }
      ]
    },
    {
      id: "flashed",
      titulo: "Flashed: juego",
      resumen: "Juego arcade 2D de navegador: un fotógrafo de eventos que tiene que sacar las fotos del trabajo esquivando invitados y láseres.",
      descripcion: [
        "FLASHED — The Party Photographer es un juego arcade en el que sos un fotógrafo de eventos: hay que conseguir las fotos del trabajo esquivando invitados, muebles y, sobre todo, los láseres del show, que queman el sensor de la cámara.",
        "La campaña recorre siete eventos encadenados, de una noche de alabanza a un cumpleaños de 15, una boda y un recital, hasta la pelea final contra el DJ. Todo el arte, la música y los efectos se generan por código."
      ],
      caracteristicas: [
        "Campaña de siete escenarios, con objetivos especiales y jefe final en tres fases",
        "Tarjeta de memoria con disparos contados y fotos válidas mínimas por evento",
        "Accesorios a elegir entre niveles, que duran toda la partida",
        "Arte vectorial y personajes generados por código; música sintetizada por escenario",
        "Español e inglés; teclado, mando y controles táctiles en el celular",
        "Sin servidor: se publica en cualquier hosting estático"
      ],
      tecnologias: ["TypeScript", "Phaser 3", "Vite", "Web Audio"],
      ficha: [
        ["Plataforma", "Navegador (computadora, tableta y celular)"],
        ["Lenguaje", "TypeScript"],
        ["Motor", "Phaser 3"],
        ["Compilación", "Vite"],
        ["Audio", "Efectos y música sintetizados con Web Audio"],
        ["Publicación", "Sitio estático, sin backend"]
      ],
      anio: "2026",
      enlaces: [],
      capturas: [
        { src: "assets/img/software/flashed/mockup-1.jpg", alt: "El juego en una notebook: la discoteca" },
        { src: "assets/img/software/flashed/mockup-2.jpg", alt: "Fiesta de 15 y pelea final contra el DJ" },
        { src: "assets/img/software/flashed/mockup-3.jpg", alt: "Portada: el fotógrafo contra el DJ" },
        { src: "assets/img/software/flashed/1-objetivo.jpg", alt: "Pantalla de objetivos antes de un evento" },
        { src: "assets/img/software/flashed/2-cumple.jpg", alt: "Cumpleaños infantil" },
        { src: "assets/img/software/flashed/3-quince.jpg", alt: "Cumpleaños de 15" },
        { src: "assets/img/software/flashed/4-discoteca.jpg", alt: "Discoteca, con los láseres del show" },
        { src: "assets/img/software/flashed/5-jefe.jpg", alt: "Pelea final contra el DJ" }
      ]
    },
    {
      id: "autocontrol",
      titulo: "AutoControl",
      resumen: "App para llevar los controles del auto: kilometraje, service, papeles, patentes y gastos, con GPS y mapa con navegación.",
      descripcion: [
        "AutoControl reúne todo lo que hay que tener al día de un vehículo: kilometraje, plan de service, historial mecánico, combustible, patentes, papeles con sus vencimientos, mecánicos de confianza y gastos.",
        "Suma un GPS que cuenta los kilómetros y un mapa con búsqueda, rutas y navegación por voz. En Android, el mapa gira con el auto y queda en una ventanita flotante al salir de la app."
      ],
      caracteristicas: [
        "Resumen del vehículo: kilometraje, próximo service, vencimientos y gastos del año",
        "Plan de service que avisa por kilómetros o por tiempo, lo que llegue primero",
        "Historial mecánico, cargas de combustible y patentes en cuotas o anuales",
        "Papeles (VTV, seguro, carnet) con fotos o PDF adjuntos y aviso de vencimiento",
        "GPS que cuenta kilómetros y mapa con búsqueda, rutas y navegación por voz",
        "Ventana flotante con mapa y odómetro en Android; copias de seguridad"
      ],
      tecnologias: ["HTML", "CSS", "JavaScript", "Leaflet", "Android WebView"],
      ficha: [
        ["Plataforma", "Android, y versión web en un solo archivo"],
        ["Lenguaje", "JavaScript, HTML y CSS; Java para la capa nativa de Android"],
        ["Mapa", "Leaflet, con mapas, búsqueda y rutas de servicios abiertos sin clave"],
        ["Datos", "Locales en el teléfono; fotos y PDF de los papeles en IndexedDB"]
      ],
      anio: "2026",
      enlaces: [],
      capturas: [
        { src: "assets/img/software/autocontrol/mockup-1.jpg", alt: "Resumen, service y papeles en el celular" },
        { src: "assets/img/software/autocontrol/mockup-2.jpg", alt: "Service y cargas de combustible" },
        { src: "assets/img/software/autocontrol/mockup-3.jpg", alt: "Marca y papeles con vencimientos" },
        { src: "assets/img/software/autocontrol/01-resumen.png", alt: "Resumen del vehículo, con datos de ejemplo" },
        { src: "assets/img/software/autocontrol/02-service.png", alt: "Plan de service por kilómetros y por tiempo" },
        { src: "assets/img/software/autocontrol/03-combustible.png", alt: "Cargas de combustible" },
        { src: "assets/img/software/autocontrol/04-papeles.png", alt: "Papeles con sus vencimientos" }
      ]
    },
    {
      id: "recibapp",
      titulo: "Recibapp",
      resumen: "Analizador de recibos de sueldo, 100 % sin conexión, para computadora y celular.",
      descripcion: [
        "Recibapp lee el PDF del recibo de sueldo, separa cada concepto (haberes remunerativos, no remunerativos y descuentos) y explica qué es cada uno. Verifica la lectura comparando la suma de los conceptos con el neto impreso.",
        "Muestra cómo cambian el básico, las horas extras, los descuentos y el neto mes a mes, valida los aportes de ley y compara dos recibos, incluso de empresas distintas. Todo sin conexión: ningún dato sale del dispositivo."
      ],
      caracteristicas: [
        "Lectura del recibo en PDF y de fotos o escaneos con el OCR del propio sistema",
        "Verificación de la lectura contra el neto impreso",
        "Evolución mes a mes del básico, las horas extras, los descuentos y el neto",
        "Control de los aportes de ley: jubilación, PAMI y obra social",
        "Comparación de dos recibos, por concepto o por categoría",
        "Aprende de las correcciones: guarda reglas propias para cada empresa"
      ],
      tecnologias: ["Flutter", "Dart", "PDFium", "ML Kit"],
      ficha: [
        ["Plataforma", "Windows, macOS, Linux, Android e iOS"],
        ["Lenguaje", "Dart"],
        ["Interfaz", "Flutter"],
        ["Lectura", "PDFium embebido; OCR de Windows o Google ML Kit en el celular"],
        ["Privacidad", "Sin llamadas de red: los datos quedan en la carpeta privada de la app"]
      ],
      anio: "2026",
      enlaces: [],
      capturas: [
        { src: "assets/img/software/recibapp/mockup-1.jpg", alt: "Resumen del recibo en una notebook" },
        { src: "assets/img/software/recibapp/mockup-2.jpg", alt: "Comparación en la computadora y resumen en el celular" },
        { src: "assets/img/software/recibapp/mockup-3.jpg", alt: "Marca, recibos en la computadora y en el celular" },
        { src: "assets/img/software/recibapp/01-resumen.png", alt: "Resumen del último recibo (datos ficticios)" },
        { src: "assets/img/software/recibapp/02-recibos.png", alt: "Recibos cargados" },
        { src: "assets/img/software/recibapp/03-comparar.png", alt: "Comparación entre dos recibos" },
        { src: "assets/img/software/recibapp/04-ajustes.png", alt: "Ajustes" },
        { src: "assets/img/software/recibapp/05-revision.png", alt: "Revisión de un recibo leído" }
      ]
    }
  ],

  /* DISEÑO GRÁFICO
     manual: ruta al PDF del manual de marca en assets/manuales/
     portada: imagen de la tarjeta en el listado; si falta se usa el primer mockup
     mockups: imágenes de la marca aplicada, en assets/img/diseno/<marca>/.
              Se generan con herramientas/mockups/ (ver generar.mjs). */
  diseno: [
    {
      id: "kakeibo",
      titulo: "Kakeibo",
      resumen: "Identidad visual de Kakeibo: «Tu economía del hogar, en orden».",
      descripcion: ["Contá el concepto detrás de la marca y las decisiones de diseño."],
      manual: "assets/manuales/kakeibo-manual-de-marca.pdf",
      portada: "assets/img/diseno/kakeibo/mockup-2.jpg",
      mockups: [
        { src: "assets/img/diseno/kakeibo/mockup-1.jpg", alt: "La aplicación en una notebook" },
        { src: "assets/img/diseno/kakeibo/mockup-2.jpg", alt: "Cuaderno de cuentas, lápiz y tarjeta" },
        { src: "assets/img/diseno/kakeibo/mockup-3.jpg", alt: "Ícono de aplicación y barra de tareas" }
      ]
    },
    {
      id: "photosorter",
      titulo: "PhotoSorter",
      resumen: "Identidad visual de PhotoSorter: una foto colgada de un broche.",
      descripcion: [
        "El logo es una copia fotográfica colgada a secar: un marco doble, las iniciales «PS» y un broche magenta que la sostiene, el único elemento con color."
      ],
      manual: "assets/manuales/photosorter-manual-de-marca.pdf",
      portada: "assets/img/diseno/photosorter/mockup-2.jpg",
      mockups: [
        { src: "assets/img/diseno/photosorter/mockup-1.jpg", alt: "La aplicación en una notebook" },
        { src: "assets/img/diseno/photosorter/mockup-2.jpg", alt: "Copias colgadas con broches" },
        { src: "assets/img/diseno/photosorter/mockup-3.jpg", alt: "Sitio web de descarga" }
      ]
    },
    {
      id: "fotique",
      titulo: "Fotique",
      resumen: "Identidad visual de Fotique.",
      descripcion: ["Contá el concepto detrás de la marca y las decisiones de diseño."],
      manual: "assets/manuales/fotique-manual-de-marca.pdf",
      portada: "assets/img/diseno/fotique/mockup-3.jpg",
      mockups: [
        { src: "assets/img/diseno/fotique/mockup-1.jpg", alt: "Pantalla de ingreso en una notebook" },
        { src: "assets/img/diseno/fotique/mockup-2.jpg", alt: "Credencial de fotógrafo" },
        { src: "assets/img/diseno/fotique/mockup-3.jpg", alt: "Tarjetas personales" }
      ]
    },
    {
      id: "munay",
      titulo: "Munay",
      resumen: "Identidad visual de Munay: una M con relieve, del violeta al rosa.",
      descripcion: [
        "El logo es la inicial de la marca: una «M» blanca con una sombra corrida, sobre un cuadrado violeta. El degradé del violeta al rosa acompaña las piezas y la aplicación."
      ],
      manual: "assets/manuales/munay-manual-de-marca.pdf",
      portada: "assets/img/diseno/munay/mockup-2.jpg",
      mockups: [
        { src: "assets/img/diseno/munay/mockup-1.jpg", alt: "El Cotizador en una notebook" },
        { src: "assets/img/diseno/munay/mockup-2.jpg", alt: "Bolsa, etiqueta de agradecimiento y stickers" },
        { src: "assets/img/diseno/munay/mockup-3.jpg", alt: "Perfil en redes" }
      ]
    },
    {
      id: "marca-personal",
      titulo: "Marca personal",
      resumen: "Identidad visual de la marca personal jp: dos letras y un punto.",
      descripcion: [
        "El logo son las iniciales «jp» en minúsculas, dibujadas con un solo grosor de trazo. El punto de la j lleva el acento de color. Azul, ámbar, blanco y negro se combinan según el fondo."
      ],
      manual: "assets/manuales/jp-manual-de-marca.pdf",
      mockups: [
        { src: "assets/img/diseno/jp/mockup-1.jpg", alt: "Tarjetas personales" },
        { src: "assets/img/diseno/jp/mockup-2.jpg", alt: "Fotografía enmarcada con firma" },
        { src: "assets/img/diseno/jp/mockup-3.jpg", alt: "Sitio web con favicon" }
      ]
    }
  ]
};
