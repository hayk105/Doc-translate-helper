import data from "./api/defaultData.js";

if(!localStorage.getItem("dataReplace")){
    localStorage.setItem("dataReplace", JSON.stringify(data))
}
let arr = JSON.parse(localStorage.getItem("dataReplace"));
const tableElm = document.querySelector("tbody");
const addButton = document.getElementById("add")
const deleteButton = document.getElementById("delete")
const textArea = document.querySelector("textarea")

function render(){
    tableElm.innerHTML = ""

    function td(node){
        return `<td>${node.name}</td><td>${node.replace}</td><td><input type="checkbox" class="checkBox" ${node.check ? "checked" : ""}></td><td><input type="checkbox" class="ignoreCase" ${node.ignore ? "checked" : ""}></td>`
    }

    for(let i = 0; i < arr.length; i++){
        tableElm.innerHTML += `<tr>${td(arr[i])}</tr>`
    }
    document.querySelectorAll(".checkBox, .ignoreCase").forEach((el, i) => {
        el.addEventListener('click', (e) => {
            const data = i % 2 == 0 ? "check" : "ignore";
            const checked=  e.target.checked;
            const index = ~~(i/2); //Math.floor
            if(checked){
                arr[index][data] = true;
            }
            else{
                arr[index][data] = false;
            }
            localStorage.setItem("dataReplace", JSON.stringify(arr));
        })
    })
}
render();
addButton.onclick = () => {}