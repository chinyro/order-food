const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = JSON.parse(localStorage.getItem('items')) || [];
const removeAllItems = document.querySelector('#remove');

// Create item and push it to array, set items to local storage
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
// Create and add items to the list
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

// target = add item button - Set items to local storage and set property done
function toggleDone(e) {
    if(!e.target.matches('input')) return; //skip this unless it's an input
    const el = e.target;
    const index = el.dataset.index;
    items[index].done = !items[index].done;
    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, itemsList);
}
// Removes items from list and local storage
function removeItems() {
    localStorage.clear();
    items.length = 0;
    window.location = window.location;
}


// Event Listeners

addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);
removeAllItems.addEventListener('click', removeItems);

populateList(items, itemsList);




