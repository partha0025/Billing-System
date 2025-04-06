let totalAmount = 0;

const items = [];

const totalBill = [];

const totalPriceElement = document.getElementById("total_price");

// Add Item

document.getElementById("add-item").addEventListener("click", () => {

    const itemNo = document.getElementById("item_no").value;

    const name = document.getElementById("name").value;

    const price = parseFloat(document.getElementById("price").value);

    const qty = parseInt(document.getElementById("qty").value);

    if (!itemNo || !name || price <= 0 || qty <= 0) 
    {

        alert("Please fill out all fields with valid data.");

        return;

    }

    const total = price * qty;

    items.push({ itemNo, name, price, qty, total });

    totalAmount += total;

    const table = document.querySelector("#bill tbody");

    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${itemNo}</td>
        <td>${name}</td>
        <td>₹${price.toFixed(2)}</td>
        <td>${qty}</td>
        <td>₹${total.toFixed(2)}</td>
    `;

    table.appendChild(row);

    clearInputs();

    updateTotal();

});

// Total Bill

document.getElementById("total").addEventListener("click", async () => {

    if (!items.length) 
    {

        alert("No items to calculate total.");

        return;

    }

    totalBill.push({ items, totalAmount });

    try 
    {
        console.log(totalBill);
        
        const response = await fetch("http://localhost:8000/update", {

            method: "POST",

            headers: { "Content-Type": "application/json" },

            body: JSON.stringify(totalBill),

        });

        if (!response.ok) 
        {

            throw new Error(`Error: ${response.status}`);

        }

        alert("Bill submitted successfully!");

        resetBilling();

    } 

    catch (error) 
    {

        alert("Server not responding. Try again later.");

    }
    
});

// Clear Last Item

document.getElementById("clear").addEventListener("click", () => {

    if (!items.length) 
    {

        alert("No items to clear.");

        return;

    }

    const table = document.querySelector("#bill tbody");

    table.lastChild.remove();

    totalAmount -= items.pop().total;

    updateTotal();

});

// Helper Functions

function updateTotal() 
{

    totalPriceElement.textContent = `Total price: ₹${totalAmount.toFixed(2)}`;

}

function clearInputs() 
{

    document.getElementById("item_no").value = "";

    document.getElementById("name").value = "";

    document.getElementById("price").value = "";

    document.getElementById("qty").value = "";

}

function resetBilling() 
{

    const table = document.querySelector("#bill tbody");

    table.innerHTML = "";

    items.length = 0;

    totalBill.length = 0;

    totalAmount = 0;

    updateTotal();

}