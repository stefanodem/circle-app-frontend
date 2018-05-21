export function getNextQuestion(assessment) {
  switch(assessment.currentQuestion) {
    case 1:
      if (assessment.response === 'Yes') {
        return 12;
      } else {
        return 2;
      }
    case 2:

  }
}
