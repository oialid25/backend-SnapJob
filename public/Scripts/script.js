const hoverZone = document.getElementById("hover-zone");
const nav = document.getElementById("side-nav");
const main = document.getElementById("main");
hoverZone.onmouseenter = () => {
    nav.style.display = "flex";
};
nav.onmouseleave = () => {
    nav.style.display = "none";
};


function openNewJobPopup(){
    document.getElementById('NewJobPopup').style.display='block';
}

function closeNewJobPopup(){
    document.getElementById('NewJobPopup').style.display='none';
}


function profilpopup() {
    const myform = document.getElementById('modal');
    if (myform.style.display == 'none' ) {
        myform.style.display = 'flex';
    } else {
        myform.style.display = 'none';
    }
}

function experiencepopup() {
    const myform = document.getElementById('modal-Experience');
    if (myform.style.display == 'none'){
        myform.style.display = 'flex';
    } else {
        myform.style.display = 'none';
    }
}


function deletexperiencepopup() {
    const myform = document.getElementById('delet-modal-Experience');
    if (myform.style.display == 'none'){
        myform.style.display = 'flex';
    } else {
        myform.style.display = 'none';
    }
}


function educationpopup() {
    const myform = document.getElementById('modal-Education');
    if (myform.style.display == 'none'){
        myform.style.display = 'flex';
    } else {
        myform.style.display = 'none';
    }
}

function deleteducationpopup() {
    const myform = document.getElementById('delet-modal-Education');
    if (myform.style.display == 'none'){
        myform.style.display = 'flex';
    } else {
        myform.style.display = 'none';
    }
}


function capabilitiepopup() {
    const myform = document.getElementById('modal-capabilitie');
    if (myform.style.display == 'none'){
        myform.style.display = 'flex';
    } else {
        myform.style.display = 'none';
    }
}

function certificationpopup() {
    const myform = document.getElementById("modal-certification");
    if (myform.style.display === "none" ) {
        myform.style.display = "flex";
    } else {
        myform.style.display = "none";
    }
}

function deletcapabilitiespopup() {
    const myform = document.getElementById("delet-modal-Capabilitie");
    if (myform.style.display === "none" ) {
        myform.style.display = "flex";
    } else {
        myform.style.display = "none";
    }
}



function deletcertificationpopup() {
    const myform = document.getElementById("delet-modal-certification");
    if (myform.style.display === "none" ) {
        myform.style.display = "flex";
    } else {
        myform.style.display = "none";
    }
}


function creatcardpopup() {
    const myform = document.getElementById("modal-card");
    if (myform.style.display === "none" ) {
        myform.style.display = "flex";
    } else {
        myform.style.display = "none";
    }
}