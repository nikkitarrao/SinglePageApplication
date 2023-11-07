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
  //choosing the type of quiz
  if(document.querySelector('#quiz-selection').value === "1"){
    quizId = "questionsQ1";
  }
  else{
   quizId  = "questionsQ2";
  }
}

  
//Asynchronous Network Request
async function backEndRestAPI(quizId,qid){
  let api_endpoint = `https://my-json-server.typicode.com/nikkitarrao/SinglePageApplication/${quizid}/questions/${qid}`
  const response = await fetch('https://my-json-server.typicode.com/nikkitarrao/SinglePageApplication/questions')
  const data = await response.json()
  updateDom(data);
}
  

//Rendering View
  var renderView = (model, view) => {
      var source = document.querySelector(view).innerHTML;
      var template = Handlebars.compile(source);
      //var html = template(model[modelIndex]);
    }

  //Updating DOM  
function updateDom(){
  html = renderView(model, '#quiz_view1');
  document.querySelector('#display-data').innerHTML = html;
}




  
});
