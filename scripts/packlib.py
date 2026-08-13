"""Shared helpers for building ADHD Assist pack PDFs (reportlab).

Used by build_free_pack.py-style generators and build_paid_packs.py.
"""

import os

from reportlab.lib.colors import HexColor, white
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.platypus import (
    BaseDocTemplate, Frame, HRFlowable, NextPageTemplate, PageBreak,
    PageTemplate, Paragraph, Spacer, Table, TableStyle,
)

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_DIR = os.path.join(ROOT, "content", "packs")

INK = HexColor("#1F5F6B")
CORAL = HexColor("#FF6B6B")
CREAM = HexColor("#F5F1E8")
AQUA = HexColor("#CFEFED")
INK_SOFT = HexColor("#2C7280")
RULE = HexColor("#9DBEC5")

PAGE_W, PAGE_H = A4
MARGIN = 18 * mm
CONTENT_W = PAGE_W - 2 * MARGIN

S = {
    "cover_title": ParagraphStyle(
        "cover_title", fontName="Helvetica-Bold", fontSize=32, leading=36,
        textColor=INK, spaceAfter=6),
    "cover_sub": ParagraphStyle(
        "cover_sub", fontName="Helvetica-Bold", fontSize=15, leading=20,
        textColor=CORAL, spaceAfter=14),
    "eyebrow": ParagraphStyle(
        "eyebrow", fontName="Helvetica-Bold", fontSize=9, leading=12,
        textColor=INK_SOFT, spaceAfter=4),
    "h1": ParagraphStyle(
        "h1", fontName="Helvetica-Bold", fontSize=20, leading=24,
        textColor=INK, spaceAfter=8, spaceBefore=2),
    "h2": ParagraphStyle(
        "h2", fontName="Helvetica-Bold", fontSize=12.5, leading=16,
        textColor=INK, spaceBefore=12, spaceAfter=5),
    "h3": ParagraphStyle(
        "h3", fontName="Helvetica-Bold", fontSize=10.5, leading=14,
        textColor=CORAL, spaceBefore=8, spaceAfter=3),
    "body": ParagraphStyle(
        "body", fontName="Helvetica", fontSize=10.5, leading=15.5,
        textColor=INK, spaceAfter=8),
    "bullet": ParagraphStyle(
        "bullet", fontName="Helvetica", fontSize=10.5, leading=15,
        textColor=INK, leftIndent=12, bulletIndent=2, spaceAfter=4),
    "check": ParagraphStyle(
        "check", fontName="Helvetica", fontSize=10.5, leading=17,
        textColor=INK, leftIndent=16, bulletIndent=2, spaceAfter=5),
    "script": ParagraphStyle(
        "script", fontName="Helvetica-Oblique", fontSize=10.5, leading=15.5,
        textColor=INK, spaceAfter=2),
    "script_label": ParagraphStyle(
        "script_label", fontName="Helvetica-Bold", fontSize=8.5, leading=11,
        textColor=CORAL, spaceAfter=3),
    "fill_label": ParagraphStyle(
        "fill_label", fontName="Helvetica-Bold", fontSize=9.5, leading=13,
        textColor=INK, spaceAfter=2),
    "small": ParagraphStyle(
        "small", fontName="Helvetica", fontSize=9, leading=13,
        textColor=INK_SOFT, spaceAfter=6),
    "note": ParagraphStyle(
        "note", fontName="Helvetica-Bold", fontSize=9.5, leading=14,
        textColor=INK, spaceAfter=0),
    "cell": ParagraphStyle(
        "cell", fontName="Helvetica", fontSize=8.5, leading=11.5,
        textColor=INK),
    "cell_b": ParagraphStyle(
        "cell_b", fontName="Helvetica-Bold", fontSize=8.5, leading=11.5,
        textColor=INK),
    "cell_head": ParagraphStyle(
        "cell_head", fontName="Helvetica-Bold", fontSize=8.5, leading=11.5,
        textColor=white),
}


def bullets(items):
    return [Paragraph(t, S["bullet"], bulletText="✓") for t in items]


def checks(items):
    """Checklist rows with an empty tick-box."""
    return [Paragraph(t, S["check"], bulletText="☐") for t in items]


def script_box(label, text):
    inner = [Paragraph(label.upper(), S["script_label"]),
             Paragraph(f"“{text}”", S["script"])]
    t = Table([[inner]], colWidths=[CONTENT_W - 8])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), white),
        ("BOX", (0, 0), (-1, -1), 1.4, INK),
        ("ROUNDEDCORNERS", [6, 6, 6, 6]),
        ("LEFTPADDING", (0, 0), (-1, -1), 12),
        ("RIGHTPADDING", (0, 0), (-1, -1), 12),
        ("TOPPADDING", (0, 0), (-1, -1), 9),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 9),
    ]))
    return [t, Spacer(1, 8)]


def note_box(text):
    t = Table([[Paragraph(text, S["note"])]], colWidths=[CONTENT_W - 8])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), CREAM),
        ("BOX", (0, 0), (-1, -1), 1.2, INK),
        ("ROUNDEDCORNERS", [6, 6, 6, 6]),
        ("LEFTPADDING", (0, 0), (-1, -1), 12),
        ("RIGHTPADDING", (0, 0), (-1, -1), 12),
        ("TOPPADDING", (0, 0), (-1, -1), 9),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 9),
    ]))
    return [t, Spacer(1, 10)]


def write_lines(n, label=None, tall=False):
    flow = []
    if label:
        flow.append(Paragraph(label, S["fill_label"]))
    row_h = 26 if tall else 20
    t = Table([[""] for _ in range(n)], colWidths=[CONTENT_W - 8],
              rowHeights=[row_h] * n)
    t.setStyle(TableStyle([
        ("LINEBELOW", (0, 0), (-1, -1), 0.8, RULE),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
    ]))
    flow += [t, Spacer(1, 10)]
    return flow


def grid_table(headers, rows, col_widths, row_h=None):
    """A branded table: ink header row, ruled body cells."""
    head = [Paragraph(h, S["cell_head"]) for h in headers]
    body = [[Paragraph(c, S["cell"]) if isinstance(c, str) else c for c in r]
            for r in rows]
    kwargs = {}
    if row_h:
        kwargs["rowHeights"] = [14] + [row_h] * len(rows)
    t = Table([head] + body, colWidths=col_widths, repeatRows=1, **kwargs)
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), INK),
        ("GRID", (0, 0), (-1, -1), 0.7, RULE),
        ("BOX", (0, 0), (-1, -1), 1.2, INK),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 5),
        ("RIGHTPADDING", (0, 0), (-1, -1), 5),
        ("TOPPADDING", (0, 0), (-1, -1), 4),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [white, HexColor("#FAF7EF")]),
    ]))
    return [t, Spacer(1, 10)]


def section_header(num, total, title, sub=None):
    flow = [
        Paragraph(f"SECTION {num} OF {total}", S["eyebrow"]),
        Paragraph(title, S["h1"]),
        HRFlowable(width="100%", thickness=2.2, color=CORAL, spaceAfter=10),
    ]
    if sub:
        flow.append(Paragraph(sub, S["body"]))
    return flow


def build_pdf(path, title, footer_text, story):
    """Assemble a pack PDF: aqua cover page template + standard pages."""

    def on_cover(canvas, doc):
        canvas.saveState()
        canvas.setFillColor(AQUA)
        canvas.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
        canvas.setFillColor(CREAM)
        canvas.roundRect(MARGIN - 6 * mm, 52 * mm, PAGE_W - 2 * (MARGIN - 6 * mm),
                         PAGE_H - 104 * mm, 8 * mm, fill=1, stroke=0)
        canvas.setStrokeColor(INK)
        canvas.setLineWidth(2.4)
        canvas.roundRect(MARGIN - 6 * mm, 52 * mm, PAGE_W - 2 * (MARGIN - 6 * mm),
                         PAGE_H - 104 * mm, 8 * mm, fill=0, stroke=1)
        canvas.restoreState()

    def on_page(canvas, doc):
        canvas.saveState()
        canvas.setFillColor(white)
        canvas.setStrokeColor(INK)
        canvas.setLineWidth(1.4)
        canvas.roundRect(MARGIN, PAGE_H - 14 * mm, 40 * mm, 7.5 * mm, 3.7 * mm,
                         fill=1, stroke=1)
        canvas.setFillColor(CORAL)
        canvas.circle(MARGIN + 5 * mm, PAGE_H - 10.2 * mm, 1.6 * mm, fill=1, stroke=1)
        canvas.setFillColor(INK)
        canvas.setFont("Helvetica-Bold", 8)
        canvas.drawString(MARGIN + 8.5 * mm, PAGE_H - 11.4 * mm, "ADHD ASSIST")
        canvas.setFont("Helvetica", 7.5)
        canvas.setFillColor(INK_SOFT)
        canvas.drawString(MARGIN, 10 * mm, footer_text)
        canvas.drawRightString(PAGE_W - MARGIN, 10 * mm, f"Page {doc.page}")
        canvas.restoreState()

    doc = BaseDocTemplate(
        path, pagesize=A4,
        leftMargin=MARGIN, rightMargin=MARGIN,
        topMargin=22 * mm, bottomMargin=18 * mm,
        title=title, author="ADHD Assist",
    )
    frame = Frame(MARGIN, 18 * mm, CONTENT_W, PAGE_H - 40 * mm, id="main")
    cover_frame = Frame(MARGIN + 4 * mm, 56 * mm, CONTENT_W - 8 * mm,
                        PAGE_H - 112 * mm, id="cover")
    doc.addPageTemplates([
        PageTemplate(id="cover", frames=[cover_frame], onPage=on_cover),
        PageTemplate(id="page", frames=[frame], onPage=on_page),
    ])
    story = [NextPageTemplate("page")] + story
    doc.build(story)


def cover(title_html, subtitle, blurb, inside_items, edition_line):
    return [
        Spacer(1, 30 * mm),
        Paragraph(title_html, S["cover_title"]),
        Paragraph(subtitle, S["cover_sub"]),
        Paragraph(blurb, S["body"]),
        Spacer(1, 6),
        Paragraph("Inside:", S["h2"]),
        *bullets(inside_items),
        Spacer(1, 10),
        Paragraph(edition_line, S["small"]),
        PageBreak(),
    ]


DISCLAIMER_PARAS = [
    "<b>Educational only.</b> This pack and everything else from ADHD Assist is for "
    "education, organisation and appointment preparation only. It is not medical advice, "
    "not a diagnostic tool, and not a replacement for assessment or support from a "
    "qualified healthcare professional. ADHD can only be diagnosed by an appropriately "
    "qualified clinician.",
    "If you are worried about your health, medication, safety, or mental health, contact "
    "your GP, NHS 111, emergency services (999), or an appropriate crisis support service. "
    "Samaritans are available 24/7 on 116 123.",
]


def disclaimer_flow():
    return [Paragraph(t, S["body"]) for t in DISCLAIMER_PARAS]
