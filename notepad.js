//first Code 
    const editor = document.getElementById('editor');
    const fileInput = document.getElementById('fileInput');
    const newBtn = document.getElementById('newBtn');
    const openBtn = document.getElementById('openBtn');
    const saveBtn = document.getElementById('saveBtn');
    const saveAsBtn = document.getElementById('saveAsBtn');
    const boldBtn = document.getElementById('boldBtn');
    const italicBtn = document.getElementById('italicBtn');
    const underlineBtn = document.getElementById('underlineBtn');
    const strikeBtn = document.getElementById('strikeBtn');
    const headingSelect = document.getElementById('headingSelect');
    const ulBtn = document.getElementById('ulBtn');
    const olBtn = document.getElementById('olBtn');
    const fontSizeSelect = document.getElementById('fontSizeSelect');
    const textColor = document.getElementById('textColor');
    const bgColor = document.getElementById('bgColor');

    function focusEditor() { editor.focus(); }
    try { document.execCommand('styleWithCSS', false, true); } catch(e){}

    function downloadContent(filename, content, type='text/html'){
      const blob = new Blob([content], { type });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      link.click();
      URL.revokeObjectURL(link.href);
    }

    function saveCurrent(){
      const name = localStorage.getItem('lastFilename') || 'MyNote.html';
      const content = editor.innerHTML;
      downloadContent(name, content, 'text/html');
    }

    function newFile(){
      if(confirm('Clear current note and start new?')) {
        editor.innerHTML = '<p></p>';
        localStorage.removeItem('autosave_content');
        focusEditor();
      }
    }

    function openFilePicker(){
      fileInput.value = '';
      fileInput.click();
    }

    fileInput.addEventListener('change', (e)=>{
      const file = e.target.files[0];
      if(!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        const text = ev.target.result;
        if(file.name.match(/\.(html|htm)$/i)){
          editor.innerHTML = text;
        } else {
          editor.innerHTML = '<pre style="white-space:pre-wrap;">'+text+'</pre>';
        }
        localStorage.setItem('lastFilename', file.name);
        focusEditor();
        alert('File loaded: ' + file.name);
      };
      reader.readAsText(file);
    });

    // Toolbar actions
    boldBtn.onclick = ()=>{ document.execCommand('bold'); focusEditor(); };
    italicBtn.onclick = ()=>{ document.execCommand('italic'); focusEditor(); };
    underlineBtn.onclick = ()=>{ document.execCommand('underline'); focusEditor(); };
    strikeBtn.onclick = ()=>{ document.execCommand('strikeThrough'); focusEditor(); };
    headingSelect.onchange = ()=>{ document.execCommand('formatBlock', false, headingSelect.value || 'p'); headingSelect.selectedIndex = 0; focusEditor(); };
    ulBtn.onclick = ()=>{ document.execCommand('insertUnorderedList'); focusEditor(); };
    olBtn.onclick = ()=>{ document.execCommand('insertOrderedList'); focusEditor(); };
    fontSizeSelect.onchange = ()=>{
      document.execCommand('fontSize', false, 7);
      editor.querySelectorAll('font[size="7"]').forEach(f=>{
        const span = document.createElement('span');
        span.style.fontSize = fontSizeSelect.value;
        span.innerHTML = f.innerHTML;
        f.replaceWith(span);
      });
      focusEditor();
    };
    textColor.oninput = ()=>{ document.execCommand('foreColor', false, textColor.value); focusEditor(); };
    bgColor.oninput = ()=>{ document.execCommand('hiliteColor', false, bgColor.value); focusEditor(); };

    // File buttons
    newBtn.onclick = newFile;
    openBtn.onclick = openFilePicker;
    saveBtn.onclick = saveCurrent;
    saveAsBtn.onclick = ()=> downloadContent('NewNote.html', editor.innerHTML, 'text/html');
  
