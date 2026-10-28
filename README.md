# Super Mario: Software Automation Adventure

A presenter-controlled React + Vite + TypeScript educational adventure. Characters and scenery are original SVG/CSS pixel artwork. The requested user-supplied MP3 files are bundled locally; character and environment artwork remains original.

## Run locally

Requires Node.js 22 or newer and npm.

```powershell
npm.cmd install
npm.cmd run dev
```

Open the URL printed by Vite. On platforms other than Windows, use `npm` instead of `npm.cmd`.

```powershell
npm.cmd test
npm.cmd run test:e2e
npm.cmd run build
npm.cmd run preview
```

The production output is `dist/`. Serve it with a local HTTP server; do not open it as a file:// URL. After installation, the presentation and PDF generation work locally without external services. External documentation links require internet.

## Presentation path

**Introduction → Version Control → CI/CD → DevOps → Rescue Cutscene → Final Quiz → Dancing Review**

There are 40 lesson slides (4 introductory slides plus the original 36 topic slides) and 10 review slides. The Introduction explains what Software Tools and Process Automation means, why it matters, who uses it, and a student-project example.

Use Previous / Next, left/right arrows, or Space. Slides never advance on a timer. Speaker notes expand separately.

## Map and Bowser phases

Each chapter ends with a **four-question subtopic quiz checkpoint** and one of four Bowser phases. Bowser has **400 total HP**, divided into **100 HP per topic**.

Choose Mario's turtle shell, fireball, or Luigi's cartoon shotgun assist, then answer with the mouse or keys 1-4. Selecting a weapon does not damage Bowser by itself.

- Correct answer: the selected attack plays, Bowser loses 25 HP, and Mario earns **25 EXP** on the first successful answer to that question. Continue explicitly to the next question.
- Incorrect answer: Bowser spits fire, Mario takes damage at impact, and one of **three life bubbles pops**. Retry that question without revealing the answer.
- Zero lives: the caption **Whhhhyyyyyyyy...** appears and the supplied Death, Fall, and Game Over clips play in sequence, followed by the existing synthesized voice cue, when sound is enabled. Replay is available. Retry restores three lives while preserving this checkpoint's correct answers, phase damage, and earned EXP.

A checkpoint clears only after all four questions are answered correctly. Each battle has an original environment inspired by the supplied checkpoint pictures: Floating Grasslands, Crystal Ice Cave, Lava Chain Fortress, and Volcanic Cavern. Bowser retreats after a phase is cleared. For the first three checkpoints, click Complete Phase, then Continue to World Map. The DevOps checkpoint opens a rescue cutscene: the bridge opens, Mario approaches Peach, Peach kisses Mario, and Mario cheers with the Yipee clip. Pause, skip, replay, and explicit Continue controls are provided. Pipe entry now crouches Mario and clips his descending body behind the pipe rim. Mario pops out of the completed pipe and walks to the next unlocked pipe. The next chapter opens only when selected. Transitions can be skipped, and the map scrolls horizontally on narrow screens.

EXP is shown in the header and checkpoint HUD and saves locally. Retries and revisits cannot award the same question twice; rehearsal does not bank EXP. A full new adventure resets EXP along with progress. Correctness and life loss are checkpoint feedback; the final assessment below still hides its answers.

## Final quiz

The final map pipe unlocks after all four chapters. It contains **15 items** drawn from the presentation:

- 10 multiple-choice questions, ordered Easy → Medium → Hard → Hardest.
- 5 easy short-recall questions.

Select with the mouse or keys 1–4; type recall responses. Numbered navigation lets you revisit and edit responses before submitting. All 15 items must be answered. Capitalization, repeated spaces, and common recall variants are normalized.

No correct answer, explanation, correctness color, or item-by-item result is revealed. Only the total score appears after submission. **10/15** is the passing score. A failed attempt can be retaken without replaying lessons or losing phase progress. The princess rescue and dancing review unlock after the fourth checkpoint cutscene; the final assessment remains a separate knowledge check. If refreshed mid-cutscene, the map offers a Rescue the Princess button to resume it. Retakes do not erase an earlier completion.

This is a client-side classroom activity, not a secure examination platform: internal grading data is present in the local source bundle.

## PDF download

Click **Download presentation PDF** on the world map. It generates a searchable landscape PDF of the full presentation, with all 40 lesson slides, speaker-note pages, 10 review slides and notes, 16 checkpoint questions, 15 final quiz items, and references. Diagrams use static text equivalents. **No answer key is included.** Animations and interactive controls remain browser-only. PDF generation is lazy-loaded and needs no external API.

## Presenter and persistence controls

The gear opens slide jumps, notes, references, sound, animation, fullscreen, final-quiz restart, map return, rehearsal, and reset. Rehearsal can preview every map stop without awarding completion, stars, or rescue. Reset requires explicit confirmation.

Sound starts off. Enable it to play the supplied Main Theme continuously at low volume. Underground loops while facing Bowser, with the main track ducked. All three hero attacks use the supplied Fireball effect; entering the presentation and pipes uses the entrance clip; wrong answers use MISS; the first three wins use Yipee; the DevOps win uses Mario Wins; the rescue cheer uses Yipee. Death, Fall, and Game Over form a cancellable defeat sequence. Muting stops every layer, and leaving defeat or retrying cancels queued clips. See `public/audio/README.md` for the full sound map. All cues have visual equivalents. Reduced-motion preferences and focus indicators are supported.

Completion and the EXP reward ledger save to LocalStorage under `automation-adventure-v1`, with a versioned schema. Existing three-world progress migrates into the new chapter structure. Refresh restores a safe title screen; intermediate animations and unsubmitted quiz responses are not persisted. Corrupt/noncontiguous progress is sanitized; storage errors are shown.

## Source structure

- `src/data/adventure.ts`: introduction, chapter metadata, five map stops.
- `src/data/content.ts`: 36 topic slides, 10 review slides, notes, official references.
- `src/data/checkpoints.ts`: four sourced checkpoint questions per chapter.
- `src/hooks/soundtrack.ts` and `usePresentationAudio.ts`: looping music, event cues, mute handling, ducking, and sequential defeat audio.
- `src/components/CheckpointScenery.tsx`: four original reference-inspired vector environments.
- `src/components/RescueCutscene.tsx`: approach, kiss, and Yipee celebration with pause/skip/replay.
- `src/data/assessment.ts`: ordered final assessment and internal grading.
- `src/hooks/adventureState.ts`: phase gates, transitions, assessment, persistence, migration.
- `src/hooks/adventureState.test.ts` and `game.test.ts`: progression and input tests.
- `src/components/Visuals.tsx`: original pixel sprites and interactive diagrams.
- `src/components/exportPresentation.ts`: complete PDF export.
- `src/App.tsx`: presentation, map, combat, quiz, review, and presenter controls.
- `tests/adventure.spec.ts`: browser journey, mobile/rehearsal, and PDF checks.

`game.ts` and `quizzes.ts` retain compatibility exports for the updated modules.

## Sources and verification

Official Git, GitHub, GitLab, AWS, DORA, Docker, Kubernetes, and Jenkins sources are linked in the References view. DORA uses the five-metric delivery model. The React/Vercel/Supabase project is an illustrative example, not a live integration. See `VERIFICATION.md` for checks and equipment-specific limits.
