const list=document.getElementById('course-list');
const search=document.getElementById('search');
const category=document.getElementById('category');
let courses=[];
function escapeHTML(value){
  return String(value).replace(/[&<>"']/g,character=>({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[character]));
}
function render(){
  const query=(search.value||'').trim().toLowerCase();
  const items=courses.filter(course=>
    (course.title+' '+course.description).toLowerCase().includes(query) &&
    (category.value==='All'||course.category===category.value)
  );
  list.innerHTML=items.length?items.map(course=>`
    <article class="course-card">
      <div class="card-top"><span class="course-icon">⌘</span><span class="free-tag">FREE COURSE</span></div>
      <h3>${escapeHTML(course.title)}</h3>
      <p>${escapeHTML(course.description)}</p>
      <div class="card-meta"><span class="meta-pill">${escapeHTML(course.category)}</span><span class="meta-pill">${escapeHTML(course.duration)}</span></div>
      <a class="course-link" href="courses/${encodeURIComponent(course.slug)}.html">Explore this course <span>→</span></a>
    </article>`).join(''):'<div class="directory-empty">We couldn\'t find a course matching your search. Please try another keyword or category.</div>';
}
fetch('../data/courses.json').then(response=>{
  if(!response.ok) throw new Error('Course catalogue unavailable');
  return response.json();
}).then(data=>{
  courses=(data.courses||[]).filter(course=>course.type==='free');
  render();
}).catch(()=>{
  list.textContent='We couldn\'t load the course list just now. Please refresh the page and try again.';
});
[search,category].forEach(control=>control.addEventListener('input',render));