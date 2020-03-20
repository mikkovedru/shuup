//
// const files = ['products', 'payment_method']
//
// var guideTexts = [];
//
// files.map(file => {
//     import(file).then(({default: data}) => guideTexts.push(data))
// })


// import data from './products.json';
// import data2 from './payment_method.json';
// import data3 from './service_provider.json';


//
// console.log("Blabal1");
//
var guideTexts = [];

// guideTexts.push(data);
// guideTexts.push(data2);
// guideTexts.push(data3);

const files = ['products.json', 'service_provider.json', 'service_provider.ejson', 'payment_method.json', ];
// const files = ['service_provider.json', ];


guideTexts = files.map(file => {
  $.get("/static/shuup_admin/js/guide_help_texts/" + file, json => {
  // $.get("/static/shuup_admin/json/" + file, json => {
    console.log( "JSON Data: ", json );
    // json = json.replace(/(\r\n|\n|\r)/gm," ");
    // json = json.stringify.replace(/(\r\n|\n|\r)/gm," ");
    // return json.replace(/(\r\n|\n|\r)/gm," ");
    // return JSON.parse(json);
    let edit = json.replace(/(\r\n|\n|\r)/gm," ");
    // JSON.parse(json);
    return edit;
  })
})


var json = (function() {
  var json = null;
  $.ajax({
    'async': false,
    'global': false,
    'url': "/content.json",
    'dataType': "json",
    'success': function(data) {
      json = data;
    }
  });
  return json;
})();



// guideTexts.always(function(){ guideTexts.map(file => {
//   console.log("Replacing!");
//   file = file.replace(/(\r\n|\n|\r)/gm, " ");
//   return JSON.parse(file);
// }) });

// files.forEach(file => {
//   $.get("/static/shuup_admin/js/guide_help_texts/" + file, json => {
//     console.log( "JSON Data: ", json );
//     // json = json.replace(/(\r\n|\n|\r)/gm," ");
//     guideTexts.push(json);
//   }).done(function() {
//     console.log( "second success" );
//   }).fail(function() {console.log("Fails...")});
// })

// console.log("guideTexts after get: ");
// console.log(guideTexts);
// console.log("guideTexts after get2: ");
// console.log(guideTexts[2]);

// guideTexts = guideTexts.map(file => {
// console.log("Replacing!");
//   file = file.replace(/(\r\n|\n|\r)/gm, " ");
//   return JSON.parse(file);
// })


// const files = ['products.json', 'service_provider.json', ]
//
// files.map(file => {
//     console.log(file);
//     // const module = import("./guide_help_texts/" + file).then(({default: data}) => {
//     const module = require("static/shuup_admin/js/guide_help_texts/" + file).then(({default: data}) => {
//       console.log(data);
//       guideTexts.push(data);
//     });
// })


// files.forEach(file => {
//  const module = import('./' + file).then(m =>
//    m.callSomeMethod();
//  );



// import products from './products.json';
// import payment_method from './payment_method.json';
// console.log("products: ");
// console.log(products);
// console.log("payment_method: ");
// console.log(payment_method);
// export default {
//   ...products,
//   ...payment_method,
// }



//
// console.log("---------Blabal2-------");
// console.log("data: ");
// console.log(data);
// console.log("data2: ");
// console.log(data2);

console.log("guideTexts final: ");
console.log(guideTexts);
//
//
// guideTexts.push(data);
// console.log("---------Blabal3-------");
// console.log("data: ");
// console.log(data);
// console.log("data2: ");
// console.log(data2);
// console.log("guideTexts: ");
// console.log(guideTexts);
//
//
// guideTexts.push(data2);
// guideTexts.push(data3);
// console.log("What's up?", data3);
// data3.guideText = data3.guideText.replace(/(\r\n|\n|\r)/gm," ");

// console.log("What's up2?", data3);
// guideTexts.push(data3);
// console.log("---------Blabal4-------");
// console.log("data: ");
// console.log(data);
// console.log("data2: ");
// console.log(data2);
// console.log("guideTexts: ");
// console.log(guideTexts);
//
export default guideTexts;
