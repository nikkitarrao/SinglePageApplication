//need to fix counter
//need to fix return and retake buttons
//need to fix good work screen and explain you are wrong screen
//show the name on the end screens
document.addEventListener('DOMContentLoaded', function() {
  //Rendering Initial View
  backEndRestAPI("questionsQ1", 1, "#initialScreen");


//event delegation for views
 document.querySelector('#display-data').onclick = (e)=>{
    handleViewEvents(e);
    return false;
    }

 //event delegation for correct answer counter
 //document.querySelector('#display-data').onsubmit = (e)=>{
  //quizCounter(e);
 // return false;
//}

return false;
}); //end of DOMContentLoaded 


handleViewEvents =  (e) => {
  if (e.target.type !== 'radio') {
    e.preventDefault();
  }
  if (e.target.dataset.viewaction == "startQuiz") {
  //saving user entered name
  var name = document.querySelector('#name').value;
  console.log(name);
  qid = 1;
    if(document.querySelector('#quiz-selection').value === "1"){
      quizId = "questionsQ1";
      console.log(quizId);
      backEndRestAPI(quizId, qid, "#quiz_view1");
    }
    else if(document.querySelector('#quiz-selection').value === "2"){
      quizId = "questionsQ2";
      console.log(quizId);
      backEndRestAPI(quizId, qid, "#quiz_view1");
    }
    return false;
  }

//each question quiz 1
console.log(qid);
console.log(quizId);
if((e.target.dataset.viewaction == "continue" && e.target.dataset.currentquestionid == 1)){ //|| e.target.dataset.viewaction == "nextQuestion" 
  qid = qid + 1;
  backEndRestAPI(quizId, qid, "#quiz_view2");
  console.log(qid);
}
else if(e.target.dataset.viewaction == "continue" && e.target.dataset.currentquestionid == 2){
qid = qid + 1;
backEndRestAPI(quizId, qid, "#quiz_view1");
console.log(qid);
}
else if(e.target.dataset.viewaction == "continue" && e.target.dataset.currentquestionid == 3){
  qid = qid + 1;
  backEndRestAPI(quizId, qid, "#quiz_view3");
  console.log(qid);
  }
else if(e.target.dataset.viewaction == "continue" && e.target.dataset.currentquestionid == 4){
console.log(qid);
qid = qid + 1;
console.log(qid);
backEndRestAPI(quizId, qid, "#quiz_view1");
//qid = qid + 1;
}
//passed the test screen
//else if(qid > 5 || counter/5 >= 0.8){
  //backEndRestAPI(quizId, qid, "#finalScreenPassed");
  //document.querySelector('#name').innerHTML = name;
//}
//failed the test screen
//else if(qid > 5 && counter/5 < 0.8){
 //backEndRestAPI(quizId, qid, "#finalScreenFailed");
  //document.querySelector('#name').innerHTML = name;
//}
//return button
//retake button

//if (e.target.type == 'radio') {
  if (e.target.dataset.viewaction == "nextQuestion") {
  console.log(document.querySelector('#form').value);
  console.log(e.target.value);
//correct screen
if(e.target.value == document.querySelector('#form').value){
  console.log(e.target.value);
   const currentView = view;
    backEndRestAPI(quizId, qid, "#form");
     //setting the correct screen to show for only 1 second
    setTimeout(() => {
    backEndRestAPI(quizId, qid , currentView);
  }, 1000); // 1000 milliseconds = 1 second
  }
 //incorrect screen
else if(e.target.value !== document.querySelector('#form').value){
  backEndRestAPI(quizId, qid, "#incorrect");
}
return false;
}

//continue button on wrong screen
//if(e.target.dataset.viewaction == ""){
//console.log(qid);
//console.log(quizId);
//}




return false;
} //end of handleViewsEvent


//Asynchronous Network Request
async function backEndRestAPI(quizId,qid, view){
  let api_endpoint = `https://my-json-server.typicode.com/nikkitarrao/SinglePageApplication/${quizId}/${qid}`
  const response = await fetch(api_endpoint)
  const data = await response.json()
  console.log(data)
  console.log(view)
  const html_element = renderView(data, view)
  document.querySelector('#display-data').innerHTML = html_element;
    }

 

  //Rendering View and Update DOM
  const renderView = (data, view) => {
      source = document.querySelector(view).innerHTML;
      var template = Handlebars.compile(source);
      var html = template(data);
      return html;
}


//counter function
//const quizCounter = (e) => {
 // element = e.target;
 // console.log(e.target);
  //defining initial counter???
 // let counter = 0;
 // if(element.value === document.querySelector('#question').value){
 // counter++;
  //document.querySelector('#counter').innerHTML = counter;
 // }
//return false;
//}


//}

