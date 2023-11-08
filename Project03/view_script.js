document.addEventListener('DOMContentLoaded', function() {

window.onload = () => {
  document.querySelector('#display-data').innerHTML = "hi";
  //Rendering Inital View
  //view1 = renderView("#initialScreen")
 // document.querySelector('#display-data').innerHTML = view1;
  //return false;
}
  
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
  }
  else{
   quizId  = "questionsQ2";
  }
  return false; 



} //ending the onsubmit event

  //Asynchronous Network Request
async function backEndRestAPI(quizId,qid){
  let api_endpoint = `https://my-json-server.typicode.com/nikkitarrao/SinglePageApplication/${quizId}/${qid}`
  const response = await fetch('https://my-json-server.typicode.com/nikkitarrao/SinglePageApplication/questions')
  const data = await response.json()
}

    //Rendering View and Update DOM
  var renderView = (view) => {
      var source = document.querySelector(view).innerHTML;
      var template = Handlebars.compile(source);
      var html = template({name: "Nikki"});
      document.querySelector('#display-data').innerHTML = html;
    }

  
//Updating DOM  
//function updateDom(view){
//  html = renderView(view);
  
//}



  
});
