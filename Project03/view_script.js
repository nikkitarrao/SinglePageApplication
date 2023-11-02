document.addEventListener('DOMContentLoaded', function() {
  
  //Disabling the button unless there is something typed
  document.querySelector('#submit').disabled = true;
  document.querySelector('#name').onkeyup = () => {
      if(document.querySelector('#name').value.length > 0 )
        document.querySelector('#submit').disabled = false;
      else
        document.querySelector('#submit').disabled = true;
  };

document.querySelector('#form').onsubmit = () => {
  //Saving the entered name
  var name = document.querySelector('#name').value;
  alert(`${name}`);
  return false; 
}
  
//Asynchronous Network Request
async function backEndRestAPI(){
  const response = await fetch('https://www.ixl.com/math/grade-4/identify-place-value-names');
  const data = await response.json;
  updateDom(data);
}
  
//Updating DOM  
function updateDom(){
 // let question = 
}

//Rendering View
  var renderView = (viewID, modelIndex) => {
      var source = document.querySelector(viewID).innerHTML;
      var template = Handlebars.compile(source);
      var html = template(model[modelIndex]);
      document.querySelector('#display-data').innerHTML = html;
    }





  
});
