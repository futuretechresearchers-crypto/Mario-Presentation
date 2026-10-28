import {useEffect,useRef,useState} from 'react';
import {ArrowRight,Pause,Play,SkipForward} from 'lucide-react';
import {Character} from './Visuals';

const captions=['The castle bridge opens. Mario runs to the princess.','Safe at last! Mario reaches Princess Peach.','Peach gives Mario a thank-you kiss.','Mario: “Yipeee!”'];
export function RescueCutscene({animations,preview,onCheer,onComplete}:{animations:boolean;preview:boolean;onCheer:()=>void;onComplete:()=>void}){
 const [step,setStep]=useState(animations?0:3);
 const [paused,setPaused]=useState(false);
 const cheered=useRef(false);
 useEffect(()=>{if(!animations){setStep(3);return;}if(paused||step===3)return;const timer=setTimeout(()=>setStep(n=>Math.min(3,n+1)),[3200,2800,3000][step]);return()=>clearTimeout(timer);},[animations,paused,step]);
 useEffect(()=>{if(step===3&&!cheered.current){cheered.current=true;onCheer();}},[step,onCheer]);
 return <section className={`rescue-cutscene cutscene-step-${step} ${paused?'cutscene-paused':''}`}>
  <div className="eyebrow">DEVOPS CHECKPOINT CLEARED · {preview?'REHEARSAL':'THE RESCUE'}</div>
  <h2>A bridge to a happy ending.</h2>
  <div className="rescue-theater" role="img" aria-label={`Princess rescue cutscene: ${captions[step]}`}>
   <div className="rescue-sky"><span>✦</span><span>✧</span><span>✦</span></div>
   <div className="rescue-castle"><i/><i/><i/><div/></div>
   <div className="rescue-bridge"/>
   <div className="rescue-chamber"/>
   <div className={`rescue-hero ${step===3?'happy':''}`}><Character action={step===0?'walking':step===3?'dance':'idle'}/></div>
   <div className="rescue-princess"><Character kind="peach" action={step===3?'dance':'idle'}/></div>
   {step>=2&&<div className="kiss-hearts" aria-hidden="true"><span>♥</span><span>♥</span><span>♥</span></div>}
   {step===3&&<div className="yipee-bubble">Yipeee!</div>}
  </div>
  <p className="cutscene-caption" role="status">{captions[step]}</p>
  <div className="cutscene-controls">
   {step<3&&<><button onClick={()=>setPaused(!paused)}>{paused?<Play size={17}/>:<Pause size={17}/>} {paused?'Resume':'Pause'} cutscene</button><button onClick={()=>setStep(3)}><SkipForward size={17}/> Skip cutscene</button></>}
   {step===3&&<><button className="primary" onClick={onComplete}>Continue to world map <ArrowRight size={18}/></button><button onClick={()=>{cheered.current=false;setPaused(false);if(animations)setStep(0);else onCheer();}}>Replay rescue</button></>}
  </div>
  <p className="small">{preview?'Rehearsal does not award rescue progress.':'The princess is safe! The final 15-item knowledge quiz is your next map stop.'}</p>
 </section>;
}
