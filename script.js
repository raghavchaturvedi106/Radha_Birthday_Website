document.addEventListener('DOMContentLoaded', () => {
 const intro=document.getElementById('intro'), open=document.getElementById('open');
 const audio=document.getElementById('birthdayAudio'), musicBtn=document.getElementById('musicBtn'), musicLabel=document.getElementById('musicLabel');
 const toast=document.getElementById('toast'), wishBtn=document.getElementById('wishBtn');
 function closeIntro(){if(!intro||intro.classList.contains('closed'))return;intro.classList.add('closed');setTimeout(()=>intro.style.display='none',850)}
 if(open)open.addEventListener('click',()=>{closeIntro();playMusic();sparkles()});
 // Safety: loading/welcome screen can never trap the visitor.
 setTimeout(closeIntro,12000);
 let playing=false;
 async function playMusic(){if(!audio)return;try{await audio.play();playing=true}catch(e){playing=false}updateMusic()}
 function updateMusic(){if(musicLabel)musicLabel.textContent=playing?'Music on':'Music off';if(musicBtn)musicBtn.classList.toggle('playing',playing)}
 if(musicBtn)musicBtn.addEventListener('click',async()=>{if(!audio)return;if(playing){audio.pause();playing=false;updateMusic()}else await playMusic()});
 const items=document.querySelectorAll('.reveal');
 if('IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.12});items.forEach(el=>observer.observe(el))}
 else items.forEach(el=>el.classList.add('visible'));
 let toastTimer;
 function showToast(msg){if(!toast)return;toast.textContent=msg;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),3500)}
 if(wishBtn)wishBtn.addEventListener('click',()=>{showToast('Birthday magic sent! May all your wishes find their way to you. ♡');sparkles()});
 function sparkles(){const chars=['♡','✦','✧','♥'];for(let i=0;i<20;i++){const el=document.createElement('span');el.textContent=chars[Math.floor(Math.random()*chars.length)];el.style.cssText=`position:fixed;left:${10+Math.random()*80}vw;top:${45+Math.random()*35}vh;z-index:2500;pointer-events:none;color:${Math.random()>.5?'#c9a9ff':'#f0b9e8'};font-size:${14+Math.random()*22}px;transition:transform 1.5s ease,opacity 1.5s ease`;document.body.appendChild(el);requestAnimationFrame(()=>{el.style.transform=`translateY(-${100+Math.random()*230}px) rotate(${Math.random()*100-50}deg)`;el.style.opacity='0'});setTimeout(()=>el.remove(),1600)}}
 document.addEventListener('keydown',e=>{if(e.key==='Escape')closeIntro()});
});