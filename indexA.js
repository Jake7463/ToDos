 var arr = [];

const tasksUL = document.createElement("ul");
tasksUL.setAttribute("id","taskList");
const rep = document.querySelector("#represent");
rep.appendChild(tasksUL);

function newElement(){
    const arr2 = JSON.parse(localStorage.getItem("tasks"));
    for (i=0; i<arr2.length; i++){
        const li = document.createElement("li");
        li.setAttribute("class","taskItems");
        li.setAttribute("id", arr2[i].id)
        const check = document.createElement("input");
        check.setAttribute("type","checkbox",);
        check.setAttribute("class","taskCheck",);
        check.setAttribute("name","taskCheck",);
        check.checked = arr2[i].isChecked;
        const taskName = document.createElement("p");
        taskName.innerHTML = arr2[i].text;
        taskName.setAttribute("class","taskName");
        const priority = document.createElement("img");
        let prioritySet = "Images1/nothing.png";
        if(arr2[i].prio.includes("Low")){
            prioritySet = "Images1/Blue.png";
        }else if(arr2[i].prio.includes("Medium")){
            prioritySet = "Images1/Green.png";
        }else if(arr2[i].prio.includes("High")){
            prioritySet = "Images1/Orange.png";
        }else if(arr2[i].prio.includes("Extreme")){
            prioritySet = "Images1/Red.png";
        }else{ prioritySet = "Images1/nothing.png"};
        priority.setAttribute("src", prioritySet);
        priority.setAttribute("class","taskPrio");
        priority.setAttribute("alt","Priority indicator");
        const dateTime = document.createElement("p");
        arr2[i].date != "" ? dateTime.innerHTML = arr2[i].date : dateTime.innerHTML = " - ";
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
    // Checkbox application
    Array.prototype.forEach.call(document.querySelectorAll(".taskCheck"), checkbox => {
        checkbox.addEventListener("click", e => {
            e.stopPropagation();
            if (e.target.checked) {
                checkbox.closest('.taskItems').style.textDecoration = 'line-through';
                checkbox.closest('.taskItems').style.backgroundColor = '#EFF6E8';
                // for (i=0; i<arr2.length; i++){
                //     e.target.closest("li").id == arr2[i].id ? arr2[i].isChecked = true : arr2[i].isChecked = false;
                // }
            }else{
                checkbox.closest('.taskItems').style.textDecoration = 'none';
                checkbox.closest('.taskItems').style.backgroundColor = '#fff';
            }
        });
    });
    // // Task settings
    // Array.prototype.forEach.call(document.querySelectorAll(".settingsTouch"), panel => {
    //     panel.addEventListener("click", e => {
    //         e.stopPropagation();
    //         panel.querySelector(".settingsPanel").style.display = "flex";
    //         if (panel.querySelector(".settingsPanel").style.display === "flex"){
    //             e.stopImmediatePropagation();
    //             //Edit event listener (soon to be)
    //             const dupe = panel.querySelector("#duplicate");
    //             dupe.addEventListener("click", e=>{
    //                 const text = panel.closest(".taskItems").querySelector(".taskName").innerHTML;
    //                 const date = panel.closest(".taskItems").querySelector(".dateTime").innerHTML;
    //                 let prio = panel.closest(".taskItems").querySelector(".taskPrio").src;
    //                 if (prio.endsWith("Blue.png")){
    //                     prio = "Low";
    //                 }else if (prio.endsWith("Green.png")){
    //                     prio = "Medium";
    //                 }else if (prio.endsWith("Orange.png")){
    //                     prio = "High";
    //                 }else if (prio.endsWith("Red.png")){
    //                     prio = "Extreme";
    //                 }else {prio = "empty"};
    //                 const obj ={
    //                     id: new Date().getTime(),
    //                     text: text,
    //                     date: date,
    //                     prio: prio,
    //                     isChecked: panel.closest("li").querySelector(".taskCheck"),
    //                 };
    //                 console.log(obj);
    //                 arr.push(obj);
    //                 newElement(text,date,prio);
    //             });
    //             panel.querySelector("#delete").addEventListener("click", e=>{
    //                 const closestLi = panel.closest(".taskItems");
    //                 closestLi.remove();
    //             })
    //             Array.prototype.forEach.call(document.querySelectorAll(".settingsimg"), panel2 => {
    //                 panel2.addEventListener("click", e => {
    //                     if (panel.querySelector(".settingsimg") !== panel2){
    //                         // const display = panel2.querySelector(".settingsPanel").style.display
    //                         panel.querySelector(".settingsPanel").style.display = "none";
    //                     }
    //                 });
    //             });
    //         };
    //         panel.querySelector(".settingsPanel").addEventListener("click", e => {
    //             e.stopImmediatePropagation();
    //             panel.querySelector(".settingsPanel").style.display = "none";
    //         });
    //         document.querySelector("body").addEventListener("click", e => {
    //             panel.querySelector(".settingsPanel").style.display = "none";
    //         });
    //     });
    // });
}

document.querySelector("#submitBtn").addEventListener("click", function (e){
    // e.preventDefault();
    if (document.querySelector("#addTask").value.length > 0){
    const text = document.querySelector("#addTask").value;
    const dateAll = new Date(document.querySelector("#pickDate").value);
    const date = (dateAll.getMonth()+1)+"/"+dateAll.getDate()+"/"+dateAll.getFullYear()+" "+dateAll.getHours()+":"+dateAll.getMinutes();
    const prio = document.querySelector("#pickPrio").innerHTML;
    const id = new Date().getTime();
    const isChecked = false;
    const obj ={
        id: id,
        text: text,
        date: date,
        prio: prio,
        check: isChecked,
    };
    arr.push(obj);
    Array.prototype.forEach.call(document.querySelectorAll(".taskItems"), function(element){
        for (i=0; i<arr.length; i++){
            if (arr[i].id == element.id){
                arr[i].text = element.querySelector(".taskName").innerHTML;
                arr[i].date = element.querySelector(".dateTime").innerHTML;
                arr[i].prio = element.querySelector(".taskPrio").innerHTML;
                arr[i].isChecked = element.querySelector(".taskCheck").checked;
            }
        };
        element.remove();
    });
    localStorage.setItem("tasks", JSON.stringify(arr));
    const arrowImg = document.createElement("img");
    arrowImg.setAttribute("src", "Images1/arrowDown.png");
    arrowImg.setAttribute("style", "width: 17px;");
    arrowImg.setAttribute("alt", "priority");
    document.querySelector("#addTask").value = "";
    document.querySelector("#pickDate").value = new Date().toISOString().slice(0, 16);;
    document.querySelector("#pickPrio").innerHTML = "Priority";
    document.querySelector("#pickPrio").appendChild(arrowImg);
    newElement();
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


    // Set the value of the due date automatically to today
document.querySelector("#pickDate").setAttribute("value",new Date().toISOString().slice(0, 16));

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


// Task settings

Array.prototype.forEach.call(document.querySelectorAll(".settingsTouch"), panel => {
    panel.addEventListener("click", e => {
        e.stopPropagation();
        panel.querySelector(".settingsPanel").style.display = "flex";
        const flex = panel.querySelector(".settingsPanel").style.display;
        if (panel.querySelector(".settingsPanel").style.display === "flex"){
            //Edit event listener (soon to be)
            panel.querySelector("#duplicate").addEventListener("click", e=>{
                const text = panel.closest(".taskItems").querySelector(".taskName").innerHTML;
                const date = panel.closest(".taskItems").querySelector(".dateTime").innerHTML;
                let prio = panel.closest(".taskItems").querySelector(".taskPrio").src;
                if (prio.endsWith("Blue.png")){
                    prio = "Low";
                }else if (prio.endsWith("Green.png")){
                    prio = "Medium";
                }else if (prio.endsWith("Orange.png")){
                    prio = "High";
                }else if (prio.endsWith("Red.png")){
                    prio = "Extreme";
                }else {prio = "empty"};
                const obj ={
                    text: text,
                    date: date,
                    prio: prio,
                };
                console.log(obj);
                arr.push(obj);
                newElement(text,date,prio);
            });
            panel.querySelector("#delete").addEventListener("click", e=>{
                const closestLi = panel.closest(".taskItems");
                closestLi.remove();
            })
            Array.prototype.forEach.call(document.querySelectorAll(".settingsimg"), panel2 => {
                panel2.addEventListener("click", e => {
                    if (panel.querySelector(".settingsimg") !== panel2){
                        // const display = panel2.querySelector(".settingsPanel").style.display
                        panel.querySelector(".settingsPanel").style.display = "none";
                    }
                });
            });
        };
        panel.querySelector(".settingsPanel").addEventListener("click", e => {
            e.stopImmediatePropagation();
            panel.querySelector(".settingsPanel").style.display = "none";
        });
        document.querySelector("body").addEventListener("click", e => {
            panel.querySelector(".settingsPanel").style.display = "none";
        });
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
            if (!low && item.querySelector(".taskPrio").getAttribute("src").endsWith("Images1/Blue.png")){
                show2 = false;
            }else { show2 = true;}
            if (!medium && item.querySelector(".taskPrio").getAttribute("src").endsWith("Images1/Green.png")){
                show3 = false;
            } else { show3 = true;}
            if (!high && item.querySelector(".taskPrio").getAttribute("src").endsWith("Images1/Orange.png")){
                show4 = false;
            } else { show4 = true;}
            if (!extreme && item.querySelector(".taskPrio").getAttribute("src").endsWith("Images1/Red.png")){
                show5 = false;
            } else { show5 = true;}
            const todayDate = item.querySelector(".dateTime").innerHTML;
            const dateOnly = todayDate.split(" ");
            if (today && dateOnly[0] != ((new Date().getMonth()+1)+"/"+new Date().getDate()+"/"+new Date().getFullYear())){
                show6 = false;
            }else{show6 = true};
            (show1 && show2 && show3 && show4 && show5 && show6) ? item.style.display = "flex" : item.style.display = "none";
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
            sortSelector.setAttribute("src", "Images1/sortd.png");
        }
    });
});

window.onload = newElement();