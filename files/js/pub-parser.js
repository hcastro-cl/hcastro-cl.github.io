
	fetch('files/pages/publications.bib')
    .then(response => {
	    if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then(bibtex => {
	    if (typeof bibtexParse !== 'undefined' && typeof bibtexParse.toJSON === 'function') {
        const entries = bibtexParse.toJSON(bibtex);
	  /*entries.forEach((entry, i) => {
      console.log(`Entrada ${i}:`, entry);
    });*/

        const container = document.getElementById('publications-list');
		if (!container) {
        throw new Error('El contenedor #publications-list no existe');
      }
        let html = '';
        
        entries.forEach(entry => {
  			if (!entry.entryTags) {
    			console.warn("Entrada sin campos:", entry);
    		return; // Salta esta entrada
  			}

  			const fields = entry.entryTags;
			const type = entry.entryType || ''; // 👈 ESTA LÍNEA ES CLAVE
  			const title = fields.title || 'Sin título';

          const author = fields.author || '';
          const year = fields.year || '';
          const month = fields.month || '';
          const pages = fields.pages || '';
          const pdf = fields.pdf || '';
          const pdf2 = fields.pdf2 || '';
          const doi = fields.doi || '';
          const abstract = fields.abstract || '';
          const funding = fields.funding || '';
          
          let labelcolor = '';
          let clase = '';
          let cite = '';
          
          if(type === "article"){
            labelcolor = 'success';
            clase = 'jpaper';
            cite = `${fields.journal || ''} <strong>${fields.volume || ''}</strong> (${year}), ${pages}.`;
          } else if(type === "book"){
            labelcolor = 'primary';
            clase = 'book';
            cite = `${fields.publisher || ''} (${year}), ${pages}.`;
          } else if(type === "preprint"){
            labelcolor = 'danger';
            clase = 'preprint';
            cite = `${fields.note || ''} (${year}).`;
          } else if(type === "thesis"){
            labelcolor = 'warning';
            clase = 'thesis';
            cite = `${fields.school || ''}, ${pages} pages. ${fields.note || ''}.`;
          } else {
            labelcolor = 'info';
          }
          
          let assets = '';
          if(abstract){
            assets += `<a href="#" class="pubcollapse"><i class="fa fa-plus"></i></a>`;
          }
          if(doi){
            assets += `<a href="${doi}" class="tooltips" target="_blank" title="Published version"><i class="fa fa-external-link"></i></a>`;
          }
          if(pdf){
            assets += `<a href="files/preprints/${pdf}" class="tooltips" target="_blank" title="Download preprint"><i class="fa fa-file-pdf-o"></i></a>`;
          }
          if(pdf2){
            assets += `<a href="files/preprints/${pdf2}" class="tooltips" target="_blank" title="Download addendum"><i class="fa fa-file-pdf-o"></i></a>`;
          }
          
          let fundingText = funding ? ` Partially funded by ${funding}.` : '';
          let abstractHtml = abstract ? `<div class="pubdetails"><h4>Abstract</h4><p>${abstract}</p></div>` : '';
          
          html += `
            <div class="item mix ${clase} mix_all" data-year="${year}" style="display: block; opacity: 1;">
              <div class="pubmain">
                <div class="pubassets">${assets}</div>
                <h4 class="pubtitle"><em>${title}</em></h4>
                <div class="pubauthor">${author}</div>
                <div class="pubcite">
                  <span class="label label-${labelcolor}">${type.charAt(0).toUpperCase() + type.slice(1)}</span>
                  ${cite}${fundingText}
                </div>
              </div>
              ${abstractHtml}
            </div>
          `;
		  //html += `<div class="item">${entry.entryTags.title || 'Sin título'}</div>`; // Ejemplo simplificado
        });
        
        if (container) {
          container.innerHTML = html;
		  if (window.MathJax && MathJax.typesetPromise) {
  MathJax.typesetPromise([container]);
}

        }
      }
    })
    .catch(error => {
		console.error("Error en el script:", error); // Depuración
      const container = document.getElementById('publications-list');
      if (container) {
        container.innerHTML = `<div class="alert alert-danger">Could not load publications. Please try again later.</div>`;
      }
      console.error('Error loading publications.bib:', error);
    });