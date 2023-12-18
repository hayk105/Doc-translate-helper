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
}
render();