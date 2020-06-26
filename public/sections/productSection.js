//***********************    PRODUCT SHOP    ****************************/
function showProductShop() {
    $("#demo").empty();
    $("#demo").addClass("class='container-fluid'");
    $('#demo').append("<h2>Product Catalouge </h2>");
    $('#demo').append("<div class='container'></div>")
    $('#demo').append("<div class='row' id='productColumn' ></div>");
    $.ajax({
      beforeSend: function () { },
      type: "GET",
      url: "/api/products",
      success: function (data) {
        let products = [];
        products = data;
  
        for (let i = 0; i < products.length; i++) {
          $("#productColumn").append(
            `<div class="column" style="padding:0 15px;"><h1> ${products[i].name} </h1><img src="./images/${products[i].name}.jpg" style="width:300px;height:300px"> <p> ${products[i].price} €<br>Rating: ${products[i].rating}<br>Stock: ${products[i].stock} </p><button class='btn-primary' id='${products[i]._id}' onClick='javascript:buyProduct("${products[i]._id}")' style='width:200px;'  >Buy ${products[i].name}</button></div>`
          );
          if (products[i].stock < 1) {
            $(`#${products[i]._id}`).prop("disabled", true).html("out of Stock");
          }
        }
  
      },
    });
  }
  //***********************  Funktion mit ajax request dem die id des produktes für den kauf übergeben wird   ****************************/
  function buyProduct(id) {
    $.ajax({
      beforeSend: function (xhr) {
        xhr.setRequestHeader("x-token", usertoken)
      },
      type: "PUT",
      url: `/api/users/${currentUser}/profil`,
      data:
        { inventory: [id] },
      success: function (data) {
  
        decreaseProductStock(id);
        alert(`Product bought and waiting for admin to confirm`);
       showProductShop()
      },
      error: function (error) {
  
        alert(error.responseText)
      }
    })
  }
  //***********************   Funktion mit der, der Lagerbestand verringert wird    ****************************/
  function decreaseProductStock(productID) {
    $.ajax({
      beforeSend: function (xhr) {
        xhr.setRequestHeader("x-token", usertoken);
      },
      type: "PUT",
      url: `/api/products/${productID}`,
      data:
        { stock: 1 },
      success: function (data) {
        
  
      },
      error: function (error) {
        alert(error.responseText);
      }
  
    })
  
  }
  //***********************   Funktion mit der der Lagerbestand erhöt wird    ****************************/
  function increaseProductStock(productID) {
    $.ajax({
      beforeSend: function (xhr) {
        xhr.setRequestHeader("x-token", usertoken);
      },
      type: "PUT",
      url: `/api/products/${productID}`,
      data:
        { stock: -1 },
      success: function (data) {
        
  
      },
      error: function (error) {
        alert(error.responseText);
      }
  
    })
  
  }
  //***********************    Funktion die den Gesammten warenkorb anzeigt  ****************************/
function showInventory(){
    $("#demo").empty();
    $("#demo").addClass("class='container-fluid'");
  let inventory=[];
    
  $.ajax({
  beforeSend:function(xhr){
    xhr.setRequestHeader("x-token",usertoken);
  },
  type:"GET",
  url:`/api/users/${currentUser}/profil`,
  success:function(data){
  inventory=data.inventory;
  
  },
  error:function(error){
    alert(error.responseText)
  },
   })
  
  $.get("/api/products",function(data){
    let totalPrice=0;
  for(let i=0;i<data.length;i++){
    for(let j=0;j<inventory.length;j++){
      if(data[i]._id==inventory[j]){
        totalPrice+=data[i].price
        $("#demo").append(`
        <button onclick='deleteInventory("${data[i]._id}")' style='width:100px;height:25px'>Delete</button>
        <button onclick='addInventory("${data[i]._id}")' style='width:100px;height:25px;'>Add</button>
        <p>Name: ${data[i].name} <br> Price: ${data[i].price} € <br>Stock: ${data[i].stock}</p>
        `);
      }
    }
  }
  $("#demo").append(`<h1> Total sum: ${totalPrice} €</h1><button onclick='alert("to do: checkout")' style='width:150px;height:50px;'>Check out</button>`)
  })
  }
  //***********************    Funktion die durch den button klick ein produkt aus dem warenkorb entfernt    ****************************/
  function deleteInventory(id){
    $.ajax({
      beforeSend: function (xhr) {
        xhr.setRequestHeader("x-token", usertoken)
      },
      type: "PUT",
      url: `/api/users/${currentUser}/profil`,
      data:
        { inventory: [id],delete:true },
      success: function (data) {
  
        increaseProductStock(id);
        alert(`Product deleted`);
       showInventory()
      },
      error: function (error) {
  
        alert(error.responseText)
      }
    })
  
  
  }
  //***********************   Funktion die ein Produkt dem Warenkorb hinzufügt (im warenkorb)    ****************************/
  function addInventory(id){
    $.ajax({
      beforeSend: function (xhr) {
        xhr.setRequestHeader("x-token", usertoken)
      },
      type: "PUT",
      url: `/api/users/${currentUser}/profil`,
      data:
        { inventory: [id] },
      success: function (data) {
  
        decreaseProductStock(id);
        alert(`Product bought and waiting for admin to confirm`);
       showInventory();
      },
      error: function (error) {
  
        alert(error.responseText)
      }
    })
  }
  
  