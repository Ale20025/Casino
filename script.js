let AlePuntos = Number(localStorage.getItem("AlePuntos")) || 0;
let Iguales=0;
let Aceptar=document.getElementById("Aceptar");
let Advertencia=document.getElementById("Advertencia");
let Sonido1=document.getElementById("Sonido1");
let Sonido2=document.getElementById("Sonido2");
let Sonido3=document.getElementById("Sonido3");
let Sonido4=document.getElementById("Sonido4");
let Sonido5=document.getElementById("Sonido5");
let Sonido6=document.getElementById("Sonido6");
let Sonido7=document.getElementById("Sonido7");
let Sonido8=document.getElementById("Sonido8");
let Back=document.getElementById("Back");
let Musica=document.getElementById("Musica");
let Sonido=document.getElementById("Sonido");
let Objetos=[
    document.getElementById("Objeto1"),
    document.getElementById("Objeto2"),
    document.getElementById("Objeto3")
]

let Simbolos = [
    {nombre:"pipis", imagen:"imagenes/pipis.jpeg", peso:30},
    {nombre:"odio", imagen:"imagenes/odio.jpeg", peso:5},
    {nombre:"luz", imagen:"imagenes/puro.jpeg", peso:10},
    {nombre:"malo", imagen:"imagenes/gaton.jpeg", peso:25},
    {nombre:"bueno", imagen:"imagenes/gatob.jpeg", peso:30}
];

let Boton=document.getElementById("Jugar");
let Ingreso=document.getElementById("Ingreso");
let Nota=document.getElementById("Nota");
let Dinero=document.getElementById("Alepuntos");

Aceptar.addEventListener("click", function(){
    Sonido6.play();
    Advertencia.style.display="none";
});

ActualizarAlePuntos();

function GuardarPuntos(){
    localStorage.setItem("AlePuntos",AlePuntos);
    ActualizarAlePuntos();
}


function ActualizarAlePuntos(){

    Dinero.textContent = AlePuntos+" Alepuntos";

}

function ElegirSimbolo(){
    let total=0;

    for(let s of Simbolos){
        total+=s.peso;
    }

    let random=Math.random() * total;

    let acumulado=0;

    for(let s of Simbolos){
        acumulado+=s.peso;

        if(random<acumulado){
            return s;
        }
    }
}







Boton.addEventListener("click", function(){
    Sonido1.play();
    Girar();
    Ingreso.value = "";
});

function Girar(){
    let Apuesta = Number(Ingreso.value.trim());
    console.log(Ingreso);
    console.log(Apuesta);

    if(Apuesta<0){
        Nota.textContent="Porque apostarias eso?";
        return;
    }

    else if(Apuesta==0){
        Nota.textContent="Si quiera apostaste algo";
        return;
    }

    else if(Apuesta > AlePuntos){
        Nota.textContent = "No tienes ese dinero *le escupe* vete pobre";
        return;
    }

    AlePuntos-=Apuesta;
    localStorage.setItem("AlePuntos", AlePuntos);
    ActualizarAlePuntos();

    let Contador=0;

    let animacion=setInterval(function(){

// Animación 
        Objetos[0].style.backgroundImage = `url(${Simbolos[Math.floor(Math.random()*Simbolos.length)].imagen})`;
        Objetos[1].style.backgroundImage = `url(${Simbolos[Math.floor(Math.random()*Simbolos.length)].imagen})`;
        Objetos[2].style.backgroundImage = `url(${Simbolos[Math.floor(Math.random()*Simbolos.length)].imagen})`; 
        Contador++;
        if(Contador > 15){
            clearInterval(animacion);
            // Resultado
            let a = ElegirSimbolo();;
            let b = ElegirSimbolo();;
            let c = ElegirSimbolo();;

            Objetos[0].style.backgroundImage = `url(${a.imagen})`;
            Objetos[1].style.backgroundImage = `url(${b.imagen})`;
            Objetos[2].style.backgroundImage = `url(${c.imagen})`;
            
            //Premio
            let Simbolo;

            if(a.nombre == b.nombre && b.nombre == c.nombre){
                Simbolo = a.nombre;
                Iguales=3;
            }
            else if(a.nombre==b.nombre){
                Simbolo=a.nombre;
                Iguales=2;
            }
            else if(a.nombre == c.nombre){
                Simbolo=a.nombre;
                Iguales=2;
            }
            else if(b.nombre == c.nombre){
                Simbolo=b.nombre;
                Iguales=2;
            }
            else{
                Iguales=0;
            }

            console.log(a.nombre, b.nombre, c.nombre);
            console.log("Iguales:", Iguales); 
            console.log("Símbolo:", Simbolo);

            if(Iguales==3){
                switch(Simbolo){
                    case"bueno":
                        AlePuntos+=Apuesta*3;
                        GuardarPuntos();
                        Nota.textContent="QUE?! NO DEBIAS GANAR.";
                        Sonido3.play();
                        break;

                    case"malo":
                        AlePuntos-=Apuesta;
                        GuardarPuntos();
                        Nota.textContent="Merjor retirate o perderas mas";
                        Sonido2.play();
                        break;
                
                    case"luz":
                        AlePuntos+=250000;
                        GuardarPuntos();
                        Nota.textContent="FELICIDADES! ERES DE LA ALTA SOCIEDAD AHORA";
                        Sonido7.play();
                        break;
                        
                    case"odio":
                        AlePuntos=0;
                        GuardarPuntos();
                        Nota.textContent="Tus Alepuntos ya no seran mas tuyos lo siento";
                        Sonido8.play();
                        break;

                    case"pipis":
                        AlePuntos+=Math.floor(Apuesta*0.5);
                        GuardarPuntos();
                        Nota.textContent="Ganaste 3 pipis... ellos te regresan algunos Alepuntos";
                        Sonido5.play();                        
                        break;
                }    
            }
            else if(Iguales==2){
                switch(Simbolo){
                    case"bueno":
                        AlePuntos +=Apuesta*2;
                        GuardarPuntos();
                        Nota.textContent="Solo fue suerte esta vez";
                        Sonido3.play();
                        break;

                    case"malo":
                        AlePuntos -= Math.floor(Apuesta * 0.50);
                        GuardarPuntos();
                        Nota.textContent="Tomare un poco mas, gracias por perder";
                        Sonido2.play();
                        break;

                    case"luz":
                        AlePuntos +=Apuesta;
                        GuardarPuntos();
                        Nota.textContent="Solo te devolvere la apuesta";
                        Sonido7.play();
                        break;

                    case"odio":
                        AlePuntos += Apuesta;
                        GuardarPuntos();       
                        Nota.textContent="Solo te devolvere la apuesta";
                        Sonido8.play();
                        break;

                    case"pipis":
                        GuardarPuntos();
                        Nota.textContent="Solo ganaste 2 pipis";
                        Sonido5.play();
                        break;
                }
            }
            else{
                GuardarPuntos();
                Nota.textContent="Perdiste... juega de nuevo para perder mas"
                Sonido4.play();
            }
            ActualizarAlePuntos();
            console.log(Simbolo);

            }



        
    },80);
}

Back.addEventListener("click", function(){
    setTimeout(function(){
        Sonido1.play();
    },500); 
    setTimeout(function(){
        
        window.location.href = "https://ale20025.github.io/Tienda/";
    },1000); 
});

Sonido.addEventListener("click", function () {

    if(Musica.paused){
        Musica.play();
        Sonido.style.backgroundImage=`url("imagenes/audioff.jpeg")`;
        console.log(Sonido.style.backgroundImage);
    }

    else{
        Musica.pause();
        Sonido.style.backgroundImage=`url("imagenes/audion.jpeg")`;
        console.log(Sonido.style.backgroundImage);
    }
});
