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
        el.addEventListener('click', (e) => {})
    })
}
render();