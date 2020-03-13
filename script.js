const draggable_list = document.getElementById('draggable-list');
const check = document.getElementById('check');

const richestPeople = [
  'Jeff Bezos',
  'Bill Gates',
  'Warren Buffett',
  'Bernard Arnault',
  'Carlos Slim Helu',
  'Amancio Ortega',
  'Larry Ellison',
  'Mark Zuckerberg',
  'Michael Bloomberg',
  'Larry Page'
];

// Store list items
const listItems = [];

let dragStartIndex;

createList();

// Insert list items to DOM
function createList() {
  [...richestPeople]
    .map(item => ({ value: item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(item => item.value)
    .forEach((person, index) => {
      const listItem = document.createElement('li');
      listItem.setAttribute('data-index', index);
      listItem.innerHTML = `
        <span class="number">${index + 1}</span>
        <div class="draggable" draggable="true">
          <p class="person-name">${person}</p>
          <i class="fas fa-grip-lines"></i>
        </div>
      `;
      listItems.push(listItem);
      draggable_list.appendChild(listItem);
    });

  addEventListener();
}

function addEventListener() {
  const draggables = document.querySelectorAll('.draggable');
  const dragListItems = document.querySelectorAll('.draggable-list li');

  draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', dragStart);
  });

  dragListItems.forEach(dragListItem => {
    dragListItem.addEventListener('dragover', dragOver);
    dragListItem.addEventListener('drop', dragDrop);
    dragListItem.addEventListener('dragenter', dragEnter);
    dragListItem.addEventListener('dragleave', dragLeave);
  });
}

check.addEventListener('click', checkOrder);

function dragStart() {
  dragStartIndex = +this.parentElement.dataset['index'];
}

function dragOver(e) {
  e.preventDefault();
}

function dragDrop() {
  const dragEndIndex = +this.dataset['index'];
  swapItems(dragStartIndex, dragEndIndex);
  this.classList.remove('over');
}

function dragEnter() {
  this.classList.add('over');
}

function dragLeave() {
  this.classList.remove('over');
}

function swapItems(fromIndex, toIndex) {
  const itemOne = listItems[fromIndex].querySelector('.draggable');
  const itemTwo = listItems[toIndex].querySelector('.draggable');

  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
}

function checkOrder() {
  listItems.forEach((item, index) => {
    if (item.querySelector('.person-name').innerText === richestPeople[index]) {
      item.classList.remove('wrong');
      item.classList.add('right');
    } else {
      item.classList.remove('right');
      item.classList.add('wrong');
    }
  });
}
