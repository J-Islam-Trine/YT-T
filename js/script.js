
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
}


//delete Task
function deleteTask(e)
    {  
        let taskTextContent = e.target.parentElement.childNodes[0].data;
        let deletedElement = elementCreator('del', taskTextContent, 'deletedTask is-block');
        let parent = e.target.parentElement.parentElement;
        parent.replaceChild(deletedElement, e.target.parentElement);
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
