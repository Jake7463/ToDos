function newElement(t){
    //gets the input element and adds it to the list
    const span = document.createElement("span");
    const rep = document.getElementById("replist")
    const checkbox = document.createElement("input")
    const p = document.createElement("p");
    span.className = "represent";
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("class","checkbox");
    p.textContent = t;
    p.className = "taskname";
    rep.appendChild(span);
    span.appendChild(checkbox);
    span.appendChild(p);
};

function handleClick(){
    //invokes newElement with the input submitted
    const taskName = document.getElementById("taskname");
    newElement(taskName);
};

