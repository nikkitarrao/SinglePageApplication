document.addEventListener('DOMContentLoaded', function() {
  //Rendering Initial View
  backEndRestAPI("questionsQ1", 1, "#initialScreen");


//event delegation for views
 document.querySelector('#display-data').onclick = (e)=>{
    handleViewEvents(e);
    //correctAnswerCounter(e);
    return false;
    }

 //event delegation for correct answer counter
 //document.querySelector('#display-data').onsubmit = (e)=>{
  //correctAnswerCounter(e);
 // return false;
//}

return false;
}); //end of DOMContentLoaded 


handleViewEvents =  (e) => {
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
if(e.target.dataset.viewaction == "nextQuestion" && e.target.dataset.currentquestionid == 1){
  qid = qid + 1;
  backEndRestAPI(quizId, qid, "#quiz_view2");
}
else if(e.target.dataset.viewaction == "nextQuestionnarrative" && e.target.dataset.currentquestionid == 2){
qid = qid + 1;
backEndRestAPI(quizId, qid, "#quiz_view1");
}
else if(e.target.dataset.viewaction == "nextQuestion" && e.target.dataset.currentquestionid == 3){
  qid = qid + 1;
  backEndRestAPI(quizId, qid, "#quiz_view3");
  console.log(qid);
  }
else if(e.target.dataset.viewaction == "nextQuestion" && e.target.dataset.currentquestionid == 4){
console.log(qid);
qid = qid + 1;
console.log(qid);
backEndRestAPI(quizId, qid, "#quiz_view1");
qid = qid + 1;
}
//passed the test screen
else if(qid > 5 || totalCorrectAnswers/5 >= 0.8){
  backEndRestAPI(quizId, qid, "#finalScreenPassed");
}
//failed the test screen
else if(qid > 5 && totalCorrectAnswers/5 < 0.8){
  backEndRestAPI(quizId, qid, "#finalScreenFailed");
}

//correct screen
//if(document.querySelector('#multipleChoice').value == document.querySelector('#choicesMultipleChoice').value){
   // backEndRestAPI(quizId, qid, "#correct");
  //  console.log(document.querySelector('#choicesMultipleChoice').value);
   // console.log(document.querySelector('#multipleChoice').value);
 // }
 //incorrect screen
//else{
 // backEndRestAPI(quizId, qid, "#incorrect");
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

//come back to this
const quizCounter = (e) => {
  //defining initial counter???
  let counter = 0;
  if(e.target === correctChoice){
  counter += 1;
   var totalCorrectAnswers = counter;
   return totalCorrectAnswers;
   //return false;
  }
}
