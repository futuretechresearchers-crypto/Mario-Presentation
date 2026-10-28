const locations=['Floating Grasslands','Crystal Ice Cave','Lava Chain Fortress','Volcanic Cavern'];
export const checkpointLocations=locations;

/** Original vector environments inspired by the four supplied reference compositions. */
export function CheckpointScenery({phase}:{phase:number}){
 const id=`environment-${phase}`;
 return <svg className={`checkpoint-scenery environment-${phase}`} viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" role="img" aria-label={locations[phase]}>
  <defs>
   <linearGradient id={`${id}-sky`} x2="0" y2="1"><stop stopColor={['#55b8ec','#071c35','#202938','#652c13'][phase]}/><stop offset="1" stopColor={['#d3f3d1','#246482','#465363','#f28c22'][phase]}/></linearGradient>
   <linearGradient id={`${id}-lava`} x2="0" y2="1"><stop stopColor="#fff1a0"/><stop offset=".15" stopColor="#ffb12f"/><stop offset=".5" stopColor="#f45421"/><stop offset="1" stopColor="#a9271b"/></linearGradient>
   <pattern id={`${id}-stone`} width="70" height="44" patternUnits="userSpaceOnUse"><rect width="70" height="44" fill="#344450"/><path d="M0 0H70V44H0ZM35 0V22M0 22H70" fill="none" stroke="#192b33" strokeWidth="4"/></pattern>
  </defs>
  <rect width="800" height="400" fill={`url(#${id}-sky)`}/>
  {phase===0&&<>
   {[70,340,660].map((x,i)=><g key={x} transform={`translate(${x} ${[65,95,45][i]})`} fill="#fffdf0"><ellipse rx="35" ry="16"/><circle cx="-15" cy="-10" r="15"/><circle cx="10" cy="-15" r="20"/></g>)}
   <path d="M-60 340Q60 110 180 340Q250 130 370 340Q480 100 600 340Q720 140 850 340" fill="#8ed29d"/>
   <path d="M-20 340Q60 210 140 340M380 340Q480 160 580 340M570 340Q700 170 830 340" fill="#5db987"/>
   <path d="M50 158Q190 235 310 155M310 155Q465 235 570 128M570 128Q690 205 780 142" fill="none" stroke="#8c6a3c" strokeWidth="7" strokeDasharray="5 3"/>
   {[[20,125,150],[260,120,125],[530,95,150],[705,120,125]].map(([x,y,w])=><g key={x}><path d={`M${x} ${y}h${w}v32q-${w/2} 55 -${w} 0Z`} fill="#9b744d" stroke="#6e5740" strokeWidth="3"/><path d={`M${x+3} ${y+25}h${w-6}v15l-${w/2} 15 -${w/2-6} -15Z`} fill="#d8b878"/><rect x={x-3} y={y-5} width={w+6} height="19" rx="8" fill="#68bc57"/><path d={`M${x+5} ${y+2}h${w-10}`} stroke="#c3e879" strokeWidth="7"/></g>)}
   {[100,380,720].map(x=><g key={x} transform={`translate(${x} 310)`}><rect x="-5" y="-17" width="10" height="20" fill="#ffefbf"/><path d="M-22-17Q-20-44 0-44Q20-44 22-17Z" fill="#de6556"/><circle cy="-31" r="6" fill="#fff2ce"/></g>)}
   <path d="M0 340Q180 305 320 340T800 335V400H0Z" fill="#a78054"/><path d="M0 340Q180 305 320 340T800 335" stroke="#6eb85b" strokeWidth="20"/>
  </>}
  {phase===1&&<>
   <path d="M0 0H800V75L760 55 700 120 665 40 610 95 570 25 520 115 465 45 395 125 340 40 280 105 230 40 160 115 90 35 40 110 0 55Z" fill="#344b70"/>
   <path d="M40 340L100 160 165 80 240 170 295 340M270 340L350 110 415 70 470 180 530 340M520 340L590 160 650 90 735 160 790 340" fill="#203956" stroke="#355371" strokeWidth="12"/>
   <path d="M0 318L105 300 165 323 250 305 340 325 470 300 585 325 670 298 800 315V400H0Z" fill="#43839b"/>
   <path d="M0 322L105 305 165 327 250 309 340 329 470 305 585 329 670 303 800 320" stroke="#abdfe9" strokeWidth="10" fill="none"/>
   <rect y="365" width="800" height="35" fill="#65c5dd" opacity=".55"/>
   {[35,125,615,745].map((x,i)=><g key={x} transform={`translate(${x} ${i%2?310:300})`}><path d="M-20 0L-28-38 -8-68 3-26 16-80 35-52 15 0Z" fill="#9e9fe7" stroke="#6b72b2" strokeWidth="3"/><path d="M-8-68L-5 0M16-80L7 0" stroke="#d4ccff" strokeWidth="3"/></g>)}
   <g transform="translate(270 245)"><path d="M0 65V-50" stroke="#dce6c7" strokeWidth="5"/><circle cy="-54" r="7" fill="#ffd15f"/><path d="M3-47H61L47-27 61-8H3" fill="#e56b67"/><path d="M20-37L30-20 42-37" fill="none" stroke="#fff7d2" strokeWidth="5"/></g>
  </>}
  {phase===2&&<>
   <rect width="800" height="400" fill={`url(#${id}-stone)`}/>
   {[80,310,560,740].map(x=><g key={x}><path d={`M${x-38} 280V110a38 38 0 0 1 76 0v170Z`} fill="#12242d" stroke="#5a6871" strokeWidth="8"/><path d={`M${x-25} 120l50 105m0-105l-50 105M${x} 105v130`} stroke="#263842" strokeWidth="4"/></g>)}
   {[185,445,665].map((x,i)=><g key={x}><path d={`M${x} 0V${[200,150,185][i]}`} stroke="#c4cbd2" strokeWidth="5" strokeDasharray="4 8"/><rect x={x-45} y={[200,150,185][i]} width="90" height="13" rx="5" fill="#607fa3" stroke="#9abed8" strokeWidth="3"/>{[-22,0,22].map(dx=><g key={dx} transform={`translate(${x+dx} ${[194,144,179][i]})`}><circle r="9" fill="#a2c6df"/><circle cx="-3" cy="-1" r="2" fill="#203c58"/><circle cx="3" cy="-1" r="2" fill="#203c58"/></g>)}</g>)}
   <rect y="329" width="800" height="71" fill={`url(#${id}-lava)`}/>
   <path className="lava-ripple" d="M0 335Q40 325 80 335T240 335T400 335T560 335T800 335" fill="none" stroke="#ffeda3" strokeWidth="5"/>
   <path d="M0 320H210L235 337H560L580 320H800" stroke="#71818a" strokeWidth="14" fill="none"/>
  </>}
  {phase===3&&<>
   {[0,110,240,360,510,660,760].map((x,i)=><g key={x}><path d={`M${x} -20l75 10 -10 90 22 80 -30 80 25 160h-85l18-140 -20-100Z`} fill={i%2?'#b6591e':'#783816'} stroke="#e38a2d" strokeWidth="4"/><path d={`M${x+34} 0l8 100 -15 75 18 120 -12 105`} fill="none" stroke="#ffc251" strokeWidth="8" opacity=".6"/></g>)}
   <path d="M560 320L620 230 650 210 680 120 730 100 800 110V400H560Z" fill="#442e29" stroke="#a55530" strokeWidth="7"/>
   <path d="M240 300H660" stroke="#6b4941" strokeWidth="13"/><path d="M240 294H660" stroke="#e2b375" strokeWidth="5" strokeDasharray="11 5"/>
   <path d="M0 344Q80 322 160 344T480 344T800 344V400H0Z" fill={`url(#${id}-lava)`}/>
   <path className="lava-ripple" d="M0 344Q80 322 160 344T480 344T800 344" fill="none" stroke="#ffe790" strokeWidth="6"/>
   <rect x="30" y="317" width="220" height="24" rx="12" fill="#88658b" stroke="#c49db0" strokeWidth="4"/>
   <path d="M270 135V10M260 30l20 8m-20 16l20 8m-20 16l20 8m-20 16l20 8" stroke="#639449" strokeWidth="6"/>
  </>}
  {[0,1,2].map(i=><g key={i} transform={`translate(${[340,395,450][i]} ${phase===0?100:phase===1?165:phase===2?105:190})`}><rect x="-20" y="-20" width="40" height="34" rx="2" fill={phase===1?'#5ba8d6':'#dda24f'} stroke={phase===1?'#94d1f4':'#8e6038'} strokeWidth="3"/><text textAnchor="middle" y="5" fill="#fff5ce" fontFamily="monospace" fontWeight="bold" fontSize="27">{i===1?'?':'▦'}</text></g>)}
  {[220,495,585].map((x,i)=><ellipse key={x} className="scenery-coin" cx={x} cy={phase===0?240-i*30:phase===1?95+i*20:phase===2?240-i*25:100+i*24} rx="8" ry="12" fill="#ffcf50" stroke="#d3912b" strokeWidth="3"/>)}
 </svg>;
}
