import data from "./api/defaultData.js";

if(!localStorage.getItem("dataReplace")){
    localStorage.setItem("dataReplace", JSON.stringify(data))
}
let arr = JSON.parse(localStorage.getItem("dataReplace"));