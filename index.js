// This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
// Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
// session persistence, api calls, and more.
const {
  getRequestType,
  getIntentName,
  getSlotValue,
  getDialogState,
} = require('ask-sdk-core');

const Alexa = require('ask-sdk-core');
const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Bienvenido a la app de SIABUC, dime, ¿Que es lo que estas buscando?';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
const BuscarLibroIntent = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'BuscarLibroIntent';
    },
    handle(handlerInput) {
        const nameBook = getSlotValue(handlerInput.requestEnvelope, 'book');
        //const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        //sessionAttributes.
        const speakOutput = 'entendi ' + nameBook;
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('si deseas realizar otra busqueda, solo dimelo')
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};


const MostPopularIntent = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'MostPopularIntent';
    },
    handle(handlerInput) {
        //const nameBook = getSlotValue(handlerInput.requestEnvelope, 'book');
        const speakOutput = 'MostPopularIntent no esta disponible, Aun estoy aprendiendo esta habilidad';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('si deseas realizar otra busqueda, solo dimelo')
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
            
    }
};


const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Puedes decir ayuda para darte soporte';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Hasta la Proximaaaaaaaaa';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

const ClasificacionLibroIntent = {  //revisar
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ClasificacionLibroIntent';
    },
    handle(handlerInput) {
        
        const clasif = getSlotValue(handlerInput.requestEnvelope, 'libro');
        //const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        //sessionAttributes.
        const speakOutput = 'entendi ' + clasif + ' ClasificacionLibroIntent';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('si deseas realizar otra busqueda, solo dimelo')
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

const LibroDeTemaIntent = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'LibroDeTemaIntent';
    },
    handle(handlerInput) {
        const nameBook = getSlotValue(handlerInput.requestEnvelope, 'tema');
        //const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        //sessionAttributes.
        const speakOutput = 'entendi ' + nameBook + ' LibroDeTemaIntent';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('si deseas realizar otra busqueda, solo dimelo')
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

const ClasificacionPorTemaIntent = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ClasificacionPorTemaIntent';
    },
    handle(handlerInput) {
        const nameBook = getSlotValue(handlerInput.requestEnvelope, 'tema');
        //const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        //sessionAttributes.
        const speakOutput = 'entendi ' + nameBook + 'ClasificacionPorTemaIntent';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('si deseas realizar otra busqueda, solo dimelo')
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
    
};

const ListaLibrosIntent = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ListaLibrosIntent';
    },
    handle(handlerInput) {
        const nameBook = getSlotValue(handlerInput.requestEnvelope, 'book');
        //const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        //sessionAttributes.
        const speakOutput = 'entendi ' + nameBook + ' ListaLibrosIntent';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('si deseas realizar otra busqueda, solo dimelo')
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse();
    }
};

// The intent reflector is used for interaction model testing and debugging.
// It will simply repeat the intent the user said. You can create custom handlers
// for your intents by defining them above, then also adding them to the request
// handler chain below.
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.stack}`);
        const speakOutput = `Disculpame, no entendi lo que dijiste, podrias repetirlo`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

// The SkillBuilder acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        MostPopularIntent,
        LibroDeTemaIntent,
        ListaLibrosIntent,
        ClasificacionLibroIntent,
        ClasificacionPorTemaIntent,
        BuscarLibroIntent,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler, // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    )
    .addErrorHandlers(
        ErrorHandler,
    )
    .lambda();
