class Customer {
    constructor(name, item) {
        this.name = name;
        this.item = item;
    }
}

class Order {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.customers =[];
    }

    addCustomer(customer) {
        this.customers.push(customer);
    }

    deleteCustomer(customer) {
        let index = this.customers.indexOf(customer);
        this.customers.splice(index, 1);
    }
}

let orders =[];
let orderId = 0;

onClick('new-order', () => {
    orders.push(new Order(orderId++, getValue('new-order-name')));
    drawDOM();
});

function onClick(id, action) {
    let element = document.getElementById(id);
    element.addEventListener('click', action)
    return element;
}

function getValue(id) {
    return document.getElementById(id).value;
}

function drawDOM() {
    let orderDiv = document.getElementById('orders');
    clearElement(orderDiv);
    for (let order of orders) {
        let table = createOrderTable(order);
        let title = document.createElement('h2');
        title.innerHTML = order.name;
        title.appendChild(createDeleteOrderButton(order));
        orderDiv.appendChild(title);
        orderDiv.appendChild(table);
        for (let customer of order.customers) {
            createCustomerRow(order, table, customer);
        }
    }
}

function createCustomerRow(order, table, customer) {
    let row = table.insertRow(2);
    row.insertCell(0).innerHTML = customer.name;
    row.insertCell(1).innerHTML = customer.item;
    let actions = row.insertCell(2);
    actions.appendChild(createDeleteRowButton(order, customer));
}

function createDeleteRowButton(order, customer) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'Delete';
    btn.onclick = () => {
        let index = order.customers.indexOf(customer);
        order.customers.splice(index, 1);
        drawDOM();
    };
    return btn;
}

function createDeleteOrderButton(order) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'Delete Order';
    btn.onclick = () => {
        let index = orders.indexOf(order);
        orders.splice(index, 1);
        drawDOM();
    }
    return btn;
}

function createNewCustomerButton(order) {
    let btn = document.createElement('button');
    btn. className = 'btn btn-primary';
    btn.innerHTML = 'Create';
    btn.onclick = () => {
        order.customers.push(new Customer(getValue(`name-input-${order.id}`), getValue(`item-input-${order.id}`)));
        drawDOM();
    };
    return btn;
}

function createOrderTable(order) {
    let table = document.createElement('table');
    table.setAttribute('class', 'table table-dark table-striped');
    let row = table.insertRow(0);
    let nameColumn = document.createElement('th');
    let itemColumn = document.createElement('th');
    nameColumn.innerHTML = 'Name';
    itemColumn.innerHTML = 'Item';
    row.appendChild(nameColumn);
    row.appendChild(itemColumn);
    let formRow = table.insertRow(1);
    let nameTh = document.createElement('th');
    let itemTh = document.createElement('th');
    let createTh = document.createElement('th');
    let nameInput = document.createElement('input');
    nameInput.setAttribute('id', `name-input-${order.id}`);
    nameInput.setAttribute('type', "text");
    nameInput.setAttribute('class', 'form-control');
    let itemInput = document.createElement('input');
    itemInput.setAttribute('id', `item-input-${order.id}`);
    itemInput.setAttribute('type', "text");
    itemInput.setAttribute('class', 'form-control');
    let newCustomerButton = createNewCustomerButton(order);
    nameTh.appendChild(nameInput);
    itemTh.appendChild(itemInput);
    createTh.appendChild(newCustomerButton);
    formRow.appendChild(nameTh);
    formRow.appendChild(itemTh);
    formRow.appendChild(createTh);
    return table;
}

function clearElement(element) {
    while(element.firstChild) {
        element.removeChild(element.firstChild);
    }
}