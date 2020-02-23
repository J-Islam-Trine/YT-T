//event handler of load time setup
// document.addEventListener('DOMContentLoaded', );

//Displays No Task Banner
window.onload = function (){
    //showing 'No Task' Banner 
    initialSetup();
    if (document.querySelector('#currentList').childElementCount === 0)
    {
        let noTaskBanner = elementCreator('li', 'No tasks added', 'list-item has-text-centered has-text-weight-bold is-medium', 'noTaskBanner');
        document.querySelector('#currentList').append(noTaskBanner);
    }  
};


//set the initial view and some valuues
function initialSetup()
{
    
    //load background from local storage
    colorChanger('load');

    //show a message if there's no task
    if(localStorage.getItem('currentList')=== null)
    {
        localStorage.setItem('currentList', JSON.stringify([ ]) );
    }
    document.querySelector('#numberOfCompletedTasks').innerText = '0';
    taskCounter();
    viewList();
}

//counts the number of tasks
function taskCounter()
{       
       let listLength = JSON.parse(localStorage.getItem('currentList')).length;
       document.querySelector('#numberOfTotalTasks').innerText = listLength;
}

//selectors
const submitButton = document.querySelector('#submitButton');

//add task
submitButton.addEventListener('click', addTask);

function addTask(e)
{
    e.preventDefault();
    
    if (document.querySelector('#noTaskBanner'))
    {
        document.querySelector('#noTaskBanner').remove();
    } 
    let inputBox = document.querySelector('#textInput');
    let task;
    if(inputBox.value.length !== 0)
    {
    task = inputBox.value;
    inputBox.value = '';
    let storedList = JSON.parse(localStorage.getItem('currentList'));
    storedList.push(task);
    localStorage.setItem('currentList', JSON.stringify(storedList));
    taskCounter();
    let newElement = elementCreator('li', task, 'list-item');
    let deleteButton = elementCreator('button',
     'delete', 'button is-small is-pulled-right deleteButtons');
    deleteButton.addEventListener('click', deleteTask);
    newElement.appendChild(deleteButton);
    let currentList = document.querySelector('#currentList');
    currentList.appendChild(newElement);
    taskCounter();
    }
}

//view tasks
function viewList()
{
    let currentList = document.querySelector('.list');
    let storedList = JSON.parse(localStorage.getItem('currentList'));
    storedList.forEach(function (task){
        let newElement = elementCreator('li', task, 'list-item');
        let deleteButton = elementCreator('button', 'delete', 'button is-small is-pulled-right deleteButtons');
        deleteButton.addEventListener('click', deleteTask);
        newElement.appendChild(deleteButton);
        currentList.appendChild(newElement);
    });
}


//delete Task
function deleteTask(e)
    {  
        let taskTextContent = e.target.parentElement.childNodes[0].data;
        let deletedElement = elementCreator('del', taskTextContent, 'deletedTask is-block');
        let parent = e.target.parentElement.parentElement;
        parent.replaceChild(deletedElement, e.target.parentElement);
        let newList = JSON.parse(localStorage.getItem('currentList'));
        newList.splice(newList.indexOf(taskTextContent), 1);
        localStorage.setItem('currentList', JSON.stringify(newList));
        document.querySelector('#numberOfCompletedTasks').innerText = String(Number(document.querySelector('#numberOfCompletedTasks').innerText)+1); 
    }

//element creator
function elementCreator(elementName, content, classes, id=' ')
{
    let element = document.createElement(elementName);
    element.className = classes;
    element.id = id;
    element.appendChild(document.createTextNode(content));
    return element;
}

//modal
document.querySelector('#aboutModalCaller').addEventListener('click', (e)=> {
    document.querySelector('.modal').classList.add('is-active');
});

document.querySelector('.modal-close').addEventListener('click', (e)=> {
    document.querySelector('.modal').classList.remove('is-active');
})
