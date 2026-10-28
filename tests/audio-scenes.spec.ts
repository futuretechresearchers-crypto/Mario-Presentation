import {test,expect} from '@playwright/test';
test('supplied music and all animation cues decode locally',async({page})=>{
 await page.goto('http://127.0.0.1:5173');
 const clips=['attack','win','game-over','death','miss','pipe','underground','yipee','main-theme','fall'];
 const decoded=await page.evaluate(async names=>{const context=new AudioContext();try{const result:Record<string,number>={};for(const name of names){const response=await fetch('audio/'+name+'.mp3');if(!response.ok)throw Error('Missing sound '+name);result[name]=(await context.decodeAudioData(await response.arrayBuffer())).duration;}return result;}finally{await context.close();}},clips);
 expect(Object.keys(decoded)).toHaveLength(10);for(const seconds of Object.values(decoded))expect(seconds).toBeGreaterThan(.1);
});
test('entering the presentation and a pipe plays cues; crouching Mario stays behind the rim',async({page})=>{
 await page.addInitScript(()=>{const tracked=window as typeof window&{sounds:string[];playing:HTMLMediaElement[]};tracked.sounds=[];tracked.playing=[];const original=HTMLMediaElement.prototype.play;HTMLMediaElement.prototype.play=function(){tracked.sounds.push(this.src.split('/').at(-1)!);tracked.playing.push(this);return original.call(this);};});
 await page.goto('http://127.0.0.1:5173');await page.getByRole('button',{name:'Enable sound',exact:true}).click();
 await page.getByRole('button',{name:'Play Presentation',exact:true}).click();
 await expect.poll(()=>page.evaluate(()=>(window as typeof window&{sounds:string[]}).sounds.filter(s=>s==='pipe.mp3').length)).toBe(1);
 await page.getByRole('button',{name:'Enter chapter',exact:true}).click();
 const enter=page.locator('.map-traveler.is-entering');await expect(enter).toBeVisible();
 const state=await enter.evaluate(el=>{const sprite=el.querySelector('svg')!;return {clip:getComputedStyle(el).clipPath,depth:Number(getComputedStyle(el).zIndex),pipes:Number(getComputedStyle(document.querySelector('.route-pipes')!).zIndex),animation:getComputedStyle(sprite).animationName,frames:sprite.getAnimations().flatMap(a=>(a.effect as KeyframeEffect).getKeyframes()).map(f=>f.transform)};});
 expect(state.clip).not.toBe('none');expect(state.depth).toBeLessThan(state.pipes);expect(state.animation).toBe('pipeCrouch');expect(state.frames.every(frame=>!String(frame).includes('translateY(-'))).toBe(true);
 await expect.poll(()=>page.evaluate(()=>(window as typeof window&{sounds:string[]}).sounds.filter(s=>s==='pipe.mp3').length)).toBe(2);
 await page.getByRole('button',{name:'Mute sound',exact:true}).click();
 expect(await page.evaluate(()=>(window as typeof window&{playing:HTMLMediaElement[]}).playing.every(a=>a.paused))).toBe(true);
});
test('rescue can be resumed after refresh and rehearsal cannot award it',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.addInitScript(()=>localStorage.setItem('automation-adventure-v1',JSON.stringify({version:2,completedWorlds:[0,1,2,3],quizPassed:false,princessRescued:false})));
 await page.goto('http://127.0.0.1:5173');await page.getByRole('button',{name:'Continue Presentation',exact:true}).click();
 await page.getByRole('button',{name:'Rescue the princess',exact:true}).click();await expect(page.locator('.yipee-bubble')).toBeVisible();
 await page.getByRole('button',{name:'Continue to world map',exact:true}).click();
 const progress=await page.evaluate(()=>JSON.parse(localStorage.getItem('automation-adventure-v1')!));expect(progress.princessRescued).toBe(true);expect(progress.quizPassed).toBe(false);
});

test('the kiss settles visibly before Mario cheers',async({page})=>{
 await page.addInitScript(()=>localStorage.setItem('automation-adventure-v1',JSON.stringify({version:2,completedWorlds:[0,1,2,3],quizPassed:false,princessRescued:false})));
 await page.goto('http://127.0.0.1:5173');await page.getByRole('button',{name:'Continue Presentation',exact:true}).click();await page.getByRole('button',{name:'Rescue the princess',exact:true}).click();
 await expect(page.locator('.cutscene-step-2')).toBeVisible({timeout:12000});
 await expect.poll(async()=>{const hero=await page.locator('.rescue-hero').boundingBox();const princess=await page.locator('.rescue-princess').boundingBox();return Math.abs(princess!.x-hero!.x);}).toBeLessThan(38);
 await expect(page.getByRole('status').filter({hasText:'thank-you kiss'})).toBeVisible();await page.screenshot({path:'tests/rescue-kiss.png',fullPage:true});
 await expect(page.locator('.yipee-bubble')).toBeVisible({timeout:6000});
});
