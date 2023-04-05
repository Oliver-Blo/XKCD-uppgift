window.onload = function(){
    //ger maxcomic ett värde
    document.maxComic = -1;

    //fetchar data för serien så att all info kan skrivas
    getComic("latest");

     //Hoppar till första serien när man klickar på knappen
    document.getElementById('forsta').addEventListener('click',function(){getComic(1)})

    //Hoppar till sista serien när man klickar på knappen
    document.getElementById('sista').addEventListener('click',function(){getComic("latest")})

    //Hoppar till slumpmässig serie när man klickar på knappen
    document.getElementById('slumpa').addEventListener('click',function(){getComic(Math.floor(Math.random() * document.maxComic) +1)})

  
    /*Om man är på första serien och trycker på förra, hoppar den till sista serien. 
    Annars hoppar den bakåt ett steg om man trycker på förra knappen*/
    document.getElementById('forra').addEventListener('click',function(){
    if(document.currentComic==1){
        getComic("latest")

    }else(getComic(document.currentComic -1))
    })

    /*Om man är på sista serien och trycker på nästa, hoppar den till första serien. 
    Annars hoppar den framåt ett steg om man trycker på nästa knappen*/
    document.getElementById('nasta').addEventListener('click',function(){
        if(document.currentComic==document.maxComic){
            getComic(1)
    
        }else(getComic(document.currentComic +1))
    
        })
}

//Väljer hemsidan som den hämtar informationen ifrån
function getComic(which){
    fetch('https://xkcd.vercel.app/?comic='+which)
    .then(function(response){
        if(response.status==200){
            return response.json();
        }
    })
    .then(function(data){
        if(document.maxComic<data.num){
            document.maxComic=data.num
        }
        appendComic(data);
    })
}

function appendComic(data){

    //Hämtar titeln av serien och skriver det på sidan
    console.log(data);
    let text = document.createElement('p');
    text.innerHTML = data.title;

    let mainComic= document.getElementById('mainComic');
    mainComic.innerHTML="";
    mainComic.appendChild(text);

    //Hämtar datumet från hemsidan och skickar den till mainComic
    let date = document.createElement("date");
    let datum = new Date(data.year, data.month -1, data.day);
    date.innerHTML = datum.toLocaleDateString();
    mainComic.appendChild(date);

    //Hämtar numret på nuvarande serie
    document.currentComic = data.num;

    //Läser bilden från sidan och skriver ut den på sidan

    let fig = document.createElement("figure");

    let image = document.createElement("img");
    image.src = data.img;
    image.alt

    let cap = document.createElement("figcaption");
    cap.innerHTML = ""+data.num;

    fig.appendChild(image);
    fig.appendChild(cap);
    mainComic.appendChild(fig);
}