// Declare variables for getting the xml file for the XSL transformation (folio_xml) and to load the image in IIIF on the page in question (number).
let tei = document.getElementById("folio");
let tei_xml = tei.innerHTML;
let extension = ".xml";
let folio_xml = tei_xml.concat(extension);
let page = document.getElementById("page");
let pageN = page.innerHTML;
let number = Number(pageN);

// Loading the IIIF manifest
var mirador = Mirador.viewer({
  "id": "my-mirador",
  "manifests": {
    "https://iiif.bodleian.ox.ac.uk/iiif/manifest/53fd0f29-d482-46e1-aa9d-37829b49987d.json": {
      provider: "Bodleian Library, University of Oxford"
    }
  },
  "window": {
    allowClose: false,
    allowWindowSideBar: true,
    allowTopMenuButton: false,
    allowMaximize: false,
    hideWindowTitle: true,
    panels: {
      info: false,
      attribution: false,
      canvas: true,
      annotations: false,
      search: false,
      layers: false,
    }
  },
  "workspaceControlPanel": {
    enabled: false,
  },
  "windows": [
    {
      loadedManifest: "https://iiif.bodleian.ox.ac.uk/iiif/manifest/53fd0f29-d482-46e1-aa9d-37829b49987d.json",
      canvasIndex: number,
      thumbnailNavigationPosition: 'off'
    }
  ]
});


// function to transform the text encoded in TEI with the xsl stylesheet "Frankenstein_text.xsl", this will apply the templates and output the text in the html <div id="text">
function documentLoader() {

    Promise.all([
      fetch("../XML/"+folio_xml).then(response => response.text()),
      fetch("../XSL/Frankenstein_text.xsl").then(response => response.text())
    ])
    .then(function ([xmlString, xslString]) {
      var parser = new DOMParser();
      var xml_doc = parser.parseFromString(xmlString, "text/xml");
      var xsl_doc = parser.parseFromString(xslString, "text/xml");

      var xsltProcessor = new XSLTProcessor();
      xsltProcessor.importStylesheet(xsl_doc);
      var resultDocument = xsltProcessor.transformToFragment(xml_doc, document);

      var criticalElement = document.getElementById("text");
      criticalElement.innerHTML = ''; // Clear existing content
      criticalElement.appendChild(resultDocument);
    })
    .catch(function (error) {
      console.error("Error loading documents:", error);
    });
  }
  
// function to transform the metadate encoded in teiHeader with the xsl stylesheet "Frankenstein_meta.xsl", this will apply the templates and output the text in the html <div id="stats">
  function statsLoader() {

    Promise.all([
      fetch("../XML/"+folio_xml).then(response => response.text()),                 // edited to fetch file from the correct directory
      fetch("../XSL/Frankenstein_meta.xsl").then(response => response.text())
    ])
    .then(function ([xmlString, xslString]) {
      var parser = new DOMParser();
      var xml_doc = parser.parseFromString(xmlString, "text/xml");
      var xsl_doc = parser.parseFromString(xslString, "text/xml");

      var xsltProcessor = new XSLTProcessor();
      xsltProcessor.importStylesheet(xsl_doc);
      var resultDocument = xsltProcessor.transformToFragment(xml_doc, document);

      var criticalElement = document.getElementById("stats");
      criticalElement.innerHTML = ''; // Clear existing content
      criticalElement.appendChild(resultDocument);
    })
    .catch(function (error) {
      console.error("Error loading documents:", error);
    });
  }

  // To highlight Mary's hand, Percy's hand or show both hands

  documentLoader();
  statsLoader();
  function selectHand(event) {
    var textsByMary = document.querySelectorAll('.\\#MWS');
    var textsByPercy = document.querySelectorAll('.\\#PBS');

    
    [textsByMary, textsByPercy].forEach(group => {
        group.forEach(el => el.style.backgroundColor = '');                         
    }); 
 
    if (event.target.value === 'both') {                                             // no changes if "both" hands selected 
                                                                            
    } else if (event.target.value === 'Mary') {
        textsByMary.forEach(el => {
            if (el.classList.contains('#PBS')) {
                el.style.backgroundColor = '';                                       // elements with class #PBS have default bg
            } else {
                el.style.backgroundColor = 'lightblue';                              // elements with class #MWS get highlighted in light blue 
            }
        });
    } else if (event.target.value === 'Percy') {
        textsByPercy.forEach(el => el.style.backgroundColor = 'lightblue');          // elements with class #PBS get highlighted in light blue
    }
}


document.getElementById('sel-hand').addEventListener('change', selectHand);





     // To show/hide all deletions

     function toggleDeletions(event) {
      var deletions = document.getElementsByTagName('del');
      var deletionsArray = Array.from(deletions);

    deletionsArray.forEach(function(deletion) {                                      // button to hide/show deletions
      if (deletion.style.display === 'none') {
        deletion.style.display = ''
      } else {
        deletion.style.display = 'none';
      }
    });
  }





   // To toggle between reading view, when reading view is selected, all additions/deletions including metamark ^ are hidden

    let isReadingMode = true;

    function toggleReadView(event) {
      var deletions = document.getElementsByTagName('del');
      var deletionsArray = Array.from(deletions);
      var additions = document.getElementsByClassName('supraAdd');
      
      deletionsArray.forEach(function(deletion) {
        deletion.style.display = isReadingMode ? 'none' : '';                         // button to show reader view and make all additions inline
  });                                                                                 // this buttons also hides all the ^ (caret) sublinear metamark while 
                                                                                      // retaining other sublinear metamarks like the L on page 23r
      Array.from(additions).forEach(function(addition) {
    if (isReadingMode) {
      addition.style.verticalAlign = 'baseline'; 
      addition.style.fontSize = 'inherit';
    } else {
      addition.style.verticalAlign = 'super';
      addition.style.fontSize = '';                                        
    }                                                                      
  });                                                                      
    
    var subAdds = document.querySelectorAll('.subAdd');
    subAdds.forEach(function (subAdd) {                                     
    var text = subAdd.textContent || subAdd.innerText;
    if (text.includes('^')) {                                                          // code to hide the ^ metamark
      subAdd.style.display = isReadingMode ? 'none' : 'inline';
    }
  });

  isReadingMode = !isReadingMode;
}


