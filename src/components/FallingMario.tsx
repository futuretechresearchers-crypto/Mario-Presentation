/** Original falling pose inspired by the supplied raised-arms / boots-forward reference. */
export function FallingMario(){
 return <div className="falling-mario-illustration">
  <svg className="falling-mario-figure" viewBox="0 0 240 210" role="img" aria-label="Mario falling with raised arms and boots forward">
   <defs><linearGradient id="fall-overalls" x2="1" y2="1"><stop stopColor="#4383df"/><stop offset="1" stopColor="#18499d"/></linearGradient><linearGradient id="fall-boots" x2="1" y2="1"><stop stopColor="#a36a3d"/><stop offset="1" stopColor="#53351e"/></linearGradient></defs>
   <g className="fall-speed-lines" stroke="#c2b67e" strokeWidth="4" strokeLinecap="round" opacity=".65"><path d="M51 17v25M24 60v21M197 12v24M216 55v31M40 109v20"/></g>
   <ellipse cx="126" cy="186" rx="66" ry="10" fill="#aaa777" opacity=".2"/>
   <g className="falling-mario-pose" stroke="#243d40" strokeWidth="3" strokeLinejoin="round">
    <path d="M92 104Q69 91 59 63L46 69Q48 112 83 133Z" fill="#e94b3b"/>
    <path d="M151 102Q167 83 171 53L187 56Q190 96 161 126Z" fill="#e94b3b"/>
    <path d="M48 75Q35 73 32 62L22 43Q20 37 25 36L36 50 28 28Q27 22 33 23L44 43 40 20Q40 14 46 18L54 41 56 25Q59 18 63 24L64 51Q69 44 74 49L70 63Q64 76 48 75Z" fill="#fff9e9"/>
    <path d="M171 62Q162 53 166 44L170 22Q171 16 176 20L177 36 183 13Q187 7 190 13L187 37 198 18Q202 14 204 20L196 43 208 33Q215 30 213 36L202 58Q190 70 171 62Z" fill="#fff9e9"/>
    <path d="M82 106Q119 91 158 108L170 146Q156 176 123 177Q86 175 74 144Z" fill="#e9503c"/>
    <path d="M93 105L108 122H142L150 105 160 108 158 137Q180 152 161 173Q128 195 88 171Q69 151 91 135Z" fill="url(#fall-overalls)"/>
    <circle cx="106" cy="128" r="5" fill="#ffd35b"/><circle cx="145" cy="126" r="5" fill="#ffd35b"/>
    <path d="M93 151L65 155 57 173 88 184 112 168Z" fill="#2f6ccc"/>
    <path d="M143 148L173 132 192 143 168 174 143 170Z" fill="#2864bf"/>
    <path d="M58 155Q44 153 38 163L28 182Q24 194 39 198L81 199Q92 194 87 181L72 163Z" fill="url(#fall-boots)"/>
    <path d="M31 186Q55 177 86 187L85 197Q57 208 31 197Z" fill="#633f24"/>
    <path d="M171 135Q168 121 179 111L195 99Q209 94 216 107L225 143Q222 156 208 157L189 151Z" fill="url(#fall-boots)"/>
    <path d="M203 101Q216 103 224 141L216 151Q204 140 198 111Z" fill="#be8651"/>
    <ellipse cx="117" cy="78" rx="37" ry="35" fill="#ffd19a"/>
    <path d="M82 69L84 90 94 95 96 76Z" fill="#694230"/>
    <ellipse cx="85" cy="83" rx="8" ry="11" fill="#f5b67e"/>
    <ellipse cx="113" cy="73" rx="5" ry="9" fill="#fffdf1"/><ellipse cx="132" cy="72" rx="5" ry="9" fill="#fffdf1"/>
    <ellipse cx="115" cy="75" rx="2" ry="5" fill="#285e9c" stroke="none"/><ellipse cx="134" cy="74" rx="2" ry="5" fill="#285e9c" stroke="none"/>
    <path d="M106 60L118 59M126 58L138 59" fill="none" strokeWidth="4"/>
    <ellipse cx="131" cy="85" rx="13" ry="10" fill="#ffd19a"/>
    <path d="M103 88Q112 85 120 90Q126 87 136 91Q130 103 119 99Q109 104 100 95Z" fill="#503526" strokeWidth="2"/>
    <path d="M111 101Q120 106 131 100Q129 116 119 115Q110 114 111 101Z" fill="#9a372f" strokeWidth="2"/>
    <path d="M114 103Q122 107 128 103L126 108H116Z" fill="#fff9e9" stroke="none"/>
    <path d="M79 62Q75 29 106 24Q139 19 151 52L139 64Z" fill="#ee4937"/>
    <ellipse cx="115" cy="43" rx="13" ry="12" fill="#fff8e7" strokeWidth="2"/><path d="M107 48V38L114 44 121 37 123 47" fill="none" stroke="#d94133" strokeWidth="3"/>
    <path d="M83 60Q118 45 152 56L158 64Q137 73 116 66L86 70Z" fill="#e84a36"/>
   </g>
  </svg>
 </div>;
}
