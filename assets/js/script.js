/* end slide*/
function myFunction() {
  var dots = document.getElementById("dots");
  var moreText = document.getElementById("more");
  var btnText = document.getElementById("myBtn");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Read more";
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "Read less";
    moreText.style.display = "inline";
  }
}
$(".chickFirst").click(function () {
  $(".displayFirst").toggle(300);
});
$(".chickSecond").click(function () {
  $(".displaySecond").toggle(300);
});
$(".chickThird").click(function () {
  $(".displayThird").toggle(300);
});
/* on*/
$(".display-image").click(function () {
  $(".displayFirst").toggle(300);
});
$(".display-imageSC").click(function () {
  $(".displaySecond").toggle(300);
});
$(".display-imageTH").click(function () {
  $(".displayThird").toggle(300);
});

// ************************************************
// Shopping Cart API
// ************************************************
$(function () {


  if ($('[data-toggle="cart"]').length) {
    $('[data-toggle="cart"]').popover({
      html: true
    });
  }

  // add to cart

  var cart = [];

  var localCart = localStorage.getItem("cart");

  if (localCart) {
    cart = JSON.parse(localCart);
    refreshCartUI();
  }

  var cartPageLList = $(".cart-page-list");

  if (cartPageLList.length) {
    refreshCartPageUI();
  }

  $(".add-to-cart").on("click", function (e) {
    e.preventDefault();
    var item = {
      id: $(this).attr("data-id"),
      name: $(this).attr("data-name"),
      price: parseFloat($(this).attr("data-price"))
    };
    cart.push(item);
    refreshCartUI();
  });

  function refreshCartPageUI() {
    var table = cartPageLList;
    $(".cart-page-items").text(cart.length);
    var totalPrice = 0;

    table.html("");
    $.each(cart, function (index, item) {
      table.append(
        "<tr><td>" +
        item.name +
        "</td><td><button data-index='" +
        index +
        "' class='remove-item'>-</button> <div class='button dropdown'><select id='colorselector'><option value='red'>Filter by name...</option></select></div></td></tr>"
      );
      totalPrice += item.price;
    });

    $(".cart-page-total").text(totalPrice);
  }

  function refreshCartUI() {
    localStorage.setItem("cart", JSON.stringify(cart));
    var table = $(".cart-dropdown-list");
    $(".total-count").text(cart.length);
    var totalPrice = 0;

    table.html("");
    $.each(cart, function (index, item) {
      table.append(
        "<tr><td>" +
        item.name +
        "</td><td><button data-index='" +
        index +
        "' class='remove-item'></button></td></tr>"

      );
      totalPrice += item.price;
    });

    $(".total-cart").text(totalPrice);
  }

  $('[data-toggle="cart"]').on("shown.bs.popover", function () {
    refreshCartUI();
  });

  $("body").delegate(".remove-item", "click", function () {
    var index = parseInt($(this).attr("data-index"));
    cart = cart.filter(function (item, itemIndex) {
      return itemIndex != index;
    });
    refreshCartUI();
    refreshCartPageUI();
  });
});