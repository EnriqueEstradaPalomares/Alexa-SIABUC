// This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
// Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
// session persistence, api calls, and more.
const {
    getRequestType,
    getIntentName,
    getSlotValue,
    getDialogState,
} = require('ask-sdk-core');

//require('ListaLibrosIntent');

const request = require('request');
const util = require('util');

const Alexa = require('ask-sdk-core');
const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Bienvenido a la app de SIABUC, dime, ¿Qué es lo que estas buscando?';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const pruebaRequestIntent = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'pruebaRequestIntent';
    },
    async handle(handlerInput) {
        const nameBook = getSlotValue(handlerInput.requestEnvelope, 'libroo');
        const nameAutor = getSlotValue(handlerInput.requestEnvelope, 'autor');
        var til;
        let url = 'http://siabuc.ucol.mx:3000/api/v1.1/fichas/busqueda/' + nameBook + '&' + nameAutor;
        const requestPromise = util.promisify(request);
        const response = await requestPromise(url);
        var consulta = JSON.parse(response.body);
        const speakOutput = 'el libro ' + consulta[1].titulo + ' de ' + consulta[1].autor + ' está disponible, pregunta a algun bibliotecario por información de su ubicación';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('sí deseas realizar otra búsqueda, solo dímelo')
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};


//Buscar libro
const BuscarLibroIntent = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'BuscarLibroIntent';
    },
    async handle(handlerInput) {
        const nameBook = getSlotValue(handlerInput.requestEnvelope, 'book');
        let url = 'http://siabuc.ucol.mx:3000/api/v1.1/fichas/busqueda/' + nameBook;
        const requestPromise = util.promisify(request);
        const response = await requestPromise(url);
        var consulta = JSON.parse(response.body);
        const speakOutput = 'El libro ' + consulta[1].titulo + ' de ' + consulta[1].autor + ' no se como contestarte aun';
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
        const speakOutput = 'Adios, que tengas un excelente día';
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
    async handle(handlerInput) {
        const nameBook = getSlotValue(handlerInput.requestEnvelope, 'libro');
        let url = 'http://siabuc.ucol.mx:3000/api/v1.1/fichas/busqueda/' + nameBook;
        const requestPromise = util.promisify(request);
        const response = await requestPromise(url);
        var consulta = JSON.parse(response.body);
        const speakOutput = 'La clasificiacion del libro solicitado es ' + consulta[0].clasificacion;
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
   async handle(handlerInput) {
        const tema = getSlotValue(handlerInput.requestEnvelope, 'tema');
        let url = 'http://siabuc.ucol.mx:3000/api/v1.1/fichas/busqueda/' + tema;
        const requestPromise = util.promisify(request);
        const response = await requestPromise(url);
        var consulta = JSON.parse(response.body);
        var x = Math.floor((Math.random() * 10) + 1);
        const speakOutput = 'Te puede interesar el libro ' + consulta[x].titulo;
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
    async handle(handlerInput) {
        const tema = getSlotValue(handlerInput.requestEnvelope, 'tema');
        let url = 'http://siabuc.ucol.mx:3000/api/v1.1/fichas/busqueda/' + tema;
        const requestPromise = util.promisify(request);
        const response = await requestPromise(url);
        var consulta = JSON.parse(response.body);
        var x = Math.floor((Math.random() * 10) + 1);
        const speakOutput = 'La clasificación del libro '+ consulta[x].titulo + ' es ' + consulta[x].clasificacion;
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
    async handle(handlerInput) {
        const tema = getSlotValue(handlerInput.requestEnvelope, 'tema');
        let url = 'http://siabuc.ucol.mx:3000/api/v1.1/fichas/busqueda/' + tema;
        const requestPromise = util.promisify(request);
        const response = await requestPromise(url);
        var consulta = JSON.parse(response.body);
        const long = Object.keys(consulta).length;
        var speakOutput = ' ';
        for(var i = 0; i < 10; i++ ){
            speakOutput += 'La clasificación del libro '+ consulta[i].titulo + ' es ' + consulta[i].clasificacion + '. ';
        }
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
        pruebaRequestIntent,
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
