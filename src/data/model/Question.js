export class Question {
    constructor(content, allAnswers, correctAnswer, imageUrl, questionId) {
        this.content = content
        this.allAnswers = allAnswers
        this.correctAnswer = correctAnswer
        this.imageUrl = imageUrl
        this.questionId = questionId
    }
}