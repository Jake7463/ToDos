var arr = JSON.parse(localStorage.getItem("tasks")) || [];

const tasksUL = document.createElement("ul");
tasksUL.setAttribute("id","taskList");
const rep = document.querySelector("#represent");
rep.appendChild(tasksUL);

function newElement(){
    Array.prototype.forEach.call(document.querySelectorAll(".taskItems"), LI =>{
        for (j=0; j<arr.length; j++){
            if (arr[j].id == LI.id){
                arr[j].text = LI.querySelector(".taskName").innerHTML;
                arr[j].date = LI.querySelector(".dateTime").innerHTML;
                arr[j].dateSort = new Date(arr[j].date).getTime();
                const objsrc = LI.querySelector(".taskPrio").src;
                let prioarr = "";
                if (objsrc.endsWith("Blue.png")){prioarr = "Low"}
                else if (objsrc.endsWith("Green.png")){prioarr = "Medium"}
                else if (objsrc.endsWith("Orange.png")){prioarr = "High"}
                else if (objsrc.endsWith("Red.png")){prioarr = "Extreme"}
                else {prioarr = ""};
                arr[j].prio = prioarr;
                let prioSort;
                if (prioarr.includes("Low")){prioSort = 1}
                else if (prioarr.includes("Medium")){prioSort = 2}
                else if (prioarr.includes("High")){prioSort = 3}
                else if (prioarr.includes("Extreme")){prioSort = 4}
                else {prioSort = 0}
                arr[j].prioSort = prioSort;
                arr[j].check = LI.querySelector(".taskCheck").checked ? true : false;
            }
        };
        LI.remove();
    });
    console.log(arr)
    localStorage.setItem("tasks", JSON.stringify(arr));
    const arr2 = JSON.parse(localStorage.getItem("tasks"));
    let prioritySet = "Images1/nothing.png";
    for (i=0; i<arr2.length; i++){
        if(arr2[i].prio.includes("Low")){
            prioritySet = "Images1/Blue.png";
        }else if(arr2[i].prio.includes("Medium")){
            prioritySet = "Images1/Green.png";
        }else if(arr2[i].prio.includes("High")){
            prioritySet = "Images1/Orange.png";
        }else if(arr2[i].prio.includes("Extreme")){
            prioritySet = "Images1/Red.png";
        }else{ prioritySet = "Images1/nothing.png"};
        const li = document.createElement("li");
        li.setAttribute("class","taskItems");
        li.setAttribute("id", arr2[i].id);
        let checkedbox;
        if (arr2[i].check === true){
            checkedbox = "checked";
        };
        const liInnerHTML = `<span class="taskViewSpan" style="display: flex; width=75vw; gap: 10px;"><input class="taskCheck" type="checkbox" name="taskCheck" ${checkedbox}>
        <p class="taskName">${arr2[i].text}</p>
        <img class="taskPrio" src=${prioritySet} alt="priority">
        <p class="dateTime">${arr2[i].date}</p>
        <div class="settingsTouch">
          <img class="settingsimg" src="Images1/3dot.png" alt="edit">
          <ul class="settingsPanel">
            <li class="settingsItems" id="edit">Edit</li>
            <li class="settingsItems" id="duplicate">Duplicate</li>
            <li class="settingsItems" id="delete">Delete</li>
          </ul>
        </div>
        </span>`
        li.innerHTML = liInnerHTML;
        tasksUL.appendChild(li);
    }
    // Checkbox application (if cliked then styled)
    Array.prototype.forEach.call(document.querySelectorAll(".taskCheck"), checkbox => {
        checkbox.addEventListener("click", e => {
            e.stopPropagation();
            if (checkbox.checked) {
                checkbox.closest('.taskItems').style.textDecoration = 'line-through';
                checkbox.closest('.taskItems').style.backgroundColor = '#EFF6E8';
            }else{
                checkbox.closest('.taskItems').style.textDecoration = 'none';
                checkbox.closest('.taskItems').style.backgroundColor = '#fff';
                for (i=0; i<arr2.length; i++){
                    if (checkbox.closest(".taskItems").id == arr2[i].id){
                        arr2[i].check = false ;
                    }
                }
            }
        });
    });
    // Checkbox general (if cheked then styled)
    Array.prototype.forEach.call(document.querySelectorAll(".taskCheck"), checkbox => {
            if (checkbox.checked) {
                checkbox.closest('.taskItems').style.textDecoration = 'line-through';
                checkbox.closest('.taskItems').style.backgroundColor = '#EFF6E8';
            }else{
                checkbox.closest('.taskItems').style.textDecoration = 'none';
                checkbox.closest('.taskItems').style.backgroundColor = '#fff';
                for (i=0; i<arr2.length; i++){
                    if (checkbox.closest(".taskItems").id == arr2[i].id){
                        arr2[i].check = false ;
                    }
                }
            }
    });

    // Apply filters
    const done = document.querySelector("#showDone").checked;
    const today = document.querySelector("#showTodayOnly").checked;
    const low = document.querySelector("#showLow").checked;
    const medium = document.querySelector("#showMedium").checked;
    const high = document.querySelector("#showHigh").checked;
    const extreme = document.querySelector("#showExtreme").checked;
    applyFilter(done, today, low, medium, high, extreme);

    // Task settings
    Array.prototype.forEach.call(document.querySelectorAll(".settingsTouch"), panel => {
        panel.addEventListener("click", e => {
            e.stopPropagation();
            panel.querySelector(".settingsPanel").style.display = "flex";
            if (panel.querySelector(".settingsPanel").style.display === "flex"){
                e.stopImmediatePropagation();
                //Edit task event listener
                const edit = panel.querySelector("#edit");
                edit.addEventListener("click", e=>{
                    const mainLi = panel.closest(".taskItems");
                    const originText = mainLi.querySelector(".taskName").innerHTML;
                    const originPrio = mainLi.querySelector(".taskPrio");
                    let originPrioText;
                    let originPrioSrc;
                    const originDate = mainLi.querySelector(".dateTime").innerHTML;
                    mainLi.querySelector(".taskViewSpan").style.display = "none";
                    if (originPrio.src.endsWith("Blue.png")){
                        originPrioSrc = "Images1/Blue.png";
                        originPrioText = "Low";
                    }else if (originPrio.src.endsWith("Green.png")){
                        originPrioSrc = "Images1/Green.png";
                        originPrioText = "Medium";
                    }else if (originPrio.src.endsWith("Orange.png")){
                        originPrioSrc = "Images1/Orange.png";
                        originPrioText = "High";
                    }else if (originPrio.src.endsWith("Red.png")){
                        originPrioSrc = "Images1/Red.png";
                        originPrioText = "Extreme";
                    }else {
                        originPrioSrc = "Images1/arrowDown.png"
                        originPrioText = "Priority";
                    };
                    const inner = `
                    <input class="addTask2" type="text" name="addTask2" value=${originText}>
                    <div name="prio2" class="prio2">
                        <p class="pickPrio2">${originPrioText}<img class="pickPrio2Image" src=${originPrioSrc} style="width: 15px;"></p>
                        <ul class="prioMenu2">
                            <li class="prioItems2"><img src="Images1/Blue.png" class="prioItemImage2" style="width: 25px;" alt="Low priority">&nbsp Low</li>
                            <li class="prioItems2"><img src="Images1/Green.png" class="prioItemImage2" style="width: 25px;" alt="Medium priority">&nbsp Medium</li>
                            <li class="prioItems2"><img src="Images1/Orange.png" class="prioItemImage2" style="width: 25px;" alt="High priority">&nbsp High</li>
                            <li class="prioItems2"><img src="Images1/Red.png" class="prioItemImage2" style="width: 25px;" alt="Extremely high priority">&nbsp Extreme</li>
                        </ul>
                    </div>
                    <input type="datetime-local" id="pickDate2" name="pickDate2" class="pickDate2" value=${new Date(originDate).toISOString().slice(0, 16)}>
                    <button class="btnedit-confirm"><img src="Images1/confirm.png" style= "width: 25px; height: 25px;"</button>
                    <button class="btnedit-discard"><img src="Images1/discard.png" style= "width: 25px; height: 25px;"</button>
                    `
                    let newContent = document.createElement("span");
                    newContent.className="editSpan";
                    newContent.style.display = "flex";
                    newContent.innerHTML = inner;
                    mainLi.appendChild(newContent);
                    // Open edit priority panel list
                    Array.prototype.forEach.call(document.querySelectorAll(".pickPrio2"), item =>{
                        item.addEventListener("click", function(e) {
                            e.stopPropagation();
                            const prio2 = item.closest(".prio2");
                            const prioMenu2 = prio2.querySelector(".prioMenu2");
                            prioMenu2.style.display = "flex";
                            prioMenu2.querySelectorAll(".prioItemImage2").forEach(item2 => {
                                item2.addEventListener("click", function (e) {
                                    e.stopImmediatePropagation();
                                    item.innerHTML = e.target.parentElement.innerHTML;
                                    prioMenu2.style.display = "none";
                                })
                            })
                            prio2.querySelectorAll(".prioItems2").forEach(item3 => {
                            item3.addEventListener("click", function(e) {
                                item.innerHTML = e.target.innerHTML;
                            });
                            });
                            if(prioMenu2.style.display === "flex"){
                                document.querySelector("body").addEventListener("click", function() {
                                    prioMenu2.style.display = "none";
                                });
                            }
                        });
                    });
                    // btns accept decline.
                    mainLi.querySelector(".btnedit-confirm").addEventListener("click", e=>{
                        e.preventDefault();
                        let tempThing = JSON.stringify(mainLi.querySelector(".pickPrio2").innerHTML);
                        let tempSrc = "Images1/nothing.png";
                        if (tempThing.includes("Low")){tempSrc = "Images1/Blue.png"}
                        else if (tempThing.includes("Medium")){tempSrc = "Images1/Green.png"}
                        else if (tempThing.includes("Extreme")){tempSrc = "Images1/Red.png"}
                        else if (tempThing.includes("High")){tempSrc = "Images1/Orange.png"}
                        else {tempSrc = "Images1/nothing.png"};
                        mainLi.querySelector(".taskName").innerHTML = mainLi.querySelector(".addTask2").value;
                        mainLi.querySelector(".taskPrio").src = tempSrc;
                        const dateAll2 = new Date(mainLi.querySelector(".pickDate2").value);
                        const date2 = (dateAll2.getMonth()+1)+"/"+dateAll2.getDate()+"/"+dateAll2.getFullYear()+" "+dateAll2.getHours()+":"+dateAll2.getMinutes();
                        mainLi.querySelector(".dateTime").innerHTML = date2;
                        newContent.remove();
                        newContent = undefined;
                        delete(newContent);
                        mainLi.querySelector(".taskViewSpan").style.display = "flex";
                        newElement();
                    })
                    mainLi.querySelector(".btnedit-discard").addEventListener("click", e=>{
                        e.preventDefault();
                        newContent.remove();
                        newContent = undefined;
                        delete(newContent);
                        mainLi.querySelector(".taskViewSpan").style.display = "flex";
                        newElement();
                    })
                })
                //Duplicate task event listener
                const dupe = panel.querySelector("#duplicate");
                dupe.addEventListener("click", e=>{
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
                    const panelParent = panel.closest(".taskItems");
                    let prioSort;
                    if (prio.includes("Low")){prioSort = 1}
                    else if (prio.includes("Medium")){prioSort = 2}
                    else if (prio.includes("High")){prioSort = 3}
                    else if (prio.includes("Extreme")){prioSort = 4}
                    else {prioSort = 0}
                    const obj2 ={
                        id: new Date().getTime(),
                        dateSort: new Date(date).getTime(),
                        date: date,
                        prioSort: prioSort,
                        text: text,
                        prio: prio,
                        check: panelParent.querySelector(".taskCheck").checked ? true : false,
                    };
                    arr.push(obj2);
                    console.log(obj2);
                    newElement();
                });
                //Delete task event listener
                panel.querySelector("#delete").addEventListener("click", e=>{
                    const closestLi = panel.closest(".taskItems");
                    for (i=0; i<arr.length; i++){
                        if(closestLi.id == arr[i].id) {arr.splice(i, 1);}
                    }
                    closestLi.remove();
                    localStorage.setItem("tasks", JSON.stringify(arr));
                })
                Array.prototype.forEach.call(document.querySelectorAll(".settingsimg"), panel2 => {
                    panel2.addEventListener("click", e => {
                        if (panel.querySelector(".settingsimg") !== panel2){
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
}

document.querySelector("#submitBtn").addEventListener("click", function (e){
    e.preventDefault();
    if (document.querySelector("#addTask").value.length > 0){
    const text = document.querySelector("#addTask").value;
    const dateAll = new Date(document.querySelector("#pickDate").value);
    const date = (dateAll.getMonth()+1)+"/"+dateAll.getDate()+"/"+dateAll.getFullYear()+" "+dateAll.getHours()+":"+dateAll.getMinutes();
    const prio = document.querySelector("#pickPrio").innerHTML;
    let prioSort;
    if (prio.includes("Low")){prioSort = 1}
    else if (prio.includes("Medium")){prioSort = 2}
    else if (prio.includes("High")){prioSort = 3}
    else if (prio.includes("Extreme")){prioSort = 4}
    else {prioSort = 0}
    const id = new Date().getTime();
    const isChecked = false;
    const obj ={
        id: id,
        text: text,
        dateSort: dateAll.getTime(),
        date: date,
        prioSort: prioSort,
        prio: prio,
        check: isChecked,
    };
    arr.push(obj);
    console.log(obj);
    const arrowImg = document.createElement("img");
    arrowImg.setAttribute("src", "Images1/arrowDown.png");
    arrowImg.setAttribute("style", "width: 17px;");
    arrowImg.setAttribute("alt", "priority");
    document.querySelector("#addTask").value = "";
    document.querySelector("#pickDate").value = new Date().toISOString().slice(0, 16);
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
        if (checkbox.checked) {
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
    // e.preventDefault();
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
        // Adding sorting functionality using the "p" along with img src.
        if (item.innerHTML.includes("Chronological")){
            if( item.querySelector(".sortSelector").src.includes("Images1/sortd.png")){
                // cars.sort(function(a, b){return a.year - b.year});
                arr.sort(function(a,b){return a.id - b.id})
            }else if( item.querySelector(".sortSelector").src.includes("Images1/sorta.png")){
                arr.sort(function(a,b){return b.id - a.id});
            }
            newElement();
        } else if (item.innerHTML.includes("Priority")){
            if( item.querySelector(".sortSelector").src.includes("Images1/sortd.png")){
                arr.sort(function(a,b){return a.prioSort - b.prioSort});
            }else if( item.querySelector(".sortSelector").src.includes("Images1/sorta.png")){
                arr.sort(function(a,b){return b.prioSort - a.prioSort});
            }
            newElement();
        }else if (item.innerHTML.includes("Alphabetical")){
            if( item.querySelector(".sortSelector").src.includes("Images1/sortd.png")){
                arr.sort(function(a, b){
                    let x = a.text.toLowerCase();
                    let y = b.text.toLowerCase();
                    if (x < y) {return -1;}
                    if (x > y) {return 1;}
                    return 0;
                  });
            }else if( item.querySelector(".sortSelector").src.includes("Images1/sorta.png")){
                arr.sort(function(a, b){
                    let x = a.text.toLowerCase();
                    let y = b.text.toLowerCase();
                    if (x < y) {return 1;}
                    if (x > y) {return -1;}
                    return 0;
                  });
            }
            newElement();
        }else if (item.innerHTML.includes("End Date")){
            if( item.querySelector(".sortSelector").src.includes("Images1/sortd.png")){
                arr.sort(function(a,b){return a.dateSort - b.dateSort});
            }else if( item.querySelector(".sortSelector").src.includes("Images1/sorta.png")){
                arr.sort(function(a,b){return b.dateSort - a.dateSort});
            }
            newElement();
        }
    });
});

window.onload = newElement();