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


return false;
}); //end of DOMContentLoaded 



let counter = 0;

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
  backEndRestAPI(quizId, qid, "#quiz_view2");
  console.log(qid);
  console.log(counter);
  //document.querySelector('#counter').innerHTML = counter;
}
else if(e.target.dataset.viewaction == "continue" && e.target.dataset.currentquestionid == 2){
backEndRestAPI(quizId, qid, "#quiz_view1");
console.log(qid);
//document.querySelector('#counter').innerHTML = counter;
}
else if(e.target.dataset.viewaction == "continue" && e.target.dataset.currentquestionid == 3){
  backEndRestAPI(quizId, qid, "#quiz_view3");
  console.log(qid);
  //document.querySelector('#counter').innerHTML = counter;
  }
else if(e.target.dataset.viewaction == "continue" && e.target.dataset.currentquestionid == 4){
console.log(qid);
console.log(qid);
backEndRestAPI(quizId, qid, "#quiz_view1");
//document.querySelector('#counter').innerHTML = counter;
}
//passed the test screen
else if(e.target.dataset.viewaction == "continue" && qid > 5 || counter/5 >= 0.8){
  backEndRestAPI(quizId, qid, "#finalScreenPassed");
  document.querySelector('#name').innerHTML = name;
}

//failed the test screen
//else if(e.target.dataset.viewaction == "continue" && qid > 5 && counter/5 < 0.8){
 //backEndRestAPI(quizId, qid, "#finalScreenFailed");
  //document.querySelector('#name').innerHTML = name;
//}

//return button
//if (e.target.dataset.viewaction == "return") {
  //qid = 0;
  //backEndRestAPI("questionsQ1", 1, "#initialScreen");
//}

//retake button
//if (e.target.dataset.viewaction == "StartQuiz") {
  //
  //
  //
//}

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
  counter++;
  document.querySelector('#counter').innerHTML = counter;
  }
 //incorrect screen
else if(e.target.value !== document.querySelector('#form').value){
  backEndRestAPI(quizId, qid, "#incorrect");
  qid = qid + 1;
  document.querySelector('#counter').innerHTML = counter;
}
return false;
}

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




