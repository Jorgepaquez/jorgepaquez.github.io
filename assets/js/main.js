(function () {
  "use strict";

  const D = window.PORTFOLIO;
  const params = new URLSearchParams(location.search);

  const SECCIONES = [
    {
      id: "software",
      titulo: "Software",
      pagina: "software.html",
      param: "p",
      items: D.software,
      descripcion: "Aplicaciones y herramientas end-to-end, desarrolladas con Claude (IA)."
    },
    {
      id: "fotografia",
      titulo: "Fotografía",
      pagina: "fotografia.html",
      param: "cat",
      items: D.fotografia,
      descripcion: "Naturaleza, eventos, sesiones y productos."
    },
    {
      id: "diseno",
      titulo: "Diseño gráfico",
      pagina: "diseno.html",
      param: "p",
      items: D.diseno,
      descripcion: "Identidades visuales y manuales de marca."
    }
  ];

  // El sitio se divide en dos perfiles. Cada sección de trabajos pertenece a uno.
  const PERFILES = [
    {
      id: "creativo",
      titulo: "Perfil creativo",
      corto: "Creativo",
      pagina: "creativo.html",
      secciones: ["fotografia", "diseno"],
      columnaCv: 0
    },
    {
      id: "logico",
      titulo: "Perfil lógico",
      corto: "Lógico",
      pagina: "logico.html",
      secciones: ["software"],
      columnaCv: 1
    }
  ];

  // Orden de las categorías de fotografía en el menú desplegable (las que no
  // figuren acá van al final, en el orden de data.js).
  const MENU_FOTOS = ["productos", "eventos", "sesiones", "naturaleza"];
  const ordenMenu = (s) =>
    s.id !== "fotografia"
      ? s.items
      : [...s.items].sort((a, b) => {
          const pos = (c) => (MENU_FOTOS.indexOf(c.id) + 1 || 99);
          return pos(a) - pos(b);
        });

  const seccion = (id) => SECCIONES.find((s) => s.id === id);
  const perfil = (id) => PERFILES.find((p) => p.id === id);
  const perfilDe = (s) => PERFILES.find((p) => p.secciones.includes(s.id));
  const urlItem = (s, item) => `${s.pagina}?${s.param}=${encodeURIComponent(item.id)}`;
  // Primeras migas de las páginas de una sección: Inicio / Perfil / ...
  const raiz = (s) => [
    { texto: "Inicio", href: "index.html" },
    { texto: perfilDe(s).titulo, href: perfilDe(s).pagina }
  ];

  /* ---------- utilidades de DOM ---------- */

  function el(tag, attrs, ...hijos) {
    const n = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs || {})) {
      if (v == null || v === false) continue;
      if (k === "class") n.className = v;
      else if (k.startsWith("on")) n.addEventListener(k.slice(2), v);
      else n.setAttribute(k, v === true ? "" : v);
    }
    for (const h of hijos.flat(Infinity)) {
      if (h == null || h === false) continue;
      n.append(h);
    }
    return n;
  }

  // Muestra la imagen o, si todavía no hay archivo, un recuadro de relleno.
  function imagen(src, alt, textoRelleno) {
    if (src) return el("img", { src, alt, loading: "lazy" });
    return el("div", { class: "relleno", role: "img", "aria-label": alt }, textoRelleno || alt);
  }

  const normalizarFoto = (f, altPorDefecto) =>
    typeof f === "string" ? { src: f, alt: altPorDefecto } : { alt: altPorDefecto, ...f };

  // Fotos de una galería importada con herramientas/importar_fotos.py
  // "galeria" puede ser una carpeta o una lista de carpetas que se muestran juntas.
  const fotosDe = (clave) =>
    Array.isArray(clave) ? clave.flatMap((c) => fotosDe(c)) : (window.FOTOS || {})[clave] || [];

  // Fotos de una categoría sin álbumes. "quitar" son posiciones de la galería
  // (contando desde 1) que no se muestran; los archivos siguen en su carpeta.
  const fotosCategoria = (cat) => {
    const fuera = new Set(cat.quitar || []);
    return fotosDe(cat.galeria).filter((_, i) => !fuera.has(i + 1));
  };

  // Imagen de tapa de una tarjeta. Si trae "fondo" se muestra entera, sin recortar.
  function tapa(img, alt) {
    if (!img) return null;
    const f = normalizarFoto(img, alt);
    return el("img", {
      class: "tarjeta-img" + (f.fondo ? " entera" : ""),
      src: f.mini || f.src,
      alt: f.alt,
      loading: "lazy",
      style: f.fondo ? `background:${f.fondo}` : null
    });
  }

  /* ---------- íconos y datos de contacto ---------- */

  const ICONOS = {
    email: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 7 8.5 6 8.5-6"/>',
    ubicacion: '<path d="M12 21s-6.5-6.2-6.5-11a6.5 6.5 0 0 1 13 0c0 4.8-6.5 11-6.5 11Z"/><circle cx="12" cy="10" r="2.300"/>',
    whatsapp:
      '<path d="M3.500 20.500 4.800 16A8.500 8.500 0 1 1 8 19.200Z"/><path d="M9 8.300c-.4 0-.9.5-.9 1.400 0 2.300 3.300 5.600 5.600 5.600.9 0 1.400-.5 1.400-.9l-1.700-1.100-.9.7c-.9-.4-2.100-1.600-2.500-2.500l.7-.9Z" fill="currentColor" stroke="none"/>',
    instagram: '<rect x="3.500" y="3.500" width="17" height="17" rx="4.500"/><circle cx="12" cy="12" r="3.800"/><circle cx="17" cy="7" r="1" fill="currentColor" stroke="none"/>',
    youtube: '<rect x="2.500" y="5.500" width="19" height="13" rx="4"/><path d="m10 9 5 3-5 3Z" fill="currentColor" stroke="none"/>',
    linkedin:
      '<rect x="3.500" y="3.500" width="17" height="17" rx="2.500"/><path d="M8 10.500V16.500M12 16.500v-3.500a2 2 0 0 1 4 0v3.500M12 10.500v6"/><circle cx="8" cy="7.700" r="1" fill="currentColor" stroke="none"/>',
    github:
      '<path d="M9.500 20v-2.600c-3 .9-3.800-1.300-4.800-1.700M14.500 20v-3.200c0-.8-.2-1.400-.7-1.800 2.400-.3 4.700-1.200 4.700-5a3.800 3.800 0 0 0-1-2.700 3.500 3.500 0 0 0-.1-2.700s-.9-.2-2.900 1.100a10 10 0 0 0-5 0C7.500 4.400 6.600 4.600 6.600 4.600a3.500 3.500 0 0 0-.1 2.700 3.800 3.800 0 0 0-1 2.700c0 3.800 2.300 4.700 4.700 5-.4.400-.6.900-.7 1.500"/>',
    enlace: '<path d="M10 14a4 4 0 0 0 5.700 0l3-3A4 4 0 0 0 13 5.300l-1 1M14 10a4 4 0 0 0-5.700 0l-3 3A4 4 0 0 0 11 18.700l1-1"/>'
  };

  function icono(nombre) {
    const span = el("span", { class: "icono", "aria-hidden": "true" });
    span.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.700" stroke-linecap="round" stroke-linejoin="round">${ICONOS[nombre] || ICONOS.enlace}</svg>`;
    return span;
  }

  // Email, ubicación y redes, cada uno con su ícono. Se usa en Contacto y en Sobre mí.
  function datosContacto() {
    const redes = D.redes.filter((r) => r.url);
    const conTexto = redes.filter((r) => r.texto);
    const soloIcono = redes.filter((r) => !r.texto);
    const enlace = (r, contenido) =>
      el("a", { href: r.url, target: "_blank", rel: "noopener", "aria-label": r.texto ? `${r.nombre}: ${r.texto}` : r.nombre, title: r.nombre }, contenido);

    return [
      el("li", null, icono("email"), el("a", { href: `mailto:${D.email}` }, D.email)),
      D.ubicacion ? el("li", null, icono("ubicacion"), el("span", null, D.ubicacion)) : null,
      conTexto.map((r) => el("li", null, icono(r.icono), enlace(r, r.texto))),
      soloIcono.length ? el("li", { class: "fila-redes" }, soloIcono.map((r) => enlace(r, icono(r.icono)))) : null
    ];
  }

  /* ---------- encabezado y pie ---------- */

  function construirEncabezado(paginaActual) {
    const cerrarDesplegables = (excepto) => {
      document.querySelectorAll(".con-desplegable.abierto").forEach((li) => {
        if (li === excepto) return;
        li.classList.remove("abierto");
        li.querySelector(".flecha-boton").setAttribute("aria-expanded", "false");
      });
    };

    // Cada perfil es un enlace a su página; la flecha de al lado abre el desplegable
    // (en escritorio también se abre al pasar el mouse).
    const itemsSeccion = PERFILES.map((pf) => {
      const secciones = pf.secciones.map(seccion);
      const activo = pf.id === paginaActual || pf.secciones.includes(paginaActual);
      const li = el("li", { class: "con-desplegable nav-" + pf.id });
      const enlace = el("a", { class: "nav-boton" + (activo ? " activo" : ""), href: pf.pagina }, pf.corto);
      const flecha = el(
        "button",
        {
          class: "flecha-boton",
          type: "button",
          "aria-expanded": "false",
          "aria-label": `Secciones de ${pf.titulo.toLowerCase()}`,
          onclick: () => {
            const abrir = !li.classList.contains("abierto");
            cerrarDesplegables(li);
            li.classList.toggle("abierto", abrir);
            flecha.setAttribute("aria-expanded", String(abrir));
          }
        },
        el("span", { class: "flecha", "aria-hidden": "true" }, "▾")
      );
      const boton = el("div", { class: "nav-par" }, enlace, flecha);
      const lista = el(
        "ul",
        { class: "desplegable" },
        secciones.map((s) => [
          el("li", { class: "desplegable-titulo" }, el("a", { href: s.pagina }, s.titulo)),
          ordenMenu(s).map((item) => el("li", { class: "desplegable-sub" }, el("a", { href: urlItem(s, item) }, item.titulo)))
        ]),
        el("li", { class: "ver-todo" }, el("a", { href: pf.pagina }, `Ver ${pf.titulo.toLowerCase()} →`))
      );
      li.append(boton, lista);
      return li;
    });

    const nav = el(
      "nav",
      { id: "nav", class: "nav", "aria-label": "Principal" },
      el(
        "ul",
        { class: "nav-lista" },
        el("li", null, el("a", { href: "index.html", class: paginaActual === "inicio" ? "activo" : "" }, "Inicio")),
        itemsSeccion,
        el("li", null, el("a", { href: "sobre-mi.html", class: paginaActual === "sobre-mi" ? "activo" : "" }, "Sobre mí")),
        el("li", null, el("a", { href: "index.html#contacto" }, "Contacto"))
      )
    );

    const botonMenu = el(
      "button",
      {
        class: "menu-boton",
        type: "button",
        "aria-expanded": "false",
        "aria-controls": "nav",
        onclick: () => {
          const abierto = nav.classList.toggle("abierto");
          botonMenu.setAttribute("aria-expanded", String(abierto));
        }
      },
      "Menú"
    );

    const botonTema = el("button", {
      class: "tema-boton",
      type: "button",
      onclick: () => {
        const nuevo = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
        document.documentElement.dataset.theme = nuevo;
        try {
          localStorage.setItem("tema", nuevo);
        } catch (e) {
          /* sin almacenamiento: el tema dura solo esta visita */
        }
        actualizarBotonTema();
      }
    });
    function actualizarBotonTema() {
      const oscuro = document.documentElement.dataset.theme === "dark";
      botonTema.textContent = oscuro ? "☀" : "☾";
      botonTema.setAttribute("aria-label", oscuro ? "Cambiar a tema claro" : "Cambiar a tema oscuro");
      botonTema.title = botonTema.getAttribute("aria-label");
    }
    actualizarBotonTema();

    document.addEventListener("click", (e) => {
      if (!e.target.closest(".con-desplegable")) cerrarDesplegables();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") cerrarDesplegables();
    });

    document.getElementById("encabezado").append(
      el(
        "div",
        { class: "contenedor encabezado-interior" },
        // Logo jp desde el vector, según el manual: letras azules en tema claro,
        // blancas en tema oscuro; el punto siempre ámbar.
        el(
          "a",
          { class: "marca", href: "index.html", "aria-label": `${D.nombre}, inicio` },
          el("img", { class: "logo-claro", src: "assets/img/diseno/jp/jp-azul.svg", alt: "", width: "33", height: "32" }),
          el("img", { class: "logo-oscuro", src: "assets/img/diseno/jp/jp-blanco.svg", alt: "", width: "33", height: "32" })
        ),
        nav,
        el("div", { class: "encabezado-acciones" }, botonTema, botonMenu)
      )
    );
  }

  function construirPie() {
    const redes = D.redes.filter((r) => r.url);
    document.getElementById("pie").append(
      el(
        "div",
        { class: "contenedor pie-interior" },
        el("span", null, `© ${new Date().getFullYear()} ${D.nombre}`),
        redes.length
          ? el(
              "ul",
              { class: "pie-redes" },
              redes.map((r) => el("li", null, el("a", { href: r.url, target: "_blank", rel: "noopener" }, r.nombre)))
            )
          : null
      )
    );
  }

  /* ---------- piezas compartidas ---------- */

  function migas(...partes) {
    return el(
      "nav",
      { class: "migas", "aria-label": "Ruta" },
      partes.filter(Boolean).map((p, i) => [
        i > 0 ? el("span", { "aria-hidden": "true" }, " / ") : null,
        p.href ? el("a", { href: p.href }, p.texto) : el("span", { "aria-current": "page" }, p.texto)
      ])
    );
  }

  function cabeceraPagina(titulo, bajada) {
    return el("header", { class: "cabecera-pagina" }, el("h1", null, titulo), bajada ? el("p", { class: "bajada" }, bajada) : null);
  }

  // "rotulo" es la tapa de reemplazo cuando no hay imagen: nombre y plataforma.
  const rotuloSoftware = (p) => ({
    titulo: p.titulo,
    plataforma: ((p.ficha || []).find(([r]) => r === "Plataforma") || [, ""])[1]
  });

  function tarjeta(href, titulo, texto, etiqueta, img, rotulo) {
    return el(
      "a",
      { class: "tarjeta", href },
      img
        ? tapa(img, "")
        : rotulo
        ? el("div", { class: "tarjeta-img tarjeta-rotulo", "aria-hidden": "true" }, el("strong", null, rotulo.titulo), el("span", null, rotulo.plataforma))
        : null,
      etiqueta ? el("span", { class: "tarjeta-etiqueta" }, etiqueta) : null,
      el("h3", null, titulo),
      el("p", null, texto),
      el("span", { class: "tarjeta-ir", "aria-hidden": "true" }, "Ver →")
    );
  }

  // Grilla de imágenes con visor ampliado. Sin fotos muestra recuadros de relleno.
  // Con "entera" las imágenes se ven completas en la grilla (capturas, logos).
  // Si predominan las fotos horizontales las filas van más bajas, para que entren tres por fila.
  const casiTodasHorizontales = (lista) => lista.filter((f) => f.h > f.w).length < lista.length * 0.5;

  // Con "justa" cada foto conserva su proporción y las filas se ajustan al ancho, sin recortes.
  function galeria(fotos, altPorDefecto, textoRelleno, cantidadRelleno, entera, justa) {
    const lista = fotos.map((f) => normalizarFoto(f, altPorDefecto));
    if (!lista.length) {
      return el(
        "div",
        { class: "galeria" },
        Array.from({ length: cantidadRelleno || 6 }, () => el("div", { class: "relleno" }, textoRelleno))
      );
    }
    return el(
      "div",
      { class: "galeria" + (entera ? " entera" : "") + (justa ? " justa" : "") + (justa && casiTodasHorizontales(lista) ? " apaisada" : "") },
      lista.map((f, i) =>
        el(
          "button",
          {
            class: "galeria-item" + (f.fondo ? " con-fondo" : ""),
            type: "button",
            "aria-label": `Ampliar: ${f.alt}`,
            style: justa && f.w && f.h ? `--r:${(f.w / f.h).toFixed(4)}` : f.fondo ? `background:${f.fondo}` : null,
            onclick: () => abrirVisor(lista, i)
          },
          el("img", { src: f.mini || f.src, alt: f.alt, loading: "lazy" })
        )
      )
    );
  }

  let visor;
  function abrirVisor(lista, indice) {
    if (!visor) {
      const img = el("img", { alt: "" });
      const pie = el("p", { class: "visor-pie" });
      const dlg = el(
        "dialog",
        { class: "visor" },
        el("button", { class: "visor-cerrar", type: "button", "aria-label": "Cerrar", onclick: () => dlg.close() }, "✕"),
        el("button", { class: "visor-nav anterior", type: "button", "aria-label": "Anterior", onclick: () => visor.mover(-1) }, "‹"),
        el("figure", null, img, pie),
        el("button", { class: "visor-nav siguiente", type: "button", "aria-label": "Siguiente", onclick: () => visor.mover(1) }, "›")
      );
      dlg.addEventListener("click", (e) => {
        if (e.target === dlg) dlg.close();
      });
      dlg.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") visor.mover(-1);
        if (e.key === "ArrowRight") visor.mover(1);
      });
      // En pantallas táctiles se pasa de foto deslizando el dedo.
      let inicioX = null;
      dlg.addEventListener("touchstart", (e) => (inicioX = e.touches[0].clientX), { passive: true });
      dlg.addEventListener("touchend", (e) => {
        if (inicioX === null) return;
        const dx = e.changedTouches[0].clientX - inicioX;
        inicioX = null;
        if (Math.abs(dx) > 50) visor.mover(dx < 0 ? 1 : -1);
      });
      document.body.append(dlg);
      visor = {
        dlg,
        lista: [],
        i: 0,
        mostrar() {
          const f = this.lista[this.i];
          img.src = f.src;
          img.alt = f.alt;
          img.style.background = f.fondo || "";
          // Los logos llevan margen; los SVG no tienen tamaño propio y se agrandan a mano.
          img.style.padding = f.fondo ? "4vmin" : "";
          img.style.width = /\.svg$/i.test(f.src) ? "min(70vh, 80vw)" : "";
          pie.textContent = `${f.alt} · ${this.i + 1} / ${this.lista.length}`;
          dlg.classList.toggle("una-sola", this.lista.length < 2);
          // Deja lista la foto siguiente para que el cambio sea inmediato.
          new Image().src = this.lista[(this.i + 1) % this.lista.length].src;
        },
        mover(paso) {
          this.i = (this.i + paso + this.lista.length) % this.lista.length;
          this.mostrar();
        }
      };
    }
    visor.lista = lista;
    visor.i = indice;
    visor.mostrar();
    visor.dlg.showModal();
  }

  function anteriorSiguiente(s, item) {
    const i = s.items.indexOf(item);
    const ant = s.items[i - 1];
    const sig = s.items[i + 1];
    return el(
      "nav",
      { class: "ant-sig", "aria-label": "Otros proyectos" },
      ant ? el("a", { href: urlItem(s, ant) }, `← ${ant.titulo}`) : el("span"),
      sig ? el("a", { href: urlItem(s, sig) }, `${sig.titulo} →`) : el("span")
    );
  }


  /* ---------- datos derivados para los perfiles ---------- */

  // Tapa de una categoría de fotografía: la portada de su primer álbum o la primera foto.
  function tapaCategoria(cat) {
    if (cat.albumes) {
      const a = cat.albumes[0];
      const fotos = fotosDe(a.galeria);
      return fotos[(a.portada || 1) - 1] || fotos[0];
    }
    return fotosCategoria(cat)[0];
  }

  // Fotos para los collages (polaroid): se toma una de cada categoría por turno
  // (naturaleza, eventos, sesiones, productos, y vuelta a empezar), así las
  // primeras siempre mezclan temas en lugar de repetir uno solo.
  function fotosDestacadas() {
    const porCategoria = D.fotografia.map((cat) =>
      cat.albumes
        ? cat.albumes
            .map((a) => {
              const f = fotosDe(a.galeria);
              return f[(a.portada || 1) - 1] || f[0];
            })
            .filter(Boolean)
        : fotosCategoria(cat).slice(0, 3)
    );
    const lista = [];
    for (let vuelta = 0; porCategoria.some((l) => l[vuelta]); vuelta++) {
      porCategoria.forEach((l) => l[vuelta] && lista.push(l[vuelta]));
    }
    return lista;
  }

  // Tecnologías de todos los proyectos de software, ordenadas por cuántos las usan.
  // Nivel de 1 a 5 de cada tecnología. Sale de la proporción de proyectos que la
  // usan, salvo las que tienen un nivel propio en "nivelStack" (data.js).
  const NIVEL_MAX = 5;
  function miembrosStack(t) {
    const g = (D.gruposStack || []).find((x) => x.nombre === t);
    return g ? g.miembros.join(", ") : null;
  }
  function stack() {
    const cuenta = new Map();
    D.software.forEach((p) => p.tecnologias.forEach((t) => cuenta.set(t, (cuenta.get(t) || 0) + 1)));
    // Herramientas usadas en todos los proyectos (ver "stackComun" en data.js).
    (D.stackComun || []).forEach((t) => cuenta.set(t, D.software.length));
    const nivel = new Map([...cuenta].map(([t, n]) => [t, Math.max(1, Math.round((n / D.software.length) * NIVEL_MAX))]));
    Object.entries(D.nivelStack || {}).forEach(([t, n]) => nivel.set(t, n));
    (D.ocultarStack || []).forEach((t) => nivel.delete(t));
    // Grupos (ver "gruposStack" en data.js): sus miembros se reemplazan por una sola fila.
    (D.gruposStack || []).forEach((g) => {
      g.miembros.forEach((t) => nivel.delete(t));
      nivel.set(g.nombre, g.nivel);
    });
    return [...nivel.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  }

  // Puestos y estudios de una columna del CV, en una sola lista.
  function recorrido(columna) {
    const salida = [];
    for (const a of columna.areas) {
      for (const g of a.grupos || []) {
        if (g.titulo !== "Educación" && g.titulo !== "Trabajo") continue;
        (g.items || []).forEach((it) => salida.push({ ...it, area: a.titulo, tipo: g.titulo }));
      }
    }
    return salida;
  }

  const cantidadCursos = (columna) =>
    columna.areas.reduce((n, a) => n + (a.grupos || []).reduce((m, g) => m + (g.cursos || []).length, 0), 0);

  /* ---------- páginas ---------- */

  function paginaInicio(main) {
    document.title = `${D.nombre} — Portfolio`;
    const fotos = fotosDestacadas();
    const fondo = normalizarFoto((D.portadas || {}).fotografia || fotos[0] || "", "");

    const creativa = el(
      "a",
      { class: "mitad mitad-creativa", href: "creativo.html" },
      el(
        "div",
        { class: "mitad-fondo", "aria-hidden": "true" },
        fondo.src ? el("img", { src: fondo.src, alt: "" }) : null,
        el(
          "div",
          { class: "mitad-tira" },
          fotos.slice(0, 4).map((f, i) => el("img", { src: f.mini || f.src, alt: "", style: `--i:${i}` }))
        )
      ),
      el(
        "div",
        { class: "mitad-contenido" },
        el("span", { class: "mitad-num" }, "01"),
        el("p", { class: "mitad-sobre" }, "Fotografía · Diseño gráfico"),
        // "Perfil" cambia de color según lo que tenga detrás (foto o polaroid), para leerse siempre.
        el("h2", null, el("span", { class: "palabra-adaptable" }, "Perfil"), el("br"), el("em", null, "creativo")),
        el("p", { class: "mitad-texto" }, "Luz, encuadre e identidad. Eventos, retratos, productos y marcas con manual propio."),
        el("span", { class: "mitad-ir" }, "Entrar", el("span", { "aria-hidden": "true" }, " →"))
      )
    );

    // Código Python real (se puede ejecutar), puesto como fondo de la mitad lógica.
    const py = (v) => JSON.stringify(v); // un texto JSON simple también es un texto válido en Python
    const codigoPython = [
      "perfil = {",
      `    "rol": ${py("Application Development Analyst")},`,
      `    "proyectos": ${D.software.length},`,
      `    "stack": [${stack().slice(0, 4).map(([t]) => py(t)).join(", ")}],`,
      `    "enfoque": ${py("end to end")},`,
      "}",
      "",
      "def construir(p):",
      `    print(f"{p['rol']} | {p['proyectos']} proyectos")`,
      `    print("stack:", ", ".join(p["stack"]))`,
      `    print("enfoque:", p["enfoque"])`,
      "",
      "construir(perfil)"
    ].join("\n");

    const logica = el(
      "a",
      { class: "mitad mitad-logica", href: "logico.html" },
      el("div", { class: "mitad-fondo", "aria-hidden": "true" }, el("pre", { class: "mitad-codigo" }, codigoPython)),
      el(
        "div",
        { class: "mitad-contenido" },
        el("span", { class: "mitad-num" }, "02"),
        el("p", { class: "mitad-sobre" }, "Sistemas · Software"),
        el("h2", null, "Perfil", el("br"), el("em", null, "lógico"), el("span", { class: "cursor", "aria-hidden": "true" }, "_")),
        el("p", { class: "mitad-texto" }, "Análisis, arquitectura y desarrollo. Aplicaciones de escritorio, integraciones y automatización."),
        el("span", { class: "mitad-ir" }, "Entrar", el("span", { "aria-hidden": "true" }, " →"))
      )
    );

    main.append(
      el(
        "section",
        { class: "umbral", "aria-label": "Elegí un perfil" },
        creativa,
        el(
          "div",
          { class: "umbral-centro" },
          el("div", { class: "umbral-foto" }, imagen(D.foto, `Foto de ${D.nombre}`, "Foto")),
          el("h1", null, D.nombre),
          el("p", null, "Un lado que imagina, otro que resuelve. Los dos viven en mí."),
          el("span", { class: "umbral-flechas", "aria-hidden": "true" }, "← elegí →")
        ),
        logica
      ),

      el(
        "section",
        { class: "contenedor bloque presentacion-inicio" },
        el("p", { class: "sobretitulo" }, D.rol),
        el("div", { class: "presentacion-texto" }, D.resumen.map((p) => el("p", null, p))),
        el("a", { class: "boton", href: "sobre-mi.html" }, "Conocé mi recorrido completo")
      ),

      seccionContacto()
    );

    vigilarSolapamiento(creativa);
  }

  // Si la palabra "Perfil" queda encima de alguna polaroid, le cambia el color
  // (ver .sobre-polaroid en styles.css). Se revisa al redimensionar y mientras
  // las mitades se agrandan o achican.
  function vigilarSolapamiento(mitad) {
    const palabra = mitad.querySelector(".palabra-adaptable");
    const fotos = [...mitad.querySelectorAll(".mitad-tira img")];
    if (!palabra || !fotos.length) return;
    const tocan = (a, b) => a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
    const revisar = () => {
      const r = palabra.getBoundingClientRect();
      palabra.classList.toggle("sobre-polaroid", fotos.some((f) => tocan(r, f.getBoundingClientRect())));
    };
    let hasta = 0;
    const seguir = () => {
      revisar();
      if (performance.now() < hasta) requestAnimationFrame(seguir);
    };
    const durante = () => {
      const corriendo = performance.now() < hasta;
      hasta = performance.now() + 900; // lo que duran las transiciones de la portada
      if (!corriendo) requestAnimationFrame(seguir);
    };
    const umbral = mitad.parentElement;
    umbral.addEventListener("mouseover", durante);
    umbral.addEventListener("mouseleave", durante);
    addEventListener("resize", revisar);
    fotos.forEach((f) => f.addEventListener("load", revisar));
    revisar();
  }

  function paginaPerfil(main, id) {
    const pf = perfil(id);
    const otro = PERFILES.find((p) => p !== pf);
    const col = D.cv.columnas[pf.columnaCv];
    document.title = `${pf.titulo} — ${D.nombre}`;
    const creativo = id === "creativo";

    const cifras = creativo
      ? [
          // Lo más destacado de la formación creativa (ver "cv" en data.js)
          [2, "carreras terciarias, en diseño y fotografía"],
          ["+10", "programas de diseño, fotografía y video"],
          ["+10", "especializaciones"]
        ]
      : [
          ["+10", "aplicaciones"],
          [stack().length, "tecnologías"],
          [cantidadCursos(col), "cursos y certificaciones"]
        ];

    const cabecera = el(
      "header",
      { class: "perfil-cabecera" },
      el(
        "div",
        { class: "perfil-titular" },
        el("p", { class: "sobretitulo" }, creativo ? "01 · Perfil creativo" : "02 · Perfil lógico"),
        creativo
          ? el("h1", null, "Mirar, ", el("em", null, "encuadrar"), el("br"), "y contar.")
          : el("h1", null, "Analizar, ", el("em", null, "diseñar"), el("br"), "y construir."),
        el(
          "p",
          { class: "bajada" },
          creativo
            ? "La fotografía y el diseño gráfico son mi lado creativo: coberturas de eventos y recitales, sesiones de retrato, fotografía de producto, paisajes e identidades visuales completas, del logo al manual de marca."
            : "El análisis de sistemas es mi lado lógico: trabajo como analista de desarrollo de aplicaciones y diseño aplicaciones end to end, para escritorio, Android y la web, desde el relevamiento y la arquitectura al instalador listo para usar."
        ),
        el(
          "ul",
          { class: "cifras" },
          cifras.map(([n, t]) => el("li", null, el("strong", null, String(n)), el("span", null, t)))
        )
      ),
      creativo
        ? el(
            "div",
            { class: "perfil-collage", "aria-hidden": "true" },
            fotosDestacadas()
              .slice(0, 5)
              .map((f, i) => el("img", { src: f.mini || f.src, alt: "", style: `--i:${i}` }))
          )
        : el(
            "div",
            { class: "perfil-terminal", "aria-hidden": "true" },
            el("div", { class: "terminal-barra" }, el("span"), el("span"), el("span"), el("em", null, "perfil.py")),
            el(
              "pre",
              null,
              `$ python perfil.py --resumen\n\n> rol        ${col.areas[0].grupos[1].items[0].titulo}\n> empresa    ${col.areas[0].grupos[1].items[0].lugar}\n> proyectos  ${D.software.map((p) => p.titulo).join(", ")}\n> stack      ${stack().slice(0, 5).map(([t]) => t).join(" · ")}\n\n✓ listo`
            )
          )
    );

    // Cada sección muestra una sola fila de tres tarjetas; el resto, en "Ver todo".
    const POR_FILA = 3;
    // Categorías de fotografía que se muestran en el perfil creativo, en este orden.
    const FOTOS_PERFIL = ["productos", "eventos", "sesiones"];
    const bloquesSeccion = pf.secciones.map(seccion).map((s) => {
      const elegidas =
        s.id === "fotografia" ? FOTOS_PERFIL.map((id) => s.items.find((c) => c.id === id)).filter(Boolean) : [];
      const items = (elegidas.length ? elegidas : s.items).slice(0, POR_FILA);
      const tarjetas =
        s.id === "fotografia"
          ? items.map((c) =>
              tarjeta(urlItem(s, c), c.titulo, c.descripcion, null, tapaCategoria(c))
            )
          : s.id === "diseno"
          ? items.map((x) => tarjeta(urlItem(s, x), x.titulo, x.resumen, x.manual ? "Manual de marca" : null, x.portada || x.mockups[0]))
          : items.map((x) => tarjeta(urlItem(s, x), x.titulo, x.resumen, x.tecnologias.slice(0, 3).join(" · "), x.portada || x.capturas[0], rotuloSoftware(x)));
      return el(
        "section",
        { class: "perfil-seccion" },
        el("div", { class: "perfil-seccion-cabecera" }, el("h2", null, s.titulo), el("p", null, s.descripcion)),
        el("div", { class: "grilla-tarjetas fila-tres" }, tarjetas),
        el(
          "div",
          { class: "ver-seccion" },
          el("a", { class: "boton primario boton-grande", href: s.pagina }, `Ver todo ${s.titulo.toLowerCase()}`, el("span", { "aria-hidden": "true" }, " →"))
        )
      );
    });

    const pasos = recorrido(col);
    const linea = el(
      "section",
      { class: "perfil-seccion" },
      el("div", { class: "perfil-seccion-cabecera" }, el("h2", null, "Recorrido"), el("p", null, col.bajada)),
      el(
        "ol",
        { class: "linea-tiempo" },
        pasos.map((it) =>
          el(
            "li",
            null,
            el("span", { class: "linea-periodo" }, it.periodo || ""),
            el(
              "div",
              null,
              el("span", { class: "linea-tipo" }, `${it.tipo} · ${it.area}`),
              el("h3", null, it.titulo),
              it.lugar ? el("p", { class: "linea-lugar" }, it.lugar) : null,
              it.detalle ? el("p", null, it.detalle) : null
            )
          )
        )
      )
    );

    const herramientas = el(
      "section",
      { class: "perfil-seccion" },
      el(
        "div",
        { class: "perfil-seccion-cabecera" },
        el("h2", null, creativo ? "Herramientas y oficio" : "Stack y habilidades"),
        el("p", null, creativo ? "Programas y especialidades con los que trabajo." : "Tecnologías usadas en los proyectos y habilidades del día a día.")
      ),
      creativo
        ? null
        : el(
            "ul",
            { class: "stack" },
            stack().map(([t, n]) =>
              el("li", null, el("span", { title: miembrosStack(t) }, t), el("span", { class: "stack-barra", style: `--n:${n / NIVEL_MAX}` }), el("small", null, `${n}/${NIVEL_MAX}`))
            )
          ),
      el("ul", { class: "etiquetas" }, col.habilidades.map((h) => el("li", null, h)))
    );

    // Hacia el perfil creativo, la tarjeta lleva una foto de fondo y una tira de polaroid.
    const fotosCruce = otro.id === "creativo" ? fotosDestacadas() : [];
    const cruce = el(
      "a",
      {
        class: "cruce cruce-" + otro.id,
        href: otro.pagina
      },
      fotosCruce.length
        ? el("img", { class: "cruce-foto", src: normalizarFoto((D.portadas || {}).fotografia || fotosCruce[0], "").src, alt: "", loading: "lazy" })
        : null,
      fotosCruce.length
        ? el(
            "span",
            { class: "cruce-tira", "aria-hidden": "true" },
            fotosCruce.slice(1, 4).map((f, i) => el("img", { src: f.mini || f.src, alt: "", style: `--i:${i}` }))
          )
        : null,
      el("span", { class: "cruce-sobre" }, "El otro lado"),
      el("strong", null, otro.titulo, el("span", { "aria-hidden": "true" }, " →")),
      el("span", null, otro.id === "logico" ? "Sistemas, software y análisis." : "Fotografía, diseño e identidad visual.")
    );

    main.append(
      el(
        "div",
        { class: "contenedor bloque perfil" },
        migas({ texto: "Inicio", href: "index.html" }, { texto: pf.titulo }),
        cabecera,
        bloquesSeccion,
        linea,
        herramientas,
        cruce
      )
    );
  }

  function seccionContacto() {
    const campo = (etiqueta, control) => el("label", { class: "campo" }, el("span", null, etiqueta), control);
    const nombre = el("input", { type: "text", name: "nombre", required: true, autocomplete: "name" });
    const asunto = el("input", { type: "text", name: "asunto", required: true });
    const mensaje = el("textarea", { name: "mensaje", rows: "6", required: true });
    // El formulario abre el chat de WhatsApp (la red con icono "whatsapp" en
    // data.js) con el mensaje ya escrito; solo falta enviarlo.
    const whatsapp = (D.redes.find((r) => r.icono === "whatsapp" && r.url) || {}).url;

    const form = el(
      "form",
      {
        class: "formulario",
        onsubmit: (e) => {
          e.preventDefault();
          const texto = `Hola, soy ${nombre.value.trim()}.\n*${asunto.value.trim()}*\n\n${mensaje.value.trim()}`;
          window.open(`${whatsapp}?text=${encodeURIComponent(texto)}`, "_blank", "noopener");
        }
      },
      el("div", { class: "campos-dobles" }, campo("Nombre", nombre), campo("Asunto", asunto)),
      campo("Mensaje", mensaje),
      el("button", { class: "boton primario", type: "submit" }, "Enviar por WhatsApp"),
      el("p", { class: "nota" }, "Al enviar se abre WhatsApp con el mensaje listo: solo queda apretar Enter.")
    );

    return el(
      "section",
      { class: "contenedor bloque contacto", id: "contacto" },
      el(
        "div",
        { class: "contacto-datos" },
        el("h2", null, "Contacto"),
        el("p", null, "¿Tenés un proyecto o una consulta? Escribime."),
        el(
          "ul",
          { class: "datos" },
          datosContacto()
        ),
        D.mapa ? el("iframe", { class: "mapa", src: D.mapa, title: `Mapa de ${D.ubicacion}`, loading: "lazy" }) : null
      ),
      form
    );
  }

  function paginaSobreMi(main) {
    const cv = D.cv;
    document.title = `Sobre mí — ${D.nombre}`;

    const item = (it) =>
      el(
        "li",
        { class: "cv-item" },
        it.periodo ? el("div", { class: "cv-periodo" }, it.periodo) : null,
        el("h4", null, it.titulo),
        it.lugar ? el("p", { class: "cv-lugar" }, it.lugar) : null,
        it.detalle ? el("p", null, it.detalle) : null,
        it.archivo ? el("a", { class: "cv-archivo", href: it.archivo, target: "_blank", rel: "noopener" }, "Ver certificado") : null
      );

    const columna = (c) =>
      el(
        "section",
        { class: "cv-columna" },
        el("h2", null, c.titulo),
        c.bajada ? el("p", { class: "cv-bajada" }, c.bajada) : null,
        c.areas.map((a) => {
          const sueltos = a.items || [];
          const grupos = (a.grupos || []).filter((g) => (g.items || []).length || (g.cursos || []).length);
          if (!sueltos.length && !grupos.length) return null;
          return el(
            "div",
            { class: "cv-area" },
            el("h3", null, a.titulo),
            sueltos.length ? el("ul", { class: "cv-lista" }, sueltos.map(item)) : null,
            grupos.map((g) => [
              el("p", { class: "cv-grupo" }, g.titulo),
              (g.items || []).length ? el("ul", { class: "cv-lista" }, g.items.map(item)) : null,
              (g.cursos || []).length ? el("ul", { class: "cv-cursos" }, g.cursos.map((c) => el("li", null, c))) : null
            ])
          );
        }),
        c.habilidades.length ? el("ul", { class: "etiquetas" }, c.habilidades.map((h) => el("li", null, h))) : null
      );

    main.append(
      el(
        "div",
        { class: "contenedor bloque" },
        migas({ texto: "Inicio", href: "index.html" }, { texto: "Sobre mí" }),
        el(
          "header",
          { class: "cv-cabecera" },
          el("div", { class: "cv-foto" }, imagen(cv.foto || D.foto, `Foto de ${D.nombre}`, "Tu foto")),
          el(
            "div",
            null,
            el("p", { class: "sobretitulo" }, D.rol),
            el("h1", null, D.nombre),
            cv.perfil.map((p) => el("p", { class: "bajada" }, p)),
            el(
              "div",
              { class: "acciones" },
              // Con un PDF cargado en "archivoCv" se descarga ese archivo; si no, se abre
              // el diálogo de impresión para guardar esta página como PDF.
              cv.archivoCv
                ? el("a", { class: "boton ambar", href: cv.archivoCv, download: true }, "Descargar CV")
                : el("button", { class: "boton ambar", type: "button", onclick: () => window.print() }, "Descargar CV")
            )
          )
        ),
        (cv.blandas || []).length
          ? el(
              "section",
              { class: "cv-blandas" },
              el("h2", null, "Habilidades blandas"),
              el("ul", { class: "etiquetas" }, cv.blandas.map((x) => el("li", null, x)))
            )
          : null,
        el("div", { class: "cv-columnas" }, cv.columnas.map(columna)),
        el(
          "div",
          { class: "cv-descarga" },
          el("a", { class: "boton", href: "index.html#contacto" }, "Contacto")
        ),
        el(
          "div",
          { class: "cv-pie" },
          el(
            "section",
            null,
            el("h3", null, "Datos"),
            el(
              "ul",
              { class: "datos" },
              datosContacto()
            )
          ),
          el(
            "div",
            { class: "cv-pie-grupo" },
            cv.idiomas.length || (cv.otrosDatos || []).length
              ? el("section", null, el("h3", null, "Otros datos"), el("ul", { class: "etiquetas" }, [...cv.idiomas, ...(cv.otrosDatos || [])].map((x) => el("li", null, x))))
              : null
          )
        )
      )
    );
  }

  function paginaFotografia(main) {
    const s = seccion("fotografia");
    const cat = s.items.find((c) => c.id === params.get("cat")) || s.items[0];
    const album = (cat.albumes || []).find((a) => a.id === params.get("album"));
    const urlAlbum = (a) => `${urlItem(s, cat)}&album=${encodeURIComponent(a.id)}`;
    document.title = `${album ? album.titulo : cat.titulo} · Fotografía — ${D.nombre}`;

    const pestanas = el(
      "nav",
      { class: "pestanas", "aria-label": "Categorías" },
      s.items.map((c) => el("a", { href: urlItem(s, c), class: c === cat ? "activo" : "", "aria-current": c === cat ? "page" : null }, c.titulo))
    );

    let cuerpo;
    if (album) {
      const fotos = fotosDe(album.galeria);
      cuerpo = [
        el("h2", null, album.titulo),
        el("p", { class: "bajada" }, album.descripcion),
        galeria(fotos, album.titulo, `Importá fotos a assets/img/fotografia/${album.galeria}/`, 6, false, true)
      ];
    } else if (cat.albumes) {
      cuerpo = el(
        "div",
        { class: "grilla-tarjetas" },
        cat.albumes.map((a) => {
          const fotos = fotosDe(a.galeria);
          return tarjeta(urlAlbum(a), a.titulo, a.descripcion, null, fotos[(a.portada || 1) - 1] || fotos[0]);
        })
      );
    } else {
      cuerpo = galeria(fotosCategoria(cat), cat.titulo, `Importá fotos a assets/img/fotografia/${cat.galeria}/`, 6, false, true);
    }

    main.append(
      el(
        "div",
        { class: "contenedor bloque" },
        migas(
          ...raiz(s),
          { texto: s.titulo, href: s.pagina },
          album ? { texto: cat.titulo, href: urlItem(s, cat) } : { texto: cat.titulo },
          album ? { texto: album.titulo } : null
        ),
        cabeceraPagina(s.titulo, cat.descripcion),
        pestanas,
        cuerpo
      )
    );
  }

  function paginaSoftware(main) {
    const s = seccion("software");
    const p = s.items.find((x) => x.id === params.get("p"));

    if (!p) {
      const intro = D.softwareIntro && D.softwareIntro.length ? D.softwareIntro : [s.descripcion];
      document.title = `Software — ${D.nombre}`;
      main.append(
        el(
          "div",
          { class: "contenedor bloque" },
          migas(...raiz(s), { texto: s.titulo }),
          cabeceraPagina(s.titulo, intro[0]),
          intro.length > 1 ? el("div", { class: "prosa presentacion" }, intro.slice(1).map((t) => el("p", null, t))) : null,
          el("div", { class: "grilla-tarjetas" }, s.items.map((x) => tarjeta(urlItem(s, x), x.titulo, x.resumen, x.anio, x.portada || x.capturas[0], rotuloSoftware(x))))
        )
      );
      return;
    }

    document.title = `${p.titulo} · Software — ${D.nombre}`;
    main.append(
      el(
        "article",
        { class: "contenedor bloque proyecto" },
        migas(...raiz(s), { texto: s.titulo, href: s.pagina }, { texto: p.titulo }),
        cabeceraPagina(p.titulo, p.resumen),
        p.tecnologias.length || p.anio
          ? el(
              "ul",
              { class: "etiquetas" },
              p.anio ? el("li", null, p.anio) : null,
              p.tecnologias.map((t) => el("li", null, t))
            )
          : null,
        el(
          "div",
          { class: "proyecto-cuerpo" },
          el("div", { class: "prosa" }, el("h2", null, "Sobre el proyecto"), p.descripcion.map((t) => el("p", null, t))),
          p.caracteristicas.length
            ? el("div", { class: "prosa" }, el("h2", null, "Características"), el("ul", null, p.caracteristicas.map((c) => el("li", null, c))))
            : null
        ),
        el("h2", null, "Ficha técnica"),
        el(
          "dl",
          { class: "ficha" },
          [...(p.ficha || []), ...(D.fichaSoftware || [])].map(([rubro, detalle]) => el("div", null, el("dt", null, rubro), el("dd", null, detalle)))
        ),
        // Sin capturas cargadas, la sección no se muestra.
        p.capturas.length ? el("h2", null, "Capturas") : null,
        p.capturas.length ? galeria(p.capturas, `Captura de ${p.titulo}`, "", 3, true) : null,
        p.enlaces.length
          ? el(
              "div",
              { class: "acciones" },
              p.enlaces.map((e) => el("a", { class: "boton", href: e.url, target: "_blank", rel: "noopener" }, e.texto))
            )
          : null,
        anteriorSiguiente(s, p)
      )
    );
  }

  function paginaDiseno(main) {
    const s = seccion("diseno");
    const p = s.items.find((x) => x.id === params.get("p"));

    if (!p) {
      document.title = `Diseño gráfico — ${D.nombre}`;
      main.append(
        el(
          "div",
          { class: "contenedor bloque" },
          migas(...raiz(s), { texto: s.titulo }),
          cabeceraPagina(s.titulo, s.descripcion),
          el(
            "div",
            { class: "grilla-tarjetas" },
            s.items.map((x) => {
              return tarjeta(urlItem(s, x), x.titulo, x.resumen, x.manual ? "Manual de marca" : null, x.portada || x.mockups[0]);
            })
          )
        )
      );
      return;
    }

    document.title = `${p.titulo} · Diseño gráfico — ${D.nombre}`;
    const manual = p.manual
      ? el(
          "div",
          { class: "manual" },
          el("iframe", { src: p.manual, title: `Manual de marca de ${p.titulo}`, loading: "lazy" }),
          el(
            "div",
            { class: "acciones" },
            el("a", { class: "boton primario", href: p.manual, target: "_blank", rel: "noopener" }, "Abrir en pestaña nueva"),
            el("a", { class: "boton", href: p.manual, download: true }, "Descargar PDF")
          )
        )
      : el(
          "div",
          { class: "relleno relleno-manual" },
          `Manual de marca pendiente. Copiá el PDF en assets/manuales/ y cargá la ruta en "manual" dentro de assets/js/data.js.`
        );

    main.append(
      el(
        "article",
        { class: "contenedor bloque proyecto" },
        migas(...raiz(s), { texto: s.titulo, href: s.pagina }, { texto: p.titulo }),
        cabeceraPagina(p.titulo, p.resumen),
        el("div", { class: "prosa" }, p.descripcion.map((t) => el("p", null, t))),
        el("h2", null, "Manual de marca"),
        manual,
        el("h2", null, "Mockups"),
        galeria(p.mockups, `Mockup de ${p.titulo}`, "Agregá mockups en assets/img/diseno/", 3),
        anteriorSiguiente(s, p)
      )
    );
  }

  /* ---------- arranque ---------- */

  const pagina = document.body.dataset.pagina;
  const main = document.getElementById("contenido");
  // Cada página toma los colores de su perfil: ámbar el creativo, azul el lógico.
  // "Sobre mí" reúne a los dos.
  const mundo =
    pagina === "creativo" || pagina === "logico" ? pagina : pagina === "sobre-mi" ? "ambos" : (perfilDe({ id: pagina }) || {}).id;
  if (mundo) document.body.classList.add("mundo-" + mundo);

  construirEncabezado(pagina);
  construirPie();
  ({
    inicio: paginaInicio,
    creativo: (m) => paginaPerfil(m, "creativo"),
    logico: (m) => paginaPerfil(m, "logico"),
    "sobre-mi": paginaSobreMi,
    fotografia: paginaFotografia,
    software: paginaSoftware,
    diseno: paginaDiseno
  })[pagina](main);

  // El contenido se genera después de la carga, así que el salto a #contacto se hace a mano.
  if (location.hash) {
    const destino = document.getElementById(location.hash.slice(1));
    if (destino) destino.scrollIntoView();
  }
})();
