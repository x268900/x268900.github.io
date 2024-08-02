const inputText = document.getElementById('#inputVal');
const addBtn = document.getElementById('#addTodoBtn');
const Deletebtn = document.getElementById('deleteBTN');
const workNum = document.getElementById("workNum");  //計算幾個待完成項目 (左下角)
const clear = document.querySelector('.clear');

Today = new Date();
 y = Today.getFullYear();
 mh=(Today.getMonth()+1);
 d=Today.getDate();


//新增待辦
let todoData = [];

addTodoBtn.addEventListener('click',addTodo);
function addTodo(){
  let todo = {
    txt : inputVal.value,
    id : new Date().getTime(),

    checked:'',
  };
  if(todo.txt.trim()==""){
    alert("請輸入資料!");
    return;
  }
  else{
    todoData.unshift(todo); //將最新的資料由第一筆開始
    inputVal.value="";
    
  }
  updateList(); //初始化頁面
}

//渲染
const list = document.querySelector(".list");
 function renderData(todo){
  let str = "";
  todo.forEach(function(item,index){
    str += `<li data-id="${item.id}"><label class="checkbox" for="" ><input type="checkbox" ${item.checked}/><span>${item.txt},&nbsp;&nbsp;&nbsp ${y}&nbsp年&nbsp${mh}&nbsp月&nbsp${d}&nbsp日</span></label>
          <a href="#" class="delete"></a>
        </li>`;
  });
  list.innerHTML = str;

 }
 

 //新增ENTET事件
 inputVal.addEventListener("keypress",function(e){
  if(e.key === "Enter"){
    addTodo();
  }
})

// 刪除事項、checked 狀態切換
todoList.addEventListener("click", e => {
  let id = parseInt(e.target.closest("li").dataset.id);
  let dataNum=e.target.getAttribute("data-num")
  if (e.target.getAttribute("class") == "delete") {
       e.preventDefault()
       todoData.splice(dataNum, 1)
       renderData(todoData)
    }
    else{
      todoData.forEach(function(item){
        if(item.id === id){
          if(item.checked =="checked"){
            item.checked = "";
          }
          else{
            item.checked = "checked";
          }
        }
      });
    }
    updateList(); //初始化頁面
});
const tab = document.getElementById("tab");
let toggleStatus = "all";

tab.addEventListener("click", changeTab);
function changeTab(e){
  toggleStatus =e.target.dataset.tab;
  let tabs = document.querySelectorAll("#tab li");
  tabs.forEach(function(item){
    item.classList.remove("active");
  });
  e.target.classList.add("active");

  updateList(); //初始化頁面
}


function updateList() {
  if(toggleStatus ==="all"){
    showData = todoData;
  }
  else if(toggleStatus ==="work"){
    showData = todoData.filter(function(item){
      return item.checked === "";
    })
  }
  else{
    showData = todoData.filter(function(item){
      return item.checked === "checked";
    })
  }
      // //計算待辦數目
      let count = todoData.filter(item => item.checked == "").length
      workNum.innerHTML = `<p class="workNum">  ${count}個待完成項目</p>`
      renderData(showData);
}
updateList();


const deleteBTN = document.getElementById("deleteBTN");
deleteBTN.addEventListener("click",function(e){
  e.preventDefault();
  todoData = todoData.filter(function(item){
    return item.checked !== "checked";
  });
      updateList();
});

// const people = [
//   {
//     name:"卡伯斯",
//     order:"鍋燒意麵",
//     price:80
//   },  {
//     name: '小明',
//     order: '牛肉麵',
//     price: 120
//   },
//   {
//     name: '漂亮阿姨',
//     order: '滷味切盤',
//     price: 40
//   },
//   {
//     name: 'Ray',
//     order: '大麻醬乾麵',
//     price: 60
//   },
// ];

// // 1. 每筆訂單都印出來
// // people.forEach(function(obj,key){
// //   console.log(obj);
// // })

// // 2. 打八折 印出所有新的訂單金額
// const newPrice = [];
// people.forEach(function(obj,key){
//   newPrice [key] = {
//     ...obj,
//     newPrice: obj.price * 0.8
//   }
// });
// // console.log(newPrice);

// // 3.老闆說今天疫情沒有八折，不過80元以上可以加滷蛋!
// const newOrders2 = [];
// people.forEach(function(item,index){
//   if(item.price >=80){
//     newOrders2.push(item);
//   }
// });
// console.log(newOrders2);

// //  4.過一段時間後牛肉沒了，把點牛肉麵的換成牛肉湯麵