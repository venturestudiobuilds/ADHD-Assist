// Free on-site guidance — the content behind every "Read on site" item in the
// "Start where you are" picker. Educational and preparation-focused only:
// nothing here is medical advice, and the site-wide disclaimer applies.
//
// Each guide is keyed by a slug; SITUATIONS in lib/content.ts reference these
// slugs in their `read` arrays.

export type GuideBlock =
  | { type: 'p'; text: string }
  | { type: 'h'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'script'; label: string; text: string }
  | { type: 'note'; text: string };

export type Guide = {
  title: string;
  blocks: GuideBlock[];
};

export const GUIDES: Record<string, Guide> = {
  // =========================================================================
  // A — I think I might have ADHD
  // =========================================================================
  'what-adhd-can-look-like': {
    title: 'What ADHD can look like',
    blocks: [
      {
        type: 'p',
        text: 'ADHD is not just "being hyper" or "not trying hard enough". In adults it often looks quieter and messier than the stereotype — and many people reach their 20s, 30s, or 50s before anyone joins the dots.',
      },
      { type: 'h', text: 'It can look like…' },
      {
        type: 'list',
        items: [
          'Starting ten things and finishing none — then finishing one obsessively at 2am.',
          'Time feeling like it has two settings: "now" and "not now".',
          'Rereading the same paragraph five times because your brain left the room.',
          'A pile of unopened letters you think about every single day.',
          'Being told you\'re "so capable, if only you applied yourself" your whole life.',
          'Big feelings that arrive fast and take hours to settle.',
        ],
      },
      {
        type: 'p',
        text: 'None of these alone mean you have ADHD — plenty of things can cause them. What matters for an assessment is a long-running pattern, across different areas of life, that gets in your way.',
      },
      {
        type: 'note',
        text: 'Only a qualified clinician can diagnose ADHD. This page is here to help you decide whether the pattern is worth raising with a professional.',
      },
    ],
  },
  'common-signs-and-patterns': {
    title: 'Common signs and patterns',
    blocks: [
      {
        type: 'p',
        text: 'Clinicians look for patterns that are persistent (most of your life), pervasive (show up in more than one setting), and impairing (actually cause you problems). Three useful buckets:',
      },
      { type: 'h', text: 'Attention & focus' },
      {
        type: 'list',
        items: [
          'Losing focus mid-task or mid-conversation, even when you care.',
          'Hyperfocus: hours vanish into the "wrong" task with no sense of time.',
          'Careless mistakes in things you actually understand perfectly well.',
        ],
      },
      { type: 'h', text: 'Organisation & memory' },
      {
        type: 'list',
        items: [
          'Deadlines, appointments, and admin quietly falling through the cracks.',
          'Losing keys, phone, wallet — or losing track of entire projects.',
          'Starting strong, drifting off before the finish line.',
        ],
      },
      { type: 'h', text: 'Restlessness & impulses' },
      {
        type: 'list',
        items: [
          'Feeling "driven by a motor", fidgeting, or a restless mind that never idles.',
          'Interrupting or blurting things out, then cringing about it later.',
          'Impulse decisions — spending, quitting, saying yes — that cost you.',
        ],
      },
      {
        type: 'p',
        text: 'The strongest evidence you can bring to an assessment is specific, real examples of these patterns — from childhood and from now. That\'s exactly what the packs on this site help you collect.',
      },
    ],
  },
  'uk-support-links': {
    title: 'UK support links and charities',
    blocks: [
      {
        type: 'p',
        text: 'You do not have to figure this out alone. These UK organisations offer free information, communities, and support while you work out your next step:',
      },
      {
        type: 'list',
        items: [
          'ADHD UK (adhduk.co.uk) — clear guides on diagnosis routes, including Right to Choose.',
          'AADD-UK (aadduk.org) — by and for adults with ADHD; includes a directory of local support groups.',
          'ADHD Foundation (adhdfoundation.org.uk) — the neurodiversity charity; resources for all ages.',
          'ADHDadultUK (adhdadult.uk) — evidence-based information and peer support for adults.',
          'ADDISS (addiss.co.uk) — information and resources for families, teachers, and professionals.',
        ],
      },
      { type: 'h', text: 'If things feel heavy right now' },
      {
        type: 'p',
        text: 'If you are struggling with your mental health, contact your GP or NHS 111 (option 2 for mental health in many areas). In an emergency, call 999. Samaritans are available 24/7 on 116 123.',
      },
    ],
  },
  'assessment-options': {
    title: 'Understanding assessment options',
    blocks: [
      {
        type: 'p',
        text: 'In the UK there are three main routes to an adult ADHD assessment. All three start with the same first step: talking to your GP.',
      },
      { type: 'h', text: '1. Standard NHS referral' },
      {
        type: 'p',
        text: 'Free. Your GP refers you to a local NHS service. The main drawback is waiting time — in many areas the list runs to years, not months.',
      },
      { type: 'h', text: '2. Right to Choose (England only)' },
      {
        type: 'p',
        text: 'Still NHS-funded and free — but you choose the provider, including independent clinics with NHS contracts, which often have much shorter waits. Your GP sends the referral through the NHS e-Referral system. Availability has been changing in some areas recently, so check the current position for your area (ADHD UK keeps a good up-to-date guide).',
      },
      { type: 'h', text: '3. Private assessment' },
      {
        type: 'p',
        text: 'Fastest, but you pay — typically several hundred pounds to over a thousand for assessment, plus ongoing costs if medication follows. Before booking, check whether your GP surgery accepts "shared care" from that provider, or NHS prescribing may not be an option afterwards.',
      },
      {
        type: 'note',
        text: 'Whichever route you take, the preparation is identical: clear examples of your symptoms, their history, and their impact. That work is never wasted.',
      },
    ],
  },

  // =========================================================================
  // B — I haven't spoken to my GP yet
  // =========================================================================
  'preparing-for-gp': {
    title: 'Preparing for your GP appointment',
    blocks: [
      {
        type: 'p',
        text: 'A GP appointment is short — often under ten minutes. The goal is not to prove you have ADHD. It\'s to give your GP enough clear information to agree that an assessment makes sense.',
      },
      { type: 'h', text: 'Before you book' },
      {
        type: 'list',
        items: [
          'Ask for a double appointment if your surgery offers them — this conversation needs room.',
          'You can book with any GP, but one you find easy to talk to helps.',
          'Decide your one-sentence opener in advance (see "What to say if you freeze").',
        ],
      },
      { type: 'h', text: 'Bring, written down' },
      {
        type: 'list',
        items: [
          'Your top 3 struggles, each with one concrete recent example.',
          'One or two childhood examples — school reports are gold if you have them.',
          'How it affects work, relationships, money, or health. Impact is what GPs listen for.',
          'What you\'re asking for: "I\'d like to be referred for an ADHD assessment."',
        ],
      },
      {
        type: 'p',
        text: 'Paper beats memory here. If your mind goes blank, you can literally hand the sheet over — GPs read prepared notes all the time.',
      },
    ],
  },
  'what-examples-to-collect': {
    title: 'What examples to collect',
    blocks: [
      {
        type: 'p',
        text: 'Vague descriptions ("I\'m disorganised") are easy to dismiss. Specific examples ("I\'ve been fined three times this year for missed payments I could afford") are not. Collect a handful in each area:',
      },
      {
        type: 'list',
        items: [
          'Focus: meetings you drift out of, reading you can\'t hold onto, tasks that take 4× longer than they should.',
          'Time: chronic lateness, missed appointments, the "I have loads of time → I\'m suddenly late" flip.',
          'Organisation: unopened post, lost documents, abandoned projects, chaotic inbox.',
          'Memory: forgetting commitments minutes after making them, walking into rooms with no idea why.',
          'Impulsivity: purchases, decisions, or comments you regretted almost immediately.',
          'Emotions: quick frustration, criticism that hits far harder than it should, burnout cycles.',
        ],
      },
      { type: 'h', text: 'Then add the two dimensions assessors care about' },
      {
        type: 'list',
        items: [
          'History: did versions of this show up at school? ("Bright but doesn\'t concentrate" on a report is evidence.)',
          'Impact: what has it cost you — jobs, grades, relationships, money, self-esteem?',
        ],
      },
      {
        type: 'p',
        text: 'One line per example is enough. You\'re building a picture, not writing an essay.',
      },
    ],
  },
  'what-to-say-if-you-freeze': {
    title: 'What to say if you freeze',
    blocks: [
      {
        type: 'p',
        text: 'Brains that struggle under pressure struggle most in exactly these appointments. So don\'t rely on your brain — rely on a script. Practising one sentence out loud twice is enough.',
      },
      {
        type: 'script',
        label: 'The opener',
        text: '"I\'ve been struggling with focus, organisation and memory for as long as I can remember, it\'s causing real problems in my daily life, and I\'d like to be assessed for ADHD."',
      },
      {
        type: 'script',
        label: 'If you blank completely',
        text: '"Sorry — my mind\'s gone blank, which is actually part of why I\'m here. I\'ve written it all down, can I read from my notes?"',
      },
      {
        type: 'script',
        label: 'If the GP seems dismissive',
        text: '"I understand, but this has been a lifelong pattern and it\'s seriously affecting my [work/relationships/health]. I\'d still like a referral for a proper assessment. Could we record that I\'ve asked?"',
      },
      {
        type: 'p',
        text: 'You are allowed to read from notes. You are allowed to hand the notes over. You are allowed to ask again. None of this counts against you.',
      },
    ],
  },

  // =========================================================================
  // C — I have a GP appointment booked
  // =========================================================================
  'gp-appointment-guide': {
    title: 'GP appointment guide',
    blocks: [
      { type: 'h', text: 'The night before' },
      {
        type: 'list',
        items: [
          'One page only: top 3 struggles + examples, one childhood line, one impact line, your ask.',
          'Put the page (or your phone notes) somewhere you cannot forget it.',
          'Set two alarms. Getting there is half the battle — this is a known ADHD failure point, not a character flaw.',
        ],
      },
      { type: 'h', text: 'In the room' },
      {
        type: 'list',
        items: [
          'Open with your ask in the first 30 seconds — don\'t save it for the end.',
          'Stick to your three struggles. Depth beats breadth in eight minutes.',
          'If asked something you don\'t know, "I\'m not sure, but here\'s what I do know" is a fine answer.',
        ],
      },
      { type: 'h', text: 'Before you leave, ask' },
      {
        type: 'list',
        items: [
          '"Where are you referring me, and roughly how long is the wait?"',
          '"Am I eligible for Right to Choose?" (England only — it can cut the wait dramatically.)',
          '"How will I hear about the referral, and who do I chase if I hear nothing?"',
        ],
      },
      {
        type: 'p',
        text: 'Then, same day if you can: write down what was agreed. Future you will be very grateful.',
      },
    ],
  },
  'top-3-struggles': {
    title: 'Top 3 struggles to write down',
    blocks: [
      {
        type: 'p',
        text: 'Three is the magic number: enough to show a pattern, few enough to actually cover in the appointment. Pick the three that cost you the most, and shape each one like this:',
      },
      {
        type: 'list',
        items: [
          'The struggle, in one plain sentence.',
          'A recent, concrete example (last few weeks if possible).',
          'What it costs you — time, money, jobs, relationships, health.',
        ],
      },
      { type: 'h', text: 'A worked example' },
      {
        type: 'script',
        label: 'Struggle #1 — admin paralysis',
        text: '"I can\'t make myself deal with paperwork even when it\'s urgent. Last month I ignored a bill I could easily afford until it went to a debt collector. It\'s happened at least four times in two years."',
      },
      {
        type: 'p',
        text: 'Notice the shape: pattern → fresh example → real cost. That\'s the format that survives an eight-minute appointment.',
      },
    ],
  },
  'example-wording': {
    title: 'Example wording',
    blocks: [
      {
        type: 'p',
        text: 'Steal these lines as-is or adapt them. They\'re written to be clear, hard to misread, and quick to say.',
      },
      {
        type: 'script',
        label: 'Opening the appointment',
        text: '"Thanks for seeing me. I want to talk about being assessed for ADHD. I\'ve written down the main things so I don\'t lose track — is it OK if I go through them?"',
      },
      {
        type: 'script',
        label: 'Describing the history',
        text: '"This isn\'t new — my school reports said things like \'easily distracted\' and \'not fulfilling potential\'. I\'ve built coping strategies, but they\'re expensive to maintain and they keep collapsing."',
      },
      {
        type: 'script',
        label: 'Making the ask explicit',
        text: '"I\'d like to be referred for an ADHD assessment. If there\'s a long local wait, could we look at a Right to Choose referral?"',
      },
      {
        type: 'script',
        label: 'If offered a different explanation first',
        text: '"I hear that, and I\'m open to it — but the pattern goes back to childhood, well before any of that. I\'d like ADHD properly ruled in or out by a specialist."',
      },
    ],
  },

  // =========================================================================
  // D — I've been referred and I'm waiting
  // =========================================================================
  'while-you-wait': {
    title: 'While-you-wait guidance',
    blocks: [
      {
        type: 'p',
        text: 'The wait is genuinely hard: months or years of limbo, run by the exact executive functions ADHD makes unreliable. Two jobs matter now — protect the referral, and protect yourself.',
      },
      { type: 'h', text: 'Protect the referral' },
      {
        type: 'list',
        items: [
          'Confirm it actually went in: ask your GP surgery for the referral date and provider name.',
          'Diary a chase-up every 6–8 weeks. Referrals do go missing; a polite call resurrects them.',
          'Keep one note (or our tracker) with every date, name, and reference number.',
          'If the projected wait is years and you\'re in England, ask your GP about re-referring via Right to Choose.',
        ],
      },
      { type: 'h', text: 'Protect yourself' },
      {
        type: 'list',
        items: [
          'Keep collecting symptom examples — it\'s the best assessment prep there is, and the wait gives you time to do it well.',
          'Lower the bar: a "minimum viable week" (sleep, food, one priority per day) beats an elaborate system you\'ll abandon.',
          'If your mental health dips while waiting, that\'s a GP matter now — don\'t sit on it until the assessment.',
        ],
      },
    ],
  },
  'referral-admin-tracking': {
    title: 'How to keep track of referral / admin',
    blocks: [
      {
        type: 'p',
        text: 'A referral only moves if someone is watching it — and the system quietly assumes that someone is you. The fix is one boring habit: everything in one place, dated.',
      },
      { type: 'h', text: 'Record, every time you interact with anyone' },
      {
        type: 'list',
        items: [
          'Date, who you spoke to, and which organisation.',
          'What they said (one line is fine).',
          'What happens next, and who owes it.',
          'Reference numbers — ask for one if none is offered.',
        ],
      },
      { type: 'h', text: 'The chase-up script' },
      {
        type: 'script',
        label: 'Phone or email, every 6–8 weeks',
        text: '"Hi, I\'m chasing an ADHD assessment referral for [name, DOB], referred by [GP surgery] on [date], reference [number]. Could you confirm it\'s in the queue and give me a current estimated wait?"',
      },
      {
        type: 'p',
        text: 'Set the next chase-up reminder the moment you finish each call — not later. "Later" is where referrals go to die.',
      },
    ],
  },
  'overwhelm-support': {
    title: 'Overwhelm support',
    blocks: [
      {
        type: 'p',
        text: 'Overwhelm is the point where everything feels equally urgent, so nothing gets done, so more piles up. The exit is never "try harder" — it\'s "shrink the next step until it\'s stupid-small".',
      },
      { type: 'h', text: 'A 10-minute reset' },
      {
        type: 'list',
        items: [
          'Brain-dump everything circling your head onto one page. Don\'t sort it, just empty it.',
          'Circle the one item with a real deadline or real consequence this week.',
          'Write its first physical action ("open the letter", not "sort out finances").',
          'Do only that. Everything else is officially deferred, not failed.',
        ],
      },
      {
        type: 'script',
        label: 'An AI prompt that helps',
        text: '"I have ADHD and I\'m overwhelmed. Here\'s everything on my plate: [paste your brain-dump]. Ask me questions to find the single most urgent item, then break it into steps of five minutes or less."',
      },
      {
        type: 'note',
        text: 'If overwhelm tips into crisis — you can\'t function, or you\'re having thoughts of harming yourself — that\'s beyond admin advice. Contact your GP, NHS 111, or Samaritans on 116 123 (24/7). In an emergency call 999.',
      },
    ],
  },

  // =========================================================================
  // E — I'm comparing providers
  // =========================================================================
  'provider-questions': {
    title: 'Provider questions',
    blocks: [
      {
        type: 'p',
        text: 'Whether it\'s Right to Choose or private, providers differ far more than their websites suggest. Ask every candidate the same questions so you can compare like with like:',
      },
      {
        type: 'list',
        items: [
          'What\'s your current wait for assessment — and separately, for starting treatment after diagnosis?',
          'Who does the assessing, and what format is it (video/in-person, how long)?',
          'If I\'m diagnosed, do you offer titration, and what\'s the wait for that?',
          'Do you support shared care with NHS GPs, and how often do surgeries actually accept yours?',
          'What happens — and what does it cost — if my GP refuses shared care?',
          'What are your annual review requirements and costs once I\'m stable on medication?',
          'What ongoing support exists between appointments if something goes wrong?',
        ],
      },
      {
        type: 'p',
        text: 'The shared-care questions are the ones people skip and regret. A cheap assessment with no route to NHS prescribing can end up the most expensive option of all.',
      },
    ],
  },
  'cost-considerations': {
    title: 'Cost considerations',
    blocks: [
      {
        type: 'p',
        text: 'The assessment fee is the visible cost. The real cost is the whole journey — assessment, titration, prescriptions, and reviews, for as long as treatment continues.',
      },
      { type: 'h', text: 'Map all four buckets before choosing' },
      {
        type: 'list',
        items: [
          'Assessment: typically several hundred pounds to £1,200+ privately. £0 on NHS routes, including Right to Choose.',
          'Titration: the dose-finding phase, often billed per appointment privately — ask how many appointments are typical.',
          'Prescriptions: private prescriptions can run £50–£150+ per month; NHS prescriptions are the standard charge (free in Scotland and Wales).',
          'Reviews: many providers require a paid annual review to keep prescribing.',
        ],
      },
      { type: 'h', text: 'The pivot point: shared care' },
      {
        type: 'p',
        text: 'If your GP accepts a shared-care agreement after titration, prescribing moves to the NHS and monthly costs collapse. If they refuse — which they can — you pay private prices indefinitely. Ask your own GP surgery about their shared-care policy before you spend anything.',
      },
    ],
  },
  'what-to-check-before-choosing': {
    title: 'What to check before choosing',
    blocks: [
      {
        type: 'p',
        text: 'A short due-diligence pass saves months of pain. Before committing to any provider, check:',
      },
      {
        type: 'list',
        items: [
          'Registration: clinicians on the GMC register (or NMC for prescribing nurses); the service registered with CQC (England).',
          'Assessment quality: a proper diagnostic interview against DSM-5/ICD-11 criteria — not just a questionnaire score.',
          'The full pathway in writing: assessment → titration → shared care handover, with waits and costs for each stage.',
          'Shared-care track record with GPs in your area — ask them directly, and ask your surgery the same question.',
          'Right to Choose status if you\'re in England: an NHS contract means the whole thing can be free.',
          'Reviews from real patients about the after-diagnosis experience — support tends to be strong up to diagnosis and patchier after.',
        ],
      },
      {
        type: 'p',
        text: 'Put three candidates side by side on the same criteria and the decision usually makes itself. Our Provider Comparison Tracker is built for exactly that.',
      },
    ],
  },

  // =========================================================================
  // F — I'm starting medication / titration
  // =========================================================================
  'what-to-track': {
    title: 'What to track',
    blocks: [
      {
        type: 'p',
        text: 'Titration is a structured experiment to find your dose. The clinician can only work with the data you bring — and ADHD memory will not reconstruct three weeks accurately after the fact. Track as you go, one minute a day.',
      },
      { type: 'h', text: 'Daily, quick ratings (1–5)' },
      {
        type: 'list',
        items: [
          'Focus — could you direct your attention where you wanted it?',
          'Mood and energy across the day, including the evening wear-off.',
          'Appetite — a common effect worth catching early.',
          'Sleep — how long it took to fall asleep, how you woke.',
          'Side effects: headaches, heart racing, jaw tension, anything new.',
        ],
      },
      { type: 'h', text: 'Weekly, one honest line' },
      {
        type: 'list',
        items: [
          '"What worked better this week than before?"',
          '"What got worse or appeared that wasn\'t there?"',
          'Dose and time taken, plus caffeine changes — reviewers always ask.',
        ],
      },
      {
        type: 'note',
        text: 'Tracking never replaces medical guidance. If you experience concerning side effects — chest pain, severe mood changes, thoughts of self-harm — contact your prescriber or NHS 111 promptly; call 999 in an emergency.',
      },
    ],
  },
  'questions-to-ask': {
    title: 'Questions to ask',
    blocks: [
      {
        type: 'p',
        text: 'Titration appointments are short and the questions evaporate under pressure — so bring them written down. The essentials:',
      },
      { type: 'h', text: 'At the start' },
      {
        type: 'list',
        items: [
          'What should this medication feel like when it\'s working — and how soon?',
          'Which side effects are normal and passing, and which mean "contact you now"?',
          'How do increases work, and what exactly should I track between now and then?',
          'What about caffeine, alcohol, and my other medications?',
        ],
      },
      { type: 'h', text: 'During dose changes' },
      {
        type: 'list',
        items: [
          '"It helps for X hours then drops off a cliff — is that timing, dose, or formulation?"',
          '"Which of these effects should decide whether we go up, down, or switch?"',
        ],
      },
      { type: 'h', text: 'Before discharge to your GP' },
      {
        type: 'list',
        items: [
          'Will you send a shared-care agreement, and what happens if my GP declines it?',
          'What are the ongoing review requirements, and who do I contact if things stop working?',
        ],
      },
    ],
  },
  'shared-care-overview': {
    title: 'Shared care overview',
    blocks: [
      {
        type: 'p',
        text: 'Shared care is a written agreement where a specialist keeps overall responsibility for your ADHD treatment while your NHS GP takes over routine prescribing. It\'s the bridge between a private or Right to Choose diagnosis and normal NHS prescription costs.',
      },
      { type: 'h', text: 'How it normally goes' },
      {
        type: 'list',
        items: [
          'You complete titration and are stable on a dose.',
          'The specialist sends a shared-care agreement to your GP surgery.',
          'If the surgery accepts, your repeat prescriptions move to the NHS.',
          'The specialist still does periodic reviews (often annually).',
        ],
      },
      { type: 'h', text: 'The catch' },
      {
        type: 'p',
        text: 'GP surgeries can decline shared care — and some decline it for all private providers as policy. Acceptance rates are generally better for Right to Choose providers, since the care is already NHS-commissioned, but nothing is guaranteed. That\'s why "will my GP accept shared care from this provider?" belongs at the very start of your provider research, not the end.',
      },
      {
        type: 'p',
        text: 'If shared care is refused: ask the surgery for the reason in writing, ask your provider what they can do (some will approach the surgery directly), and factor ongoing private prescribing into your budget while you decide next steps.',
      },
    ],
  },
  'preparation-not-advice': {
    title: 'This is preparation, not medical advice',
    blocks: [
      {
        type: 'p',
        text: 'Everything on this site — every guide, script, tracker, and pack — exists to help you organise information and prepare for appointments. None of it is medical advice, and none of it can tell you whether you have ADHD or what treatment is right for you.',
      },
      {
        type: 'list',
        items: [
          'ADHD can only be diagnosed by an appropriately qualified clinician.',
          'Never start, stop, or change a medication dose except as directed by your prescriber.',
          'Tracking tools inform conversations with professionals — they never replace them.',
          'If you\'re worried about your health, medication, or side effects, contact your prescriber, GP, or NHS 111.',
          'In a mental health crisis: NHS 111, Samaritans 116 123 (24/7), or 999 in an emergency.',
        ],
      },
      {
        type: 'p',
        text: 'Being organised makes every professional conversation better. That\'s the job this site does — the medical decisions stay with the people qualified to make them, with you in the room.',
      },
    ],
  },

  // =========================================================================
  // Support map extras
  // =========================================================================
  'symptom-evidence-starter': {
    title: 'Symptom evidence starter',
    blocks: [
      {
        type: 'p',
        text: 'Assessments run on evidence, and evidence beats memory — especially an ADHD memory under pressure. You don\'t need a dossier; you need a page of specific, dated examples sorted into a few categories.',
      },
      { type: 'h', text: 'Start with six categories' },
      {
        type: 'list',
        items: [
          'Focus & attention — drifting mid-task, rereading, unfinished work.',
          'Time — lateness, lost hours, deadline cliff-edges.',
          'Organisation — piles, chaos, abandoned systems.',
          'Memory — forgotten commitments, lost items, blank moments.',
          'Impulsivity — spending, blurting, snap decisions.',
          'Emotions & energy — quick frustration, burnout cycles, restlessness.',
        ],
      },
      { type: 'h', text: 'For each category, capture' },
      {
        type: 'list',
        items: [
          'One or two recent examples, as specific as you can ("last Tuesday I…").',
          'One older example — ideally reaching back to school or childhood.',
          'The cost: what it broke, lost, or nearly lost you.',
        ],
      },
      {
        type: 'p',
        text: 'Add to it whenever something happens — a two-line note in your phone is perfect. A month of casual collecting usually produces stronger evidence than a weekend of trying to remember everything at once.',
      },
    ],
  },
  'route-explainer': {
    title: 'Route explainer',
    blocks: [
      {
        type: 'p',
        text: 'Three routes to an adult ADHD assessment in the UK — same destination, different waits and costs:',
      },
      {
        type: 'list',
        items: [
          'NHS standard: free, GP referral to your local service. Longest waits — often years.',
          'Right to Choose (England): free, NHS-funded, but you pick the provider — often a wait of weeks to months instead. Availability varies by area; check the current position.',
          'Private: fastest, but you pay for assessment and possibly for ongoing prescribing if shared care is refused.',
        ],
      },
      {
        type: 'p',
        text: 'All three start at the same place: a GP appointment where you ask for a referral. Prepare once, and the preparation works for whichever route you take.',
      },
    ],
  },
  'what-to-do-first': {
    title: 'What to do first',
    blocks: [
      {
        type: 'p',
        text: 'If you only do one thing this week, do this: book a GP appointment. You can prepare while you wait for the date — the booking is the step that makes it real.',
      },
      { type: 'h', text: 'Then, in order' },
      {
        type: 'list',
        items: [
          'Write your top 3 struggles with one example each.',
          'Add one childhood line and one impact line.',
          'Practise your opening sentence once, out loud.',
          'Put the notes with your keys, or set them as your phone lock-screen note.',
        ],
      },
      {
        type: 'p',
        text: 'That\'s the whole job. Everything else on this site is optional depth — this list is the critical path.',
      },
    ],
  },
};

/** Look up a guide by slug; returns undefined for unknown slugs. */
export function getGuide(slug: string): Guide | undefined {
  return GUIDES[slug];
}
