# Verification report

Updated October 29, 2026. Windows / Node.js 24.15.0 / Chromium.

## Checks

- `npm run build`: TypeScript and production Vite build passed.
- `npm test`: **49 tests passed**. Coverage includes four checkpoint phases, 400 HP, three lives and impact timing, EXP deduplication, assessment grading, persistence/migration, rehearsal isolation, DevOps rescue gates, and sound sequencing.
- `npm run test:e2e`: **10 Chromium tests passed**. The full journey covered all **40 lesson slides**, 16 checkpoint questions, all three attacks, three-life defeat/retry, EXP, pipe exits and walking, the rescue-and-kiss cutscene before the final quiz, a **0/15 failed attempt**, a **15/15 retake**, and all **10 dancing review slides**. No page errors were observed.
- Audio checks verified that all **10 supplied MP3 files** decode locally. Browser event instrumentation verified the Main Theme, Underground encounter music, shared attack effect, MISS, Fall -> Death -> Game Over sequence, entrance/pipe cues, first-three-round Yipee cues, DevOps win cue, and rescue Yipee cue. Muting pauses every active player. Retrying cancels pending defeat clips. Unit tests cover stale playback rejection and error recovery.
- A dedicated retry check confirms Fall is requested immediately while the Try Again panel and raised-arms / boots-forward falling figure are already visible, before Death starts. The generated Why WAV and its unused speech hook were removed from source and production output.
- Pipe checks verified the `pipeCrouch` keyframes have no upward jump, the traveler has a clipping boundary, and the pipe layer is above Mario during entry.
- The four original SVG environments have distinct accessible labels: Floating Grasslands, Crystal Ice Cave, Lava Chain Fortress, and Volcanic Cavern. They follow the supplied visual references without embedding the screenshot images.
- A focused visual test confirms the kiss reaches close contact and holds before the cheer. Rescue state survives refresh independently of the final assessment. An unfinished rescue can be resumed from the map. Rehearsal never awards rescue progress. Reduced motion shows a static celebration with explicit Continue.
- Mobile/reduced-motion checks passed at **390 x 844**: viewport fit, scrolling map, answer input, single life loss and EXP award despite repeated input, refresh, rehearsal, and reset confirmation.
- Updated PDF export passed its focused browser download check and unit checks: **37 pages**, consisting of **34 informative topic slides plus 3 reference pages**. Every topic slide has a simple explanation on the same page. Quizzes, objective-only slides, checkpoint summaries, duplicate review content, and separate speaker-note pages are excluded. Text bounds are checked for wrapped content. Artifact: `tests/software-automation-informative-slides.pdf`. The historical complete-presentation artifact was refreshed with the same corrected content.

- Environment screenshots, checkpoint defeat/mobile screenshots, and the rescue kiss screenshot were visually inspected. Screenshots are in `tests/`.

## Repeat browser checks

```sh
npx playwright install chromium
npm run test:e2e
```

The configuration uses compatible cached Chromium on this workstation when available, otherwise Playwright's default. Set `PLAYWRIGHT_CHROMIUM_EXECUTABLE` to override. Tests use isolated browser profiles and start or reuse a local Vite server on port 5173.

## Manual checks still needed

Audible mix and speaker volume on classroom equipment, projector readability, fullscreen permissions, and assistive-technology announcements need manual checks. Browser tests validate decoding and playback requests; they do not replace listening on the actual speakers. A disconnected-network session was not separately exercised; media and app assets are bundled locally. Sound starts off and must be enabled with the speaker button. The app remains local and has not been deployed.

