import {chapterSlides,chapters} from './adventure';

// Deliberately curated: omit objectives, game checkpoints and repeated review pages.
const topics:{index:number;title:string;explanation:string}[][]=[
 [
  {index:0,title:'What is Software Tools and Process Automation?',explanation:'Tools support software work, while automation carries out repeatable steps. Together, they help a team turn an idea into a working application using a consistent process.'},
  {index:1,title:'Why automation matters',explanation:'Running the same checks automatically reduces repetitive work and gives feedback sooner. People still decide what to build, review results, and maintain the process.'},
  {index:2,title:'Who uses software tools and automation?',explanation:'Students, developers, testers, operations staff, and security teams all use these practices. Their responsibilities overlap, so effective automation depends on collaboration.'},
  {index:3,title:'Example: a connected student-project workflow',explanation:'A student changes a React component, records the change in Git, and runs automated checks. After release, the team observes the application and uses that feedback to plan improvements.'},
 ],
 [
  {index:1,title:'Version control: definition and importance',explanation:'Version control keeps a history of file changes. Instead of guessing which copied folder is current, a team can compare versions, recover earlier work, and understand changes.'},
  {index:2,title:'Centralized and distributed version control',explanation:'A centralized system keeps its version database on a central server. In a distributed system such as Git, clones include repository history, allowing many operations to work offline.'},
  {index:3,title:'Git repositories, commits, branches, and remotes',explanation:'A repository stores a project and its history. Commits record snapshots, branches separate development, and merging brings histories together. Clone, push, and pull help exchange work with other repositories.'},
  {index:4,title:'Basic Git workflow',explanation:'First edit files, then stage the changes you want to record. Commit saves them in your local history; push shares the commits with a remote repository.'},
  {index:5,title:'GitHub collaboration features',explanation:'GitHub hosts Git repositories and adds tools for teamwork. Pull requests support review, issues track work, and Actions can run automated workflows such as builds and tests.'},
  {index:6,title:'GitLab collaboration and CI/CD',explanation:'GitLab also hosts Git repositories. Teams review changes through merge requests and define automated jobs in a pipeline configuration that runners execute.'},
  {index:7,title:'Git vs GitHub vs GitLab',explanation:'Git is the version control software. GitHub and GitLab are development platforms built around Git, adding hosting, review, and automation features.'},
  {index:8,title:'Example: a React feature branch',explanation:'Create a separate branch for a login feature, edit the project, and run checks. Stage and commit the work, push the branch, then request review. Replace the example repository URL with a real one.'},
 ],
 [
  {index:1,title:'CI/CD overview',explanation:'Continuous integration checks frequently integrated changes. Continuous delivery keeps validated software ready for release, while continuous deployment automatically releases eligible validated changes to production.'},
  {index:2,title:'Continuous integration',explanation:'Integrating small changes frequently helps teams discover integration problems earlier. Automated builds and tests provide feedback, but CI by itself does not mean the application is deployed.'},
  {index:3,title:'Build, test, and integration checks',explanation:'The build prepares the application and tests check selected behaviors. A successful run means the configured checks passed; it cannot prove the software has no bugs.'},
  {index:4,title:'Continuous delivery',explanation:'Continuous delivery keeps a validated version ready for a production release. The team or business still makes the deliberate decision to release it.'},
  {index:5,title:'Continuous deployment',explanation:'Continuous deployment sends eligible changes to production automatically after required checks pass. Monitoring and recovery controls are still necessary.'},
  {index:6,title:'Delivery vs deployment',explanation:'The key difference is the production approval gate. Delivery retains a deliberate release decision; deployment automates production release for eligible validated changes.'},
  {index:7,title:'CI/CD pipeline stages',explanation:'This example moves from source through build, test, release, deployment, and monitoring. A failed required test blocks downstream release and deployment. Some CI workflows finish after validation.'},
  {index:8,title:'CI/CD tools',explanation:'GitHub Actions, GitLab CI/CD, and Jenkins can automate development workflows. The tool runs the configured work, while the team remains responsible for designing and maintaining it.'},
  {index:9,title:'Example: GitHub Actions for React',explanation:'On a push or pull request, this workflow installs locked dependencies, runs tests, and builds the React project. It assumes a package-lock.json and a Vitest test script. It validates code without deploying it.'},
  {index:10,title:'CI/CD benefits, security, and limitations',explanation:'Automation improves repeatability and shortens feedback loops. Teams must still protect secrets, limit permissions, review dependencies, and fix flaky or incomplete checks.'},
 ],
 [
  {index:1,title:'What is DevOps?',explanation:'DevOps combines development and operations through collaboration, shared ownership, and supporting practices. It is a way of working rather than one particular tool.'},
  {index:2,title:'Development and operations collaboration',explanation:'Developers create application behavior, while operations work supports reliable running systems. Sharing goals and feedback reduces problems caused by disconnected handoffs.'},
  {index:3,title:'DevOps culture and shared responsibility',explanation:'A DevOps team shares responsibility for quality, security, and production outcomes. Automation supports that collaboration, and incidents become opportunities to improve the system.'},
  {index:4,title:'The eight-phase DevOps lifecycle',explanation:'Work moves through planning, coding, building, testing, releasing, deploying, operating, and monitoring. Monitoring informs the next plan. These eight phases are a teaching model; security spans the whole cycle.'},
  {index:5,title:'Infrastructure as Code and configuration management',explanation:'Infrastructure as Code describes infrastructure in machine-readable files that can be reviewed and versioned. Configuration management helps maintain intended system settings consistently.'},
  {index:6,title:'Containers and deployment automation',explanation:'Docker packages applications and dependencies into container images. Kubernetes coordinates containerized workloads. These tools can support DevOps, but Kubernetes is not required for every team.'},
  {index:7,title:'Monitoring, logging, security, and feedback',explanation:'Metrics reveal trends, logs record events, and traces connect activity across requests. Teams use this evidence to investigate problems, improve operations, and feed learning back into development.'},
  {index:8,title:'Siloed workflow vs DevOps collaboration',explanation:'Separate teams and large handoffs can delay useful feedback. DevOps practices encourage smaller changes, shared goals, and earlier collaboration, adapted to the team and its constraints.'},
  {index:9,title:'DORA delivery performance metrics',explanation:'Use the five metrics to understand how quickly and safely a service changes and how much deployment rework occurs. Compare the same service over time to guide improvement, rather than scoring individual developers.'},
  {index:10,title:'How Git, CI/CD, and DevOps work together',explanation:'Git records the change, CI/CD automates validation and delivery steps, and DevOps connects people with operational learning. They support different parts of the same software delivery process.'},
  {index:11,title:'Example: Student Task Management System',explanation:'In this illustrative setup, React provides the interface, GitHub stores changes, Actions runs checks, Vercel hosts the release, and Supabase supplies application data. The team must still review access, protect credentials, and monitor behavior.'},
  {index:12,title:'DevOps challenges and good practices',explanation:'Start with one practical improvement, such as fixing unreliable tests or making builds reproducible. Small changes, code review, safe recovery, and useful measurements help a team improve steadily.'},
 ],
];
export const informativeSlides=topics.flatMap((items,chapter)=>items.map(item=>({chapter:chapters[chapter].name,...chapterSlides[chapter][item.index],title:item.title,explanation:item.explanation})));
