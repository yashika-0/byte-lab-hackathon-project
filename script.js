const defaultTasks = [
  {day:1,title:"Build your first useful API",category:"Build",time:"30 min",done:false},
  {day:2,title:"Write your first public progress post",category:"Public",time:"15 min",done:false},
  {day:3,title:"Ship one small feature",category:"Build",time:"45 min",done:false},
  {day:4,title:"Learn one concept deeply",category:"Learn",time:"30 min",done:false},
  {day:5,title:"Ask for feedback from a peer",category:"Connect",time:"15 min",done:false},
  {day:6,title:"Improve yesterday's work",category:"Build",time:"40 min",done:false},
  {day:7,title:"Publish your weekly reflection",category:"Public",time:"20 min",done:false}
];

let tasks = JSON.parse(localStorage.getItem("abtalksTasks")) || defaultTasks;
// Keep a full 60-day challenge available even when an older localStorage version had only 7 tasks.
for(let day=1; day<=60; day++){
  if(!tasks.find(t=>t.day===day)){
    tasks.push({day,title:`Complete your Day ${day} challenge`,category:day%3===0?"Public":day%2===0?"Learn":"Build",time:"30 min",done:false});
  }
}
tasks.sort((a,b)=>a.day-b.day);
saveTasks();

function getProfile(){
  try{return JSON.parse(localStorage.getItem("abtalksProfile")) || {name:"Student",email:"student@example.com",college:"College / University",track:"BUILD"};}
  catch(e){return {name:"Student",email:"student@example.com",college:"College / University",track:"BUILD"};}
}
function saveProfile(profile){localStorage.setItem("abtalksProfile",JSON.stringify(profile));}

function applyAssignmentFromUrl(){
  const params=new URLSearchParams(window.location.search);
  if(!params.get("student")) return;
  const profile=getProfile();
  profile.name=params.get("student") || profile.name;
  profile.email=params.get("email") || profile.email;
  profile.college=params.get("college") || profile.college;
  profile.track=params.get("track") || profile.track;
  saveProfile(profile);
  if(params.get("start")) localStorage.setItem("abtalksStartDay", params.get("start"));
}

function saveTasks(){
  localStorage.setItem("abtalksTasks", JSON.stringify(tasks));
}

function getProofKey(day){
  return `abtalksProofDay${day}`;
}

function getProof(day){
  try{
    return JSON.parse(localStorage.getItem(getProofKey(day))) || {};
  }catch(e){
    return {};
  }
}

function saveProof(day, proof){
  localStorage.setItem(getProofKey(day), JSON.stringify(proof));
}

function isValidProofUrl(value, type){
  try{
    const url = new URL(value);
    if(url.protocol !== "https:" && url.protocol !== "http:") return false;
    const host = url.hostname.toLowerCase();
    if(type === "github") return host === "github.com" || host.endsWith(".github.com");
    if(type === "linkedin") return host === "linkedin.com" || host.endsWith(".linkedin.com");
    return false;
  }catch(e){
    return false;
  }
}

function completedCount(){
  return tasks.filter(t => t.done).length;
}

function getProgress(){
  return Math.round((completedCount() / 60) * 100);
}

function updateTask(day){
  const task = tasks.find(t => t.day === day);
  if(!task) return;
  task.done = !task.done;
  saveTasks();
  if(typeof initDashboard === "function") initDashboard();
  if(typeof initChallenge === "function") initChallenge();
}

function calculateStreak(){
  let streak = 0;
  for(let i = 0; i < tasks.length; i++){
    if(tasks[i].done) streak++;
    else break;
  }
  return streak;
}

function initDashboard(){
  applyAssignmentFromUrl();
  const profile=getProfile();
  const avatar=document.getElementById("dashboardAvatar");
  const name=document.getElementById("dashboardStudentName");
  const meta=document.getElementById("dashboardStudentMeta");
  const track=document.getElementById("dashboardTrack");
  if(avatar) avatar.textContent=(profile.name||"Student").charAt(0).toUpperCase();
  if(name) name.textContent=profile.name||"Student";
  if(meta) meta.textContent=`${profile.college||"College / University"} · ${profile.email||"student@example.com"}`;
  if(track) track.textContent=profile.track||"BUILD";
  const done = completedCount();
  const progress = getProgress();
  const startDay = parseInt(localStorage.getItem("abtalksStartDay") || "1",10);
  const next = tasks.find(t => !t.done && t.day >= startDay) || tasks[tasks.length - 1];

  document.getElementById("currentDay").textContent = String(next.day).padStart(2,"0");
  document.getElementById("taskDay").textContent = String(next.day).padStart(2,"0");
  document.getElementById("todayTitle").textContent = next.title;
  document.getElementById("completedCount").textContent = done;
  document.getElementById("progressText").textContent = progress + "%";
  document.getElementById("progressPercent").textContent = progress + "%";
  document.getElementById("progressBar").style.width = progress + "%";
  document.getElementById("streakNumber").textContent = calculateStreak();
  document.getElementById("milestoneCount").textContent = Math.min(calculateStreak(),7);

  const ring = document.getElementById("progressRing");
  ring.style.background = `conic-gradient(var(--orange) ${progress * 3.6}deg,#34342f 0deg)`;

  const completeButton = document.getElementById("completeToday");
  completeButton.textContent = next.done ? "✓ Task completed" : "Mark task complete →";
  completeButton.classList.toggle("outline", next.done);
  completeButton.onclick = () => updateTask(next.day);

  const week = document.getElementById("week");
  week.innerHTML = "";
  ["M","T","W","T","F","S","S"].forEach((day,i)=>{
    const span = document.createElement("span");
    span.textContent = day;
    if(i < calculateStreak()) span.className = "active";
    week.appendChild(span);
  });

  initProofOfWork(next);

  const recent = document.getElementById("recentTasks");
  recent.innerHTML = "";
  tasks.slice(0,6).forEach(task=>{
    const row = document.createElement("button");
    row.className = "task-row";
    row.innerHTML = `
      <span class="check ${task.done ? "done":""}">${task.done ? "✓":""}</span>
      <span class="task-info"><b>DAY ${String(task.day).padStart(2,"0")}</b><span>${task.title}</span></span>
      <span class="task-time">${task.time}</span>`;
    row.onclick = () => updateTask(task.day);
    recent.appendChild(row);
  });
}

function initProofOfWork(task){
  const form = document.getElementById("proofForm");
  if(!form || !task) return;

  const github = document.getElementById("githubUrl");
  const linkedin = document.getElementById("linkedinUrl");
  const error = document.getElementById("proofError");
  const success = document.getElementById("proofSuccess");
  const submit = document.getElementById("submitProof");
  const clear = document.getElementById("clearProof");
  const saved = getProof(task.day);

  github.value = saved.github || "";
  linkedin.value = saved.linkedin || "";
  github.classList.remove("invalid");
  linkedin.classList.remove("invalid");
  error.textContent = "";
  success.textContent = saved.submitted ? `Proof submitted for Day ${String(task.day).padStart(2,"0")}. Your progress is saved on this device.` : "";
  error.classList.remove("show");
  success.classList.toggle("show", !!saved.submitted);
  submit.textContent = saved.submitted ? "Update today's proof →" : "Submit today's proof →";

  // Avoid stacking submit listeners when the dashboard is refreshed.
  form.onsubmit = (event) => {
    event.preventDefault();
    error.classList.remove("show");
    success.classList.remove("show");
    github.classList.remove("invalid");
    linkedin.classList.remove("invalid");

    const githubValue = github.value.trim();
    const linkedinValue = linkedin.value.trim();
    let message = "";

    if(!isValidProofUrl(githubValue, "github")){
      github.classList.add("invalid");
      message = "Please enter a valid GitHub repository, commit, pull request, or file URL.";
    }else if(!isValidProofUrl(linkedinValue, "linkedin")){
      linkedin.classList.add("invalid");
      message = "Please enter a valid LinkedIn post URL.";
    }

    if(message){
      error.textContent = message;
      error.classList.add("show");
      return;
    }

    saveProof(task.day, {
      github: githubValue,
      linkedin: linkedinValue,
      submitted: true,
      submittedAt: new Date().toISOString()
    });

    if(!task.done){
      task.done = true;
      saveTasks();
    }

    success.textContent = `Nice work. Day ${String(task.day).padStart(2,"0")} is now complete.`;
    success.classList.add("show");
    submit.textContent = "Update today's proof →";

    // Refresh the dashboard stats without losing the submitted links.
    initDashboard();
  };

  clear.onclick = () => {
    github.value = "";
    linkedin.value = "";
    github.classList.remove("invalid");
    linkedin.classList.remove("invalid");
    error.classList.remove("show");
    success.classList.remove("show");
    localStorage.removeItem(getProofKey(task.day));
    submit.textContent = "Submit today's proof →";
  };
}

function initChallenge(){
  const count = document.getElementById("challengeCompleted");
  const timeline = document.getElementById("timeline");
  if(!count || !timeline) return;

  count.textContent = completedCount();
  timeline.innerHTML = "";

  for(let day=1; day<=60; day++){
    const task = tasks.find(t=>t.day===day) || {
      day,
      title: day <= 7 ? "Challenge task" : "Your next daily challenge",
      category: day % 3 === 0 ? "Public" : day % 2 === 0 ? "Learn" : "Build",
      time: "30 min",
      done: false
    };

    const item = document.createElement("div");
    item.className = "timeline-item" + (task.done ? " completed" : "");
    item.innerHTML = `
      <div class="timeline-day">DAY ${String(day).padStart(2,"0")}</div>
      <button class="timeline-card">
        <span class="timeline-check">${task.done ? "✓" : "+"}</span>
        <div>
          <small>${task.category} · ${task.time}</small>
          <h3>${task.title}</h3>
        </div>
        <span>↗</span>
      </button>`;
    item.querySelector("button").onclick = () => {
      if(!tasks.find(t=>t.day===day)){
        tasks.push(task);
      }
      updateTask(day);
    };
    timeline.appendChild(item);
  }
}


function initProfile(){
  applyAssignmentFromUrl();
  const profile=getProfile();
  const fields={name:document.getElementById("profileName"),email:document.getElementById("profileEmail"),college:document.getElementById("profileCollege"),track:document.getElementById("profileTrack")};
  fields.name.value=profile.name; fields.email.value=profile.email; fields.college.value=profile.college; fields.track.value=profile.track;
  const refresh=()=>{
    document.getElementById("profileAvatar").textContent=(fields.name.value||"S").charAt(0).toUpperCase();
    document.getElementById("profileNamePreview").textContent=fields.name.value||"Student";
    document.getElementById("profileEmailPreview").textContent=fields.email.value||"student@example.com";
    document.getElementById("profileCollegePreview").textContent=fields.college.value||"College / University";
  };
  Object.values(fields).forEach(el=>el.addEventListener("input",refresh)); fields.track.addEventListener("change",refresh); refresh();
  document.getElementById("profileForm").onsubmit=e=>{e.preventDefault();saveProfile({name:fields.name.value.trim(),email:fields.email.value.trim(),college:fields.college.value.trim(),track:fields.track.value});const m=document.getElementById("profileSaved");m.classList.add("show");setTimeout(()=>m.classList.remove("show"),2500);};
}

function initAdmin(){
  const daySelect=document.getElementById("assignDay");
  for(let i=1;i<=60;i++){const o=document.createElement("option");o.value=i;o.textContent=`Day ${String(i).padStart(2,"0")}`;daySelect.appendChild(o);}
  document.getElementById("assignmentForm").onsubmit=e=>{
    e.preventDefault();
    const name=document.getElementById("assignName").value.trim(), email=document.getElementById("assignEmail").value.trim(), college=document.getElementById("assignCollege").value.trim(), track=document.getElementById("assignTrack").value, start=document.getElementById("assignDay").value;
    const link=`dashboard.html?student=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&college=${encodeURIComponent(college)}&track=${encodeURIComponent(track)}&start=${encodeURIComponent(start)}`;
    const result=document.getElementById("assignmentResult");
    result.innerHTML=`<b>Assignment created.</b><br><br>Send this link to the student:<br><br><code>${link}</code><br><br><a class="btn primary" href="${link}">Open student dashboard →</a>`;
    result.classList.add("show");
  };
}


/* =========================================
   MOBILE APP SHELL
   Keeps the profile icon visible on every screen
   and adds a persistent bottom navigation on mobile.
   ========================================= */
function initMobileAppShell(){
  const header=document.querySelector(".navbar");
  if(!header) return;

  const profile=getProfile();
  const name=(profile.name || "Student").trim();
  const initials=name.split(/\s+/).map(part=>part.charAt(0)).join("").slice(0,2).toUpperCase() || "S";

  if(!header.querySelector(".mobile-profile-button")){
    const profileLink=document.createElement("a");
    profileLink.href="profile.html";
    profileLink.className="mobile-profile-button";
    profileLink.setAttribute("aria-label","Open student profile");
    profileLink.textContent=initials;
    header.insertBefore(profileLink, header.querySelector(".menu-btn") || null);
  }else{
    header.querySelector(".mobile-profile-button").textContent=initials;
  }

  const current=(window.location.pathname.split("/").pop() || "index.html").toLowerCase();
  const navItems=[
    ["index.html","⌂","Home"],
    ["dashboard.html","◉","Progress"],
    ["challenge.html","✓","Challenge"],
    ["profile.html","●","Profile"]
  ];

  if(!document.querySelector(".mobile-bottom-nav")){
    const nav=document.createElement("nav");
    nav.className="mobile-bottom-nav";
    nav.setAttribute("aria-label","Mobile app navigation");
    navItems.forEach(([href,icon,label])=>{
      const a=document.createElement("a");
      a.href=href;
      if(current===href) a.classList.add("active");
      a.innerHTML=`<span>${icon}</span><small>${label}</small>`;
      nav.appendChild(a);
    });
    document.body.appendChild(nav);
  }

  document.querySelectorAll(".mobile-bottom-nav a, .mobile-profile-button").forEach(link=>{
    link.addEventListener("click",event=>{
      const href=link.getAttribute("href");
      if(!href || href.startsWith("#") || href.startsWith("http") || link.target==="_blank") return;
      if(href===current) return;
      const main=document.querySelector("main");
      if(main){
        event.preventDefault();
        main.classList.add("mobile-screen-exit");
        setTimeout(()=>{window.location.href=href;},220);
      }
    });
  });
}

initMobileAppShell();

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");
if(menuBtn){
  menuBtn.addEventListener("click",()=>navMenu.classList.toggle("open"));
}
