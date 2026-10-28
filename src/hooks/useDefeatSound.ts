import {useCallback,useEffect,useRef} from 'react';

// Original locally synthesized voice cue, not a game recording or voice clone.
export function useDefeatSound(enabled:boolean,active:boolean){
 const clip=useRef<HTMLAudioElement|null>(null);
 const allowed=useRef(false);allowed.current=enabled&&active;
 useEffect(()=>{const audio=new Audio(`${import.meta.env.BASE_URL}audio/mario-why.wav`);audio.preload='auto';audio.volume=.7;clip.current=audio;return()=>{audio.pause();clip.current=null;};},[]);
 useEffect(()=>{if(!enabled||!active){clip.current?.pause();if('speechSynthesis' in window)window.speechSynthesis.cancel();}},[enabled,active]);
 return useCallback(()=>{
  if(!enabled||!active)return;
  const fallback=()=>{if(!allowed.current||!('speechSynthesis' in window))return;const voice=new SpeechSynthesisUtterance('Why!');voice.rate=.45;voice.pitch=1.6;voice.volume=.7;window.speechSynthesis.speak(voice);};
  const audio=clip.current;if(!audio){fallback();return;}audio.currentTime=0;void audio.play().catch(fallback);
 },[enabled,active]);
}
