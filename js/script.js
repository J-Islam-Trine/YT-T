

//entry insersion
const button = document.querySelector('#submitButton');
button.addEventListener('click', addToDo)

function addToDo(e)
{
    e.preventDefault();
    let inputBox = document.querySelector('#textInput');
    let currentList = document.querySelector('.list');
    let task = inputBox.value;
    inputBox.value = ' ';
    let newElement = elementCreator('li', task, 'list-item');
    let deleteButton = elementCreator('button', 'delete', 'button is-small is-pulled-right');
    newElement.appendChild(deleteButton);
    currentList.appendChild(newElement);
}

function elementCreator(elementName, content, classes, id=' ')
{
    let element = document.createElement(elementName);
    element.className = classes;
    element.id = id;
    element.appendChild(document.createTextNode(content));
    return element;
}
