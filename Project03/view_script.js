document.addEventListener('DOMContentLoaded', function() {

  //Rendering Initial View
  view1 = renderView({},'#initialScreen');
  document.querySelector('#display-data').innerHTML = view1;
  
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
  //choosing the type of quiz
  if(document.querySelector('#quiz-selection').value === "1"){
     quizId = "questionsQ1";
     qid = 1;
     backEndRestAPI(quizId,qid);
     view2 = renderView(1, '#quiz_view1');
     document.querySelector('#display-data').innerHTML = view2;
    // document.querySelector('#buttonQ1').onsubmit = () => {
   // }
  }
  else{
     quizId  = "questionsQ2";
     qid = 1;
     backEndRestAPI(quizId,qid);
     view2 = renderView(1, '#quiz_view1');
     document.querySelector('#display-data').innerHTML = view2;
     //document.querySelector('#buttonQ1').onsubmit = () => {
    // }
  }
  return false; 
}//ending the onsubmit event

 
}); //end of DOMContentLoaded 

//Asynchronous Network Request
async function backEndRestAPI(quizId,qid){
  let api_endpoint = `https://my-json-server.typicode.com/nikkitarrao/SinglePageApplication/${quizId}/${qid}`
  const response = await fetch('https://my-json-server.typicode.com/nikkitarrao/SinglePageApplication/questions')
  const data = await response.json()
  const html_element = renderView(data, view)
  document.querySelector('#display-data').innerHTML = html_element;
    }

  //Rendering View and Update DOM
  var renderView = (model, view) => {
      var source = document.querySelector(view);
      //var source = sourceElement.innerHTML;
      var template = Handlebars.compile(source);
      var html = template(model);
      return html;
}

