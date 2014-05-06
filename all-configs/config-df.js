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
    FeedbackSourceID: 1,

    QuestionsHaveToBeFilled: [0, 1, 3],

    QuestionsPredefinedAswers: [{question:0, category:0,option:0}, 
    							{question:1, category:0,option:0}]

};
