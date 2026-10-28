export const soundFiles={attack:'attack.mp3',win:'win.mp3',gameOver:'game-over.mp3',death:'death.mp3',miss:'miss.mp3',pipe:'pipe.mp3',underground:'underground.mp3',yipee:'yipee.mp3',theme:'main-theme.mp3',fall:'fall.mp3'} as const;
export type SoundName=keyof typeof soundFiles;
// Try Again appears at this scene boundary: play Fall immediately, not after Death.
export const defeatSounds:SoundName[]=['fall','death','gameOver'];

/** Two bounded music layers and one sequential effects channel. No accumulating audio instances. */
export class PresentationAudio{
 private enabled=false;
 private scene='title';
 private token=0;
 private effectsActive=false;
 private clips:Record<SoundName,HTMLAudioElement>;
 constructor(base:string,create:(url:string)=>HTMLAudioElement=url=>new Audio(url)){
  this.clips=Object.fromEntries(Object.entries(soundFiles).map(([key,file])=>{const clip=create(`${base}audio/${file}`);clip.preload=key==='theme'?'metadata':'auto';clip.volume=.65;return [key,clip];})) as Record<SoundName,HTMLAudioElement>;
  this.clips.theme.loop=true;this.clips.underground.loop=true;
 }
 setEnabled(value:boolean){if(this.enabled===value)return;this.enabled=value;if(!value)this.stopAll();else this.syncMusic();}
 setScene(scene:string){if(this.scene!==scene){this.stopEffects();this.scene=scene;}this.syncMusic();}
 private start(clip:HTMLAudioElement){if(clip.paused)void clip.play().catch(()=>{/* A browser can require a new Sound-button gesture. */});}
 private syncMusic(){
  if(!this.enabled)return;
  const defeated=this.scene==='checkpoint_retry';
  this.clips.theme.volume=defeated?0:this.effectsActive?0.035:this.scene==='battle'?0.05:0.14;
  this.start(this.clips.theme);
  if(this.scene==='battle'){this.clips.underground.volume=this.effectsActive?0.07:0.2;this.start(this.clips.underground);}
  else{this.clips.underground.pause();this.clips.underground.currentTime=0;}
 }
 play(name:SoundName){this.sequence([name]);}
 sequence(names:readonly SoundName[]){
  this.stopEffects();if(!this.enabled)return;
  const runToken=this.token;this.effectsActive=true;this.syncMusic();
  const step=(index:number)=>{
   if(!this.enabled||runToken!==this.token)return;
   if(index===names.length){this.effectsActive=false;this.syncMusic();return;}
   const clip=this.clips[names[index]];clip.currentTime=0;
   let finished=false;
   const next=()=>{if(finished||!this.enabled||runToken!==this.token)return;finished=true;clip.onended=null;clip.onerror=null;step(index+1);};
   clip.onended=next;clip.onerror=next;
   void clip.play().catch(next);
  };
  step(0);
 }
 stopEffects(){
  this.token++;this.effectsActive=false;
  for(const name of Object.keys(this.clips) as SoundName[]){if(name==='theme'||name==='underground')continue;const clip=this.clips[name];clip.onended=null;clip.onerror=null;clip.pause();clip.currentTime=0;}
 }
 stopAll(){this.stopEffects();for(const clip of Object.values(this.clips)){clip.pause();clip.currentTime=0;}}
}
