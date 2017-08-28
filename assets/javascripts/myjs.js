(function(){
  $(function(){
    let inputStorage  //create variable to input answer
    let outputStorage //create variable to store localStorage output value
    let guessButton = $(".guessbtn"); //assign class element of guess button
    let submitButton = $(".submitbtn"); //assign class element of submit button
    let questionString; //stores the question
    let categoryString; //stores the category
    let questionValue; //stores the value of the question
    let questionAnswer //stores the questionAnswer
    let scoreTracker = 0; //track the running score
    let myAnswer = ""; //stores normalized answer input test
    var re = /[^A-Za-z0-9]/g; //lowercase the string and use the RegExp to remove unwanted characters from it

    $.get("http://jservice.io/api/random", function(data){

        $("#question").html(data[0].question); //Output the property value of question to the span
        $("#category").html(data[0].category.title); //Output the property value of category title to the span
        $("#questionvalue").html(data[0].value); //Output the property value of the question to the span
        $("#answerapivalue").html(data[0].answer); //Output the property vaule of the question answer to the span

        questionString = data[0].question;
        categoryString = data[0].category.title;
        questionValue = data[0].value;
        questionAnswer = data[0].answer;

        console.log(data);
    })

    //populate DOM with new question
    let randomQuestion = function() {
      $.get("http://jservice.io/api/random", function(data){


          $("#question").html(data[0].question); //Output the property value of question to the span
          $("#category").html(data[0].category.title); //Output the property value of category title to the span
          $("#questionvalue").html(data[0].value); //Output the property value of the question to the span
          $("#answerapivalue").html(data[0].answer); //Output the property vaule of the question answer to the span

          questionString = data[0].question;
          categoryString = data[0].category.title;
          questionValue = data[0].value;
          questionAnswer = data[0].answer;

          console.log(data);
      })
    }

    //a button they can click to submit their answer
    submitButton.click(function(){
      //grab input answer
      inputStorage = $("#answer").val();
      //normalize input answer
      myAnswer = inputStorage.toLowerCase().replace(re, '');
       //initiliaze inputStorage with input value in answer field
      localStorage.setItem('answerStorage',myAnswer);  //store the answer in localStorage
    })

    //When the user clicks the 'guess' button, you should check to see if they got the answer right. If they did, increase their score by the value of the question (provided in the AJAX response). If they didn't, no points are awarded or lost.
    guessButton.click(function(){
      outputStorage = localStorage.getItem('answerStorage'); //initialize the outputStorage with input value in localStorage

      //check if jeopardy api answer matches guess
      if(outputStorage==myAnswer){
        $("#score").html(scoreTracker)
        scoreTracker = scoreTracker + questionValue;
      };

      //request new question
      randomQuestion();
    })

  });//end of document ready function
})()//end of self-invoking fuction
