 var arr = [];

const tasksUL = document.createElement("ul");
tasksUL.setAttribute("id","taskList");
const rep = document.querySelector("#represent");
rep.appendChild(tasksUL);

function newElement(){
    Array.prototype.forEach.call(document.querySelectorAll(".taskItems"), function(element){ 
        tasksUL.removeChild(element);
    });
    for (i=0; i<arr.length; i++){
        const li = document.createElement("li");
        li.setAttribute("class","taskItems");
        const check = document.createElement("input");
        check.setAttribute("type","checkbox",);
        check.setAttribute("class","taskCheck",);
        const taskName = document.createElement("p");
        taskName.innerHTML = arr[i].text;
        taskName.setAttribute("class","taskName");
        const priority = document.createElement("img");
        const prioritySet = function (){
            switch(arr[i].prio){
                case "low":
                    return "Images/Blue.png";
                    break;
                case "medium":
                    return "Images/Green.png";
                    break;
                case "high":
                    return "Images/Orange.png";
                    break;
                case "extreme":
                    return "Images/Red.png";
                    break;
                default:
                    return "";
            }
        }
        priority.setAttribute("src",prioritySet);
        priority.setAttribute("class","taskPrio");
        priority.setAttribute("alt","Priority indicator");
        const dateTime = document.createElement("p");
        dateTime.innerHTML = arr[i].date;
        dateTime.setAttribute("class","dateTime");
        tasksUL.appendChild(li);
        li.appendChild(check);
        li.appendChild(taskName);
        li.appendChild(priority);
        li.appendChild(dateTime);
        const div = document.createElement("div");
        div.setAttribute("class","settingsTouch");
        const settingsImg = document.createElement("img");
        settingsImg.setAttribute("src","Images1/3dot.png");
        settingsImg.setAttribute("class","settingsimg");
        settingsImg.setAttribute("alt","task settings");
        const settingsUL = document.createElement("ul");
        settingsUL.setAttribute("class","settingsPanel");
        const editLi = document.createElement("li");
        editLi.innerHTML = "Edit";
        editLi.setAttribute("class", "settingsItems");
        const duplicateLi = document.createElement("li");
        duplicateLi.innerHTML = "Duplicate";
        duplicateLi.setAttribute("class", "settingsItems");
        const deleteLi = document.createElement("li");
        deleteLi.innerHTML = "Delete";
        deleteLi.setAttribute("class", "settingsItems");
        settingsUL.appendChild(duplicateLi);
        settingsUL.appendChild(editLi);
        settingsUL.appendChild(deleteLi);
        div.appendChild(settingsImg);
        div.appendChild(settingsUL);
        li.appendChild(div);
    }
}

document.querySelector("#submitBtn").addEventListener("click", function (e){
    e.preventDefault();
    const text = document.querySelector("#addTask").value;
    const date = document.querySelector("#pickDate").value;
    const prio = document.querySelector("#pickPrio").value;
    const obj ={
        text: text,
        date: date,
        prio: prio,
    };
    arr.push(obj);
    newElement();
});

document.querySelector("#pickPrio").addEventListener("click", function o(){
    const prioMenu = document.querySelector("#prioMenu");
    prioMenu.setAttribute("style", "display: flex");
    // document.querySelectorAll(".prioItems").addEventListener("click", function(e){
    //     document.querySelector("#pickPrio").innerHTML = e.innerHTML;
    // })
    document.querySelector(body).addEventListener("click", function c(){
        prioMenu.setAttribute("style", "display: none");
    })
})

const test2 = [];
