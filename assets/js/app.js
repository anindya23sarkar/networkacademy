const grid=document.getElementById('course-grid');
const search=document.getElementById('course-search');
const category=document.getElementById('category-filter');
const level=document.getElementById('level-filter');
const icons=['⌘','⌁','◈','⬡','⌗','◇'];
let courses=[];
function escapeHTML(value){
  return String(value).replace(/[&<>"']/g, character => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[character]));
}
function renderCourses(){
  const query=(search.value||'').trim().toLowerCase();
  const filtered=courses.filter(course =>
    (course.title+' '+course.description+' '+course.tags.join(' ')).toLowerCase().includes(query) &&
    (category.value==='All'||course.category===category.value) &&
    (level.value==='All'||course.level===level.value)
  );
  if(!filtered.length){
    grid.innerHTML='<div class="empty-state">We couldn\'t find a course matching your search. Please try another keyword or adjust the filters.</div>';
    return;
  }
  grid.innerHTML=filtered.map(course=>`
    <article class="course-card">
      <div class="card-top"><span class="course-icon">${icons[(course.id-1)%icons.length]}</span><span class="free-tag">FREE COURSE</span></div>
      <h3>${escapeHTML(course.title)}</h3>
      <p>${escapeHTML(course.description)}</p>
      <div class="card-meta"><span class="meta-pill">${escapeHTML(course.category)}</span><span class="meta-pill">${escapeHTML(course.level)}</span></div>
      <a class="course-link" href="pages/courses/${encodeURIComponent(course.slug)}.html">Explore this course <span>↗</span></a>
    </article>`).join('');
}
fetch('data/courses.json').then(response=>{
  if(!response.ok) throw new Error('Course list unavailable');
  return response.json();
}).then(data=>{
  courses=data.courses||[];
  renderCourses();
}).catch(()=>{
  grid.innerHTML='<div class="empty-state">We couldn\'t load the course list just now. Please refresh the page and try again.</div>';
});
[search,category,level].forEach(control=>control.addEventListener('input',renderCourses));
const menu=document.querySelector('.menu-toggle');
const nav=document.querySelector('.nav');
if(menu&&nav){
  menu.addEventListener('click',()=>{
    const open=nav.classList.toggle('open');
    menu.setAttribute('aria-expanded',String(open));
  });
  nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{
    nav.classList.remove('open');
    menu.setAttribute('aria-expanded','false');
  }));
}
const theme=document.querySelector('.theme-toggle');
if(theme){
  if(localStorage.getItem('nlh-theme')==='dark') document.body.classList.add('dark');
  theme.addEventListener('click',()=>{
    document.body.classList.toggle('dark');
    localStorage.setItem('nlh-theme',document.body.classList.contains('dark')?'dark':'light');
  });
}