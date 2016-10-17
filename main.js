var fs = require('fs');

const quizPath = './result_1.txt';
const jsonPath = './quiz_1.json';
const ansPath = './ans_1.txt';
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
        quizBreakPoint += (chapterNum_1[chapterCounter]);
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
    }
    quizBreakPoint = 0;
    chapterCounter = 0;
    for(var k = 0, kFlag = 0; k < size; k++, kFlag++){
      if(k == quizBreakPoint){
        fs.appendFileSync(ansPath, '\n\n-chapter ' + (chapterCounter + 1).toString() + '-\n\n');
        quizBreakPoint += (chapterNum_1[chapterCounter]);
        chapterCounter ++;
        kFlag = 0;
      }
      var ansLine = (k + 1).toString() + '. ' + String.fromCharCode(65 + correctNum[k]) + '\t\t\t';
      fs.appendFileSync(ansPath, ansLine);

      if((kFlag + 1) % 5 == 0 && kFlag != chapterNum_1[chapterCounter - 1] - 1 )
        fs.appendFileSync(ansPath, '\n');
    }
});
