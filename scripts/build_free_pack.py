#!/usr/bin/env python3
"""Build the free 'ADHD Appointment Panic Pack' PDF and zip it into
content/packs/free-pack.zip.

Usage:  python3 scripts/build_free_pack.py
"""

import os
import zipfile

from reportlab.lib.colors import HexColor, white
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.platypus import (
    BaseDocTemplate, Frame, HRFlowable, PageBreak, PageTemplate, Paragraph,
    Spacer, Table, TableStyle,
)

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_DIR = os.path.join(ROOT, "content", "packs")
PDF_NAME = "ADHD-Appointment-Panic-Pack.pdf"
PDF_PATH = os.path.join(OUT_DIR, PDF_NAME)
ZIP_PATH = os.path.join(OUT_DIR, "free-pack.zip")

# Brand palette (matches app/globals.css)
INK = HexColor("#1F5F6B")
CORAL = HexColor("#FF6B6B")
CREAM = HexColor("#F5F1E8")
AQUA = HexColor("#CFEFED")
INK_SOFT = HexColor("#2C7280")

PAGE_W, PAGE_H = A4
MARGIN = 18 * mm

# ---------------------------------------------------------------------------
# Styles
# ---------------------------------------------------------------------------

S = {
    "cover_title": ParagraphStyle(
        "cover_title", fontName="Helvetica-Bold", fontSize=34, leading=38,
        textColor=INK, spaceAfter=6),
    "cover_sub": ParagraphStyle(
        "cover_sub", fontName="Helvetica-Bold", fontSize=15, leading=20,
        textColor=CORAL, spaceAfter=14),
    "eyebrow": ParagraphStyle(
        "eyebrow", fontName="Helvetica-Bold", fontSize=9, leading=12,
        textColor=INK_SOFT, spaceAfter=4, spaceBefore=0),
    "h1": ParagraphStyle(
        "h1", fontName="Helvetica-Bold", fontSize=20, leading=24,
        textColor=INK, spaceAfter=8, spaceBefore=2),
    "h2": ParagraphStyle(
        "h2", fontName="Helvetica-Bold", fontSize=12.5, leading=16,
        textColor=INK, spaceBefore=12, spaceAfter=5),
    "body": ParagraphStyle(
        "body", fontName="Helvetica", fontSize=10.5, leading=15.5,
        textColor=INK, spaceAfter=8),
    "bullet": ParagraphStyle(
        "bullet", fontName="Helvetica", fontSize=10.5, leading=15,
        textColor=INK, leftIndent=12, bulletIndent=2, spaceAfter=4),
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
}


def bullets(items):
    return [Paragraph(t, S["bullet"], bulletText="✓") for t in items]


def script_box(label, text):
    inner = [Paragraph(label.upper(), S["script_label"]),
             Paragraph(f"“{text}”", S["script"])]
    t = Table([[inner]], colWidths=[PAGE_W - 2 * MARGIN - 8])
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
    t = Table([[Paragraph(text, S["note"])]], colWidths=[PAGE_W - 2 * MARGIN - 8])
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
    """A fill-in area: `n` ruled lines."""
    flow = []
    if label:
        flow.append(Paragraph(label, S["fill_label"]))
    row_h = 26 if tall else 20
    t = Table([[""] for _ in range(n)],
              colWidths=[PAGE_W - 2 * MARGIN - 8],
              rowHeights=[row_h] * n)
    t.setStyle(TableStyle([
        ("LINEBELOW", (0, 0), (-1, -1), 0.8, HexColor("#9DBEC5")),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
    ]))
    flow += [t, Spacer(1, 10)]
    return flow


def section_header(num, title, sub=None):
    flow = [
        Paragraph(f"SECTION {num} OF 6", S["eyebrow"]),
        Paragraph(title, S["h1"]),
        HRFlowable(width="100%", thickness=2.2, color=CORAL, spaceAfter=10),
    ]
    if sub:
        flow.append(Paragraph(sub, S["body"]))
    return flow


# ---------------------------------------------------------------------------
# Page furniture
# ---------------------------------------------------------------------------

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
    # header brand pill
    canvas.setFillColor(white)
    canvas.setStrokeColor(INK)
    canvas.setLineWidth(1.4)
    canvas.roundRect(MARGIN, PAGE_H - 14 * mm, 40 * mm, 7.5 * mm, 3.7 * mm, fill=1, stroke=1)
    canvas.setFillColor(CORAL)
    canvas.circle(MARGIN + 5 * mm, PAGE_H - 10.2 * mm, 1.6 * mm, fill=1, stroke=1)
    canvas.setFillColor(INK)
    canvas.setFont("Helvetica-Bold", 8)
    canvas.drawString(MARGIN + 8.5 * mm, PAGE_H - 11.4 * mm, "ADHD ASSIST")
    # footer
    canvas.setFont("Helvetica", 7.5)
    canvas.setFillColor(INK_SOFT)
    canvas.drawString(MARGIN, 10 * mm,
                      "The ADHD Appointment Panic Pack  ·  free edition  ·  adhd-assist.vercel.app")
    canvas.drawRightString(PAGE_W - MARGIN, 10 * mm, f"Page {doc.page}")
    canvas.restoreState()


# ---------------------------------------------------------------------------
# Content
# ---------------------------------------------------------------------------

def build_story():
    W = PAGE_W - 2 * MARGIN
    story = []

    # ---- Cover ----
    story += [
        Spacer(1, 40 * mm),
        Paragraph("I Think I Might<br/>Have ADHD", S["cover_title"]),
        Paragraph("The ADHD Appointment Panic Pack", S["cover_sub"]),
        Paragraph(
            "A calm little starter kit for preparing for your first GP conversation. "
            "Six short sections. Nothing to sign up for, nothing to solve — "
            "just one useful next step.", S["body"]),
        Spacer(1, 6),
        Paragraph("Inside:", S["h2"]),
        *bullets([
            "The routes: a simple explainer (NHS · Right to Choose · private)",
            "GP appointment prep sheet (fill it in, bring it with you)",
            "Brain-freeze phone scripts",
            "Tiny symptom evidence starter",
            "One AI prompt for overwhelm",
            "The full disclaimer (please read it)",
        ]),
        Spacer(1, 10),
        Paragraph("UK edition · Free · From adhd-assist.vercel.app", S["small"]),
        PageBreak(),
    ]

    # ---- Section 1: Routes ----
    story += section_header(1, "The Routes: A Simple Explainer",
        "In the UK there are three main routes to an adult ADHD assessment. "
        "All three start the same way: a conversation with your GP.")
    story += [
        Paragraph("Route 1 — Standard NHS referral", S["h2"]),
        *bullets([
            "Free. Your GP refers you to your local NHS ADHD service.",
            "Main drawback: the wait. In many areas it runs to years, not months.",
            "Good fit if cost matters most and you can wait — and you can switch route later.",
        ]),
        Paragraph("Route 2 — Right to Choose (England only)", S["h2"]),
        *bullets([
            "Still NHS-funded and free to you — but you choose the provider, "
            "including independent clinics with NHS contracts.",
            "Waits are often weeks-to-months instead of years.",
            "Your GP sends the referral through the NHS e-Referral system to your chosen provider.",
            "Availability has been changing in some areas recently — check the current "
            "position for your area before the appointment (ADHD UK keeps an up-to-date guide at adhduk.co.uk).",
        ]),
        Paragraph("Route 3 — Private assessment", S["h2"]),
        *bullets([
            "Fastest, but you pay: typically several hundred pounds to £1,200+ for assessment, "
            "plus ongoing costs if medication follows.",
            "Before booking, ask your GP surgery whether they accept “shared care” from that "
            "provider — if not, you may pay private prescription prices indefinitely.",
        ]),
        Spacer(1, 4),
        *note_box("Whichever route you take, the preparation is identical: clear examples of "
                  "your symptoms, their history, and their impact. Nothing you fill in here is wasted."),
        PageBreak(),
    ]

    # ---- Section 2: GP prep sheet ----
    story += section_header(2, "GP Appointment Prep Sheet",
        "Fill this in before your appointment — then bring it. If your mind goes blank, "
        "you can literally hand it over. GPs read prepared notes all the time.")
    story += [
        Paragraph("My opening sentence (say this first, in the first 30 seconds)", S["h2"]),
        Paragraph(
            "Example: “I’ve been struggling with focus, organisation and memory for as long "
            "as I can remember, it’s causing real problems in my daily life, and I’d like to "
            "be assessed for ADHD.”", S["small"]),
        *write_lines(2),
        Paragraph("My top 3 struggles — each with one recent, concrete example", S["h2"]),
        *write_lines(3, "1."),
        *write_lines(3, "2."),
        *write_lines(3, "3."),
        PageBreak(),
        Paragraph("It goes back a long way — one or two childhood examples", S["h2"]),
        Paragraph("School reports are gold: “easily distracted”, “not fulfilling potential”, "
                  "“bright but doesn’t concentrate”.", S["small"]),
        *write_lines(3),
        Paragraph("What it costs me — work, money, relationships, health", S["h2"]),
        *write_lines(3),
        Paragraph("My ask, written out", S["h2"]),
        Paragraph("Example: “I’d like to be referred for an ADHD assessment. If the local wait "
                  "is long, could we look at a Right to Choose referral?”", S["small"]),
        *write_lines(2),
        Paragraph("Practical bits", S["h2"]),
        *bullets([
            "Book a double appointment if your surgery offers them.",
            "Set two alarms for the day. Getting there is half the battle.",
            "Put this sheet with your keys the night before.",
        ]),
        PageBreak(),
    ]

    # ---- Section 3: Phone scripts ----
    story += section_header(3, "Brain-Freeze Phone Scripts",
        "Word-for-word lines for the moments phones make everything worse. "
        "Read them out — nobody on the other end can tell, and nobody cares.")
    story += [
        *script_box("Booking the appointment",
            "Hi, I’d like to book a GP appointment to discuss being assessed for ADHD. "
            "It’s not urgent-urgent, but it’s important to me — do you have anything "
            "in the next couple of weeks? A double appointment would help if that’s possible."),
        *script_box("If the receptionist asks why",
            "It’s about a long-term difficulty with focus and organisation that’s affecting "
            "my daily life. I’d like to discuss an ADHD assessment with the GP."),
        *script_box("If your mind goes blank mid-call",
            "Sorry — I’ve lost my thread, which is honestly part of the problem. "
            "Give me two seconds… I’m calling to book an appointment about an ADHD assessment."),
        *script_box("In the appointment, if you freeze",
            "Sorry — my mind’s gone blank, which is actually part of why I’m here. "
            "I’ve written everything down — can I read from my notes?"),
        *script_box("If the GP seems dismissive",
            "I understand, but this has been a lifelong pattern and it’s seriously affecting my "
            "work and my health. I’d still like a referral for a proper assessment. "
            "Could we record that I’ve asked?"),
        Spacer(1, 4),
        *note_box("You are allowed to read from notes. You are allowed to ask again. "
                  "None of this counts against you."),
        PageBreak(),
    ]

    # ---- Section 4: Evidence starter ----
    story += section_header(4, "Tiny Symptom Evidence Starter",
        "Assessments run on evidence, and evidence beats memory. One or two specific examples "
        "per category is plenty to start — add more whenever something happens.")
    cats = [
        ("Focus & attention", "Drifting mid-task, rereading the same paragraph, unfinished projects."),
        ("Time", "Chronic lateness, lost hours, the “loads of time → suddenly late” flip."),
        ("Organisation", "Unopened post, lost documents, systems that collapse after a week."),
        ("Memory", "Forgotten commitments, lost items, walking into rooms with no idea why."),
        ("Impulsivity", "Purchases, decisions, or comments you regretted almost immediately."),
        ("Emotions & energy", "Quick frustration, criticism that hits too hard, burnout cycles."),
    ]
    for name, hint in cats:
        story += [
            Paragraph(name, S["h2"]),
            Paragraph(hint, S["small"]),
            *write_lines(2),
        ]
    story += [PageBreak()]

    # ---- Section 5: AI prompt ----
    story += section_header(5, "One AI Prompt for Overwhelm",
        "When everything feels equally urgent, paste this into ChatGPT, Claude, or Gemini. "
        "It turns the spiral into a single next step.")
    story += [
        *script_box("Copy-paste this",
            "I have ADHD and I’m overwhelmed. Here’s everything on my plate right now: "
            "[paste a messy brain-dump — don’t tidy it]. Ask me questions one at a time to "
            "find the single most urgent item. Then break that item into steps of five minutes or "
            "less, and tell me only the first step."),
        Paragraph("How to use it well", S["h2"]),
        *bullets([
            "Don’t tidy the brain-dump — the mess is the data.",
            "Answer its questions honestly; short answers are fine.",
            "Do only the first step it gives you. Then come back for the next one.",
            "“Everything else is officially deferred, not failed.”",
        ]),
        Spacer(1, 6),
        *note_box("AI tools can help you organise — they can’t diagnose you or give medical "
                  "advice. Keep health decisions with your GP and qualified clinicians."),
        PageBreak(),
    ]

    # ---- Section 6: Disclaimer ----
    story += section_header(6, "The Full Disclaimer")
    story += [
        Paragraph(
            "<b>Educational only.</b> This pack and everything else from ADHD Assist is for "
            "education, organisation and appointment preparation only. It is not medical advice, "
            "not a diagnostic tool, and not a replacement for assessment or support from a "
            "qualified healthcare professional. ADHD can only be diagnosed by an appropriately "
            "qualified clinician.", S["body"]),
        Paragraph(
            "If you are worried about your health, medication, safety, or mental health, contact "
            "your GP, NHS 111, emergency services (999), or an appropriate crisis support service. "
            "Samaritans are available 24/7 on 116 123.", S["body"]),
        Paragraph("Useful UK organisations", S["h2"]),
        *bullets([
            "ADHD UK — adhduk.co.uk (diagnosis routes, incl. Right to Choose)",
            "AADD-UK — aadduk.org (by and for adults with ADHD; local groups)",
            "ADHD Foundation — adhdfoundation.org.uk",
            "ADHDadultUK — adhdadult.uk",
            "ADDISS — addiss.co.uk",
        ]),
        Spacer(1, 14),
        HRFlowable(width="100%", thickness=1.2, color=INK, spaceAfter=10),
        Paragraph(
            "Ready for more? The Diagnosis Prep Starter Pack (£9) has the full-length GP prep "
            "template, 9 phone scripts, the 8-category evidence builder, a childhood worksheet and "
            "9 AI prompts — at adhd-assist.vercel.app/starter-pack", S["body"]),
        Paragraph("Made with patience, for people who lost theirs.", S["small"]),
    ]
    return story


def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    doc = BaseDocTemplate(
        PDF_PATH, pagesize=A4,
        leftMargin=MARGIN, rightMargin=MARGIN,
        topMargin=22 * mm, bottomMargin=18 * mm,
        title="The ADHD Appointment Panic Pack — ADHD Assist",
        author="ADHD Assist",
    )
    frame = Frame(MARGIN, 18 * mm, PAGE_W - 2 * MARGIN, PAGE_H - 40 * mm, id="main")
    cover_frame = Frame(MARGIN + 4 * mm, 56 * mm, PAGE_W - 2 * MARGIN - 8 * mm,
                        PAGE_H - 112 * mm, id="cover")
    doc.addPageTemplates([
        PageTemplate(id="cover", frames=[cover_frame], onPage=on_cover),
        PageTemplate(id="page", frames=[frame], onPage=on_page),
    ])

    story = build_story()
    # Switch from the cover template to the standard template after page 1.
    from reportlab.platypus import NextPageTemplate
    story.insert(0, NextPageTemplate("page"))
    doc.build(story)

    with zipfile.ZipFile(ZIP_PATH, "w", zipfile.ZIP_DEFLATED) as z:
        z.write(PDF_PATH, PDF_NAME)
    os.remove(PDF_PATH)
    print(f"Built {ZIP_PATH}")


if __name__ == "__main__":
    main()
