const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = JSON.parse(localStorage.getItem('items')) || [];
const countdownBtn = document.getElementById('reset-button');

function addItem(e) {
    //Prevent from loading/refreshing the form
    e.preventDefault(); 
    //Take text from input and add it into an obj
    const text = (this.querySelector('[name=item]')).value; //use this instead of document.
    const item = {
        text,
        done: false
    };
    items.push(item);
    populateList(items, itemsList);
    localStorage.setItem('items', JSON.stringify(items));
    this.reset();
}

function populateList(plates = [],platesList) {
    platesList.innerHTML = plates.map((plate, i) => {
        // create an ul with items user submits - dynamically 
        return `
        <li>
            <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' : ''} />
            <label for="item${i}">${plate.text}</label>
        </li>`;
    }).join('');
}

function toggleDone(e) {
    if(!e.target.matches('input')) return; //skip this unless it's an input
    const el = e.target;
    const index = el.dataset.index;
    items[index].done = !items[index].done;
    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, itemsList);
}

function resetBtn(e) {
    localStorage.clear();
}


// Storing data in local storage

addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);
countdownBtn.addEventListener('click', resetBtn);

populateList(items, itemsList);




