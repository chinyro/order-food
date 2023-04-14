const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = [];

function addItem(e) {
    e.preventDefault(); //Prevent from loading/refreshing the form
    //Take text from input and add it into an obj
    const text = (this.querySelector('[name=item]')).value; //use this instead of document.
    const item = {
        text,
        done: false
    };
    items.push(item);
    populateList(items, itemsList);
    this.reset();
}

function populateList(plates = [],platesList) {
    platesList.innerHTML = plates.map((plate, i) => {
        return `
        <li>
            <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' : ''} />
            <label for="item${i}">${plate.text}</label>
        </li>`;
    }).join('');
}

addItems.addEventListener('submit', addItem);



