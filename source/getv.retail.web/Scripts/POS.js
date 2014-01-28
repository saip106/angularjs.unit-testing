function processLogin() {
    $('#login').empty();
    $('#login').append('Register# JRX01 - Cashier User Name');
    $('#mainNavigation').add('<li><a onclick=\"processLogout()\" /a></li>');    
    var userAPI = "http://v1retailapi.apiary.io/users/55";
    $.getJSON(userAPI, function (usr) {
        var usrName = usr.UserName;
        var usrID = usr.UserID;
        var registerHost = window.location.hostname;//replace with POS register identification.
        $('#login').empty();
        $('#login').append('Register# ' + registerHost + ' - Cashier ' + usrName + ' : ' + usrName + ' ');

    }).fail(function (jqXHR, textStatus, err) {
        $('#login').text('user name not found' + err);
    });
}
function processLogout() {
    $('#login').empty();
    $('#login').append('<ul class=\"nav\"><li><a onclick=\"processLogin()\">Login</a></li></ul>');
}

function setGiftCard() {
    var tabid = $('#LayoutConfig li.active').find('a').attr('id');
} 

function addItem() {
    //check from api if item exists then add its object or id
    var sku = $('#product_search_product_sku').val();
    var orderAPI = "http://v1retailapi.apiary.io/products/"+ sku;
    $.getJSON(orderAPI, function (order) {
        var itemID = order.items[0].id;
        var itemPrice = 1.01;
        var itemName = order.items[0].name;
        var itemQuantity = 1;
        $('#shoppingCart').append('<tr id=\"' + itemID + '\"><td class=\"span2\"><a id=\"updateQty\" class="updateQty" data-toggle=\"modal\" href=\"#QtyModal\">' + itemQuantity + '</a></td><td class=\"span2\">' + itemName + '</td><td><a id=\"updateUnitPrice\" href=\"#UnitPriceModal\" class=\"btn btn-info\" data-toggle="modal">' + itemPrice + '</a></td><td id="lineItemTotal' + itemID + '">' + itemPrice + '</td><td><a  id=\"' + itemID + '\" href="#" class=\"removeLineItem\">X</a></td></tr>');

    }).fail(function (jqXHR, textStatus, err) {
                $('#product').text('Error: ' + err);
           });
    //function find() {
    //    var id = $('#prodId').val();
    //    $.getJSON(uri + '/' + id)
    //        .done(function (data) {
    //            $('#product').text(formatItem(data));
    //        })
    //        .fail(function (jqXHR, textStatus, err) {
    //            $('#product').text('Error: ' + err);
    //        });
    //}
    //for now just add what in the text box
    //$('#shoppingCart').append('<tr><td>1</td><td>' + $('#product_search_product_sku').val() + '</td><td><a href=index.htm data-role=button  data-icon=delete data-iconpos=notext>Delete</a></td><td></td></tr>');
    //$('#shoppingCart').append('<tr id=\"' + 90210 + '\"><td class=\"span2\"><a id=\"updateQty\" class="updateQty" data-toggle=\"modal\" href=\"#QtyModal\">' + 1 + '</a></td><td class=\"span2\">' + $('#product_search_product_sku').val() + '</td><td><a id=\"updateUnitPrice\" href=\"#UnitPriceModal\" class=\"btn btn-info\" data-toggle="modal">' + 1.00 + '</a></td><td id="lineItemTotal' + 90210 + '">' + 1.00 + '</td><td><a  id=\"' + 90210 + '\" href="#" class=\"removeLineItem\">X</a></td></tr>');
    

    //after the item has been added clear the text or the scanned item...
    $('#product_search_product_sku').val('');

    setCartFooterTotals();
}

function LoadOrder() {
    var orderAPI = "http://v1retailapi.apiary.io/orders/99";
    var orderTotal = 0;
    var discount = 0;
    var orderSubTotal = 0;
    var donation = 0;
    
    $.getJSON(orderAPI, function (order) {
        orderTotal = order.Total;
        discount = order.PromoDiscount;
        orderSubTotal = order.ItemsSubtotal;
        donation = order.DonationAmount;
        $.each(order.Items, function (index, item) {
            var $row = $("#template").find(".row").clone().attr("id", "row_" + item.ID)
            $row.find(".itemName").html(item.Name);
            var itemID = item.ID;
            var itemPrice = item.Price;
            var itemName = item.Name;
            var itemQuantity = item.Quantity;
            $('#shoppingCart').append('<tr id=\"' + index + '\"><td class=\"span2\"><a id=\"updateQty\" class="updateQty" data-toggle=\"modal\" href=\"#QtyModal\">' + itemQuantity + '</a></td><td class=\"span2\">' + itemName + '</td><td><a id=\"updateUnitPrice\" href=\"#UnitPriceModal\" class=\"btn btn-info\" data-toggle="modal">' + itemPrice + '</a></td><td id="lineItemTotal' + itemID + '">' + itemPrice + '</td><td><a  id=\"' + itemID + '\" href="#" class=\"removeLineItem\">X</a></td></tr>');
            //$('#shoppingCart').append($row); \\need to switch out to template row
        });
        $('#subTotal').text(orderSubTotal.toFixed(2));
        orderSubTotal = parseFloat($('#subTotal').text());
        var total = parseFloat(orderSubTotal) + parseFloat(discount);
        //if (total != orderTotal) { alert('total error'); } else {
        // verify totals
        //}
        var toPay = orderTotal;

        $('#discount').text(discount.toFixed(2))
        $('#total').text(orderTotal.toFixed(2))
        $('#toPay').text(toPay.toFixed(2));

    });
    //setCartFooterTotals();
}

function parkOrder() {
    var orderAPI = "http://v1retailapi.apiary.io/orders/";//maybe use the wish list to park the cart?
    var orderTotal = 0;
    var discount = 0;
    var orderSubTotal = 0;
    var donation = 0;

    var orderToParkItems = [{ "ID": "12345", "Name": "name here 1", "Format": "", "Price": "1.99", "Sale": "0.59", "IsOnSale": "false", "Availability": "", "Image": "", "Quantity": "1" },
               { "ID": "67890", "Name": "name here 2", "Format": "", "Price": "2.99", "Sale": "1.59", "IsOnSale": "false", "Availability": "", "Image": "", "Quantity": "1" },
               { "ID": "ABC123", "Name": "name here 3", "Format": "", "Price": "3.99", "Sale": "2.59", "IsOnSale": "true", "Availability": "", "Image": "", "Quantity": "1" }];
    var orderToPark = [{ "ItemsSubtotal": "49.97", "ItemsDiscount": "6.00", "PromoCode": "QR53C", "PromoDiscount": "10.00", "DonationAmount": "5.00", "Total": "44.97", "Items": [orderToPark] }];
    //grab all items and build json string
    //

    $.ajax({
        type: "POST",
        url: orderAPI,
        data: JSON.stringify({ order: orderToPark }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) { alert(data + 'Your Order has been placed on hold/parked.'); },
        failure: function (errMsg) {
            alert(errMsg);
        }
    }); //send the parked cart

    voidItem();//clear the cart after park
}
function payOrder() {

    $('#payModal').toggle();
}

function voidItem() {

    $('#shoppingCart').empty();
}

function getHotKeys() {

    var hotKeyData = {
        "items": [
                  {
                      "id": "SERMON",
                      "name": "Sermon Series",
                      "isActive": true
                  },
                  {
                      "id": "BBD",
                      "name": "Books, Bibles And Devotionals",
                      "isActive": true
                  },
                  {
                      "id": "MUSIC",
                      "name": "Music",
                      "isActive": true
                  },
                  {
                      "id": "MD",
                      "name": "Movies And Documentaries",
                      "isActive": true
                  },
                  {
                      "id": "HEALTH",
                      "name": "Health And Healing",
                      "isActive": true
                  },
                  {
                      "id": "WOMEN",
                      "name": "Women",
                      "isActive": true
                  },
                  {
                      "id": "CHILD",
                      "name": "Children And Teens",
                      "isActive": true
                  },
                  {
                      "id": "SPANISH",
                      "name": "En Espanol",
                      "isActive": true
                  },
                  {
                      "id": "INTERVIEW",
                      "name": "Interviews",
                      "isActive": true
                  },
                  {
                      "id": "SINGLE",
                      "name": "Sermon Singles",
                      "isActive": true
                  },
                  {
                      "id": "MISC",
                      "name": "Miscellaneous product or resources",
                      "isActive": true
                  }
        ],
        "links": [
            {
                "rel": "self",
                "href": "http://v1-retail-api.jhm.info/categories",
                "method": "GET"
            }
        ],
        "meta": {
            "apiVersion": 1,
            "statusCode": 200,
            "success": true,
            "itemsPerPage": 14,
            "startIndex": 0,
            "totalResults": 14
        }
    };

    return hotKeyData;
}

function getLayout()
{
    var layout = {
        "layout": [
            {
                "id": "1",
                "name": "default",
                "sections": [
                    {
                        "id": "1",
                        "name": "Test Tab",
                        "quick_keys": [
                            {
                                "id": "B43",
                                "text": "Prophecy Bible"
                            },
                            {
                                "id": "B44",
                                "text": "Prophecy Bible 2"
                            }

                        ]
                    },
                     {
                         "id": "2",
                         "name": "Test Tab 2",
                         "quick_keys": [
                             {
                                 "id": "B43",
                                 "text": "Prophecy Bible"
                             },
                             {
                                 "id": "B44",
                                 "text": "Prophecy Bible 2"
                             }

                         ]
                     }
                ]
            }
        ]
    };

    return layout;
}


function getStockItemsForHotKey(itemId) {
    var stockItemList = {
        "items": [
                  {
                      "id": "1026C",
                      "description": "When President Obama spoke to the graduating class at West Point Military Academy he spoke of the coming New World Order. The New World Order is not a new idea. It has been floating around since the Book of Genesis and has made serious inroads over the centuries into the present. Why is this topic relevant? As Americans we have lived in freedom so long we are blind to the tyranny that is approaching. We need to understand it clearly so that we can help our nation change course. It is time to stop wringing our hands in despair and take action. We need to rescue our destiny from the disaster of socialism. Socialism is paganism...it makes the state your god instead of God Almighty! This is a must hear teaching for such a critical time in our history. ",
                      "name": "Obama's New World Order",
                      "format": "C",
                      "size": "XL",
                      "color": "BLACK",
                      "weight": 0.2000,
                      "prices": [
                        {
                            "id": 14405,
                            "priceCode": "P",
                            "amount": 0.0000,
                            "startDate": "2010-08-02T00:00:00",
                            "endDate": "2099-08-02T00:00:00",
                            "isActive": true
                        },
                        {
                            "id": 14406,
                            "priceCode": "ST",
                            "amount": 7.0000,
                            "startDate": "2010-08-02T00:00:00",
                            "endDate": "2099-08-02T00:00:00",
                            "isActive": true
                        },
                        {
                            "id": 15869,
                            "priceCode": "FM",
                            "amount": 7.0000,
                            "startDate": "2012-01-01T00:00:00",
                            "endDate": "2099-12-31T00:00:00",
                            "isActive": true
                        }
                      ],
                      "discountAllowed": true,
                      "availableStartDate": "2010-08-02T00:00:00",
                      "useInShoppingCart": true,
                      "isActive": true,
                      "isKit": false,
                      "stockItemWarehouses": [
                        {
                            "id": 8538,
                            "warehouseId": "15",
                            "stockItemLocations": [
                              {
                                  "id": 25274,
                                  "location": {
                                      "id": "CSC_15",
                                      "name": "CSC"
                                  },
                                  "onHandQuantity": 0,
                                  "committedQuantity": 0,
                                  "trueOnHand": 0
                              }
                            ],
                            "cost": 3.3400,
                            "checkAvailability": true,
                            "allowBackorder": true,
                            "trueOnHand": 0
                        },
                        {
                            "id": 17085,
                            "warehouseId": "10",
                            "stockItemLocations": [
                              {
                                  "id": 33898,
                                  "location": {
                                      "id": "FULCTR_10",
                                      "name": "FULCTR"
                                  },
                                  "onHandQuantity": 62,
                                  "committedQuantity": 0,
                                  "trueOnHand": 62
                              }
                            ],
                            "cost": 3.3400,
                            "checkAvailability": false,
                            "allowBackorder": false,
                            "trueOnHand": 62
                        }
                      ],
                      "productId": "1026"
                  },
                  {
                      "id": "1026D",
                      "description": "When President Obama spoke to the graduating class at West Point Military Academy he spoke of the coming New World Order. The New World Order is not a new idea. It has been floating around since the Book of Genesis and has made serious inroads over the centuries into the present. Why is this topic relevant? As Americans we have lived in freedom so long we are blind to the tyranny that is approaching. We need to understand it clearly so that we can help our nation change course. It is time to stop wringing our hands in despair and take action. We need to rescue our destiny from the disaster of socialism. Socialism is paganism...it makes the state your god instead of God Almighty! This is a must hear teaching for such a critical time in our history. ",
                      "name": "Obama's New World Order",
                      "format": "D",
                      "weight": 0.2000,
                      "prices": [
                        {
                            "id": 15874,
                            "priceCode": "FM",
                            "amount": 15.0000,
                            "startDate": "2012-01-01T00:00:00",
                            "endDate": "2099-12-31T00:00:00",
                            "isActive": true
                        },
                        {
                            "id": 14407,
                            "priceCode": "P",
                            "amount": 0.0000,
                            "startDate": "2010-08-02T00:00:00",
                            "endDate": "2099-08-02T00:00:00",
                            "isActive": true
                        },
                        {
                            "id": 14408,
                            "priceCode": "ST",
                            "amount": 15.0000,
                            "startDate": "2010-08-02T00:00:00",
                            "endDate": "2099-08-02T00:00:00",
                            "isActive": true
                        }
                      ],
                      "discountAllowed": true,
                      "availableStartDate": "2010-08-02T00:00:00",
                      "useInShoppingCart": true,
                      "isActive": true,
                      "isKit": false,
                      "stockItemWarehouses": [
                        {
                            "id": 8539,
                            "warehouseId": "15",
                            "stockItemLocations": [
                              {
                                  "id": 25275,
                                  "location": {
                                      "id": "CSC_15",
                                      "name": "CSC"
                                  },
                                  "onHandQuantity": 0,
                                  "committedQuantity": 0,
                                  "trueOnHand": 0
                              }
                            ],
                            "cost": 3.3400,
                            "checkAvailability": true,
                            "allowBackorder": true,
                            "trueOnHand": 0
                        },
                        {
                            "id": 16986,
                            "warehouseId": "10",
                            "stockItemLocations": [
                              {
                                  "id": 33799,
                                  "location": {
                                      "id": "FULCTR_10",
                                      "name": "FULCTR"
                                  },
                                  "onHandQuantity": 38,
                                  "committedQuantity": 2,
                                  "trueOnHand": 36
                              }
                            ],
                            "cost": 3.3400,
                            "checkAvailability": false,
                            "allowBackorder": false,
                            "trueOnHand": 36
                        }
                      ],
                      "productId": "1026"
                  }
        ],
        "links": [
            {
                "rel": "self",
                "href": "http://v1-retail-api.jhm.info/products/1026/stockitems",
                "method": "GET"
            }
        ],
        "meta": {
            "apiVersion": 1,
            "statusCode": 200,
            "success": true,
            "itemsPerPage": 14,
            "startIndex": 0,
            "totalResults": 14
        }
    };

    return stockItemList;
}

function getStockItemDetails(itemId) {
    var stockItemDetails = {
        "meta": {
            "success": true,
            "apiVersion": 1,
            "statusCode": 200
        },
        "items": [
          {
              "availableStartDate": "2010-08-02T00:00:00Z",
              "color": "BLACK",
              "description": "When President Obama spoke to the graduating class at West Point Military Academy he spoke of the coming New World Order. The New World Order is not a new idea. It has been floating around since the Book of Genesis and has made serious inroads over the centuries into the present. Why is this topic relevant? As Americans we have lived in freedom so long we are blind to the tyranny that is approaching. We need to understand it clearly so that we can help our nation change course. It is time to stop wringing our hands in despair and take action. We need to rescue our destiny from the disaster of socialism. Socialism is paganism...it makes the state your god instead of God Almighty! This is a must hear teaching for such a critical time in our history. ",
              "discountAllowed": true,
              "format": "CD",
              "id": "1026C",
              "isActive": true,
              "isKit": false,
              "isOnSale": false,
              "listPrice": 7.0,
              "name": "Obama's New World Order",
              "prices": [
                {
                    "amount": 7.0,
                    "endDate": "2099-12-31T00:00:00Z",
                    "id": 15869,
                    "isActive": true,
                    "priceCode": "FM",
                    "startDate": "2012-01-01T00:00:00Z"
                },
                {
                    "amount": 0.0,
                    "endDate": "2099-08-02T00:00:00Z",
                    "id": 14405,
                    "isActive": true,
                    "priceCode": "P",
                    "startDate": "2010-08-02T00:00:00Z"
                },
                {
                    "amount": 7.0,
                    "endDate": "2099-08-02T00:00:00Z",
                    "id": 14406,
                    "isActive": true,
                    "priceCode": "ST",
                    "startDate": "2010-08-02T00:00:00Z"
                }
              ],
              "product": {
                  "availableStartDate": "2010-08-02T00:00:00Z",
                  "description": "When President Obama spoke to the graduating class at West Point Military Academy he spoke of the coming New World Order. The New World Order is not a new idea. It has been floating around since the Book of Genesis and has made serious inroads over the centuries into the present. Why is this topic relevant? As Americans we have lived in freedom so long we are blind to the tyranny that is approaching. We need to understand it clearly so that we can help our nation change course. It is time to stop wringing our hands in despair and take action. We need to rescue our destiny from the disaster of socialism. Socialism is paganism...it makes the state your god instead of God Almighty! This is a must hear teaching for such a critical time in our history. ",
                  "id": "1026",
                  "images": [
                    {
                        "id": 86,
                        "thumbnailUrl": "https://media.jhm.info/images/thumbnails/S1026.jpg",
                        "url": "https://media.jhm.info/images/S1026.jpg"
                    },
                    {
                        "id": 88,
                        "thumbnailUrl": "https://media.jhm.info/images/thumbnails/S1026.jpg",
                        "url": "https://media.jhm.info/images/S1026.jpg"
                    }
                  ],
                  "name": "Obama's New World Order",
                  "publisherId": "JHM",
                  "stockItems": []
              },
              "productId": "1026",
              "salePrice": 7.0,
              "size": "XL",
              "stockItemWarehouses": [
                {
                    "allowBackorder": true,
                    "checkAvailability": true,
                    "cost": 3.34,
                    "id": 8538,
                    "stockItemLocations": [
                      {
                          "committedQuantity": 0,
                          "id": 25274,
                          "onHandQuantity": 0,
                          "trueOnHand": 0
                      }
                    ],
                    "trueOnHand": 0,
                    "warehouseId": "15"
                },
                {
                    "allowBackorder": false,
                    "checkAvailability": false,
                    "cost": 3.34,
                    "id": 17085,
                    "stockItemLocations": [
                      {
                          "committedQuantity": 2,
                          "id": 33898,
                          "onHandQuantity": 62,
                          "trueOnHand": 60
                      }
                    ],
                    "trueOnHand": 60,
                    "warehouseId": "10"
                }
              ],
              "useInShoppingCart": true,
              "weight": 0.2
          }
        ],
        "links": {
            "self": "http://v1-dev-retail-api.jhm.info/stockitems/1026C",
            "root": "http://v1-dev-retail-api.jhm.info/"
        }
    };

  
    return stockItemDetails;
}

function setCartFooterTotals() {

    var subTotal = parseFloat(0.00);
    var discount =parseFloat( 0.00);
    var total = parseFloat(0.00);
    var toPay = parseFloat(0.00);

    $("td[id^='lineItemTotal']").each(function () {
        subTotal = +subTotal + +parseFloat($('#' + this.id).text());
    });


    $('#subTotal').text(subTotal.toFixed(2));
    subTotal = parseFloat($('#subTotal').text());
    total = parseFloat(subTotal) + parseFloat(discount);
    toPay = total;
    
    $('#discount').text(discount.toFixed(2))
    $('#total').text(total.toFixed(2))
    $('#toPay').text(toPay.toFixed(2));

}

function buildHotKeys() {
    var JSONData = getLayout();
    
    $.each(JSONData.layout[0].sections, function (i, sections) {
     
        var sectionName = sections.name.replace(/\s/g, '');

        $("#hotKeysTabs").append("<li><a href=\"#" + sectionName + "\" data-toggle=\"tab\">" + sections.name + "</a></li>");
        $("#hotKeySections").append("<div id=\"" + sectionName + "\" class=\"tab-pane\"></div>");

        $.each(sections.quick_keys, function (i, quick_keys) {
            
            $('#' + sectionName).append('<a id=\"' + quick_keys.id + '\" href=\"#\" role=\"button\" class=\"btn btn-primary hotkeyconfiguration\">' + quick_keys.text + '</a>');
            
        });
    });
}

function addItemToHotKeyLayout(sectionName) {
    //check from db if item exists then add its object or id
    var sku = $('#productToAddToHotKeySection').val();
    var orderAPI = "http://v1retailapi.apiary.io/products/" + sku;
    
    $.getJSON(orderAPI, function (order) {

        var itemID = order.items[0].id;
        var itemName = order.items[0].name;
        alert('#" + sectionName + "');
        $('#' + sectionName + '').append('<a id=\"' + itemID + '\" href=\"#\" role=\"button\" class=\"btn btn-primary hotkeyconfiguration\">' + itemName + '</a>');

    })
    //after the item has been added clear the text or the scanned item...
    $('#productToAddToHotKeySection').val('');

    setCartFooterTotals();
}

$(document).ready(function () {

    buildHotKeys();
    //var hotKeyData = getStockItemsForHotKey();
    //$.each(hotKeyData.items, function () {
    //    $('#hkUserSpecific').append('<a id=\"' + this.id + '\" href=\"#hotKeyModal\" role=\"button\" class=\"btn btn-primary addStockItemToCart\">' + this.name + '</a>');
    //});
});

$(document).on("click", ".addStockItemToCart", function (event) {

    var itemId = $(this).attr('id');
    ////var url = "http://v1-dev-retail-api.jhm.info/stockitems/" + itemId;
    var data = getStockItemDetails(itemId);
    

    $('#shoppingCart').append('<tr id=\"' + itemId + '\"><td class=\"span2\"><a id=\"updateQty\" class="updateQty" data-toggle=\"modal\" href=\"#QtyModal\">1</a></td><td class=\"span2\">Obamas New World Order</td><td><a id=\"updateUnitPrice\" href=\"#UnitPriceModal\" class=\"btn btn-info\" data-toggle="modal">@5.00</a></td><td id="lineItemTotal' + itemId + '">5.25</td><td><a  id=\"' + itemId + '\" href="#" class=\"removeLineItem\">X</a></td></tr>');
    setCartFooterTotals();
});

$(document).on("click", "#btnAddHotKeyToSection", function (event) {
    //check from db if item exists then add its object or id
    var sku = $('#productToAddToHotKeySection').val();
    var orderAPI = "http://v1retailapi.apiary.io/products/" + sku;
    var itemID = "B43";
    var itemName = "Prophecy Study Bible";

    //$.getJSON(orderAPI, function (order) {
    //    var itemID = order.items[0].id;
    //    var itemName = order.items[0].name;
 
    //})
    var tabid = $('#LayoutConfig li.active a').attr('href');
    $('' + tabid + '').append('<a id=\"' + itemID + '\" href=\"#\" role=\"button\" class=\"btn btn-primary hotkeyconfiguration\">' + itemName + '</a>');
    
    //after the item has been added clear the text or the scanned item...
    $('#productToAddToHotKeySection').val('');

 
});

$(document).on("click", "#btnChangeActiveTabName", function (event) {
    //var index = $('#LayoutConfig li.active').text()
    var newTabName = $('#txtNewTabName').val();
    var activeAnchor = $('#LayoutConfig li.active a').eq(0);

    activeAnchor.html(newTabName);

    var curTabHref = $('#LayoutConfig li.active a').attr('href');

    var newTabHref = '#' + newTabName.replace(/\s/g, '');


});

$(document).on("click", '#createTab', function () {

    var tabCount = 1;
    tabCount = $('#LayoutConfig li').length + 1;
    $('#LayoutConfig').append("<li><a href=\"#tab" + tabCount + "\" data-toggle=\"tab\">Tab " + tabCount + "</a></li>")

    $('#SectionContent').append("<div id=\"tab" + tabCount + "\" class=\"tab-pane\"></div>")
});
//Quantity keypad
$(document).on("click", ".updateQty", function (event) {

    $('#qtyFooter').hide();
});

$(document).on("click", ".removeLineItem", function (event) {
    var itemId = $(this).attr('id');

    $('#' + itemId).remove();
    setCartFooterTotals();
    
});

$(document).on("click", ".discountBtn", function (event) {
    var discount = 0.00;
    discount = $('#subTotal').text() * .15;
    $('#discount').text(-discount.toFixed(2));
    
});

$(document).on("change", "#discount", function (event) {
    setCartFooterTotals();

});

$(document).on("click", ".qtyKeys", function (event) {
    var keyNum = $(this).attr('value');
   
    if (keyNum == "bksp") {
        var s = $('#adjustQty').val().substring(0, $('#adjustQty').val().length - 1)
        $('#adjustQty').val(s);
    }
    else{
        keyNum = $('#adjustQty').val() + keyNum;
        $('#adjustQty').val(keyNum);
    }

});

$(document).on("click", ".showQtyNumPad", function (event) {

    $('#qtyFooter').toggle();
});

$(document).on("click", ".qtyRtnKey", function (event) {
    var qty = $('#adjustQty').val();

    if (qty < 1 || qty == '') {
        qty = 1;
    }
    var unitPrice = $('#updateUnitPrice').text();

    unitPrice = unitPrice.substring(1, unitPrice.length);
 
    $('#updateQty').text(qty);
    $('#adjustQty').val('')
    $('#lineItemTotal').text(qty * unitPrice);
});
//Unit Price keypad
$(document).on("click", ".updateUnitPrice", function (event) {

    $('#unitPriceFooter').hide();
});

$(document).on("click", ".unitPriceKeys", function (event) {
    var keyNum = $(this).attr('value');
    if (keyNum == "bksp") {
        var s = $('#adjustUnitPrice').val().substring(0, $('#adjustUnitPrice').val().length - 1)
        $('#adjustUnitPrice').val(s);
    }
    else {
        keyNum = $('#adjustUnitPrice').val() + keyNum;
        $('#adjustUnitPrice').val(keyNum);
    }

});

$(document).on("click", ".showUnitPriceNumPad", function (event) {

    $('#unitPriceFooter').toggle();
});

$(document).on("click", ".unitPriceRtnKey", function (event) {
    var unitPrice = $('#adjustUnitPrice').val();

    if (unitPrice < 0 || unitPrice == '') {
        unitPrice = 0;
    }

    $('#lineItemTotal').text(unitPrice * $('#updateQty').text());
    unitPrice = '@' + unitPrice;
   
    $('#updateUnitPrice').text(unitPrice);
    $('#adjustUnitPrice').val('')
    
    setCartFooterTotals();
});


