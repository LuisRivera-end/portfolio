from pathlib import Path
from textwrap import wrap

from reportlab.lib.colors import Color, HexColor
from reportlab.lib.pagesizes import letter
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen.canvas import Canvas


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "cv-luis-eliezer-rivera-gamez-en.pdf"

PAGE_WIDTH, PAGE_HEIGHT = letter
LEFT = 52
RIGHT = PAGE_WIDTH - 52
INK = HexColor("#171714")
MUTED = HexColor("#58574F")
LIME = HexColor("#DFFF3D")
LINE = HexColor("#D9D8D0")


def register_fonts() -> None:
    pdfmetrics.registerFont(TTFont("Garamond", r"C:\Windows\Fonts\GARA.TTF"))
    pdfmetrics.registerFont(TTFont("GaramondBold", r"C:\Windows\Fonts\GARABD.TTF"))
    pdfmetrics.registerFont(TTFont("Segoe", r"C:\Windows\Fonts\segoeui.ttf"))
    pdfmetrics.registerFont(TTFont("SegoeBold", r"C:\Windows\Fonts\segoeuib.ttf"))


def lines_for(text: str, font: str, size: float, width: float) -> list[str]:
    words = text.split()
    result: list[str] = []
    current = ""

    for word in words:
        candidate = word if not current else f"{current} {word}"
        if pdfmetrics.stringWidth(candidate, font, size) <= width:
            current = candidate
        else:
            if current:
                result.append(current)
            current = word

    if current:
        result.append(current)

    return result


def paragraph(canvas: Canvas, text: str, x: float, y: float, width: float) -> float:
    size = 9.4
    leading = 14
    canvas.setFont("Segoe", size)
    canvas.setFillColor(MUTED)
    for line in lines_for(text, "Segoe", size, width):
        canvas.drawString(x, y, line)
        y -= leading
    return y


def section_title(canvas: Canvas, title: str, y: float) -> float:
    canvas.setFillColor(LIME)
    canvas.rect(LEFT, y - 4, 8, 8, fill=1, stroke=0)
    canvas.setFillColor(INK)
    canvas.setFont("SegoeBold", 8.6)
    canvas.drawString(LEFT + 15, y - 1, title.upper())
    canvas.setStrokeColor(LINE)
    canvas.setLineWidth(0.7)
    canvas.line(LEFT + 108, y, RIGHT, y)
    return y - 22


def experience(
    canvas: Canvas,
    y: float,
    role: str,
    dates: str,
    organization: str,
    bullets: list[str],
) -> float:
    canvas.setFillColor(INK)
    canvas.setFont("GaramondBold", 13)
    canvas.drawString(LEFT, y, role)
    canvas.setFont("SegoeBold", 8.2)
    canvas.drawRightString(RIGHT, y + 1, dates)
    y -= 15
    canvas.setFillColor(MUTED)
    canvas.setFont("SegoeBold", 8.8)
    canvas.drawString(LEFT, y, organization)
    y -= 16

    for bullet in bullets:
        canvas.setFillColor(INK)
        canvas.circle(LEFT + 2, y + 3, 1.1, fill=1, stroke=0)
        y = paragraph(canvas, bullet, LEFT + 11, y, RIGHT - LEFT - 11) - 2

    return y - 8


def skill_row(canvas: Canvas, y: float, label: str, value: str) -> float:
    canvas.setFillColor(INK)
    canvas.setFont("SegoeBold", 8.5)
    canvas.drawString(LEFT, y, label)
    label_width = pdfmetrics.stringWidth(label, "SegoeBold", 8.5)
    canvas.setFont("Segoe", 8.5)
    canvas.setFillColor(MUTED)
    canvas.drawString(LEFT + label_width + 5, y, value)
    return y - 13


def build() -> None:
    register_fonts()
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)

    canvas = Canvas(str(OUTPUT), pagesize=letter)
    canvas.setTitle("Luis Eliezer Rivera Gamez - English CV")
    canvas.setAuthor("Luis Eliezer Rivera Gamez")

    y = PAGE_HEIGHT - 54
    canvas.setFillColor(INK)
    canvas.setFont("GaramondBold", 29)
    canvas.drawString(LEFT, y, "LUIS ELIEZER RIVERA GAMEZ")
    y -= 22
    canvas.setFillColor(MUTED)
    canvas.setFont("SegoeBold", 9.5)
    canvas.drawString(LEFT, y, "Computer Systems Engineering Student | Web Developer")
    y -= 17
    canvas.setFont("Segoe", 8.6)
    canvas.drawString(
        LEFT,
        y,
        "Gomez Palacio, DGO | +52 871 563 7114 | leliezerrivera@gmail.com | "
        "github.com/LuisRivera-end | linkedin.com/in/luis-rivera-dev",
    )
    y -= 19
    canvas.setFillColor(LIME)
    canvas.rect(LEFT, y, RIGHT - LEFT, 5, fill=1, stroke=0)
    y -= 23

    y = section_title(canvas, "Professional profile", y)
    y = paragraph(
        canvas,
        "Computer Systems Engineering student with hands-on experience building full-stack web "
        "products for institutional and commercial projects. Specialized in Nuxt 3, Express.js, "
        "and relational databases, with a focus on clean software architecture, user experience, "
        "and collaborative version-controlled delivery.",
        LEFT,
        y,
        RIGHT - LEFT,
    )
    y -= 7

    y = section_title(canvas, "Experience", y)
    y = experience(
        canvas,
        y,
        "Junior Web Developer",
        "Feb 2025 - May 2026",
        "IT Soluciones - Remote",
        [
            "Built responsive full-stack web applications for internal and commercial needs.",
            "Prototyped interfaces in Figma and integrated REST APIs into production-facing flows.",
        ],
    )
    y = experience(
        canvas,
        y,
        "Web Developer",
        "2026 - Present",
        "Faculty of Health Sciences, Universidad Juarez del Estado de Durango (UJED)",
        [
            "Built the public institutional portal and a role-based administration panel.",
            "Managed academic and institutional content through controlled editorial workflows.",
        ],
    )

    y = section_title(canvas, "Education", y)
    canvas.setFillColor(INK)
    canvas.setFont("GaramondBold", 13)
    canvas.drawString(LEFT, y, "B.S. in Computer Systems Engineering")
    canvas.setFont("SegoeBold", 8.2)
    canvas.drawRightString(RIGHT, y + 1, "Present")
    y -= 15
    canvas.setFillColor(MUTED)
    canvas.setFont("SegoeBold", 8.8)
    canvas.drawString(LEFT, y, "Universidad Autonoma de la Laguna (UAL)")
    y -= 25

    y = section_title(canvas, "Selected projects", y)
    canvas.setFillColor(INK)
    canvas.setFont("SegoeBold", 8.8)
    canvas.drawString(
        LEFT,
        y,
        "Smart Parking System  |  Queue and Ticketing System  |  VOSH Exam System",
    )
    y -= 24

    y = section_title(canvas, "Technical skills", y)
    y = skill_row(
        canvas,
        y,
        "Frontend:",
        "Nuxt 3, Next.js, Tailwind CSS, Chakra UI, Bootstrap",
    )
    y = skill_row(
        canvas,
        y,
        "Backend and data:",
        "Express.js, FastAPI, Node.js, MariaDB / MySQL",
    )
    y = skill_row(canvas, y, "Languages:", "JavaScript, TypeScript, Python, PHP")
    y = skill_row(
        canvas,
        y,
        "Tools:",
        "Git / GitHub, Docker, Docker Compose, Figma",
    )
    y = skill_row(canvas, y, "Other:", "REST API, JWT, RBAC, Pinia, Composition API")
    y -= 3

    y = section_title(canvas, "Languages", y)
    canvas.setFillColor(INK)
    canvas.setFont("SegoeBold", 8.8)
    canvas.drawString(LEFT, y, "Spanish")
    canvas.setFillColor(MUTED)
    canvas.setFont("Segoe", 8.8)
    canvas.drawString(LEFT + 48, y, "Native")
    canvas.setFillColor(INK)
    canvas.setFont("SegoeBold", 8.8)
    canvas.drawString(LEFT + 135, y, "English")
    canvas.setFillColor(MUTED)
    canvas.setFont("Segoe", 8.8)
    canvas.drawString(LEFT + 181, y, "Intermediate")

    canvas.save()


if __name__ == "__main__":
    build()
