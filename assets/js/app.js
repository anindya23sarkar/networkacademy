const grid=document.getElementById("course-grid");
const search=document.getElementById("course-search");
const category=document.getElementById("category-filter");
const level=document.getElementById("level-filter");
const icons=["⌘","⌁","◈","⬡","⌗","◇"];
let courses=[];
function renderCourses(){
 const q=(search.value||"").trim().toLowerCase();
 const filtered=courses.filter(c=>(c.title+" "+c.description+" "+c.tags.join(" ")).toLowerCase().includes(q)&&(category.value==="All"||c.category===category.value)&&(level.value==="All"||c.level===level.value));
 if(!filtered.length){grid.innerHTML='<div class="empty-state">No courses match your search. Try changing your filters.</div>';return;}
 grid.innerHTML=filtered.map(c=>`<article class="course-card">
  <div class="card-top"><span class="course-icon">${icons[(c.id-1)%icons.length]}</span><span class="free-tag">FREE · SELF-PACED</span></div>
  <h3>${escapeHTML(c.title)}</h3><p>${escapeHTML(c.description)}</p>
  <div class="card-meta"><span class="meta-pill">${escapeHTML(c.category)}</span><span class="meta-pill">${escapeHTML(c.level)}</span></div>
  <a class="course-link" href="${c.url}" target="_blank" rel="noopener noreferrer">View official course <span>↗</span></a>
 </article>`).join("");
}
function escapeHTML(s){return String(s).replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));}
fetch("data/courses.json").then(r=>{if(!r.ok)throw new Error("Catalog unavailable");return r.json();}).then(data=>{courses=data.courses||[];renderCourses();}).catch(()=>{grid.innerHTML='<div class="empty-state">The course catalog could not be loaded. Please refresh the page.</div>';});
[search,category,level].forEach(el=>el.addEventListener("input",renderCourses));
const menu=document.querySelector(".menu-toggle"),nav=document.querySelector(".nav");
menu.addEventListener("click",()=>{const open=nav.classList.toggle("open");menu.setAttribute("aria-expanded",String(open));});
document.querySelectorAll(".nav a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");menu.setAttribute("aria-expanded","false");}));
const theme=document.querySelector(".theme-toggle");
if(localStorage.getItem("nlh-theme")==="dark")document.body.classList.add("dark");
theme.addEventListener("click",()=>{document.body.classList.toggle("dark");localStorage.setItem("nlh-theme",document.body.classList.contains("dark")?"dark":"light");});
