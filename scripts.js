function getInventory() {
  var raw_url = document.getElementById("form-input").value
  console.log(raw_url);

  if (raw_url.indexOf('?')>0) {
    var url = raw_url.substr(0, raw_url.indexOf('?')) + ".json";
    console.log(url);
  }
  else {
    var url = (raw_url) + ".json";
  }

  var request = new XMLHttpRequest()
  request.open('GET', url, true)
  request.onload = function() {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response)
    console.log(data);
    if (request.status >= 200 && request.status < 400) {

      document.getElementById("product-image").src=data.product.image.src;
      document.getElementById("product-name").innerHTML=data.product.title;

      data.product.variants.forEach(variant => {

        const tr = document.createElement('tr')
        tr.classList.add("data-row");
        if (variant.inventory_quantity<5) {
          tr.classList.add("low-inventory");
        };

        const table = document.getElementById("results-table");
        table.appendChild(tr)

        const td_title = document.createElement('td')
        td_title.textContent = variant.title
        tr.appendChild(td_title)

        const td_inventory = document.createElement('td')
        td_inventory.textContent = variant.inventory_quantity
        tr.appendChild(td_inventory)

        const td_price = document.createElement('td')
        td_price.textContent = "$"+variant.price
        tr.appendChild(td_price)


      })
    } else {
      const errorMessage = document.createElement('marquee')
      errorMessage.textContent = `Gah, it's not working!`
      app.appendChild(errorMessage)
    }
  }

  request.send()
}
