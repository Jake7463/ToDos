 var arr = [];

const tasksUL = document.createElement("ul");
tasksUL.setAttribute("id","taskList");
const rep = document.querySelector("#represent");
rep.appendChild(tasksUL);

function newElement(t,d,p){
    Array.prototype.forEach.call(document.querySelectorAll(".taskItems"), function(element){
        // tasksUL.removeChild(element);
    });
    // for (i=0; i<arr.length; i++){
        const li = document.createElement("li");
        li.setAttribute("class","taskItems");
        const check = document.createElement("input");
        check.setAttribute("type","checkbox",);
        check.setAttribute("class","taskCheck",);
        const taskName = document.createElement("p");
        taskName.innerHTML = t;
        taskName.setAttribute("class","taskName");
        const priority = document.createElement("img");
        let prioritySet = "Images1/nothing.png";
        if(p.includes("Low")){
            prioritySet = "Images1/Blue.png";
        }else if(p.includes("Medium")){
            prioritySet = "Images1/Green.png";
        }else if(p.includes("High")){
            prioritySet = "Images1/Orange.png";
        }else if(p.includes("Extreme")){
            prioritySet = "Images1/Red.png";
        }
        priority.setAttribute("src", prioritySet);
        priority.setAttribute("class","taskPrio");
        priority.setAttribute("alt","Priority indicator");
        const dateTime = document.createElement("p");
        dateTime.innerHTML = d;
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
    // }
}

document.querySelector("#submitBtn").addEventListener("click", function (e){
    e.preventDefault();
    if (document.querySelector("#addTask").value.length > 0){
    const text = document.querySelector("#addTask").value;
    const date = document.querySelector("#pickDate").value;
    const prio = document.querySelector("#pickPrio").innerHTML;
    const obj ={
        text: text,
        date: date,
        prio: prio,
    };
    arr.push(obj);
    const arrowImg = document.createElement("img");
    arrowImg.setAttribute("src", "Images1/arrowDown.png");
    arrowImg.setAttribute("style", "width: 17px;");
    arrowImg.setAttribute("alt", "priority");
    document.querySelector("#addTask").value = "";
    document.querySelector("#pickDate").value = "";
    document.querySelector("#pickPrio").innerHTML = "Priority";
    document.querySelector("#pickPrio").appendChild(arrowImg);
    newElement(text,date,prio);
    }else{
        alert("Please write a task");
        document.querySelector("#addTask").focus();
    }
});


document.querySelector("#pickPrio").addEventListener("click", function(e) {
    e.stopPropagation();
    const prioMenu = document.querySelector("#prioMenu");
    prioMenu.style.display = "flex";
    document.querySelectorAll(".prioItemImage").forEach(item => {
        item.addEventListener("click", function (e) {
            e.stopImmediatePropagation();
            document.querySelector("#pickPrio").innerHTML = e.target.parentElement.innerHTML;
            prioMenu.style.display = "none";
        })
    })
    document.querySelectorAll(".prioItems").forEach(item => {
      item.addEventListener("click", function(e) {
        document.querySelector("#pickPrio").innerHTML = e.target.innerHTML;
      });
    });
    if(prioMenu.style.display === "flex"){
        document.querySelector("body").addEventListener("click", function() {
            prioMenu.style.display = "none";
          });
    }
  });

// Array.prototype.forEach.call(document.querySelectorAll(".taskCheck"), function(element){
//     element.target.checked = true;
// })

document.querySelector("#LD").addEventListener("click", function (e){
    document.querySelector("#knob").classList.toggle("move-right");
});

// Tring to set the value of the due date automatically to today, failed so far.
document.querySelector("#pickDate").setAttribute("value",new Date());

