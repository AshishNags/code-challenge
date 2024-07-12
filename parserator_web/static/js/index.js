/* TODO: Flesh this out to connect the form to the API and render results
   in the #address-results div. */
const addressForm = document.getElementById("address-form");
addressForm.addEventListener("submit", (e)=>{
   e.preventDefault();
   
   const address = document.getElementById("address").value;
   console.log(address);
   const queryparam = new URLSearchParams({'address': address})

   fetch('/api/parse?'+queryparam)
   .then((response) => {
      if (response.status === 400) {
         throw new Error(response)
      }
      return response.json();
   })
   .then((data) => {
      console.log(data);

      document.getElementById("address-results").style.display = "block";

      const table = document.getElementById("table-body");
      table.innerHTML = null;
      const items = data.address_components;
      for (let item in items){
         console.log(item, items[item]);
         const row = document.createElement('tr');
         const cell1 = document.createElement('td');
         cell1.textContent = item;
         row.appendChild(cell1);
         const cell2 = document.createElement('td');
         cell2.textContent = items[item];
         row.appendChild(cell2);
         table.appendChild(row);
      }
   })
   .catch((error)=>{
      console.log(error);
      const err = document.getElementById("error-display");
      const msg = document.createElement('p');
      msg.textContent = error;
      err.appendChild(msg);
   })
})