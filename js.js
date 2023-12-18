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
addButton.onclick = () => {
    const newItemName = prompt("write item name or change item name");
    const newItemRepl = prompt("write item replacer");
    if(confirm(`add Item name ${newItemName} and replacer ${newItemRepl}?`)){
        let find = false;
        for(let i = 0; i < arr.length; i++){
            if(arr[i].name === newItemName){
                arr[i].replace = newItemRepl;
                find = true;
                render();
                break;
            }
        }
        if(!find){
            arr.push({
                name: newItemName,
                replace: newItemRepl,
                check: true,
                ignore: false,
            })
            tableElm.innerHTML += `<td>${newItemName}</td><td>${newItemRepl}</td><td><input type="checkbox" checked></td><input type="checkbox" class="ignoreCase ignoreCase" checked></td>`
        }
        localStorage.setItem("dataReplace", JSON.stringify(arr));
    }
}
deleteButton.onclick = () => {
    const nameItem = prompt("write name item (delete it?)")
    let index;
    console.log("loading...")
    for(let i = 0; i < arr.length; i++){
        if(arr[i].name === nameItem){
            index = i;
            break;
        }
    }
    console.clear()
    if(index ===undefined){
        alert("can't find item")
        return;
    }
    if(confirm(`delete item name=${arr[index].name} and value=${arr[index].replace} ?`)){
        arr.splice(index, 1);
        localStorage.setItem("dataReplace", JSON.stringify(arr));
        render();
    }
}
function convert(){
    console.info("loading...")
    for(let i = 0; i < arr.length; i++){
        const elm = arr[i];
        const pattern = new RegExp(elm.name, `g${elm.ignore ? "i" : ""}`);
        if(elm.check){
            textArea.value = textArea.value.replaceAll(pattern, elm.replace);
        }
    }
    textArea.value = textArea.value.trim();
    console.clear();
}
document.getElementById("replace").onclick = () => convert();
document.addEventListener("keypress", (e) => {
    if(e.key == "Enter"){
        convert();
    }
})