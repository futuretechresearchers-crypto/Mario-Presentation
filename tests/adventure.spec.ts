import {test,expect} from '@playwright/test';
import {readFile} from 'node:fs/promises';
const checkpointAnswers=[[1,2,0,3],[2,0,1,3],[1,2,0,3],[2,0,1,3]];
const choices=[1,3,0,2,1,3,0,2,3,1];
const recalls=['Continuous Integration','git add .','GitLab','Operations','Monitoring'];
async function finishTransitions(page:import('@playwright/test').Page){while(await page.getByRole('button',{name:'Skip transition',exact:true}).isVisible())await page.getByRole('button',{name:'Skip transition',exact:true}).click();}

test('four topics, all attacks, walking, hidden-answer assessment and rescue',async({page})=>{
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 await page.addInitScript(()=>{
  const observed=window as typeof window&{audioEvents:Record<string,number>;audioPlayers:Record<string,HTMLMediaElement>};observed.audioEvents=JSON.parse(sessionStorage.getItem('audio-events')||'{}');observed.audioPlayers={};
  const original=HTMLMediaElement.prototype.play;HTMLMediaElement.prototype.play=function(){const file=this.src.split('/').at(-1)!;observed.audioEvents[file]=(observed.audioEvents[file]||0)+1;observed.audioPlayers[file]=this;sessionStorage.setItem('audio-events',JSON.stringify(observed.audioEvents));return original.call(this);};
 });
 await page.goto('http://127.0.0.1:5173');await page.getByRole('button',{name:'Play Presentation',exact:true}).click();
 await expect(page.getByRole('button',{name:'Locked',exact:true})).toHaveCount(4);
 const backgrounds:string[]=[];
 for(let w=0;w<4;w++){
  await page.getByRole('button',{name:'Enter chapter',exact:true}).click();await finishTransitions(page);
  if(w===0){await expect(page.getByRole('heading',{name:'What is Software Tools and Process Automation?',exact:true})).toBeVisible();await page.keyboard.press('ArrowRight');await expect(page.getByRole('heading',{name:'Why does it matter?',exact:true})).toBeVisible();await page.keyboard.press('ArrowLeft');}
  const count=[4,10,12,14][w];for(let i=0;i<count-1;i++)await page.getByRole('button',{name:'Next slide',exact:true}).click();
  await page.getByRole('button',{name:'Start quiz checkpoint',exact:true}).click();
  backgrounds.push(await page.locator('.cinematic-arena').evaluate(el=>getComputedStyle(el).background));
  await expect(page.locator('.checkpoint-scenery')).toHaveAttribute('aria-label',['Floating Grasslands','Crystal Ice Cave','Lava Chain Fortress','Volcanic Cavern'][w]);
  await page.screenshot({path:'tests/checkpoint-environment-'+(w+1)+'.png',fullPage:true});
  await expect(page.getByText(`BOWSER · ${400-w*100} / 400 HP`,{exact:true})).toBeVisible();
  const attacks=['Throw turtle shell','Throw fireball','Call Luigi \u00b7 shotgun','Throw turtle shell'];
  for(let i=0;i<4;i++){
   if(w===0&&i===1){
    for(let life=2;life>=0;life--){
     await page.keyboard.press('1');
     await expect(page.locator('.bowser-projectile')).toBeVisible();
     await expect(page.getByRole('img',{name:life+' of 3 lives remaining',exact:true})).toBeVisible();
     await expect(page.getByLabel('25 experience points',{exact:true})).toBeVisible();
     await expect(page.getByText('BOWSER \u00b7 375 / 400 HP',{exact:true})).toBeVisible();
     if(life>0)await page.getByRole('button',{name:'Retry question',exact:true}).click();
    }
    await expect(page.getByRole('heading',{name:'Try again, Mario!',exact:true})).toBeVisible();
    expect(await page.evaluate(()=>(window as typeof window&{audioEvents:Record<string,number>}).audioEvents['fall.mp3']||0)).toBe(0);
    await page.getByRole('button',{name:'Enable sound',exact:true}).click();
    await expect.poll(()=>page.evaluate(()=>(window as typeof window&{audioEvents:Record<string,number>}).audioEvents['fall.mp3']||0)).toBe(1);
    for(const file of ['fall.mp3','death.mp3'])await page.evaluate(file=>(window as typeof window&{audioPlayers:Record<string,HTMLMediaElement>}).audioPlayers[file].dispatchEvent(new Event('ended')),file);
    await expect.poll(()=>page.evaluate(()=>(window as typeof window&{audioEvents:Record<string,number>}).audioEvents['game-over.mp3']||0)).toBe(1);
    await page.getByRole('button',{name:'Replay defeat sounds',exact:true}).click();
    await expect.poll(()=>page.evaluate(()=>(window as typeof window&{audioEvents:Record<string,number>}).audioEvents['fall.mp3']||0)).toBe(2);
    await page.screenshot({path:'tests/checkpoint-defeat.png',fullPage:true});
    await page.getByRole('button',{name:'Retry checkpoint',exact:true}).click();
    await expect(page.getByRole('img',{name:'3 of 3 lives remaining',exact:true})).toBeVisible();

   }
   await page.getByRole('button',{name:attacks[i],exact:true}).click();
   await page.keyboard.press(String(checkpointAnswers[w][i]+1));
   await expect(page.getByText('BOWSER \u00b7 '+(400-w*100-(i+1)*25)+' / 400 HP',{exact:true})).toBeVisible();
   await expect(page.getByLabel((w*100+(i+1)*25)+' experience points',{exact:true})).toBeVisible();
   if(i===2&&w===0){await expect(page.getByRole('img',{name:'Luigi-inspired helper'})).toBeVisible();await expect(page.getByRole('img',{name:"Luigi's cartoon shotgun"})).toBeVisible();}
   if(i<3)await page.getByRole('button',{name:'Next checkpoint question',exact:true}).click();
  }
  await page.getByRole('button',{name:'Complete phase',exact:true}).click();
  if(w===3){
   await expect(page.getByRole('heading',{name:'A bridge to a happy ending.',exact:true})).toBeVisible();
   await expect(page.locator('.cutscene-step-2')).toBeVisible({timeout:12000});
   await expect(page.getByRole('status').filter({hasText:'thank-you kiss'})).toBeVisible();
   await expect.poll(async()=>{const hero=await page.locator('.rescue-hero').boundingBox();const princess=await page.locator('.rescue-princess').boundingBox();return Math.abs(princess!.x-hero!.x);}).toBeLessThan(38);
   await page.screenshot({path:'tests/rescue-kiss.png',fullPage:true});
   await expect(page.locator('.yipee-bubble')).toBeVisible({timeout:6000});
   await page.getByRole('button',{name:'Continue to world map',exact:true}).click();
  }
  await page.getByRole('button',{name:'Continue to world map',exact:true}).click();
  await page.getByRole('button',{name:'Skip transition',exact:true}).click();
  await expect(page.getByRole('status').filter({hasText:'Walking to'})).toBeVisible();
  if(w===0){await expect(page.locator('.map-traveler .walking')).toBeVisible();await page.screenshot({path:'tests/map-walking.png',fullPage:true});}
  await finishTransitions(page);
  if(w===1){await page.reload();await page.getByRole('button',{name:'Continue Presentation',exact:true}).click();await expect(page.getByRole('button',{name:'Revisit',exact:true})).toHaveCount(2);await page.getByRole('button',{name:'Enable sound',exact:true}).click();}
 }
 expect(new Set(backgrounds).size).toBe(4);
 await expect(page.getByRole('button',{name:'Start final quiz',exact:true})).toBeEnabled();
 await page.getByRole('button',{name:'Start final quiz',exact:true}).click();await finishTransitions(page);
 // Fail without exposing correct answers, then retake without replaying the lessons.
 for(let i=0;i<10;i++){await page.keyboard.press(String((choices[i]+1)%4+1));await expect(page.getByText(/Correct!|Try another answer|The correct answer is/)).toHaveCount(0);await page.getByRole('button',{name:'Next question',exact:true}).click();}
 for(let i=0;i<5;i++){await page.getByRole('textbox',{name:'Your answer',exact:true}).fill('unknown');await page.getByRole('button',{name:i===4?'Submit all 15 answers':'Next question',exact:true}).click();}
 await expect(page.locator('.quiz-score')).toHaveText('0 / 15');await expect(page.getByRole('button',{name:'Rescue the princess',exact:true})).toHaveCount(0);
 await page.getByRole('button',{name:'Retake final quiz',exact:true}).click();
 for(let i=0;i<10;i++){await page.keyboard.press(String(choices[i]+1));await expect(page.locator('.selected-answer')).toHaveCount(1);await page.getByRole('button',{name:'Next question',exact:true}).click();}
 for(let i=0;i<5;i++){await page.getByRole('textbox',{name:'Your answer',exact:true}).fill(recalls[i]);await page.getByRole('button',{name:i===4?'Submit all 15 answers':'Next question',exact:true}).click();}
 await expect(page.locator('.quiz-score')).toHaveText('15 / 15');
 await page.getByRole('button',{name:'Celebrate completion',exact:true}).click();await expect(page.getByRole('heading',{name:'Congratulations, adventurer!'})).toBeVisible();
 await page.getByRole('button',{name:'Start review',exact:true}).click();for(let i=0;i<9;i++){await expect(page.getByRole('img',{name:'Princess Peach-inspired character'})).toBeVisible();await page.getByRole('button',{name:'Next slide',exact:true}).click();}
 await page.waitForTimeout(250);await page.screenshot({path:'tests/review-desktop.png',fullPage:true});
 await page.reload();await page.getByRole('button',{name:'Continue Presentation',exact:true}).click();await expect(page.getByRole('button',{name:'Start review',exact:true})).toBeVisible();const cues=await page.evaluate(()=>(window as typeof window&{audioEvents:Record<string,number>}).audioEvents);
 expect(cues['main-theme.mp3']).toBeGreaterThan(0);expect(cues['underground.mp3']).toBeGreaterThan(0);expect(cues['attack.mp3']).toBeGreaterThan(2);expect(cues['win.mp3']).toBe(1);expect(cues['yipee.mp3']).toBeGreaterThanOrEqual(4);expect(errors).toEqual([]);
});

test('mobile map scrolls, rehearsal stays isolated and reset asks for confirmation',async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.goto('http://127.0.0.1:5173');await page.getByRole('button',{name:'Play Presentation',exact:true}).click();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 expect(await page.locator('.route-scroll').evaluate(el=>el.scrollWidth>el.clientWidth)).toBe(true);
 await page.getByRole('button',{name:'Presenter menu'}).click();await page.getByLabel('Enable rehearsal previews').check();await page.getByRole('button',{name:'Return to map',exact:true}).click();
 await page.getByRole('button',{name:'Rehearse Final Quiz',exact:true}).click();await finishTransitions(page);await expect(page.getByText('FINAL QUIZ · REHEARSAL',{exact:true})).toBeVisible();
 await page.reload();await page.getByRole('button',{name:'Play Presentation',exact:true}).click();await expect(page.getByRole('button',{name:'Locked',exact:true})).toHaveCount(4);
 await page.screenshot({path:'tests/map-mobile.png',fullPage:true});
 await page.getByRole('button',{name:'Presenter menu'}).click();await page.getByRole('button',{name:'Start new adventure',exact:true}).click();await expect(page.getByRole('button',{name:'Confirm reset',exact:true})).toBeVisible();await page.keyboard.press('Escape');await expect(page.getByRole('dialog')).toHaveCount(0);
});

test('world map exports the complete PDF with no answer key',async({page})=>{
 await page.goto('http://127.0.0.1:5173');await page.getByRole('button',{name:'Play Presentation',exact:true}).click();
 const downloadEvent=page.waitForEvent('download');await page.getByRole('button',{name:'Download presentation PDF',exact:true}).click();const download=await downloadEvent;
 expect(download.suggestedFilename()).toBe('software-automation-complete-presentation.pdf');
 await download.saveAs('tests/software-automation-complete-presentation.pdf');const pdf=await readFile('tests/software-automation-complete-presentation.pdf');
 expect(pdf.subarray(0,5).toString()).toBe('%PDF-');expect(pdf.length).toBeGreaterThan(80000);
 const text=pdf.toString('latin1');expect(text.includes('What is Software Tools and Process Automation?')).toBe(true);expect(text.includes('FINAL QUIZ / 15 OF 15')).toBe(true);expect(text.includes('References')).toBe(true);expect(text.includes('CHECKPOINT 4 OF 4')).toBe(true);expect(text.includes('Correct answer:')).toBe(false);
 await expect(page.getByRole('status').filter({hasText:'Downloaded'})).toBeVisible();
});


test('local fall cue decodes without external services',async({page})=>{
 await page.goto('http://127.0.0.1:5173');
 const duration=await page.evaluate(async()=>{const bytes=await (await fetch('audio/fall.mp3')).arrayBuffer();const context=new AudioContext();try{return (await context.decodeAudioData(bytes)).duration;}finally{await context.close();}});
 expect(duration).toBeGreaterThan(1);
});
