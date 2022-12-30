//* ======== ResizeScreen =========/
function ResizeScreen(x) {
  let Menu, content;
  let Menu_wrap;
  if (x.matches) {
    // If media query matches
    // Screen width <= 750px
    isMobileScreen = true;
    Menu = document.getElementById("Menu");
    console.log(Menu);
    if (Menu) {
      Menu.remove();
    }
  } else {
    isMobileScreen = false;
    // Screen width > 750px
    Menu = document.getElementById("Menu");
    if (Menu == null) {
      content = `
            <div class="menu" id="Menu">
                <div></div>
                <div>Title</div>
                <div style="text-align: center;">Start date</div>
                <div style="text-align: center;">End date</div>
                <div style="text-align: center;">Status</div>
                <div></div>
            </div>
            `;
      Menu_wrap = document.getElementById("menu_wrap");
      Menu_wrap.innerHTML = content;
    }
  }
  displayTasks(isMobileScreen);
}
//* ======== ResizeScreen =========/

//* ======== getTasksFromStorage =========/
function getTasksFromStorage() {
  let TasksStorage;
  TasksStorage = JSON.parse(localStorage.getItem("Tasks"));
  tasks = TasksStorage ?? [];
}
//* ======== getTasksFromStorage =========/

//* ======== addTask =========/
function addTask() {
  // disable add_btn
  document.querySelector(".add_btn").removeAttribute("style");

  let content = `
        <div class="WindowBack">
            <div class="Window">
                <div class="WindowTitle">
                    <span style="padding-left: 20px; ">New Task</span>
                </div>
                <div class="left_div">
                    <div class="Inputs">
                        <label for="TaskName">Task : </label>
                        <input  type="text" id="TaskName" autofocus>
                    </div>
                    <div class="Inputs">
                        <label for="Start_Date">Start Date : </label>
                        <input type="date" id="Start_Date">
                    </div>
                    <div class="Inputs">
                        <label for="End_Date">End Date : </label>
                        <input type="date" id="End_Date">
                    </div>
                    <div class="Inputs">
                        <!-- Combobox -->
                        <label for="status">Status :</label>
                        <select name="status" id="status">
                            <option value="Not started">Not started</option>
                            <option value="In progress">In progress</option>
                            <option value="Canceled">Canceled</option>
                            <option value="Done">Done</option>
                        </select>
                    </div>
                </div>
                
                <div class="right_div">
                    <button class="btn_ok btn" onclick="OK_click()">OK</button>
                    <button class="btn_cancel btn" onclick="Cancel_click()">Cancel</button>
                </div>

            </div>
        </div>
    `;
  let Window = document.querySelector(".Main_Window");
  Window.innerHTML = content;

  // let TaskName = prompt("Task: ")
  // var Now = new Date();
  // if (TaskName == null || TaskName == "") {
  //     return ""
  // }
  // let NewTask = {
  //     title: TaskName,
  //     date: Now.getDate() + "/" + (Now.getMonth()+1) + "/" + Now.getFullYear(),
  //     isDone: false
  // }
  // tasks.push(NewTask)
  // displayTasks()
}
//* ======== addTask =========/

//* ======== OK_click =========/
function OK_click() {
  let TaskName = document.getElementById("TaskName").value;
  if (TaskName == null || TaskName == "") {
    return "";
  }

  let Start_date = document.getElementById("Start_Date").value;
  let End_date = document.getElementById("End_Date").value;
  let Status = document.getElementById("status").value;

  Start_date = Start_date.split("-").reverse().join("-");
  End_date = End_date.split("-").reverse().join("-");

  let NewTask = {
    title: TaskName,
    start_date: Start_date,
    end_date: End_date,
    status: Status,
    isDone: false,
  };
  NewTask.status == "Done" ? (NewTask.isDone = true) : (NewTask.isDone = false);

  tasks.push(NewTask);
  displayTasks(isMobileScreen);

  // CLose Window
  let Window = document.querySelector(".WindowBack");
  Window.remove();
}
//* ======== OK_click =========/

//* ======== Cancel_click =========/
function Cancel_click() {
  let Window = document.querySelector(".WindowBack");
  Window.remove();
}
//* ======== Cancel_click =========/

//* ======== displayTasks =========/
function displayTasks(mobile_screen) {
  document.getElementById("tasksBack").innerHTML = "";
  let index = 0;
  let content;
  for (task of tasks) {
    if (mobile_screen) {
      content = `
                <div class="task ">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <!-- 1 -->
                    <div>
                        <span class="material-symbols-outlined icon icon_isDone ${
                          task.isDone ? "" : "done"
                        }" onclick="toggleTaskCompletion(${index})">
                            priority
                        </span>
                    </div>
                    <!-- 2 -->
                    <div>
                        <h3 style="margin: 0;">${task.title}</h3>
                        
                    </div>
                    <!-- 3 -->
                    <div class="Status_Color${index}" style="margin: 0 auto;">
                            
                    </div>
                    <!-- 4 -->
                    <div></div>
                    <!-- 5 : 2nd line -->
                    <div></div>
                    <!-- 6 -->
                    <div style="font-size:13px">
                        <div>
                            <span>Start : <b>${task.start_date}</b></span>
                        </div>
                        <div>
                            <span>End : <b>${task.end_date}</b></span>
                        </div>
                    </div>
                    <div>
                        <div class="icon_mobileScreen">
                            <span class="material-symbols-outlined icon icon_edit" onclick="editTask(${index})">
                                edit
                            </span>
                            <span class="material-symbols-outlined icon icon_del" onclick="deleteTask(${index})">
                                delete
                            </span>
                        </div>
                    </div>
                </div>
            `;
    } else {
      content = `
                <div class="task ">
                    <div>
                        <span class="material-symbols-outlined icon_isDone icon ${
                          task.isDone ? "" : "done"
                        }" onclick="toggleTaskCompletion(${index})">
                            priority
                        </span>
                    </div>
                    <div>
                        <h3 style="margin: 0;">${task.title}</h3>
                        
                    </div>
                    <div  style="text-align: center;">
                            <span>${task.start_date}</span>
                    </div>
                    <div  style="text-align: center;">
                            <span style="text-align: center;">${
                              task.end_date
                            }</span>
                    </div>
                    <div class="Status_Color${index}" style="margin: 0 auto;">
                            
                    </div>
                    <div>
                    </div>
                    <div>
                        <span class="material-symbols-outlined icon icon_edit" onclick="editTask(${index})">
                            edit
                        </span>
                    </div>
                    <div>
                        <span class="material-symbols-outlined icon icon_del" onclick="deleteTask(${index})">
                            delete
                        </span>
                    </div>
                    <div></div>
                </div>
            `;
    }

    document.getElementById("tasksBack").innerHTML += content;
    const STATUS = document.querySelector(".Status_Color" + index);
    const Stat_Color = document.createElement("span");
    switch (task.status) {
      case "Done":
        Stat_Color.classList.add("Status_Done");
        break;
      case "In progress":
        Stat_Color.classList.add("Status_InProgress");
        break;
      case "Not started":
        Stat_Color.classList.add("Status_NotStarted");
        break;
      case "Canceled":
        Stat_Color.classList.add("Status_Canceled");
        break;
    }
    Stat_Color.innerHTML = task.status;
    STATUS.append(Stat_Color);
    index++;
  }

  SetInLocalStorage(tasks);
  StatTasks();
}
//* ======== displayTasks =========/

//* ======== SetInLocalStorage =========/
function SetInLocalStorage(tasks) {
  localStorage.setItem("Tasks", JSON.stringify(tasks));
}
//* ======== SetInLocalStorage =========/

//* ======== deleteTask =========/
function deleteTask(index) {
  // disable add_btn
  let add_btn = document.querySelector(".add_btn");
  add_btn.removeAttribute("style");

  let content = `
        <div class="WindowBack">
            <div class="WindowDelete">
                <div class="WindowTitle">
                    <span style="padding-left: 20px; ">Delete Task!</span>
                </div>
                <div class="left_div">
                    <span>Are you sure to DELETE the task: </span>
                    <span><b>"${tasks[index].title}"? </b></span>
                </div>
                
                <div class="right_div">
                    <button class="btn_ok btn" onclick="YesDelete_btn(${index})">Yes</button>
                    <button class="btn_cancel btn" onclick="Cancel_click()">No</button>
                </div>
    
            </div>
        </div>
    `;
  let Window = document.querySelector(".Main_Window");
  Window.innerHTML = content;

  // let message = `Are you sure to delete the task: "${tasks[index].title}"?`
  // if (confirm(message)){
  //     tasks.splice(index, 1);
  //     displayTasks()
  // }
}
//* ======== deleteTask =========/

//* ======== YesDelete_btn =========/
function YesDelete_btn(index) {
  tasks.splice(index, 1);
  displayTasks(isMobileScreen);
  // CLose Window
  let Window = document.querySelector(".WindowBack");
  Window.remove();
}
//* ======== YesDelete_btn =========/

//* ======== editTask =========/
function editTask(index) {
  // disable add_btn
  document.querySelector(".add_btn").removeAttribute("style");

  let Start_date = tasks[index].start_date;
  let End_date = tasks[index].end_date;

  Start_date = Start_date.split("-").reverse().join("-");
  End_date = End_date.split("-").reverse().join("-");

  let content = `
        <div class="WindowBack">
            <div class="Window">
                <div class="WindowTitle">
                    <span style="padding-left: 20px; ">Edit Task</span>
                </div>
                <div class="left_div">
                    <div class="Inputs">
                        <label for="TaskName">Task : </label>
                        <input value="${tasks[index].title}" style="width: 230px;" type="text" id="TaskName" autofocus="autofocus">
                    </div>
                    <div class="Inputs">
                        <label for="Start_Date">Start Date : </label>
                        <input value="${Start_date}" type="date" id="Start_Date">
                    </div>
                    <div class="Inputs">
                        <label for="End_Date">End Date : </label>
                        <input value="${End_date}" type="date" id="End_Date">
                    </div>
                    
                </div>
                
                <div class="right_div">
                    <button class="btn_ok btn" onclick="EditOK_click(${index})">OK</button>
                    <button class="btn_cancel btn" onclick="Cancel_click()">Cancel</button>
                </div>

            </div>
        </div>
    `;
  let Window = document.querySelector(".Main_Window");
  Window.innerHTML = content;

  let Wind = document.querySelector(".left_div");
  Wind.innerHTML += comboBox_Selected(index);

  // let TaskTitle = prompt("New task : ", tasks[index].title)

  // if (TaskTitle){
  //     tasks[index].title = TaskTitle;
  //     displayTasks();
  // }
}
//* ======== editTask =========/

//* ======== EditOK_click =========/
function EditOK_click(index) {
  let TaskName = document.getElementById("TaskName").value;
  if (TaskName == null || TaskName == "") {
    return "";
  }

  let Start_date = document.getElementById("Start_Date").value;
  let End_date = document.getElementById("End_Date").value;
  let Status = document.getElementById("status").value;

  Start_date = Start_date.split("-").reverse().join("-");
  End_date = End_date.split("-").reverse().join("-");

  tasks[index].title = TaskName;
  tasks[index].start_date = Start_date;
  tasks[index].end_date = End_date;
  tasks[index].status = Status;

  tasks[index].status == "Done"
    ? (tasks[index].isDone = true)
    : (tasks[index].isDone = false);
  if (tasks[index].status == "Done" && tasks[index].end_date == "") {
    var Now = new Date();
    tasks[index].end_date =
      Now.getDate() + "-" + (Now.getMonth() + 1) + "-" + Now.getFullYear();
  }
  displayTasks(isMobileScreen);
  // CLose Window
  let Window = document.querySelector(".WindowBack");
  Window.remove();
}
//* ======== EditOK_click =========/

//* ======== comboBox_Selected =========/
function comboBox_Selected(index) {
  let ComboBox_Content;

  switch (tasks[index].status) {
    case "Not started":
      ComboBox_Content = `
                    <div class="Inputs">
                        <!-- Combobox -->
                        <label for="status">Status :</label>
                        <select name="status" id="status">
                            <option value="Not started" selected>Not started</option>
                            <option value="In progress">In progress</option>
                            <option value="Canceled">Canceled</option>
                            <option value="Done">Done</option>
                        </select>
                    </div>            
             `;
      break;
    case "In progress":
      ComboBox_Content = `
                    <div class="Inputs">
                        <!-- Combobox -->
                        <label for="status">Status :</label>
                        <select name="status" id="status">
                            <option value="Not started">Not started</option>
                            <option value="In progress" selected>In progress</option>
                            <option value="Canceled">Canceled</option>
                            <option value="Done">Done</option>
                        </select>
                    </div>            
            `;
      break;
    case "Canceled":
      ComboBox_Content = `
                    <div class="Inputs">
                        <!-- Combobox -->
                        <label for="status">Status :</label>
                        <select name="status" id="status">
                            <option value="Not started">Not started</option>
                            <option value="In progress" >In progress</option>
                            <option value="Canceled" selected>Canceled</option>
                            <option value="Done">Done</option>
                        </select>
                    </div>            
            `;
      break;
    case "Done":
      ComboBox_Content = `
                    <div class="Inputs">
                        <!-- Combobox -->
                        <label for="status">Status :</label>
                        <select name="status" id="status">
                            <option value="Not started">Not started</option>
                            <option value="In progress" >In progress</option>
                            <option value="Canceled" >Canceled</option>
                            <option value="Done" selected>Done</option>
                        </select>
                    </div>            
            `;
      break;
  }
  return ComboBox_Content;
}
//* ======== comboBox_Selected =========/

//* ======== toggleTaskCompletion =========/
function toggleTaskCompletion(index) {
  // disable add_btn
  let add_btn = document.querySelector(".add_btn");
  add_btn.removeAttribute("style");

  var Now = new Date();
  let End_date =
    Now.getDate() + "-" + (Now.getMonth() + 1) + "-" + Now.getFullYear();
  End_date = End_date.split("-").reverse().join("-");

  let content;
  if (!tasks[index].isDone) {
    content = `
            <div class="WindowBack">
                <div class="WindowEdit">
                    <div class="WindowTitle">
                        <span style="padding-left: 20px; ">Complete Task!</span>
                    </div>
                    <div class="left_div">
                        <span>Are you sure the following task is COMPLETE? </span>
                        <span>Task : <b>"${tasks[index].title}"? </b></span>

                        <div class="Inputs" style="margin-top: 20px">
                        <label for="End_Date">End Date : </label>
                        <input type="date" id="End_Date" value="${End_date}">
                    </div>
                    </div>
                    
                    <div class="right_div">
                        <button class="btn_ok btn" onclick="YesToggle_btn(${index})">Yes</button>
                        <button class="btn_cancel btn" onclick="Cancel_click()">No</button>
                    </div>
        
                </div>
            </div>
        `;
  } else {
    content = `
            <div class="WindowBack">
                <div class="WindowDelete">
                    <div class="WindowTitle">
                        <span style="padding-left: 20px; ">Incomplete Task!</span>
                    </div>
                    <div class="left_div">
                        <span>Are you sure the following task is INCOMPLETE? </span>
                        <span>Task : <b>"${tasks[index].title}"? </b></span>
                    </div>
                    
                    <div class="right_div">
                        <button class="btn_ok btn" onclick="YesToggle_btn(${index})">Yes</button>
                        <button class="btn_cancel btn" onclick="Cancel_click()">No</button>
                    </div>
        
                </div>
            </div>
        `;
  }

  let Window = document.querySelector(".Main_Window");
  Window.innerHTML = content;
}
//* ======== toggleTaskCompletion =========/

//* ======== YesToggle_btn =========/
function YesToggle_btn(index) {
  if (tasks[index].isDone) {
    tasks[index].end_date = "";
    tasks[index].isDone = false;
    tasks[index].status = "In progress";
  } else {
    let End_date = document.getElementById("End_Date").value;
    End_date = End_date.split("-").reverse().join("-");

    tasks[index].end_date = End_date;
    tasks[index].isDone = true;
    tasks[index].status = "Done";
  }

  displayTasks(isMobileScreen);

  // CLose Window
  let Window = document.querySelector(".WindowBack");
  Window.remove();
}
//* ======== YesToggle_btn =========/

//* ======== StatTasks =========/
function StatTasks() {
  let nbrDone = 0,
    nbrTasks = 0;
  let ratio;

  const RatioDiv = document.getElementById("RatioDiv");
  if (RatioDiv != null) {
    RatioDiv.remove();
  }

  for (task of tasks) {
    nbrTasks++;
    task.isDone == true ? nbrDone++ : "";
  }
  ratio = (nbrDone / nbrTasks) * 100;
  const Stat_div = document.querySelector(".stat");
  const Ratio = document.createElement("div");
  Ratio.classList.add("Ratio-task");
  Ratio.setAttribute("style", `width:${Math.floor(ratio)}%`);
  Ratio.setAttribute("id", "RatioDiv");
  Stat_div.append(Ratio);

  document.getElementById("Stat_text").innerHTML =
    "<b>" + nbrDone + "</b> of <b>" + nbrTasks + "</b> tasks done";
}
//* ======== StatTasks =========/

//* ======== anime =========/
anime({
  targets: ".add_btn",
  // translateX: 300,
  rotate: "1turn",
  // backgroundColor: '#FFF',
  duration: 4000,
});
//* ======== anime =========/

let tasks = [];
getTasksFromStorage();
displayTasks(isMobileScreen);

// Resize screen
var isMobileScreen = false;
var x = window.matchMedia("(max-width: 800px)");
ResizeScreen(x); // Call listener function at run time
x.addListener(ResizeScreen); // Attach listener function on state changes
