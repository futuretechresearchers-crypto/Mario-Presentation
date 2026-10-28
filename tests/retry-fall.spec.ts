import {test,expect} from '@playwright/test';
test('Fall starts with the visible Try Again figure, without waiting for Death or generated speech',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.addInitScript(()=>{const observed=window as typeof window&{retryAudio:{file:string;panel:boolean;figure:boolean}[];players:HTMLMediaElement[]};observed.retryAudio=[];observed.players=[];const original=HTMLMediaElement.prototype.play;HTMLMediaElement.prototype.play=function(){observed.retryAudio.push({file:this.src.split('/').at(-1)!,panel:!!document.querySelector('.checkpoint-defeat'),figure:!!document.querySelector('.falling-mario-figure')});observed.players.push(this);return original.call(this);};});
 await page.goto('http://127.0.0.1:5173');await page.getByRole('button',{name:'Enable sound',exact:true}).click();await page.getByRole('button',{name:'Play Presentation',exact:true}).click();await page.getByRole('button',{name:'Enter chapter',exact:true}).click();
 for(let i=0;i<3;i++)await page.getByRole('button',{name:'Next slide',exact:true}).click();await page.getByRole('button',{name:'Start quiz checkpoint',exact:true}).click();
 for(let i=0;i<3;i++){await page.keyboard.press('1');if(i<2)await page.getByRole('button',{name:'Retry question',exact:true}).click();}
 await expect(page.getByRole('heading',{name:'Try again, Mario!',exact:true})).toBeVisible();await expect(page.getByRole('img',{name:'Mario falling with raised arms and boots forward',exact:true})).toBeVisible();
 const events=await page.evaluate(()=>(window as typeof window&{retryAudio:{file:string;panel:boolean;figure:boolean}[]}).retryAudio);
 expect(events.filter(e=>e.file==='fall.mp3')).toEqual([{file:'fall.mp3',panel:true,figure:true}]);expect(events.some(e=>e.file==='death.mp3'||e.file==='mario-why.wav')).toBe(false);
 await page.screenshot({path:'tests/checkpoint-falling-mario.png',fullPage:true});
 await page.getByRole('button',{name:'Mute sound',exact:true}).click();expect(await page.evaluate(()=>(window as typeof window&{players:HTMLMediaElement[]}).players.every(a=>a.paused))).toBe(true);
 await page.getByRole('button',{name:'Retry checkpoint',exact:true}).click();await expect(page.getByRole('img',{name:'3 of 3 lives remaining',exact:true})).toBeVisible();
});
