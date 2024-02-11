
function newElement(t){
    //gets the input element and adds it to the list
    const span = document.createElement("span");
    const rep = document.getElementById("replist")
    const checkbox = document.createElement("input")
    let p = document.createElement("p");
    span.className = "represent";
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("class","checkbox");
    p.innerHTML = t;
    p.setAttribute("class","taskname");
    rep.appendChild(span);
    span.appendChild(checkbox);
    span.appendChild(p);
    alert(t);
};

const btn = document.querySelector("#add");
btn.addEventListener("click", function handleClick(e){
    let taskName = document.querySelector("#taskname").value;
    alert(taskName);
    //invokes newElement with the input submitted
    e.preventDefault();
    newElement(taskName);
});

