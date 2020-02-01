document.addEventListener('DOMContentLoaded', initialSetup);

function initialSetup()
{
    taskCounter();
}

//counts the number of tasks
function taskCounter()
{       
        //set both value to zero
        //get number of deleted elements
        document.querySelector('#numberOfCompletedTasks').innerText = List.querySelectorAll('del').length;
        //get number of all elements
        document.querySelector('#numberOfTotalTasks').innerText = List.childElementCount;
}

//selectors
const submitButton = document.querySelector('#submitButton');
const List = document.querySelector('ul#currentList');

//add task
submitButton.addEventListener('click', addTask);

function addTask(e)
{
    e.preventDefault();
    let inputBox = document.querySelector('#textInput');
    let currentList = document.querySelector('.list');
    let task = inputBox.value;
    inputBox.value = ' ';
    let newElement = elementCreator('li', task, 'list-item');
    let deleteButton = elementCreator('button', 'delete', 'button is-small is-pulled-right deleteButtons');
    deleteButton.addEventListener('click', deleteTask);
    newElement.appendChild(deleteButton);
    currentList.appendChild(newElement);
    taskCounter();
}


//delete Task
function deleteTask(e)
    {  
        let taskTextContent = e.target.parentElement.childNodes[0].data;
        let deletedElement = elementCreator('del', taskTextContent, 'deletedTask is-block');
        let parent = e.target.parentElement.parentElement;
        parent.replaceChild(deletedElement, e.target.parentElement);
        taskCounter();
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
