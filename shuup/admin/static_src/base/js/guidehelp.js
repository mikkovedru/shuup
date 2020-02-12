import guideTexts from './guide_help_texts';

let pathname;
let title;
let results;
let wasGuideTextProcessed = false;

$("#guide-button").ready(() => {
  processguideTexts();
  // console.log("param: ");
  console.log('does it work??', guideTexts);
  // guideTexts = [...guideTexts,
  //   {
  //     "shuupUrl":  "/admin/fasdfasdfsd",
  //     "shuupTitle": "Shuup - Categories",
  //     "guideTitle": "title description",
  //     "guideText": "Admin categories text from JSON<br><br><br><br><br>\
  //     fadsdfafds\
  //     <br><br><br><br><br><br><br>\
  //     faf sd<br><br><br><br><br><br>\
  //     fadfasdf<br><br><br><br><br><br>\
  //     fadsdfafds\
  //     <br><br><br><br><br><br><br>\
  //     faf sd<br><br><br><br><br><br>\
  //     fadfasdf<br><br><br><br><br><br>\
  //     fasd",
  //     "guideYoutube": "https://www.youtube.com/embed/BjPyOj90zuE",
  //   }
  // ];
});



function processguideTexts() {
  pathname = window.location.pathname;
  title = document.title.replace("‐", "-");

  /* Using `.filter` instead of `.find` if/when decide to create more advanced
  heurestics in the future, like showing related/sibling/parent help articles. */
  results = guideTexts.filter(help => help.shuupUrl == pathname);

  /* In case url was not a match (the page was moved), search using secondary
  identification - by page title. */
  if((results.length == 0 || results === undefined) && title != 0) {
    results = guideTexts.filter(help => help.shuupTitle == title);
  }

  wasGuideTextProcessed = true;
  if(results.length != 0 && results !== undefined){
    $("#guide-button").attr("style", "opacity: 1; color: hsl(205, 65%, 55%);");
  }
}


$("#guide-button").on("click", (e) => {
  e.stopImmediatePropagation();
  e.preventDefault();

  if (!wasGuideTextProcessed) {
    processguideTexts();
  }

  if(results.length != 0 && results !== undefined){
    updateguideTextModal();
  }
  else {
    window.Messages.enqueue({
        tags: "error",
        text: gettext("Error! There was no guide help text found for this URL nor for this page title.")
    });
  }
});


function updateguideTextModal() {
  $("#guideModal-title").html("Learn Shuup guide: " + results[0].guideTitle);
  $("#guideModal-text").html(results[0].guideText);

  if(results[0].guideYoutube.length != 0){
    $("#guideModal-video").attr("src", results[0].guideYoutube);
    $("#guideModal-videosection").attr("style", "display: unset;");
  }

  $("#js-main-menu").attr("style", "z-index: 99;");     // Otherwise main menu is on top of modal
  $("#guideModal").modal("show");
  $(".modal-backdrop").attr("style", "display: none;");    // Modal bug fix
}


/* Assign empty url value to the iframe src attribute when
 modal is hidden, which stops the video playing in the background. */
$("#guideModal").on("hide.bs.modal", function(){
    $("#guideModal-video").attr("src", "");
});






//
//
// var guideTexts = ([
//   {
//     "shuupUrl":  "/admin/fasdfasdfsd",
//     "shuupTitle": "Shuup - Categories",
//     "guideTitle": "title description",
//     "guideText": "Admin categories text from JSON<br><br><br><br><br>\
//     fadsdfafds\
//     <br><br><br><br><br><br><br>\
//     faf sd<br><br><br><br><br><br>\
//     fadfasdf<br><br><br><br><br><br>\
//     fadsdfafds\
//     <br><br><br><br><br><br><br>\
//     faf sd<br><br><br><br><br><br>\
//     fadfasdf<br><br><br><br><br><br>\
//     fasd",
//     "guideYoutube": "https://www.youtube.com/embed/BjPyOj90zuE",
//   },
//   {
//     "shuupUrl":  "/admin/subscriptions/plan/",
//     "shuupTitle": "",
//     "guideTitle": "title description",
//     "guideText": "Admin Products - Plans text from JSON",
//     "guideYoutube": "https://www.youtube.com/embed/BjPyOj90zuE",
//   },
//   {
//     "shuupUrl":  "/admin/service_provider/",
//     "shuupTitle": "Shuup - Service Providers",
//     "guideTitle": "What are Service providers and how do they relate to Payment Methods and Shipping Methods",
//     "guideText": "<p>The idea of <b>Service Providers</b> is closely related to <b>Payment Methods</b> and <b>Shipping Methods</b>.</p> <p>Payment Methods and Shipping Methods are quite self-explanatory. These are the ways of payment and delivery that an end-user can choose, without worrying about the underlying technical implementation and infrastructure.</p> <blockquote><b>Payment Methods</b> and <b>Shipping Methods</b> screens allow to define what choices an end-user gets. <b>Service Providers</b> implement those choices in practice.</blockquote> <h3>Types of Service Providers</h3> <ol><li><b>Shipping carriers</b>. One good example is <a href=\"https://www.shipstation.com/\" target=\"_blank\">Shipstation</a>, which on its own gives access to multiple shipping companies (FedEx, UPS, US Postal Service (USPS), DHL). Naturally, it is possible to develop Shuup to support any other shipping carrier.</li> <li><b>Payment processors</b>. Famous examples are <a href=\"https://stripe.com/\" target=\"_blank\">Stripe</a> and <a href=\"https://paypal.com/\" target=\"_blank\">Paypal</a> - both giving access to many individual paying options/cards. Naturally, it is possible to develop Shuup to support any other shipping carrier.</li></ol></p> <h3>Practical Examples</h3> <div class=\"table-responsive\"> <table> <caption>Service Providers</caption> <tr> <th>Category</th> <th>Sub-category</th> <th>Name</th> <th>Type</th> <th>Explanation</th> </tr> <tr> <td rowspan=\"6\">Service Provider</td> <td rowspan=\"3\">Payment processor (Payment Methods)</td> <td>Paypal</td> <td>PaypalAuthorizeAndCapture</td> <td>Using <a href=\"https://paypal.com/\" target=\"_blank\">Paypal</a> third-party service integration. Requires shuup-paypal-capture addon to be installed in Shuup.</td> </tr> <tr> <td>Stripe</td> <td>StripeCheckoutPaymentProcessor</td> <td>Using <a href=\"https://stripe.com/\" target=\"_blank\">Stripe</a> third-party service integration. Requires shuup-stripe addon to be installed in Shuup.</td> </tr> <tr> <td>Default</td> <td>CustomPaymentProcessor</td> <td>Without any additional Shuup functionality/addon or integration with an external service. Use if the payment system is outside of Shuup.</td> </tr> <tr> <td rowspan=\"3\">Shipping carrier (Shipping Methods)</td> <td>Shipstation FedEx</td> <td>ShipStationCarrier</td> <td>Using FedEx, through <a href=\"https://www.shipstation.com/\" target=\"_blank\">Shipstation</a> third-party service integration. Requires shuup-shipstation addon to be installed in Shuup.</td> </tr> <tr> <td>Shipstation UPS</td> <td>ShipStationCarrier</td> <td>Using UPS, through <a href=\"https://www.shipstation.com/\" target=\"_blank\">Shipstation</a> third-party service integration. Requires shuup-shipstation addon to be installed in Shuup.</td> </tr> <tr> <td>Default</td> <td>CustomCarrier</td> <td>Without any additional Shuup functionality/plugin or integration with an external service. Use if the shipping system is outside of Shuup.</td> </tr> </table> </div> <div class=\"table-responsive\"> <table> <caption>Payment Methods</caption> <tr> <th>Payment processor (Name in Service Providers)</th> <th>Service</th> <th>Name</th> <th>Explanation</th> </tr> <tr> <td>Paypal</td> <td>Paypal authorize & capture</td> <td>Paypal</td> <td>Using integration with <a href=\"https://www.paypal.com/\" target=\"_blank\">Paypal</a>. Requires shuup-paypal-capture addon to be installed in Shuup.</td> </tr> <tr> <td rowspan=\"2\">Stripe</td> <td>Stripe Checkout</td> <td>Stripe</td> <td>Using integration with <a href=\"https://stripe.com/payments/checkout\" target=\"_blank\">Stripe Checkout</a>. Requires shuup-stripe addon to be installed in Shuup.</td></td> </tr> <tr> <td>Stripe Connect for Multivendor</td> <td>Stripe Multivendor</td> <td>Using integration with <a href=\"https://stripe.com/connect\" target=\"_blank\">Stripe Connect</a>. Requires shuup-stripe-connect addon to be installed in Shuup.</td></td> </tr> <tr> <td rowspan=\"2\">Default</td> <td>Cash payment</td> <td>Cash on delivery</td> <td>Just one example of what the Custom Payment Processor might mean in practice.</td> </tr> <tr> <td>Manually processed payment</td> <td>Manually processed payment</td> <td>Another example of what the Custom Payment Processor might mean in practice. This can be useful to handle whatever other special payment cases one has, like receiving bank checks by mail.</td> </tr> </table> </div> <div class=\"table-responsive\"> <table> <caption>Shipping Methods</caption> <tr> <th>Carrier (Name in Service Providers)</th> <th>Service</th> <th>Name</th> <th>Explanation</th> </tr> <tr> <td rowspan=\"3\">Shipstation FedEx</td> <td>FedEx Ground®</td> <td>FedEx Ground</td> <td rowspan=\"3\">Using <a href=\"https://www.shipstation.com/\" target=\"_blank\">Shipstation</a> integration to access FedEx services. Requires shuup-shipstation addon to be installed in Shuup.</td> </tr> <tr> <td>FedEx Standard Overnight®</td> <td>FedEx Standard Overnight</td> </tr> <tr> <td>FedEx 1 Day® Freight</td> <td>FedEx 1 Day Freight</td> </tr> <tr> <td rowspan=\"3\">Shipstation UPS</td> <td>UPS Standard®</td> <td>UPS Standard</td> <td rowspan=\"3\">Using <a href=\"https://www.shipstation.com/\" target=\"_blank\">Shipstation</a> integration to access UPS services. Requires shuup-shipstation addon to be installed in Shuup.</td> </tr> <tr> <td>UPS Next Day Air Saver®</td> <td>UPS Next Day Air Saver</td> </tr> <tr> <td>UPS Worldwide Express®</td> <td>UPS Worldwide Express</td> </tr> <tr> <td>Default</td> <td>Manually processed shipment</td> <td>Standard shipping</td> <td>Without any additional Shuup functionality/addon or integration with an external service.</td> </tr> </table> </div>",
//     "guideYoutube": "https://www.youtube.com/embed/BjPyOj90zuE",
//   },
//   {
//     "shuupUrl":  "/admin/payment_method/",
//     "shuupTitle": "Shuup - Payment Methods",
//     "guideTitle": "Payment Methods ",
//     "guideText": "Payment Methods text from JSON",
//     "guideYoutube": "https://www.youtube.com/embed/BjPyOj90zuE",
//   },
//   {
//     "shuupUrl":  "/admin/shipping_method/",
//     "shuupTitle": "Shuup - Shipping Methods",
//     "guideTitle": "Shipping Methods description",
//     "guideText": "Shipping Methods text from JSON",
//     "guideYoutube": "https://www.youtube.com/embed/BjPyOj90zuE",
//   },
// ]);

/*

<p>The idea of <b>Service Providers</b> is closely related to <b>Payment Methods</b> and <b>Shipping Methods</b>.</p>

<p>Payment Methods and Shipping Methods are quite self-explanatory. These are the ways of payment and delivery that an end-user can choose, without worrying about the underlying technical implementation and infrastructure.</p>

<blockquote><b>Payment Methods</b> and <b>Shipping Methods</b> screens allow to define what choices an end-user gets. <b>Service Providers</b> implement those choices in practice.</blockquote>
<h3>Types of Service Providers</h3>
<ol><li><b>Payment processors (Payment Methods)</b>. Famous examples are <a href=\"https://stripe.com/\" target=\"_blank\">Stripe</a> and <a href=\"https://paypal.com/\" target=\"_blank\">Paypal</a> - both giving access to many individual paying options/cards. Naturally, it is possible to develop Shuup to support any other shipping carrier.</li>
<li><b>Shipping carriers (Shipping Methods)</b>. One good example is <a href=\"https://www.shipstation.com/\" target=\"_blank\">Shipstation</a>, which on its own gives access to multiple shipping companies (FedEx, UPS, US Postal Service (USPS), DHL). Naturally, it is possible to develop Shuup to support any other shipping carrier.</li>
</ol></p>

<h3>Practical Examples</h3>
<div class=\"table-responsive\">
  <table>
    <caption>Service Providers</caption>
    <tr>
      <th>Category</th>
      <th>Sub-category</th>
      <th>Name</th>
      <th>Type</th>
      <th>Explanation</th>
    </tr>
    <tr>
      <td rowspan=\"6\">Service Provider</td>
      <td rowspan=\"3\">Payment processor (Payment Methods)</td>
      <td>Paypal</td>
      <td>PaypalAuthorizeAndCapture</td>
      <td>Using <a href=\"https://paypal.com/\" target=\"_blank\">Paypal</a> third-party service integration. Requires shuup-paypal-capture addon to be installed in Shuup.</td>
    </tr>
    <tr>
      <td>Stripe</td>
      <td>StripeCheckoutPaymentProcessor</td>
      <td>Using <a href=\"https://stripe.com/\" target=\"_blank\">Stripe</a> third-party service integration. Requires shuup-stripe addon to be installed in Shuup.</td>
    </tr>
    <tr>
      <td>Default</td>
      <td>CustomPaymentProcessor</td>
      <td>Without any additional Shuup functionality/addon or integration with an external service. Use if the payment system is outside of Shuup.</td>
    </tr>
    <tr>
      <td rowspan=\"3\">Shipping carrier (Shipping Methods)</td>
      <td>Shipstation FedEx</td>
      <td>ShipStationCarrier</td>
      <td>Using FedEx, through <a href=\"https://www.shipstation.com/\" target=\"_blank\">Shipstation</a> third-party service integration. Requires shuup-shipstation addon to be installed in Shuup.</td>
    </tr>
    <tr>
      <td>Shipstation UPS</td>
      <td>ShipStationCarrier</td>
      <td>Using UPS, through <a href=\"https://www.shipstation.com/\" target=\"_blank\">Shipstation</a> third-party service integration. Requires shuup-shipstation addon to be installed in Shuup.</td>
    </tr>
    <tr>
      <td>Default</td>
      <td>CustomCarrier</td>
      <td>Without any additional Shuup functionality/plugin or integration with an external service. Use if the shipping system is outside of Shuup.</td>
    </tr>
  </table>
</div>


<div class=\"table-responsive\">
  <table>
    <caption>Payment Methods</caption>
    <tr>
      <th>Payment processor (Name in Service Providers)</th>
      <th>Service</th>
      <th>Name</th>
      <th>Explanation</th>
    </tr>
    <tr>
      <td>Paypal</td>
      <td>Paypal authorize & capture</td>
      <td>Paypal</td>
      <td>Using integration with <a href=\"https://www.paypal.com/\" target=\"_blank\">Paypal</a>. Requires shuup-paypal-capture addon to be installed in Shuup.</td>
    </tr>
    <tr>
      <td rowspan=\"2\">Stripe</td>
      <td>Stripe Checkout</td>
      <td>Stripe</td>
      <td>Using integration with <a href=\"https://stripe.com/payments/checkout\" target=\"_blank\">Stripe Checkout</a>. Requires shuup-stripe addon to be installed in Shuup.</td></td>
    </tr>
    <tr>
      <td>Stripe Connect for Multivendor</td>
      <td>Stripe Multivendor</td>
      <td>Using integration with <a href=\"https://stripe.com/connect\" target=\"_blank\">Stripe Connect</a>. Requires shuup-stripe-connect addon to be installed in Shuup.</td></td>
    </tr>
    <tr>
      <td rowspan=\"2\">Default</td>
      <td>Cash payment</td>
      <td>Cash on delivery</td>
      <td>Just one example of what the Custom Payment Processor might mean in practice.</td>
    </tr>
    <tr>
      <td>Manually processed payment</td>
      <td>Manually processed payment</td>
      <td>Another example of what the Custom Payment Processor might mean in practice. This can be useful to handle whatever other special payment cases one has, like receiving bank checks by mail.</td>
    </tr>
  </table>
</div>



<div class=\"table-responsive\">
  <table>
    <caption>Shipping Methods</caption>
    <tr>
      <th>Carrier (Name in Service Providers)</th>
      <th>Service</th>
      <th>Name</th>
      <th>Explanation</th>
    </tr>
    <tr>
      <td rowspan=\"3\">Shipstation FedEx</td>
      <td>FedEx Ground®</td>
      <td>FedEx Ground</td>
      <td rowspan=\"3\">Using <a href=\"https://www.shipstation.com/\" target=\"_blank\">Shipstation</a> integration to access FedEx services. Requires shuup-shipstation addon to be installed in Shuup.</td>
    </tr>
    <tr>
      <td>FedEx Standard Overnight®</td>
      <td>FedEx Standard Overnight</td>
    </tr>
    <tr>
      <td>FedEx 1 Day® Freight</td>
      <td>FedEx 1 Day Freight</td>
    </tr>
    <tr>
      <td rowspan=\"3\">Shipstation UPS</td>
      <td>UPS Standard®</td>
      <td>UPS Standard</td>
      <td rowspan=\"3\">Using <a href=\"https://www.shipstation.com/\" target=\"_blank\">Shipstation</a> integration to access UPS services. Requires shuup-shipstation addon to be installed in Shuup.</td>
    </tr>
    <tr>
      <td>UPS Next Day Air Saver®</td>
      <td>UPS Next Day Air Saver</td>
    </tr>
    <tr>
      <td>UPS Worldwide Express®</td>
      <td>UPS Worldwide Express</td>
    </tr>
    <tr>
      <td>Default</td>
      <td>Manually processed shipment</td>
      <td>Standard shipping</td>
      <td>Without any additional Shuup functionality/addon or integration with an external service.</td>
    </tr>
  </table>
</div>

*/

