import {test,expect} from '@playwright/test';
test('mobile reduced-motion checkpoint records one hit and preserves EXP',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});await page.setViewportSize({width:390,height:844});
 await page.goto('http://127.0.0.1:5173');await page.getByRole('button',{name:'Play Presentation',exact:true}).click();
 await page.getByRole('button',{name:'Enter chapter',exact:true}).click();
 for(let i=0;i<3;i++)await page.getByRole('button',{name:'Next slide',exact:true}).click();
 await page.getByRole('button',{name:'Start quiz checkpoint',exact:true}).click();
 await expect(page.getByRole('img',{name:'3 of 3 lives remaining',exact:true})).toBeVisible();
 await page.getByRole('button',{name:'Throw fireball',exact:true}).click();await expect(page.getByLabel('0 experience points',{exact:true})).toBeVisible();
 await page.keyboard.press('1');await page.keyboard.press('1');
 await expect(page.getByRole('img',{name:'2 of 3 lives remaining',exact:true})).toBeVisible();await expect(page.getByText('BOWSER · 400 / 400 HP',{exact:true})).toBeVisible();
 await page.getByRole('button',{name:'Retry question',exact:true}).click();await page.keyboard.press('2');await page.keyboard.press('2');
 await expect(page.getByLabel('25 experience points',{exact:true})).toBeVisible();await expect(page.getByText('BOWSER · 375 / 400 HP',{exact:true})).toBeVisible();
 await page.getByRole('button',{name:'Next checkpoint question',exact:true}).click();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 await page.screenshot({path:'tests/checkpoint-mobile.png',fullPage:true});
 await page.reload();await expect(page.getByLabel('25 experience points',{exact:true})).toBeVisible();
});
