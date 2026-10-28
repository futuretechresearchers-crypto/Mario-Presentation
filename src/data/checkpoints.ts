export type CheckpointQuestion={id:string;text:string;options:string[];answer:number;source:string};
export const checkpoints:CheckpointQuestion[][]=[
 [
  {id:'intro-tools',text:'What do software tools help people do?',options:['Avoid collaboration','Create, test, manage, and operate software','Guarantee perfect software','Remove all planning'],answer:1,source:'What is Software Tools and Process Automation?'},
  {id:'intro-automation',text:'Which task is a good candidate for process automation?',options:['Every human judgment','All team conversations','A repeatable build-and-test step','Choosing every product goal'],answer:2,source:'What is Software Tools and Process Automation?'},
  {id:'intro-benefit',text:'Why do teams automate builds and tests?',options:['To get earlier, repeatable feedback','To guarantee no bugs exist','To eliminate security work','To avoid reviewing changes'],answer:0,source:'Why does it matter?'},
  {id:'intro-users',text:'Who uses software tools and automation?',options:['Only game designers','Only operations teams','Only professional programmers','Students, developers, test engineers, and operations teams'],answer:3,source:'Who uses these tools and processes?'},
 ],
 [
  {id:'git-purpose',text:'What does version control record?',options:['Only passwords','Only running processes','Changes to files over time','Only production errors'],answer:2,source:'Save the story of your code.'},
  {id:'git-stage',text:'Which command stages changes?',options:['git add','git push','git clone','git pull'],answer:0,source:'Ship a React login feature.'},
  {id:'git-branch',text:'What is a Git branch useful for?',options:['Installing React','Independent development before integration','Replacing every test','Hosting a database'],answer:1,source:'Meet Git, your history engine.'},
  {id:'git-platforms',text:'Which statement about the platforms is accurate?',options:['Git is a GitHub account','GitLab is a programming language','GitHub and GitLab replace Git history','GitHub uses pull requests; GitLab uses merge requests'],answer:3,source:'The engine and the platforms.'},
 ],
 [
  {id:'ci-purpose',text:'What does continuous integration commonly automate?',options:['Every line of code','Builds and tests','All product decisions','Internet billing'],answer:1,source:'Integrate early. Find problems sooner.'},
  {id:'ci-delivery',text:'What distinguishes continuous delivery from continuous deployment?',options:['Delivery forbids testing','Deployment requires no monitoring','Delivery retains a deliberate production approval or release decision','Delivery cannot prepare artifacts'],answer:2,source:'One important gate.'},
  {id:'ci-failure',text:'A required test fails in the illustrated pipeline. What happens?',options:['Downstream release and deployment stop','Production always proceeds','The test is deleted','Monitoring replaces the failed test'],answer:0,source:'Follow a package through the factory.'},
  {id:'ci-confidence',text:'What does a passing CI build tell us?',options:['The application has no bugs','Security risks are eliminated','No review is needed','The configured checks passed'],answer:3,source:'Build it. Test it. Integrate it.'},
 ],
 [
  {id:'devops-culture',text:'DevOps is best described as:',options:['A single automation tool','A programming language','A culture and collection of collaborative practices','A replacement for operations'],answer:2,source:'DevOps starts with shared ownership.'},
  {id:'devops-iac',text:'What is Infrastructure as Code?',options:['Defining infrastructure using machine-readable configuration','Drawing server pictures','Writing only HTML','Manually restarting machines'],answer:0,source:'Describe infrastructure as code.'},
  {id:'devops-monitor',text:'What does monitoring give a team?',options:['A guarantee against bugs','Operational feedback','A replacement for security','Source code compilation'],answer:1,source:'Listen to the running system.'},
  {id:'devops-together',text:'How do Git, CI/CD, and DevOps fit together?',options:['They do exactly the same thing','They are competing languages','They are only useful for games','Git tracks changes, CI/CD validates and delivers, and DevOps connects people and practices'],answer:3,source:'Three ideas. One connected system.'},
 ],
];
