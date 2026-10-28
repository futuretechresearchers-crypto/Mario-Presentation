import {useCallback,useEffect,useRef,useState} from 'react';
import {defeatSounds,PresentationAudio,type SoundName} from './soundtrack';
import type {Screen} from './adventureState';

export function usePresentationAudio(enabled:boolean,screen:Screen,world:number){
 const [controller]=useState(()=>new PresentationAudio(import.meta.env.BASE_URL));
 const previous=useRef<Screen>(screen);
 useEffect(()=>{controller.setEnabled(enabled);controller.setScene(screen);
  const enteringPresentation=screen==='world_map'&&previous.current==='title';previous.current=screen;
  if(!enabled)return;
  if(screen==='pipe_entering'||enteringPresentation)controller.play('pipe');
  if(screen==='world_clear'&&world<3)controller.play('yipee');
  if(screen==='rescue_cutscene')controller.play('win');
  if(screen==='checkpoint_retry')controller.sequence(defeatSounds);
 },[controller,enabled,screen,world]);
 useEffect(()=>()=>controller.stopAll(),[controller]);
 const unlock=useCallback((value:boolean)=>controller.setEnabled(value),[controller]);
 const play=useCallback((name:SoundName)=>controller.play(name),[controller]);
 const replayDefeat=useCallback(()=>controller.sequence(defeatSounds),[controller]);
 return {play,unlock,replayDefeat};
}
