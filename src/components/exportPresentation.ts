import {chapterSlides,chapters} from '../data/adventure';
import {review,references,type Slide} from '../data/content';
import {finalQuestions} from '../data/assessment';
import {checkpoints} from '../data/checkpoints';

// Text-based PDF keeps lesson text searchable and works without a remote service.
export async function exportPresentation(){
 const {jsPDF}=await import('jspdf');
 const pdf=new jsPDF({orientation:'landscape',unit:'pt',format:[960,540]});
 const clean=(text:string)=>text.replace(/→/g,' -> ').replace(/[—–]/g,' - ').replace(/·/g,' / ').replace(/[“”]/g,'"').replace(/[‘’]/g,"'");
 let page=0;
 const base=(section:string,title:string)=>{
  if(page++)pdf.addPage([960,540],'landscape');
  pdf.setFillColor(248,248,235);pdf.rect(0,0,960,540,'F');
  pdf.setFillColor(39,117,80);pdf.rect(0,0,960,10,'F');
  pdf.setTextColor(23,61,61);pdf.setFont('helvetica','bold');pdf.setFontSize(11);pdf.text(clean(section.toUpperCase()),45,40);
  pdf.setFontSize(27);const heading=pdf.splitTextToSize(clean(title),870);pdf.text(heading,45,85);
  pdf.setFontSize(9);pdf.setFont('helvetica','normal');pdf.text('SOFTWARE TOOLS & PROCESS AUTOMATION',45,520);pdf.text(String(page),915,520,{align:'right'});
  return 105+(heading.length-1)*30;
 };
 const lines=(text:string,y:number,size=17,width=850)=>{pdf.setFontSize(size);const wrapped=pdf.splitTextToSize(clean(text),width);pdf.text(wrapped,55,y);return y+wrapped.length*size*1.2+13;};
 const drawSlide=(section:string,slide:Slide)=>{
  let y=base(section,slide.title);pdf.setFont('helvetica','normal');
  for(const p of slide.points)y=lines('- '+p,y,slide.code?13:17);
  if(slide.code){pdf.setFont('courier','normal');pdf.setFontSize(slide.code.split('\n').length>15?9:13);pdf.text(clean(slide.code),55,y+2);}
  else if(slide.diagram){
   const labels=slide.diagram==='git'?['main: o ---- o -------- o','feature:       \\ -- o -- /']:slide.diagram==='workflow'?['Modify -> Stage -> Commit -> Push']:slide.diagram==='pipeline'?['Source -> Build -> Test -> Release -> Deploy -> Monitor','Required test failure blocks downstream release and deployment.']:slide.diagram==='lifecycle'?['Plan -> Code -> Build -> Test -> Release -> Deploy -> Operate -> Monitor','Monitoring feeds the next plan.']:[];
   pdf.setFont('courier','normal');for(const label of labels)y=lines(label,y+4,13);
  }
  // Notes get their own page if needed, keeping all speaker content readable.
  y=base(section+' / Speaker notes',slide.title);pdf.setFont('helvetica','normal');lines(slide.notes,y,18);
 };
 let y=base('Complete classroom presentation','Software Tools and Process Automation');
 y=lines('Introduction, Version Control, CI/CD, DevOps, Review, Final Quiz, and References.',y,22);
 lines('Quiz: 10 multiple-choice questions (easy to hardest), followed by 5 easy recall questions. No answer key is included.',y+15,18);
 chapterSlides.forEach((deck,i)=>{
  deck.forEach(slide=>drawSlide(chapters[i].name,slide));
  checkpoints[i].forEach((question,j)=>{let y=base(`${chapters[i].name} / Checkpoint ${j+1} of 4`,question.text);pdf.setFont('helvetica','normal');question.options.forEach((option,k)=>{y=lines(`${String.fromCharCode(65+k)}. ${option}`,y,19);});});
 });
 review.forEach(slide=>drawSlide('Celebration Review',slide));
 finalQuestions.forEach((q,i)=>{let y=base(`Final Quiz / ${i+1} of 15 / ${q.difficulty}`,q.text);pdf.setFont('helvetica','normal');if(q.options)q.options.forEach((o,j)=>{y=lines(`${String.fromCharCode(65+j)}. ${o}`,y,19);});else lines('Answer: ___________________________________________________',y+30,18);});
 for(let i=0;i<references.length;i+=4){let y=base('Official documentation','References');for(const [name,url] of references.slice(i,i+4)){pdf.setFont('helvetica','bold');y=lines(name,y,17);pdf.setFont('helvetica','normal');y=lines(url,y,12);}}
 pdf.save('software-automation-complete-presentation.pdf');
 return pdf.getNumberOfPages();
}
