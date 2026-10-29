import {describe,it,expect} from 'vitest';
import {informativeSlides} from './pdfContent';
import {createPresentationPdf} from '../components/exportPresentation';
describe('informative PDF handout',()=>{
 it('keeps informative content from all four topics with a simple explanation',()=>{expect(informativeSlides).toHaveLength(34);expect(informativeSlides.filter(s=>s.chapter==='Introduction')).toHaveLength(4);expect(informativeSlides.filter(s=>s.chapter==='Version Control')).toHaveLength(8);expect(informativeSlides.filter(s=>s.chapter==='CI / CD')).toHaveLength(10);expect(informativeSlides.filter(s=>s.chapter==='DevOps')).toHaveLength(12);for(const slide of informativeSlides){expect(slide.explanation.length).toBeGreaterThan(80);expect(slide.points.length).toBeGreaterThan(0);expect(slide.title).not.toMatch(/Checkpoint|adventure|objectives/i);}});
 it('exports 37 pages with same-page explanations and no quiz or speaker-note sections',async()=>{const pdf=await createPresentationPdf();expect(pdf.getNumberOfPages()).toBe(37);const output=pdf.output();expect((output.match(/SIMPLE EXPLANATION/g)||[]).length).toBe(34);for(const excluded of ['FINAL QUIZ','CHECKPOINT','SPEAKER NOTES','CELEBRATION REVIEW','Complete classroom presentation'])expect(output.includes(excluded)).toBe(false);expect(output.includes('DORA delivery performance metrics')).toBe(true);expect(output.includes('git switch -c feature-login')).toBe(true);expect(output.includes('References')).toBe(true);
  // Validate every text block's final baseline, including wrapped code and explanations.
  for(const match of output.matchAll(/BT\n([\s\S]*?)\nET/g)){
   const block=match[1],position=block.match(/[-\d.]+ ([-\d.]+) Td/),leading=block.match(/([-\d.]+) TL/);if(!position||!leading)continue;
   const top=540-Number(position[1]),last=top+(block.match(/T\*/g)||[]).length*Number(leading[1]);
   if(top>510)continue; // page-number/footer baseline
   expect(last).toBeLessThanOrEqual(top>=442?501:415);
  }});
});
