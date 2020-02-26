//connect event listener to add button

document.querySelector("#button").onclick = function(e) {
  addTask();
};

//Add li's to ul via input box

function addTask() {
  const input = document.getElementById("input").value;
  let task = document.createTextNode(input);
  let newTask = document.createElement("li");
  newTask.appendChild(task);
  document.getElementById("ul").appendChild(newTask);
  form.reset();

  //cross out completed to-dos

  newTask.addEventListener("click", () => {
    newTask.style.textDecoration =
      newTask.style.textDecoration === "line-through" ? "none" : "line-through";
  });
}

//clear all completed to-dos

const clearBtn = document.getElementById("clear");
clearBtn.addEventListener("click", () => {
  const liElements = document.querySelectorAll("li");
  liElements.forEach(li => {
    if (li.style.textDecoration === "line-through") {
      li.innerHTML = "";
    }
  });
});
