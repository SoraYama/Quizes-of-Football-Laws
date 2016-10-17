var fs = require('fs');

const quizPath = './teacher_3.txt';
const jsonPath = './quiz_3.json';
const chapterNum_1 = [46, 18, 38, 24, 35, 36, 18, 30, 11, 14, 24, 101, 34, 76, 30, 30, 30, 21];
const chapterNum_2 = [47, 19, 65, 40, 50, 61, 20, 30, 6, 32, 34, 170, 43, 62, 51, 34, 20, 23];
const chapterNum_3 = [31, 12, 59, 32, 38, 30, 18, 21, 5, 31, 20, 90, 28, 30, 40, 14, 19, 23];

fs.readFile(jsonPath, function(err,data){
    var correctNum = [];
    if(err) {throw err; console.log(err);}
    var jsonObj = JSON.parse(data);
    var size = jsonObj.length;
    var quizBreakPoint = 0;
    var chapterCounter = 0;
    for(var i = 0; i < size; i++){
      if(i == quizBreakPoint){
        fs.appendFileSync(quizPath, '\n-chapter ' + (chapterCounter + 1).toString() + '-\n');
        quizBreakPoint += (chapterNum_3[chapterCounter]);
        chapterCounter ++;
      }
      var title = jsonObj[i].title;
      var titleLine = '\n' + (i + 1).toString() + '. ' + title + '\n';
      fs.appendFileSync(quizPath, titleLine);
      for(var j = 0; j < 4; j++){
        var answer = jsonObj[i].answer;
        if(answer[j].correct) {correctNum[i] = j};
        var answerLine = '\t' + String.fromCharCode(65 + j) + '. ' + answer[j].text + '\n';
        fs.appendFileSync(quizPath, answerLine);
      }
      var ansLine = '\t应选择(' + String.fromCharCode(65 + correctNum[i]) + ')\n';
      fs.appendFileSync(quizPath, ansLine);
    }
});
