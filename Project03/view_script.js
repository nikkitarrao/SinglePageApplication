//show the name on the end screens

document.addEventListener('DOMContentLoaded', function() {
  //Rendering Initial View
  backEndRestAPI("questionsQ1", 1, "#initialScreen");


//event delegation for views
document.querySelector('#display-data').addEventListener('click', (e) => {
  handleViewEvents(e);
});


return false;
}); //end of DOMContentLoaded 



let counter = 0;

handleViewEvents =  (e) => {
  if (e.target.type !== 'radio') {
   e.preventDefault();
  }
  if (e.target.dataset.viewaction == "startQuiz") {
  //saving user entered name
  name = document.querySelector('#name').value;
  console.log(name);
  qid = 1;
    if((document.querySelector('#quiz-selection').value === "1")){
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
if(e.target.dataset.viewaction == "continue" && e.target.dataset.currentquestionid == 1){ 
  backEndRestAPI(quizId, qid, "#quiz_view2");
  console.log(qid);
  console.log(counter);
 // document.querySelector('#counter').innerHTML = counter;
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
console.log(counter);
backEndRestAPI(quizId, qid, "#quiz_view1");
//document.querySelector('#counter').innerHTML = counter;
}
//passed the test screen
else if(e.target.dataset.viewaction == "continue" && qid > 5 && counter/5 >= 0.8){
  backEndRestAPI(quizId, qid, "#finalScreenPassed");
  console.log(counter);
  onsole.log(counter/5);
  document.querySelector('#name').innerHTML = name;
}

//failed the test screen
else if(e.target.dataset.viewaction == "continue" && qid > 5 && counter/5 < 0.8){
 backEndRestAPI(quizId, qid, "#finalScreenFailed");
 console.log(counter);
 console.log(counter/5);
 console.log(name);
  document.querySelector('#name').innerHTML = name;
}

//return button
if (e.target.dataset.viewaction == "return") {
  qid = 0;
  backEndRestAPI("questionsQ1", 1, "#initialScreen");
}

//re-take
if (e.target.dataset.viewaction == "re-take") {
  qid = 1;
  backEndRestAPI(quizId, 1, "#quiz_view1");
}

//saving values for the test
if (e.target.type == 'radio') {
  if(e.target.value == document.querySelector('#form').dataset.correctChoice){
    rightAnswer = true;
    console.log(e.target.value);
    console.log(document.querySelector('#form').dataset.correctChoice);
    console.log(rightAnswer);
  }
  else{
    rightAnswer = false;
    console.log(e.target.value);
    console.log(document.querySelector('#form').dataset.correctChoice);
    console.log(rightAnswer);
  }
}


//screens depending on right or wrong
  if (e.target.dataset.viewaction == "nextQuestion") {
    console.log('Next question button is clicked!');
    console.log(rightAnswer);
//correct screen
if(rightAnswer === true){
    backEndRestAPI(quizId, qid , "#correct" )
    qid = qid +1;
     //setting the correct screen to show for only 1 second
    setTimeout(() => {
      if(qid == 2){
        console.log('qid:' + qid);
        backEndRestAPI(quizId, qid , "#quiz_view2");
        console.log('qid:' + qid);
      }
      else if(qid == 4){
        console.log(qid);
        backEndRestAPI(quizId, qid , "#quiz_view3");
        console.log('qid:' + qid);
      }
      else if (qid == 3 || qid == 5){
        console.log(qid);
        backEndRestAPI(quizId, qid , "#quiz_view1");
      }
      else if (qid > 5 && counter/5 >= 0.8){
        console.log(qid);
        backEndRestAPI(quizId, qid, "#finalScreenPassed");
      }
      else if (qid > 5 && counter/5 < 0.8){
        console.log(qid);
        backEndRestAPI(quizId, qid+1 , "#finalScreenFailed");
      }

  }, 1000); // 1000 milliseconds = 1 second
  //qid = qid + 1;
  counter++;
  document.querySelector('#counter').innerHTML = counter;
  }

 //incorrect screen
 else if(rightAnswer === false){
  backEndRestAPI(quizId, qid, "#incorrect");
  qid = qid + 1;
 // document.querySelector('#counter').innerHTML = counter;
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






