const inpNavn = document.querySelector("#inpNavn");
const inpType = document.querySelector("#inpType");
const inpPris = document.querySelector("#inpPris");
const inpRabatt = document.querySelector("#inpRabatt");
const info = document.querySelector("#info");
const btn = document.querySelector("#btn");


const db = firebase.firestore();
const mb = db.collection("møbelbutikk");
const mt = db.collection("møbeltransaksjoner");

const leggIHandlekurv = (id, navn, pris, rabatt) => {
    mt.add({
        transaksjonstidspunkt: firebase.firestore.FieldValue.serverTimestamp(),
        id: id,
        navn: navn,
        pris: pris,
        rabatt: rabatt
    });
}

const visId = (id, navn, pris, rabatt) => {
    const hidden = document.querySelector("#h" + id);
    if (hidden.style.display === "none") {
        hidden.style.display = "block";
        // hidden.style.animation = "blink 2s";
    } else {
       hidden.style.display = "none";
    }

    leggIHandlekurv(id, navn, pris, rabatt);
}

let active = true;
const lesMer = (id) => {
    const i = document.querySelector("#i" + id);
    const mer = document.querySelector("#mer" + id);

    if(active ) {
        i.style.height = "100%";
        mer.innerHTML = "Skjul";
    } else {
        i.style.overflow = "hidden";
        i.style.height = "35px";
        mer.innerHTML = "Les mer";
    }
    active = !active;
}



mb.onSnapshot(snap => {
    info.innerHTML = ``;
  
    for(const mobel of snap.docs) {
        let prisKlasse = ""
        let rabattKlasse = ""

        if(mobel.data().rabatt > 0) {
            prisKlasse = "line-through";
            rabattKlasse = "color-red";
        } else {
            prisKlasse = "display-none";
        }
    
        info.innerHTML += `
            <article class="mobler" id="${mobel.id}">
                <div class="hidden" style="display: none" id="h${mobel.id}">${mobel.id}</div>
                <img class="produktimg" src="${mobel.data().img}">
                <h2>${mobel.data().navn}</h2>
                <p>${mobel.data().type}</p>

                <p class="kr ${prisKlasse}">${mobel.data().pris},-</p>
                <p class="rabatt ${rabattKlasse}">${Math.round(mobel.data().pris*((100-mobel.data().rabatt)/100))},-</p>
                <img onclick="visId('${mobel.id}', '${mobel.data().navn}', ${mobel.data().pris}, ${mobel.data().rabatt})" class="handlekurv" src="./images/cart.png">
                <p class="i" id="i${mobel.id}">${mobel.data().i}</p>
                <p class="lesMer" id="mer${mobel.id}" onclick=lesMer("${mobel.id}")>Les mer</p>
            </article>
        `;
    
    }
})


const infoHandlekurv = document.querySelector("#infoHandlekurv")
const handleliste = document.querySelector("#handleliste")



mt.onSnapshot(snap => {
    handleliste.innerHTML = `
    <h4>Transaksjonstidspunkt</h4>
    <h4>Navn</h4>
    <h4>Pris</h4>

    `;

    for(const mobeltransaksjon of snap.docs) {
    

        if(mobeltransaksjon.data().rabatt > 0) {
            prisKlasse = "line-through";
            rabattKlasse = "color-red";
        } else {
            prisKlasse = "display-none";
        }
    
        handleliste.innerHTML += `
        <p>${mobeltransaksjon.data().transaksjonstidspunkt.toDate()}</p>
        <p>${mobeltransaksjon.data().navn}</p>
        <p>${Math.round(mobeltransaksjon.data().pris*((100-mobeltransaksjon.data().rabatt)/100))},-</p>
        `;
    }
})