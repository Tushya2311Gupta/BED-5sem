// make a button that on click change the color of the another box using html and javascript
function change(){
    const box=document.getElementById('colorBox');
    const colors=["red","blue","green","yellow","pink","purple"];
    const randomColor=colors[Math.floor(Math.random()*colors.length)];
    box.style.backgroundColor=randomColor;
    box.style.width="100px";
}
//now add a setInterval to change the color every 2 seconds and when I click on stop button it should stop changing the color
let interval = setInterval(change, 1000);
function stop() {
    clearInterval(interval);
    alert("Color change stopped");
}
// 1. create a new element using createElement function
//2. Insert the data using .innerText or .innerHTML
//3. Insert new element in parent container using appendChild or append
let todos=[{
    id: 1,
    title: "study at 9 pm"
},
{
    id: 2,
    title: "study at 10 pm"
},
{
    id: 3,
    title: "study at 11 pm"
}
];
let todoContainer=document.querySelector('.todocontainer');
function addTodo(todo) {
    let li=document.createElement('li');
    li.innerHTML=`<div>
                <input type="checkbox" name="" id="">
                <h1>${todo.title}</h1>
                <div>
                    <button>Delete</button>
                    <button>Edit</button>
                </div>
            </div>`;
    todoContainer.appendChild(li);
}
function showAllTodos(todos) {
    todoContainer.innerHTML="";
    todos.forEach(todo => {
        addTodo(todo);
    });
}
showAllTodos(todos);