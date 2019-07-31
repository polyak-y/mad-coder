export function imgRead (event) {

  let img = document.getElementById('imgRead')
  let fileReader = new FileReader();

  fileReader.addEventListener('load', function(){
    img.src = this.result
  });

  if(!event.currentTarget.files[0]) return 

  let file = event.currentTarget.files[0];
  fileReader.readAsDataURL(file);	   
}