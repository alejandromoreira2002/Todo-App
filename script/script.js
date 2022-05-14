/*****************
* Created by: Teddy Alejandro Moreira Velez
* A todo App is an application to
* register Todo Activities :D
*****************/

var txtElement;
var activitySection;

window.onload = () =>{
    appearElements();

    const addBtn = document.querySelector("#btn-add-activity");
    const actsSection = document.getElementById("activities-container");
    const newActTxt = document.getElementById('activity-entry');
    const errorMsg = document.getElementById('error-msg');
    const clsEditPanel = document.getElementById('close-edit-panel');

    addBtn.addEventListener('click', () =>{
        
        if(newActTxt.value.trim() != ""){

            if(errorMsg.style.display == "block"){
                errorMsg.style.display = "none";
            }

            //Adding the section
            let act = document.createElement('div');
            act.classList.add('activity-section');

            //Adding the input and text
            let actLabel = document.createElement('label');

            let actCheck = document.createElement('input');
            actCheck.setAttribute('type', 'checkbox');
            actCheck.setAttribute('onchange', 'handleChange(this)');
            actCheck.id = "act-check";
            
            let actTxt = document.createElement('p');
            actTxt.setAttribute('style', 'display:inline');
            actTxt.id = "act-txt";
            let txt = document.createTextNode(newActTxt.value.trim());

            actTxt.appendChild(txt);
            actLabel.appendChild(actCheck);
            actLabel.appendChild(actTxt);
            act.appendChild(actLabel);

            //Adding the mobile options' button
            let btnSlider = document.createElement('button');
            btnSlider.classList.add('opt-slider');
            btnSlider.id = "opt-slider";
            btnSlider.setAttribute('onclick', 'showMobOptions(this)');

            let iconSlider = document.createElement('i');
            iconSlider.classList.add('fa-solid');
            iconSlider.classList.add('fa-chevron-down');

            btnSlider.appendChild(iconSlider);
            act.appendChild(btnSlider);
            
            //Adding the mobile options' div
            let divMobOpts = document.createElement('div');
            divMobOpts.classList.add('mobile-options');
            divMobOpts.id = "mobile-options";

            let ulOpts = document.createElement('ul');

            let liEdit = document.createElement('li');
            let liEditLink = document.createElement('a');
            liEditLink.setAttribute('href', '');
            liEditLink.setAttribute('onclick', 'getTxtElement(this, event)');
            let editTxt = document.createTextNode('Edit');

            liEditLink.appendChild(editTxt);
            liEdit.appendChild(liEditLink);
            ulOpts.appendChild(liEdit);

            let liDel = document.createElement('li');
            let liDelLink = document.createElement('a');
            liDelLink.setAttribute('href', '');
            liDelLink.setAttribute('onclick', 'getActivitySec(this, event)');
            let delTxt = document.createTextNode('Delete');

            liDelLink.appendChild(delTxt);
            liDel.appendChild(liDelLink);
            ulOpts.appendChild(liDel);

            divMobOpts.appendChild(ulOpts);

            act.appendChild(divMobOpts);

            ////Adding the desktop options' div
            let divDeskOpts = document.createElement('div');
            divDeskOpts.classList.add('desktop-edit-btns');

            let editDeskBtn = document.createElement('button');
            editDeskBtn.classList.add('edit-btns');
            editDeskBtn.classList.add('edit-btn');
            editDeskBtn.id = "edit-btn";
            editDeskBtn.setAttribute('onclick', 'getDeskTxtElement(this)');
            let editDeskIcon = document.createElement('i');
            editDeskIcon.classList.add('fa-solid');
            editDeskIcon.classList.add('fa-pen-to-square');
            editDeskBtn.appendChild(editDeskIcon);

            let delDeskBtn = document.createElement('button');
            delDeskBtn.classList.add('edit-btns');
            delDeskBtn.classList.add('delete-btn');
            delDeskBtn.id = "delete-btn";
            delDeskBtn.setAttribute('onclick', 'getDeskActivitySec(this)');
            let delDeskIcon = document.createElement('i');
            delDeskIcon.classList.add('fa-solid');
            delDeskIcon.classList.add('fa-trash');
            delDeskBtn.appendChild(delDeskIcon);

            divDeskOpts.appendChild(editDeskBtn);
            divDeskOpts.appendChild(delDeskBtn);

            act.appendChild(divDeskOpts);
            
            //Appending section in the space
            actsSection.appendChild(act);
            
            closeContMobOpts();
            
            newActTxt.value = "";
        }else{
            errorMsg.style.display = "block";
        }
        
    });

    clsEditPanel.addEventListener('click', () => {
        clsEditPanel.parentNode.parentNode.style.display = "none";
        document.getElementById('edit-info-input').value = "";
    });
}


function appearElements(){
    let h1 = document.querySelector("h1");
    let actEntry = document.querySelector(".activity-entry-content");
    let addButton = document.querySelector(".btn-activity-container");
    
    h1.classList.add("appearH1");
    actEntry.classList.add("appearActEntry");
    addButton.classList.add("appearAddBtn");
}

function showMobOptions(elem){
    let contMobOpts = elem.parentNode.childNodes[2]
    if(contMobOpts.classList.contains('mobile-options-opn')){
        contMobOpts.classList.remove('mobile-options-opn');
    }else{
        closeContMobOpts();
        contMobOpts.classList.add('mobile-options-opn');

    }
}

function closeContMobOpts(){
    let v= document.querySelectorAll('.mobile-options');
    for(let i=0;i<v.length;i++){
        if(v[i].classList.contains('mobile-options-opn')){
            v[i].classList.remove('mobile-options-opn');
        }
    }
}


function handleChange(elem){
    if(elem.checked == true){
        elem.nextSibling.style.textDecoration = "line-through";
        elem.nextSibling.style.color = "rgb(120, 120, 120)";
    }else{
        elem.nextSibling.style.textDecoration = "none";
        elem.nextSibling.style.color = "rgb(65, 65, 65)";
    }
}

function getTxtElement(elem, ev){
    ev.preventDefault();
    txtElement = elem.parentNode.parentNode.parentNode.parentNode.firstChild.childNodes[1];
    editActivity();
}

function getDeskTxtElement(elem){
    txtElement = elem.parentNode.parentNode.firstChild.childNodes[1];
    editActivity();
}

function editActivity(){
    let editPanel = document.getElementById('edit-info-panel');
    editPanel.style.display = "flex";
    let infoCheck = document.getElementById('edit-info-check');
    infoCheck.addEventListener('click', () => {
        let editTxt = document.getElementById('edit-info-input');
        if(editTxt.value.trim() != ""){
            document.getElementById("error-edit-msg").style.display="none";
            txtElement.innerText = editTxt.value;
            editPanel.style.display = "none";
            editTxt.value = "";   
        }else{
            document.getElementById("error-edit-msg").style.display="block";
        }
    });
    closeContMobOpts();
}

function getActivitySec(elem, ev){
    ev.preventDefault();
    activitySection = elem.parentNode.parentNode.parentNode.parentNode;
    deleteActivity();
}

function getDeskActivitySec(elem){
    activitySection = elem.parentNode.parentNode;
    deleteActivity();
}

function deleteActivity(){
    activitySection.parentNode.removeChild(activitySection);
    closeContMobOpts();
}

