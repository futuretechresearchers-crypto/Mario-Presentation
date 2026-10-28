import {describe,it,expect} from 'vitest';
import {fresh,enter,nextTransition,setResponse,submitQuiz} from './game';
import {finalQuestions} from '../data/quizzes';
import {chapterSlides} from '../data/adventure';
describe('navigation and input validation',()=>{
 it('rejects invalid map positions',()=>{for(const i of [-1,5,1.5,Infinity,NaN])expect(enter(fresh(),i,true)).toEqual(fresh());});
 it('rejects invalid response types and out-of-range options',()=>{let s=nextTransition(enter(fresh(),4,true));for(const r of [-1,4,NaN,'correct'])expect(setResponse(s,r)).toEqual(s);s={...s,currentQuizQuestion:10};expect(setResponse(s,0)).toEqual(s);expect(setResponse(s,'a'.repeat(201))).toEqual(s);});
 it('does not accept whitespace-only recall on submission',()=>{let s=nextTransition(enter(fresh(),4,true));for(let i=0;i<15;i++){s={...s,currentQuizQuestion:i};s=setResponse(s,i<10?0:' ');}expect(submitQuiz(s)).toEqual(s);});
 it('maps every assessment question to an existing presentation slide',()=>{const titles=chapterSlides.flat().map(s=>s.title);for(const q of finalQuestions)expect(titles).toContain(q.source.split(' · ')[1]);});
});
