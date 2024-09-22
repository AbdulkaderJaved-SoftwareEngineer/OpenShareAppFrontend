const dropZone = document.querySelector('.drop-zone');
const fileInput = document.querySelector('#fileInput');
const browseBtn = document.querySelector('.browseBtn');
const uploadURL = "https://open-share-app-v4.vercel.app/api/files";
const downloadLinkText = document.getElementById('link'); 
const progress = document.querySelector('.bg-progress');
const progress_title = document.querySelector('#progress-title');
const percent_title = document.querySelector('.percent-container')
const title = document.querySelector('.title1');
const small_progress = document.querySelector('.small-progress-bar')




dropZone.addEventListener("dragover",(e)=>{
    e.preventDefault();
   console.log("Dragging Object ");

   if(!dropZone.classList.contains("dragged"))
    {
        dropZone.classList.add('dragged');
        
        
    }
   
});

dropZone.addEventListener('dragleave',()=>{
  
    dropZone.classList.remove('dragged');
    
    
});

dropZone.addEventListener('drop',(e)=>{
    e.preventDefault();
    console.log(e.dataTransfer.files.length)

dropZone.classList.remove('dragged');



const files = e.dataTransfer.files
if(files.length)
    {
      //  console.log(files[0])
        fileInput.files = files
        uploadFile()
    }
})


browseBtn.addEventListener('click',(e)=>{
fileInput.click();

});

browseBtn.addEventListener('change',(e)=>
    {
        uploadFile()
    })

    const showLink = ({file}) =>{
    
        return file
    }
    

const uploadFile = () =>

    {
        const file = fileInput.files[0];
        const formData = new FormData();
        formData.append("myfile",file)
console.log(formData)
        const xhr = new XMLHttpRequest();
        
    xhr.onreadystatechange = ()=>
    {
        if(xhr.readyState === XMLHttpRequest.DONE)
            {
                const file = showLink(JSON.parse(xhr.response))
                downloadLinkText.innerHTML = `<a href=${file}>${file}</a>`
            
            }
  
    };
    xhr.upload.onprogress = updateProgress;
    xhr.open('POST',uploadURL);
xhr.send(formData);

};

const updateProgress = (e)=>
    {
        console.log(Math.round((e.loaded/e.total)*100) );
        const loading = Math.round((e.loaded/e.total)*100);
        progress.style.width = `${loading}%`;
      
      if (loading == 100) {
        title.innerHTML = "<b>Upload Complete</b> ..";
        percent_title.innerText = `${loading} %`;
        small_progress.style.width = `0%`



      }
      else{
        title.innerHTML = "<b>Uploading</b>";
        percent_title.innerText = `${loading} %`;
        small_progress.style.width = `${loading}%`
      }

        

        
        
    }
 
    function myFunction() {
        // Get the text field
        var copyText = document.querySelector("#link");
      
        // Select the text field
        copyText.select();
        copyText.setSelectionRange(0, 99999); // For mobile devices
      
        // Copy the text inside the text field
        navigator.clipboard.writeText(copyText.value);
        
        // Alert the copied text
        alert("Copied the text: " + copyText.value);
      }