// var arr = [];

// //Create div for the settings panel
// const div = document.createElement("div");
// div.setAttribute("class","settingsTouch");
// const settingsImg = document.createElement("img");
// settingsImg.setAttribute("src","Images1/3dot.png");
// settingsImg.setAttribute("class","settingsimg");
// settingsImg.setAttribute("alt","task settings");
// const settingsUL = document.createElement("ul");
// settingsUL.setAttribute("class","settingsPanel");
// const editLi = document.createElement("li","Edit");
// editLi.setAttribute("class", "settingsItems");
// const duplicateLi = document.createElement("li","Duplicate");
// duplicateLi.setAttribute("class", "settingsItems");
// const deleteLi = document.createElement("li","delete");
// deleteLi.setAttribute("class", "settingsItems");
// settingsUL.appendChild(editLi);
// settingsUL.appendChild(deleteLi);
// settingsUL.appendChild(duplicateLi);
// div.appendChild(settingsImg);
// div.appendChild(settingsUL);
// const tasksUL = document.querySelector("#taskList")

// function newElement(){
// arr.forEach((el)=>{
//     const li = document.createElement("li");
//     li.setAttribute("class","taskItems");
//     const check = document.createElement("input");
//     check.setAttribute("type","checkbox",);
//     check.setAttribute("class","taskCheck",);
//     const taskName = document.createElement("p");
//     taskName.innerHTML = el.text;
//     taskName.setAttribute("class","taskName");
//     const priority = document.createElement("img");
//     const prioritySet = function (){
//         switch(el.prio){
//             case "low":
//                 return "Images/Blue.png";
//                 break;
//             case "medium":
//                 return "Images/Green.png";
//                 break;
//             case "high":
//                 return "Images/Orange.png";
//                 break;
//             case "extreme":
//                 return "Images/Red.png";
//                 break;
//             default:
//                 return "";
//         }
//     }
//     priority.setAttribute("src",prioritySet);
//     priority.setAttribute("class","taskPrio");
//     priority.setAttribute("alt","Priority indicator");
//     const dateTime = document.createElement("p");
//     dateTime.innerHTML = el.date;
//     dateTime.setAttribute("class","dateTime");
//     li.appendChild(check);
//     li.appendChild(taskName);
//     li.appendChild(priority);
//     li.appendChild(dateTime);
//     li.appendChild(div);
//     tasksUL.appendChild(li);
// })
// }

// function handleSubmit(e){
//     e.preventDefault();
//     const text = document.querySelector("#addTask").value;
//     const date = document.querySelector("#pickDate").value;
//     const prio = document.querySelector("#pickPrio").value;
//     const obj ={
//         text: text,
//         date: date,
//         prio: prio,
//     };
//     arr.push(obj);
//     newElement();
// }

