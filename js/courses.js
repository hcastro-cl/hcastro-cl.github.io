			fetch('files/pages/cursos.xml')
			  .then(response => response.text())
			  .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
			  .then(data => {
			    const sets = data.querySelectorAll('set');
			    const list = document.getElementById('courses-list');
			    let i = 0;
			    sets.forEach(set => {
			      const current = set.querySelector('cur')?.textContent || '';
			      const title = set.querySelector('legend')?.textContent || '';
			      const dire = set.querySelector('dir')?.textContent || '';
			      const syllabus = set.querySelector('syllabus')?.textContent || '';
			      const apunte = set.querySelector('apunte')?.textContent || '';
			      const datei = set.querySelector('datei')?.textContent || '';
			      const datef = set.querySelector('datef')?.textContent || '';
			      const year = set.querySelector('year')?.textContent || '';
			      const abst = set.querySelector('abst')?.textContent || '';
			      const pic = set.querySelector('pic')?.textContent || '';
			      const tareas = set.querySelectorAll('tareas tarea');
			      const ayudantias = set.querySelectorAll('ayudantias ayudantia');
			
			      // Parse month from datei
			      let month = '';
			      if (datei) {
					const fullDate = `${datei} 1, 2000`; // use any fixed year
  					const d = new Date(fullDate);
  					if (!isNaN(d)) {
    					month = d.getMonth() + 1;
  					} else {
    					console.error("Invalid month name:", datei);
  					}
					}
			
			      // Imagen
			      let imgSrc = pic ? `files/teaching/${dire}/${pic}` : 'files/images/blank.png';
			
			      // Links
			      let links = '';
			      if (syllabus) {
			        links += `<a href="files/teaching/${dire}/${syllabus}" target="_blank">Syllabus</a>`;
			      }
			      if (apunte) {
			        links += ` - <a href="files/teaching/apuntes/${apunte}" target="_blank">Apunte</a>`;
			      }
			      if (tareas.length > 0) {
			        tareas.forEach((tarea, idx) => {
			          links += ` - <a href="files/teaching/${dire}/${tarea.textContent}" target="_blank">Tarea ${idx + 1}</a>`;
			        });
			      }
			      if (ayudantias.length > 0) {
			        ayudantias.forEach((ayudantia, idx) => {
			          links += ` - <a href="files/teaching/${dire}/${ayudantia.textContent}" target="_blank">Ayudantía ${idx + 1}</a>`;
			        });
			      }
			
			      // li class
			      const liClass = i === 0 ? 'open' : '';
			      const textClass = i === 0 ? 'text row open' : 'text row';
			      const textStyle = i === 0 ? 'display: block;' : '';
			
			      // Render
			      const li = document.createElement('li');
			      li.className = liClass;
			      li.innerHTML = `
			        <div class="date">${month}/${year}</div>
			        <div class="circle"></div>
			        <div class="data">
			          <div class="subject">${title}</div>
			          <div class="${textClass}" style="${textStyle}">
			            <div class="col-md-2">
			              <img alt="image" src="${imgSrc}" class="thumbnail img-responsive">
			            </div>
			            <div class="col-md-10">
			              ${abst}
			              <p>${links}</p>
			            </div>
			          </div>
			        </div>
			      `;
			      list.appendChild(li);
			      i++;
			    });
			  });
