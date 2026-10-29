import {informativeSlides} from '../data/pdfContent';
import {references} from '../data/content';

// One informative topic per page, with a plain-language explanation on that same page.
export async function createPresentationPdf(){
 const {jsPDF}=await import('jspdf');
 const pdf=new jsPDF({orientation:'landscape',unit:'pt',format:[960,540]});
 const clean=(text:string)=>text.replace(/→/g,' -> ').replace(/[—–]/g,' - ').replace(/·/g,' / ').replace(/[“”]/g,'"').replace(/[‘’]/g,"'");
 let page=0;
 const base=(section:string,title:string)=>{
  if(page++)pdf.addPage([960,540],'landscape');
  pdf.setFillColor(248,248,235);pdf.rect(0,0,960,540,'F');pdf.setFillColor(39,117,80);pdf.rect(0,0,960,10,'F');
  pdf.setTextColor(23,61,61);pdf.setFont('helvetica','bold');pdf.setFontSize(11);pdf.text(clean(section.toUpperCase()),42,38);
  pdf.setFontSize(25);const heading=pdf.splitTextToSize(clean(title),876);pdf.text(heading,42,77);
  pdf.setFontSize(9);pdf.setFont('helvetica','normal');pdf.text('SOFTWARE TOOLS & PROCESS AUTOMATION',42,522);pdf.text(String(page),918,522,{align:'right'});
  return 99+(heading.length-1)*29;
 };
 const text=(value:string,x:number,y:number,width:number,size:number,font='helvetica',bold=false)=>{pdf.setFont(font,bold?'bold':'normal');pdf.setFontSize(size);const lines=pdf.splitTextToSize(clean(value),width);pdf.text(lines,x,y,{lineHeightFactor:1.25});return y+lines.length*size*1.25;};
 for(const slide of informativeSlides){
  let y=base(slide.chapter,slide.title);
  if(slide.code){
   const left=slide.code.split('\n').length>12?330:400;let bulletY=y;
   for(const point of slide.points)bulletY=text('- '+point,42,bulletY,left-20,16)+14;
   pdf.setFillColor(233,239,225);pdf.roundedRect(left+47,y-17,866-left,330,5,5,'F');
   const size=slide.code.split('\n').length>12?10:12;
   text(slide.code,left+59,y,840-left,size,'courier');
  }else{
   for(const point of slide.points)y=text('- '+point,48,y,858,17)+15;
   const flow=slide.diagram==='workflow'?'Modify -> Stage -> Commit -> Push':slide.diagram==='pipeline'?'Source -> Build -> Test -> Release -> Deploy -> Monitor':slide.diagram==='lifecycle'&&slide.title==='The eight-phase DevOps lifecycle'?'Plan -> Code -> Build -> Test -> Release -> Deploy -> Operate -> Monitor':null;
   if(flow){pdf.setDrawColor(170,193,158);pdf.line(48,y-4,912,y-4);text(flow,48,y+16,858,13,'courier');}
   if(slide.diagram==='git'){
    const graphY=y+7;pdf.setDrawColor(39,117,80);pdf.setLineWidth(3);pdf.line(80,graphY,820,graphY);pdf.line(250,graphY,330,graphY+40);pdf.line(330,graphY+40,540,graphY+40);pdf.line(540,graphY+40,620,graphY);
    pdf.setFillColor(255,207,75);for(const x of [80,250,620,820])pdf.circle(x,graphY,7,'FD');for(const x of [350,520])pdf.circle(x,graphY+40,7,'FD');
    text('main',80,graphY-16,100,11);text('feature branch',350,graphY+62,180,11);text('merge',620,graphY-16,100,11);
   }
  }
  pdf.setFillColor(233,239,225);pdf.roundedRect(42,423,876,77,5,5,'F');text('SIMPLE EXPLANATION',55,442,850,10,'helvetica',true);text(slide.explanation,55,460,848,13);
 }
 for(let i=0;i<references.length;i+=4){let y=base('Sources','References');for(const [name,url] of references.slice(i,i+4)){y=text(name,48,y,858,17,'helvetica',true)+7;y=text(url,48,y,858,12)+23;}}
 return pdf;
}
export async function exportPresentation(){const pdf=await createPresentationPdf();pdf.save('software-automation-informative-slides.pdf');return pdf.getNumberOfPages();}
