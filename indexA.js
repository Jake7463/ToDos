 var arr = [];

const tasksUL = document.createElement("ul");
tasksUL.setAttribute("id","taskList");
const rep = document.querySelector("#represent");
rep.appendChild(tasksUL);
  
function newElement(t,d,p){
    // Array.prototype.forEach.call(document.querySelectorAll(".taskItems"), function(element){
    //     tasksUL.removeChild(element);
    // });
    // for (i=0; i<arr.length; i++){
        const li = document.createElement("li");
        li.setAttribute("class","taskItems");
        const check = document.createElement("input");
        check.setAttribute("type","checkbox",);
        check.setAttribute("class","taskCheck",);
        check.setAttribute("name","taskCheck",);
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
        }else{ prioritySet = "Images1/nothing.png"};
        priority.setAttribute("src", prioritySet);
        priority.setAttribute("class","taskPrio");
        priority.setAttribute("alt","Priority indicator");
        const dateTime = document.createElement("p");
        d != "" ? dateTime.innerHTML = d : dateTime.innerHTML ="- - - - - - - -";
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

    // Open/close priority dropdown list + display choice.
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
document.querySelector("#LD").addEventListener("click", function (e){
    document.querySelector("#knob").classList.toggle("move-right");
});

// Trying to set the value of the due date automatically to today, failed so far (wrong format for the input type).
    // document.querySelector("#pickDate").setAttribute("value",new Date());

    //  Applies strikethrough and BG color for a task when checkbox is checked.
Array.prototype.forEach.call(document.querySelectorAll(".taskCheck"), checkbox => {
    checkbox.addEventListener("click", e => {
        e.stopPropagation();
        if (e.target.checked) {
            checkbox.closest('.taskItems').style.textDecoration = 'line-through';
            checkbox.closest('.taskItems').style.backgroundColor = '#EFF6E8';
        }else{
            checkbox.closest('.taskItems').style.textDecoration = 'none';
            checkbox.closest('.taskItems').style.backgroundColor = '#fff';
        }
    });
});


// Task settings (currently only open/close)

Array.prototype.forEach.call(document.querySelectorAll(".settingsTouch"), panel => {
    panel.addEventListener("click", e => {
    e.stopPropagation();
        panel.querySelector(".settingsPanel").style.display = "flex";
    });
    if (panel.querySelector(".settingsPanel").style.display == "flex"){
        //Edit event listener (soon to be)
        //Duplicate event listener (soon to be)
        //Delete event listener (soon to be)
    };
    panel.querySelector(".settingsPanel").addEventListener("click", e => {
        e.stopImmediatePropagation();
        panel.querySelector(".settingsPanel").style.display = "none";
    });
    document.querySelector("body").addEventListener("click", e => {
        panel.querySelector(".settingsPanel").style.display = "none";
    });
});


//  Open/close filter panel.

document.querySelector(".filterTouch").addEventListener("click", e => {
    e.stopPropagation();
        document.querySelector("#filterPanel").style.display = "flex";
    if (document.querySelector("#filterPanel").style.display == "flex"){
    }
    document.querySelector("body").addEventListener("click", e => {
        document.querySelector("#filterPanel").style.display = "none";

    })
});


    // Takes the filters true/false after applied and filters tasks list.
function applyFilter(done, today, low, medium, high, extreme){
    document.querySelector("#filterPanel").style.display = "none";
        Array.prototype.forEach.call(document.querySelectorAll(".taskItems"), item => {
            if (!done && item.querySelector(".taskCheck").checked){
                show1 = false;
            } else { show1 = true;}
            if (!low && item.querySelector(".taskPrio").getAttribute("src").endsWith("Images1/Green.png")){
                show2 = false;
            }else { show2 = true;}
            if (!medium && item.querySelector(".taskPrio").getAttribute("src").endsWith("Images1/Blue.png")){
                show3 = false;
            } else { show3 = true;}
            if (!high && item.querySelector(".taskPrio").getAttribute("src").endsWith("Images1/Orange.png")){
                show4 = false;
            } else { show4 = true;}
            if (!extreme && item.querySelector(".taskPrio").getAttribute("src").endsWith("Images1/Red.png")){
                show5 = false;
            } else { show5 = true;}
            (show1 && show2 && show3 && show4 && show5) ? item.style.display = "flex" : item.style.display = "none";
        });
}

    // Takes the info from filter panel and moves it to the applyFilter function.
document.querySelector("#filterApply").addEventListener("click", e => {
    e.preventDefault();
    e.stopImmediatePropagation();
    const done = document.querySelector("#showDone").checked;
    const today = document.querySelector("#showTodayOnly").checked;
    const low = document.querySelector("#showLow").checked;
    const medium = document.querySelector("#showMedium").checked;
    const high = document.querySelector("#showHigh").checked;
    const extreme = document.querySelector("#showExtreme").checked;
    applyFilter(done, today, low, medium, high, extreme);
})

    //  Sorting image display according to choice
Array.prototype.forEach.call(document.querySelectorAll(".sortLabel"), item => {
    item.addEventListener("click", e => {
        const sortSelector = item.querySelector(".sortSelector");
        const currentSrc = sortSelector.getAttribute("src");
        Array.prototype.forEach.call(document.querySelectorAll(".sortSelector"), selector => {
            if (selector !== sortSelector) {
                selector.setAttribute("src", "Images1/sort.png");
            }
        });
        if (currentSrc === "Images1/sort.png") {
            sortSelector.setAttribute("src", "Images1/sortd.png");
        } else if (currentSrc === "Images1/sortd.png") {
            sortSelector.setAttribute("src", "Images1/sorta.png");
        } else {
            sortSelector.setAttribute("src", "Images1/sort.png");
        }
    });
});
