const taskInput = document.querySelector(".task-input input");
taskBox = document.querySelector(".task-box");
filters = document.querySelectorAll(".filters span");
const addBtn = document.getElementById('addBtn');

let editId;
let isEditedTask = false;
let todos = JSON.parse(localStorage.getItem("todo-list"));

filters.forEach(btn => {
    btn.addEventListener("click", ()=>{
        document.querySelector("span.active").classList.remove("active");
        btn.classList.add("active");
        showTodo(btn.id);
    });
});



function showTodo(filter){
    const currentFilter = document.querySelector("span.active").id;
    filter = filter || currentFilter || "all"; 
    let li = "";
    if(todos){
            todos.forEach((todo, id) => {
        //if todo status id completed, set the isCompleted value to checked
        let isCompleted = todo.status =="completed" ? "checked" : "";
                if(filter == todo.status || filter =="all"){
                    li +=`<li class="task">
                    <label for="${id}">
                        <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${isCompleted}>
                        <div class="task-content">
                            <p class="${isCompleted}">${todo.name}</p>
                            <span class="task-time">${todo.time || '無記錄'}</span>
                        </div>
                    </label>
                        <div class="settings">
                            <i onclick="showMenu(this)" class="bi bi-plus"></i>
                            <ul class="task-menu">
                                <li onclick="editTask(${id},'${todo.name}')"><i class="bi bi-pencil-fill"></i>Edit</li>
                                <li onclick="deleteTask(${id})"><i class="bi bi-trash-fill"></i>Delete</li>
                            </ul>
                        </div>
                    </li>`;
        }
        });
    }
    taskBox.innerHTML = li || `<span>You don't any task here</span>`;
}
showTodo();




function showMenu(selectedTask){
    //getting task menu div
    let taskMenu = selectedTask.parentElement.lastElementChild;
    taskMenu.classList.add("show");
    //removing show class from the task menu on the document click
    document.addEventListener("click", e=>{
        if(e.target.tagName !="I" || e.target != selectedTask){
            taskMenu.classList.remove("show");
        }
    });
}

function editTask(taskId, taskName){
    editId = taskId;
    isEditedTask = true;
   taskInput.value = taskName;
}


function deleteTask(deleteId){
    todos.splice(deleteId,1);
         localStorage.setItem("todo-list", JSON.stringify(todos));
         showTodo();
}


function updateStatus(selectedTask) {
    let taskName = selectedTask.parentElement.lastElementChild;
    const currentFilter = document.querySelector("span.active").id; // 取得當前篩選狀態
    
    // 更新任務狀態
    todos[selectedTask.id].status = selectedTask.checked ? "completed" : "pending";
    
    // 立即更新顯示
    if (currentFilter !== "all") {
        // 若不在「全部」模式，需重新篩選
        showTodo(currentFilter);
    } else {
        // 在「全部」模式只需切換樣式
        taskName.classList.toggle("checked", selectedTask.checked);
    }
    
    localStorage.setItem("todo-list", JSON.stringify(todos));
            showTodo();
}
// function updateStatus(selectedTask){
//     let taskName = selectedTask.parentElement.lastElementChild;
//     if(selectedTask.checked){
//         taskName.classList.add("checked");

//         todos[selectedTask.id].status = "completed";
//     }
//     else{
//         taskName.classList.remove("checked");
//         todos[selectedTask.id].status = "pending";
//     }
//      localStorage.setItem("todo-list", JSON.stringify(todos));

// }





// 提取共用邏輯為函式
function handleAddTask() {
    let userTask = taskInput.value.trim();
    if (userTask) {
            const currentTime = new Date().toLocaleString('zh-TW', {
            hour12: false,
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
        if (!isEditedTask) {
            if (!todos) todos = [];
            todos.push({ name: userTask, status: "pending"  ,time: currentTime});
        } else {
            isEditedTask = false;
            todos[editId].name = userTask;
            todos[editId].time = currentTime; 
        }
        taskInput.value = "";
        localStorage.setItem("todo-list", JSON.stringify(todos));
        showTodo();
    }
}

// 原有 Enter 鍵事件
taskInput.addEventListener("keyup", e => {
    if (e.key === "Enter") handleAddTask();
});

// 新增按鈕點擊事件
document.getElementById("addBtn").addEventListener("click", handleAddTask);

// taskInput.addEventListener("keyup", e =>{
//     let userTask = taskInput.value.trim();
//     if(e.key == "Enter" && userTask){
//         if(!isEditedTask){
//             if(!todos){
//                 todos = [];
//             }
//                 let taskInfo = {name:userTask,status:"pending"};
//                 todos.push(taskInfo);
//         }
//         else{
//             isEditedTask = false;
//             todos[editId].name = userTask;
//         }
//        taskInput.value="";

//             localStorage.setItem("todo-list", JSON.stringify(todos));
//     }
//         showTodo();
// });


// 添加智能滚动条检测逻辑
function checkScrollbar() {
    const taskBox = document.querySelector('.task-box');
    // 当内容高度 > 容器高度 + 50px 时激活滚动条
    if (taskBox.scrollHeight > taskBox.clientHeight + 50) {
        taskBox.classList.add('scroll-active');
    } else {
        taskBox.classList.remove('scroll-active');
    }
}

// 在需要时调用检测函数
showTodo();
checkScrollbar();

// 添加窗口大小变化的监听
window.addEventListener('resize', checkScrollbar);


/////////////////////////////////////////////////////////

// 获取清除按钮元素
const clearBtn = document.querySelector('.clear-btn');

// 添加清除所有功能
clearBtn.addEventListener('click', () => {
    // 确认对话框
    if (todos && todos.length > 0) {
        const isConfirmed = confirm("确定要清除所有待办事项吗？此操作不可撤销！");
        if (isConfirmed) {
            // 清除所有待办事项
            todos = [];
            localStorage.setItem("todo-list", JSON.stringify(todos));
            
            // 更新UI
            showTodo();
            checkScrollbar();
            
            // 显示操作反馈
            showNotification("所有待办事项已清除！");
        }
    } else {
        showNotification("没有待办事项可清除！");
    }
});

