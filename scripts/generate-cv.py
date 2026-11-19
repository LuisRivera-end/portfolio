"""Genera el CV (formato Harvard) en español e inglés.

Uso:  python scripts/generate-cv.py [carpeta_salida]
Por defecto escribe en public/ (los PDF que sirve el portafolio).
Requiere: pip install reportlab
"""

import sys
from pathlib import Path

from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    HRFlowable,
    KeepTogether,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)

ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / "public"

INK = HexColor("#111111")
LINK = HexColor("#1F3A68")
MARGIN = 0.6 * 72

PHONE = "+52 871 563 7114"
EMAIL = "leliezerrivera@gmail.com"
PORTFOLIO = ("luisrivera-end.github.io/portfolio", "https://luisrivera-end.github.io/portfolio/")
GITHUB = ("github.com/LuisRivera-end", "https://github.com/LuisRivera-end")
LINKEDIN = ("linkedin.com/in/luis-rivera-dev", "https://www.linkedin.com/in/luis-rivera-dev/")
FACSA = ("facsa.ujed.mx", "https://facsa.ujed.mx/")
TURNOS_REPO = "https://github.com/LuisRivera-end/Proyecto-Integracion/tree/prod1"


def link(label: str, url: str) -> str:
    return f'<a href="{url}" color="#1F3A68">{label}</a>'


OPENFY_REPO = "https://github.com/LuisRivera-end/openfy"

CONTENT = {
    "es": {
        "file": "cv-luis-eliezer-rivera-gamez.pdf",
        "title": "Luis Eliezer Rivera Gamez - CV",
        "headline": "Desarrollador Web Full Stack &nbsp;|&nbsp; Estudiante de Ingeniería en Sistemas Computacionales",
        "city": "Gómez Palacio, Dgo., México",
        "portfolio_label": "Portafolio",
        "sections": {
            "profile": "Perfil profesional",
            "experience": "Experiencia laboral",
            "projects": "Proyectos destacados",
            "skills": "Habilidades",
            "education": "Educación",
            "certs": "Certificaciones",
        },
        "profile": (
            "Desarrollador web full stack y estudiante de Ingeniería en Sistemas Computacionales con más de "
            "un año y medio de experiencia en aplicaciones para clientes comerciales, instituciones educativas "
            "y organizaciones de salud. Soy el desarrollador principal del portal de la Facultad de Ciencias de "
            "la Salud de la UJED, en producción. Trabajo de punta a punta: interfaces con Nuxt, Tailwind CSS y GSAP; "
            "APIs con Express y FastAPI; bases de datos relacionales; pruebas automatizadas y despliegue con Docker."
        ),
        "experience": [
            {
                "role": "Desarrollador Web Full Stack",
                "dates": "2026 – Actualidad",
                "org": "Facultad de Ciencias de la Salud, Universidad Juárez del Estado de Durango (UJED)",
                "place": "Durango, México · Híbrido",
                "bullets": [
                    f"Desarrollador principal del portal institucional ({link(*FACSA)}), en producción: más de 60 "
                    "páginas públicas en Nuxt, Pinia y Tailwind CSS para oferta educativa, admisiones, investigación y congresos.",
                    "Diseñé el backend en Express y MariaDB con 30+ controladores REST, autenticación JWT/bcrypt, "
                    "control de acceso por roles (RBAC), bitácora de auditoría y recuperación de credenciales.",
                    "Construí un panel administrativo con editor de texto enriquecido (TipTap), historial y papelera "
                    "de revisiones, gestión de medios y respaldos programados, para que el personal publique sin ayuda técnica.",
                    "Aseguré la calidad con más de 300 archivos de pruebas (Vitest, Supertest, Playwright) y desplegué "
                    "con Docker, incluyendo migraciones de esquema con plan de respaldo y reversión.",
                ],
            },
            {
                "role": "Desarrollador Web Jr.",
                "dates": "Feb 2025 – May 2026",
                "org": "IT Soluciones",
                "place": "Remoto",
                "bullets": [
                    "Desarrollé para VOSH (servicios optométricos voluntarios) el formulario clínico de varios pasos de su "
                    "plataforma de campañas (React, TypeScript, Chakra UI), con validaciones y expedientes en PDF.",
                    "Desarrollé módulos de un e-commerce en Nuxt (carrito de compras, categorías de producto y "
                    "carrusel de novedades) integrado con Supabase y Stripe.",
                ],
            },
        ],
        "projects": [
            {
                "name": "Openfy — Biblioteca musical multiplataforma",
                "stack": "Nuxt, Nitro, SQLite, .NET (WinUI 3), Kotlin",
                "right": link("Repositorio", OPENFY_REPO),
                "bullets": [
                    "Proyecto personal open source con cuatro clientes sobre una misma biblioteca: servidor Nuxt/Nitro con "
                    "SQLite, PWA instalable en iPhone, app nativa de Windows (WinUI 3) y app Android (Jetpack Compose).",
                    "Importación con lectura de metadatos y deduplicación por SHA-256, conversión FLAC a AAC con FFmpeg, "
                    "streaming con rangos HTTP, búsqueda en YouTube Music y letras sincronizadas.",
                    "Descargas sin conexión verificadas por SHA-256 mediante service worker, estadísticas de escucha con "
                    "recomendaciones y 80+ archivos de pruebas (Vitest, Playwright), con CI que protege la rama principal.",
                ],
            },
            {
                "name": "Sistema de Turnos y Tickets",
                "stack": "Nuxt, FastAPI, MariaDB, WebSockets, Docker, Nginx",
                "right": link("Repositorio", TURNOS_REPO),
                "bullets": [
                    "Desarrollado para la Universidad Autónoma de La Laguna (UAL): generación de tickets, pantalla pública "
                    "con anuncio por voz y panel de ventanilla sincronizados en tiempo real con WebSockets.",
                    "API asíncrona en FastAPI y MariaDB con autenticación, gestión de empleados y ventanillas, dashboard y "
                    "reportes PDF; probada con pytest y desplegada con Docker Compose detrás de Nginx con HTTPS.",
                    "Lideré un equipo de 5 personas (55+ pull requests integrados) y desarrollé un servicio de impresión "
                    "en Node.js compilado a ejecutable de Windows para impresoras térmicas POS.",
                ],
            },
        ],
        "skills": [
            ("Lenguajes", "JavaScript, TypeScript, Python, SQL"),
            ("Frontend", "Nuxt 4, Tailwind CSS, Chakra UI, GSAP"),
            ("Backend", "Node.js, Express, FastAPI, Flask, REST, WebSockets, JWT, RBAC"),
            ("Datos", "MariaDB, MySQL, PostgreSQL, Supabase"),
            ("Pruebas y DevOps", "Vitest, Playwright, pytest, Docker, Docker Compose, Nginx, Git, GitHub, Figma"),
            ("Idiomas", "Español (nativo), Inglés (intermedio)"),
        ],
        "education": {
            "degree": "Ingeniería en Sistemas Computacionales",
            "dates": "Egreso: Jun 2027",
            "school": "Universidad Autónoma de La Laguna (UAL)",
            "place": "Torreón, Coah.",
        },
        "certs": [
            ("Introduction to Agent Skills", "DataCamp", "Jun 2026"),
            ("Inteligencia Artificial y productividad", "Google", "Jul 2024"),
        ],
    },
    "en": {
        "file": "cv-luis-eliezer-rivera-gamez-en.pdf",
        "title": "Luis Eliezer Rivera Gamez - Resume",
        "headline": "Full Stack Web Developer &nbsp;|&nbsp; Computer Systems Engineering Student",
        "city": "Gómez Palacio, Durango, Mexico",
        "portfolio_label": "Portfolio",
        "sections": {
            "profile": "Professional summary",
            "experience": "Experience",
            "projects": "Selected projects",
            "skills": "Skills",
            "education": "Education",
            "certs": "Certifications",
        },
        "profile": (
            "Full stack web developer and Computer Systems Engineering student with over a year and a half of "
            "experience building applications for commercial clients, educational institutions and healthcare "
            "organizations. Lead developer of the production web portal for the Faculty of Health Sciences at UJED. "
            "End-to-end work: Nuxt, Tailwind CSS and GSAP interfaces; Express and FastAPI APIs; relational "
            "databases; automated testing and Docker deployment."
        ),
        "experience": [
            {
                "role": "Full Stack Web Developer",
                "dates": "2026 – Present",
                "org": "Faculty of Health Sciences, Universidad Juárez del Estado de Durango (UJED)",
                "place": "Durango, Mexico · Hybrid",
                "bullets": [
                    f"Lead developer of the institutional portal ({link(*FACSA)}), in production: 60+ public pages "
                    "built with Nuxt, Pinia and Tailwind CSS covering programs, admissions, research and conferences.",
                    "Designed the Express and MariaDB backend with 30+ REST controllers, JWT/bcrypt authentication, "
                    "role-based access control (RBAC), audit logging and credential recovery.",
                    "Built an admin panel with a rich-text editor (TipTap), revision history and trash, media "
                    "management and scheduled backups, so staff can publish without technical help.",
                    "Ensured quality with 300+ test files (Vitest, Supertest, Playwright) and deployed with Docker, "
                    "including schema migrations with backup and rollback plans.",
                ],
            },
            {
                "role": "Junior Web Developer",
                "dates": "Feb 2025 – May 2026",
                "org": "IT Soluciones",
                "place": "Remote",
                "bullets": [
                    "Built the multi-step clinical intake form for VOSH (volunteer optometric services) on its "
                    "campaign platform (React, TypeScript, Chakra UI), with validations and PDF patient records.",
                    "Developed modules for a Nuxt e-commerce site (shopping cart, product categories and a "
                    "new-arrivals carousel) integrated with Supabase and Stripe.",
                ],
            },
        ],
        "projects": [
            {
                "name": "Openfy — Cross-platform music library",
                "stack": "Nuxt, Nitro, SQLite, .NET (WinUI 3), Kotlin",
                "right": link("Repository", OPENFY_REPO),
                "bullets": [
                    "Open-source personal project with four clients over one library: a Nuxt/Nitro server with SQLite, "
                    "an installable iPhone PWA, a native Windows app (WinUI 3) and an Android app (Jetpack Compose).",
                    "Imports with metadata extraction and SHA-256 deduplication, FLAC-to-AAC conversion with FFmpeg, "
                    "HTTP range streaming, YouTube Music search and synced lyrics.",
                    "Offline downloads verified by SHA-256 through a service worker, listening stats with recommendations "
                    "and 80+ test files (Vitest, Playwright), with CI protecting the main branch.",
                ],
            },
            {
                "name": "Queue and Ticketing System",
                "stack": "Nuxt, FastAPI, MariaDB, WebSockets, Docker, Nginx",
                "right": link("Repository", TURNOS_REPO),
                "bullets": [
                    "Built for Universidad Autónoma de La Laguna (UAL): ticket generation, a public display with voice "
                    "announcements and a desk panel, all synced in real time over WebSockets.",
                    "Async FastAPI and MariaDB API with authentication, staff and desk management, dashboard and PDF "
                    "reports; tested with pytest and deployed with Docker Compose behind Nginx with HTTPS.",
                    "Led a 5-person team (55+ merged pull requests) and built a Node.js print service compiled to a "
                    "Windows executable for thermal POS printers.",
                ],
            },
        ],
        "skills": [
            ("Programming", "JavaScript, TypeScript, Python, SQL"),
            ("Frontend", "Nuxt 4, Tailwind CSS, Chakra UI, GSAP"),
            ("Backend", "Node.js, Express, FastAPI, Flask, REST, WebSockets, JWT, RBAC"),
            ("Data", "MariaDB, MySQL, PostgreSQL, Supabase"),
            ("Testing and DevOps", "Vitest, Playwright, pytest, Docker, Docker Compose, Nginx, Git, GitHub, Figma"),
            ("Languages", "Spanish (native), English (intermediate)"),
        ],
        "education": {
            "degree": "B.S. in Computer Systems Engineering",
            "dates": "Expected Jun 2027",
            "school": "Universidad Autónoma de La Laguna (UAL)",
            "place": "Torreón, Coah.",
        },
        "certs": [
            ("Introduction to Agent Skills", "DataCamp", "Jun 2026"),
            ("Artificial Intelligence and Productivity", "Google", "Jul 2024"),
        ],
    },
}


def register_fonts() -> None:
    fonts = r"C:\Windows\Fonts"
    pdfmetrics.registerFont(TTFont("Times", f"{fonts}\\times.ttf"))
    pdfmetrics.registerFont(TTFont("Times-B", f"{fonts}\\timesbd.ttf"))
    pdfmetrics.registerFont(TTFont("Times-I", f"{fonts}\\timesi.ttf"))
    pdfmetrics.registerFont(TTFont("Times-BI", f"{fonts}\\timesbi.ttf"))
    pdfmetrics.registerFontFamily("Times", normal="Times", bold="Times-B", italic="Times-I", boldItalic="Times-BI")


def styles() -> dict[str, ParagraphStyle]:
    base = ParagraphStyle("base", fontName="Times", fontSize=9.8, leading=11.8, textColor=INK)
    return {
        "name": ParagraphStyle("name", base, fontName="Times-B", fontSize=20, leading=23, alignment=TA_CENTER),
        "headline": ParagraphStyle("headline", base, fontName="Times-I", fontSize=11, leading=14, alignment=TA_CENTER),
        "contact": ParagraphStyle("contact", base, fontSize=9.6, leading=12, alignment=TA_CENTER),
        "section": ParagraphStyle("section", base, fontName="Times-B", fontSize=11.2, leading=12.5, spaceBefore=5),
        "body": ParagraphStyle("body", base, alignment=4),
        "left": base,
        "right": ParagraphStyle("right", base, alignment=2),
        "bullet": ParagraphStyle("bullet", base, leftIndent=13, bulletIndent=3, spaceBefore=0.8),
    }


def row(left: str, right: str, st: dict, split: float = 0.74) -> Table:
    width = letter[0] - 2 * MARGIN - 12  # frame padding
    t = Table(
        [[Paragraph(left, st["left"]), Paragraph(right, st["right"])]],
        colWidths=[width * split, width * (1 - split)],
    )
    t.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
            ]
        )
    )
    return t


def section(title: str, st: dict) -> list:
    return [
        Paragraph(title.upper(), st["section"]),
        HRFlowable(width="100%", thickness=0.8, color=INK, spaceBefore=1, spaceAfter=3),
    ]


def bullets(items: list[str], st: dict) -> list:
    return [Paragraph(text, st["bullet"], bulletText="•") for text in items]


def build(lang: str) -> Path:
    c = CONTENT[lang]
    st = styles()
    out = OUT_DIR / c["file"]
    doc = SimpleDocTemplate(
        str(out),
        pagesize=letter,
        leftMargin=MARGIN,
        rightMargin=MARGIN,
        topMargin=0.45 * 72,
        bottomMargin=0.4 * 72,
        title=c["title"],
        author="Luis Eliezer Rivera Gamez",
    )
    s = c["sections"]
    sep = " &nbsp;|&nbsp; "
    story: list = [
        Paragraph("LUIS ELIEZER RIVERA GAMEZ", st["name"]),
        Paragraph(c["headline"], st["headline"]),
        Spacer(1, 3),
        Paragraph(
            sep.join([c["city"], PHONE, link(EMAIL, f"mailto:{EMAIL}")]),
            st["contact"],
        ),
        Paragraph(
            sep.join([f"{c['portfolio_label']}: {link(*PORTFOLIO)}", link(*GITHUB), link(*LINKEDIN)]),
            st["contact"],
        ),
    ]

    story += section(s["profile"], st)
    story.append(Paragraph(c["profile"], st["body"]))

    story += section(s["experience"], st)
    for i, job in enumerate(c["experience"]):
        block = [
            row(f"<b>{job['role']}</b>", f"<b>{job['dates']}</b>", st),
            row(f"<i>{job['org']}</i>", f"<i>{job['place']}</i>", st),
        ]
        block += bullets(job["bullets"], st)
        if i < len(c["experience"]) - 1:
            block.append(Spacer(1, 5))
        story.append(KeepTogether(block))

    story += section(s["projects"], st)
    for i, p in enumerate(c["projects"]):
        block = [row(f"<b>{p['name']}</b> &nbsp;|&nbsp; <i>{p['stack']}</i>", p["right"], st, 0.84)]
        block += bullets(p["bullets"], st)
        if i < len(c["projects"]) - 1:
            block.append(Spacer(1, 4))
        story.append(KeepTogether(block))

    story += section(s["skills"], st)
    for label, value in c["skills"]:
        story.append(Paragraph(f"<b>{label}:</b> {value}", st["left"]))

    e = c["education"]
    story += section(s["education"], st)
    story.append(row(f"<b>{e['degree']}</b> — <i>{e['school']}, {e['place']}</i>", f"<b>{e['dates']}</b>", st, 0.84))

    story += section(s["certs"], st)
    story.append(Paragraph(" &nbsp;&nbsp;·&nbsp;&nbsp; ".join(f"<b>{n}</b> — {i} ({d})" for n, i, d in c["certs"]), st["left"]))


    doc.build(story)
    return out


if __name__ == "__main__":
    register_fonts()
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    for lang in CONTENT:
        print(build(lang))
