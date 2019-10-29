const {
    getRequestType,
    getIntentName,
    getSlotValue,
    getDialogState,
} = require('ask-sdk-core');
const Alexa = require('ask-sdk-core');
const request = require('request');
const util = require('util');


const ListaLibrosIntent = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ListaLibrosIntent';
    },
    async handle(handlerInput) {
        const tema = getSlotValue(handlerInput.requestEnvelope, 'tema');
        let url = 'http://siabuc.ucol.mx:3000/api/v1.1/fichas/busqueda/' + tema;
        const requestPromise = util.promisify(request);
        const response = await requestPromise(url);
        var consulta = JSON.parse(response.body);
        const long = Object.keys(consulta).length;
        var speakOutput = ' ';
        for(var i = 0; i < long; i++ ){
            speakOutput += 'La clasificación del libro '+ consulta[i].titulo + ' es ' + consulta[i].clasificacion + '. ';
        }
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('si deseas realizar otra busqueda, solo dimelo')
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        ListaLibrosIntent,
        
    )
    .lambda();
