function getInventory() {
  var raw_url = document.getElementById("form-input").value

  if (raw_url.indexOf('?')>0) {
    var url = raw_url.substr(0, raw_url.indexOf('?')) + ".json";
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
    document.getElementById("runThisTown").disabled = true;
    if (request.status >= 200 && request.status < 400) {

      // document.getElementById("product-image").src=data.product.image.src;
      document.getElementById("product-name").innerHTML=data.product.title;
      document.getElementById("product-price").innerHTML="$" + data.product.variants[0].price;
      document.getElementById("10-off-price").innerHTML="10% off: $" + (data.product.variants[0].price*.9).toFixed(2);
      document.getElementById("15-off-price").innerHTML="15% off: $" + (data.product.variants[0].price*.85).toFixed(2);
      document.getElementById("20-off-price").innerHTML="20% off: $" + (data.product.variants[0].price*.8).toFixed(2);
      data.product.options.forEach(option => {
        document.getElementById("product-options-names").textContent+=option.name+", ";
      })
      data.product.options.forEach(option => {
        document.getElementById("product-options").textContent+=option.values.length+",";
      })
      document.getElementById("product-options-names").innerHTML=document.getElementById("product-options-names").textContent.substr(0, document.getElementById("product-options-names").textContent.length-2);
      document.getElementById("product-options").innerHTML=document.getElementById("product-options").textContent.substr(0, document.getElementById("product-options").textContent.length-1);

      i = 0;
      data.product.images.forEach(image => {
        i++;
        imageSRC = document.createElement('a');
        imageSRC.setAttribute('download', i);
        imageSRC.setAttribute('href', image.src);
        imageActual = document.createElement('img');
        imageActual.classList.add("product-image");
        imageActual.src = image.src;
        imageSRC.appendChild(imageActual);

        const imagesList = document.getElementById("results-images");
        imagesList.appendChild(imageSRC);
      });

      data.product.variants.forEach(variant => {

        const tr = document.createElement('tr')
        tr.classList.add("data-row");
        if (variant.inventory_quantity<10) {
          tr.classList.add("low-inventory");
        };
        if (variant.inventory_quantity<5) {
          tr.classList.add("super-low-inventory");
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
