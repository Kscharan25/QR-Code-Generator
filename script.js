let imgBox=document.getElementById("imgBox");
let qrImage =document.getElementById("qrImage");
let qrText=document.getElementById("qrText");
let btnGenerate=document.querySelector(".btn-generate");
let btnDownload=document.querySelector(".btn-download");
let loader=document.getElementById("loader");

//QR CODE generator
btnGenerate.addEventListener("click",()=>{

    const text=qrText.value.trim();

    if(text===""){
       qrText.classList.add("error");

       setTimeout(()=>{
        qrText.classList.remove("error");
       },400);

       return;
    }

      placeholderText.style.display="none";
        qrImage.style.display="block";
        loader.style.display="block";

    qrImage.src=" https://api.qrserver.com/v1/create-qr-code/?size=150x150&data="+qrText.value;

    qrImage.onload=()=>{
        imgBox.classList.add("qr-code-box", "img")
        btnDownload.style.display="block";
        loader.style.display="none";
        
    }; 
});

//remove qr immediately when the qr text is deleted

    qrText.addEventListener("input",()=>{
        if(qrText.value.trim()===""){
            qrImage.src="";
            qrImage.style.display="none"
            placeholderText.style.display="block";
            loader.style.display="none";
        }
    });

//Download QR Code

btnDownload.addEventListener("click",async()=>{
    if(!qrImage.src || qrImage.src.trim===""){
        imgBox.classList.add('error');
        
        setTimeout(()=>{
            imgBox.classList.remove('error')
        },400);

        return;
    };

    try{
        const response=await fetch(qrImage.src);
        const blob=await response.blob();
        const url=URL.createObjectURL(blob);

        const link=document.createElement("a");
        link.href=url;
        link.download="qr-code-png";
        document.body.appendChild(link)
        link.click();
        document.body.removeChild(link);

        URL.revokeObjectURL(url);
    }catch(err){
        btnDownload.innerHTML="Download failed";
        btnDownload.innerHTML.style.color="red";

    }

    

})



