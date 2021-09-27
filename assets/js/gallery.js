// alert("working")
let modalimagecontainer=document.getElementById("modal-image-container")
let titlecontainer= document.getElementById("gallerModalLabel")
window.addEventListener('click',function(e){
    // console.log();
    let rightImagesection=e.target.classList.contains('img-container')
    let imgsrc=e?.target.getAttribute('src')
    if( rightImagesection&&  imgsrc!=null){
        titlecontainer.innerHTML-modalimagecontainer.getAttribute('alt')
        modalimagecontainer.setAttribute('src',imgsrc);
        var myModal=new bootrap.Modal(document.getElementById('galleryModal',{}));
        myModal.show();

    }
})