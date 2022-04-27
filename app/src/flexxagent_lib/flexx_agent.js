const { InputMessage } = require("input_messages");
const { OutputMessage } = require("output_messages");
const { json2xml } = require("json2xml");

class FlexxAgent {
    static PersistentKey = class {
        static settings = "settings"
    }


    static SettingKey = class {
        static settings = "Settings"
        static root = "AppSetting"
    }
    
    // MARK: External functions
    runScript = function (scr, handler) {
        console.log("WARNING: You should override runScript function")
    }
    
    saveValue = function (key, value) {
        console.log("WARNING: You should override saveValue function")
    }
    
    getValue = function (key) {
        console.log("WARNING: You should override getValue function")
    }
    
    // MARK: External functions - collect client consumption
    
    getMachineName = function () {
        throw "ERROR: You should override getMachineName function"
    }
    
    getComputerDomain = function () {
        throw "ERROR: You should override getComputerDomain function"
    }
    
    // MARK: Public functions

    start = async function() {
        console.log("Start");
        
        await this.getValue(FlexxAgent.PersistentKey.settings).then((settings) => {
            this.setupSettings(settings)
        })
    }
    
    processMessage(inputMessage, handler) {
        console.log("will process inputMessage")
        console.log(inputMessage)
        var jsonInputMessage = "";
        try {
            jsonInputMessage = JSON.parse(inputMessage)
        } catch (error) {
            let errorMessage = "Invalid JSON format";
            console.log(errorMessage);
            console.error(error);
            handler(errorMessage);
            return errorMessage
        }
        
        this.processJSONMessage(jsonInputMessage, handler)
    }
    
    // MARK: Private functions

    processJSONMessage(jsonInputMessage, handler) {
        var messageTypeStr = ""

        for (var key in jsonInputMessage) {
            console.log("checking key:")
            console.log(key)
            if (jsonInputMessage.hasOwnProperty(key)) {
                messageTypeStr = key
                break
            }
        }

        //let messageTypeStr = keys[0]
        //let messageTypeStr = jsonInputMessage[InputMessage.fields.type]
        console.log("messageTypeStr:")
        console.log(messageTypeStr)

        let messageType = new InputMessage.Type(messageTypeStr)
        console.log("messageType:")
        console.log(messageType)
        
        let jsonInfo = jsonInputMessage[messageTypeStr]
        console.log("jsonInfo:")
        console.log(jsonInfo)
        
        switch (messageType.name) {
            case InputMessage.Type.RemoteOperationExecute:
                let scriptStr = jsonInfo[InputMessage.remoteOperationFields.script]
                console.log("will run script:")
                console.log(scriptStr)
                this.runScript(scriptStr, handler)
                return ""
                break
            case InputMessage.Type.ServiceAction:
                let actionStr = jsonInfo[InputMessage.serviceActionsFields.action]
                let serviceName = jsonInfo[InputMessage.serviceActionsFields.serviceName]
                console.log("should run service action:")
                console.log(actionStr)
                console.log("for service with name:")
                console.log(serviceName)
                // TODO: do stuff
                handler()
                return ""
                break
            case InputMessage.Type.AgentOperation:
                let actionType = jsonInfo[InputMessage.agentOperationFields.actionType]
                let sessionId = jsonInfo[InputMessage.agentOperationFields.sessionId]
                let metaData = jsonInfo[InputMessage.agentOperationFields.metaData]
                let jobInfo = jsonInfo[InputMessage.agentOperationFields.jobInfo]
                let vdiOperationDetailOd = jsonInfo[InputMessage.agentOperationFields.vdiOperationDetailOd]
                console.log("should run agent operation with actionType:")
                console.log(actionType)
                console.log("sessionId:")
                console.log(sessionId)
                console.log("metaData:")
                console.log(metaData)
                console.log("jobInfo:")
                console.log(jobInfo)
                console.log("vdiOperationDetailOd:")
                console.log(vdiOperationDetailOd)
                // TODO: do stuff
                handler()
                return ""
                break
            case InputMessage.Type.SendSettings:
                let settings = this.processSettings(jsonInfo)
                this.saveValue(FlexxAgent.PersistentKey.settings, settings)
                this.setupSettings(settings)
                handler()
                return ""
                break
            default:
                console.log("Input message type is not valid!")
                break
        }

        let result = "default output message"
        handler(result)
        return result
    }
    
    processSettings(jsonInfo) {
        let settings = jsonInfo[FlexxAgent.SettingKey.settings][FlexxAgent.SettingKey.root]
        console.log("Process settings:")
        console.log(settings)

        var result = {}
        for (var index in settings) {
            let keyValue = settings[index]
            result[keyValue[InputMessage.AppSettingFields.key]] = keyValue[InputMessage.AppSettingFields.value]
        }
        
        return result
    }
    
    setupSettings(settings) {
        console.log("setupSettings:")
        console.log(settings)

        this.reportConsumptionIntervalInSeconds = parseInt(settings[InputMessage.AppSettingKey.currentClientRefreshTime])
        this.sendEventLogsIntervalInMinutes = parseInt(settings[InputMessage.AppSettingKey.sendEventLogsInterval])

        console.log("reportConsumptionIntervalInSeconds:")
        console.log(this.reportConsumptionIntervalInSeconds)
        console.log("sendEventLogsIntervalInMinutes:")
        console.log(this.sendEventLogsIntervalInMinutes)
        this.scheduleReportConsumption()
        this.scheduleSendEventLogs()
    }
    
    reportConsumption() {
        console.log("SHOULD REPORT CONSUMPTION, example:")
        let ccJson = this.collectClientConsumption()
        
        console.log("raw json:")
        console.log(ccJson)
        
        let xmlResult = json2xml(eval(ccJson));
        console.log("xml to be sent:")
        console.log(xmlResult)
    }
    
    collectClientConsumption() {
        console.log("Collecting ClientConsumption")
        var result = {}
        var ccJson = {}
        ccJson[OutputMessage.ClientConsumptionKey.MachineName] = this.getMachineName()
        ccJson[OutputMessage.ClientConsumptionKey.ComputerDomain] = this.getComputerDomain()
        
        result[OutputMessage.Type.ClientConsumption] = ccJson
        return result
    }

    
    scheduleReportConsumption() {
        if (this.timeoutReportConsumptionId != undefined) {
            clearTimeout(this.timeoutReportConsumptionId)
        }
        
        if (this.reportConsumptionIntervalInSeconds != undefined && this.reportConsumptionIntervalInSeconds != 0) {
            this.timeoutReportConsumptionId = setTimeout(() => {
                this.reportConsumption()
                this.scheduleReportConsumption()
            }, this.reportConsumptionIntervalInSeconds * 1000)
        }
    }
    
    reportEventLogs() {
        console.log("SHOULD SEND EVENT LOGS")
    }
    
    scheduleSendEventLogs() {
        if (this.timeoutEventLogsId != undefined) {
            clearTimeout(this.timeoutEventLogsId)
        }
        
        if (this.sendEventLogsIntervalInMinutes != undefined && this.sendEventLogsIntervalInMinutes != 0) {
            this.timeoutEventLogsId = setTimeout(() => {
                this.reportEventLogs()
                this.scheduleSendEventLogs()
            }, this.sendEventLogsIntervalInMinutes * 1000 * 60)
        }
    }
}

module.exports.agent = new FlexxAgent();
