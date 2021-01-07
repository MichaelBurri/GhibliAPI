function loadDoc() {
    document.getElementById("results").innerHTML=null;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var response=JSON.parse(this.responseText);
            var filmName=document.getElementById('peli').value;
            for (let i = 0; i < response.length; i++) {
                    if (regexTitle(response[i].title,filmName)) {
                        maquetar(response[i]);                        
                    }                        
                } 
        }
    };    
    xhttp.open("GET", "https://ghibliapi.herokuapp.com/films/", true);
    xhttp.send();
}

function maquetar(response){
    
    let filmDiv=document.createElement('div');
    let filmImage=document.createElement('img');
    filmImage.src='https://i.pinimg.com/originals/e4/c1/57/e4c157372efb0c3778234779a45e6c66.jpg';
    filmImage.alt='Nah';
    filmImage.style="width: 13rem; max-height: 70vh; margin-top:25px";
    
    let innerDiv=document.createElement('div');
    innerDiv.innerText=response.title;
    filmDiv.append(filmImage,innerDiv);
    filmDiv.addEventListener('click',(e)=>{
        maquetarCard(response)
    });
    document.getElementById("results").append(filmDiv);
}

function maquetarCard(response){
    let divModal=document.getElementById("div-modal");
    divModal.style.display='unset';
    divModal.style.border=' 1px solid yellow';
    divModal.innerHTML=null;

    let header=document.createElement('header');
    let h3=document.createElement('h3');
    h3.innerText=response.title;

    let button=document.createElement('button');
    button.innerText='X';
    button.id='bCerrar'; 
    header.append(h3,button);
    

    let filmImage=document.createElement('img');
    filmImage.src='https://i.pinimg.com/originals/e4/c1/57/e4c157372efb0c3778234779a45e6c66.jpg';
    filmImage.alt='Nah';
    filmImage.style="width: 15rem; max-height: 90vh; margin-top:25px";

    let list=document.createElement('ul');
    let date=document.createElement('li');
    date.innerText='Release Date: '+response.release_date;
    let director=document.createElement('li');
    director.innerText='Director: '+response.director;
    let producer=document.createElement('li');
    producer.innerText='Producer: '+response.producer;
    let score=document.createElement('li');
    score.innerText='Score: '+response.rt_score;
    let id=document.createElement('li');
    id.innerText='ID: '+response.id;
    list.append(date,director,producer,score,id);

    let description=document.createElement('div');
    description.style.maxWidth='30vw';
    description.innerText=response.description;

    divModal.append(header);    
    divModal.innerHTML+='<hr>';
    divModal.append(filmImage,list);
    divModal.innerHTML+='<hr>';
    divModal.append(description);
    document.getElementById('bCerrar').addEventListener('click',(e)=>{
        e.target.parentNode.parentNode.style.display='none';        
    });  
}
document.getElementById('form').addEventListener('keypress',(e)=>{
    if (e.keyCode==13) {
        e.preventDefault();
        loadDoc();
    }
})

function regexTitle(title,filmName){
    let str=title.toLowerCase();
    let regex=new RegExp(filmName.toLowerCase());
    return regex.test(str);
}