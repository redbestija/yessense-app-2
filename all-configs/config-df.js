/*
    A config for YouSense application 
 */
var config = {
	// Is testing? 
	IsTestRun : true,
    // Where the app is runing
    LocationName: "Design Factory",
    // Where to submit the seefback
    SubmitURL: "http://yousense.aalto.fi/icqa",
    // how to get visualisations
    VisuURL: "",
    // ID of the installation (to get proper set of questions etc.)
    InstanceID: 1,

// Number of questions in the list ae used, not IDs from the DB 
    QuestionsHaveToBeFilled_IDs: [0, 1, 3],
    QuestionsWithOneAnswerOnly_IDs: [1],
    QuestionsPredefinedAswers_IDs: [{questionID:0, categoryID:1,optionID:0}, 
    							{questionID:1, categoryID:1,optionID:0}]

};
