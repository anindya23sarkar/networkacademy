const slug=window.location.pathname.split('/').pop().replace(/\.html$/,'');
fetch('../../data/courses.json').then(response=>{
  if(!response.ok) throw new Error('Course catalogue unavailable');
  return response.json();
}).then(data=>{
  const course=data.courses.find(item=>item.slug===slug);
  if(!course) throw new Error('Course not found');
  document.title=course.title+' | Networking, Cybersecurity & IT Support Learning Hub';
  setText('detail-title',course.title);
  setText('detail-category',course.category);
  setText('detail-level',course.level);
  setText('detail-overview',course.overview);
  setText('detail-for',course.for);
  setText('detail-duration',course.duration);
  setText('detail-duration-note',course.durationNote);
  setText('detail-status','FREE COURSE');
  document.getElementById('detail-topics').innerHTML=course.topics.map(item=>'<li>'+escapeHTML(item)+'</li>').join('');
  document.getElementById('detail-outcomes').innerHTML=course.outcomes.map(item=>'<li>'+escapeHTML(item)+'</li>').join('');
  document.getElementById('official-course').href=course.url;
  document.getElementById('detail-loading').hidden=true;
  document.getElementById('detail-content').hidden=false;
}).catch(()=>{
  document.getElementById('detail-loading').textContent='We couldn\'t load this course information. Please return to the course list and try again.';
});
function setText(id,value){
  const element=document.getElementById(id);
  if(element) element.textContent=value||'Please check the official course page for details.';
}
function escapeHTML(value){
  return String(value).replace(/[&<>"']/g,character=>({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[character]));
}