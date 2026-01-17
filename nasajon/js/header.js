paceOptions = {
    catchupTime: 100,
    initialRate: .03,
    minTime: 250,
    ghostTime: 100,
    maxProgressPerFrame: 20,
    easeFactor: 1.25,
    /*startOnPageLoad: true,*/
    startOnPageLoad: false,
    restartOnPushState: true,
    restartOnRequestAfter: 500,
    /*restartOnRequestAfter: true,*/
    target: 'body',
    elements: {
    checkInterval: 100,
    selectors: ['body']
    },
    eventLag: {
    minSamples: 10,
    sampleCount: 3,
    lagThreshold: 3
    },
    ajax: {
    trackMethods: ['GET','POST'],
    trackWebSockets: true,
    ignoreURLs: ["ajax/messageBookUpdateReadMessage",
                //"ajax/messageBookLoad",
                "ajax/messageBookSelectTotalByFilter",
                "ajax/informationGetByFilter",
                "/servlet/sqlEditorRunSQL"]
    }
}
// console.warn('aqui... header');
