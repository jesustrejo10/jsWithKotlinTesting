'use strict';

class InputMessage {
	
	static remoteOperationFields = class {
		static script = "Script"
	}
    
    static serviceActionsFields = class {
        static action = "A" // values: Start, Stop, Restart
        static serviceName = "N"
    }
    
    static agentOperationFields = class {
        static actionType = "T" // values: ShutDown, LogOff, PowerOff, Restart, ForceStart, Disconnect, UserNotification
        static sessionId = "S"
        static metaData = "M" // in case A=UserNotification, M is the message to be shown
        static jobInfo = "I"
        static vdiOperationDetailOd = "V"
    }
	
	static Type = class {
		static ServiceAction = "QueueClientServiceAction" //"ServiceAction"
        static RemoteOperationExecute = "QueueRemoteOperation"
		static RequestAgentUpdate = "RequestAgentUpdate"
		static ForceLogOff = "ForceLogOff"
		static UpdateIoTHubConnectionStrings = "UpdateIoTHubConnectionStrings"
		static AgentOperation = "QueueClientDeviceAction" //"AgentOperation"
		static SendSettings = "AppSettingsList"
        static RequestRemoteAssistanceInvitation = "RequestRemoteAssistanceInvitation" // Windows only
		
		constructor(name) {
			this.name = name
		}
	}
    
    static AppSettingFields = class {
        static root = "AppSetting"
        static key = "Key"
        static value = "Value"
        static serverSaved = "ServerSaved"
        static description = "Description"
        static group = "Group"
        static visible = "Visible"
        static valueIsPrivate = "ValueIsPrivate"
    }
    
    static AppSettingKey = class {
        static getHardDiskUsage = "GetHardDiskUsage"
        static getVDIClientTotals = "GetVDIClientTotals"
        static getFileVersions = "GetFileVersions"
        static fileVersions = "FileVersions"
        static getBandWidth = "GetBandWidth"
        static clientListenerUpdateTime = "ClientListenerUpdateTime"
        static requestVMInfoInterval = "RequestVMInfoInterval"
        static getLastWindowsUpdateDate = "GetLastWindowsUpdateDate"
        static checkAutomaticRestart = "CheckAutomaticRestart"
        static eventLogIdsToReadDomain = "EventLogIdsToReadDomain"
        static eventLogIdsToRead = "EventLogIdsToRead"
        static getServices = "GetServices"
        static minHoursForErrorLogRepeat = "MinHoursForErrorLogRepeat"
        static VDIClientDataLocalFolder = "VDIClientDataLocalFolder"
        static getGlobalCPUConsumption = "GetGlobalCPUConsumption"
        static getEventLogs = "GetEventLogs"
        static sendEventLogsInterval = "SendEventLogsInterval"
        static userProfileStorageUseMinutes = "UserProfileStorageUseMinutes"
        static getGlobalRAMConsumption = "GetGlobalRAMConsumption"
        static getSessionLatency = "GetSessionLatency"
        static currentClientRefreshTime = "Current client refresh time"
        static eventLogFilter = "EventLogFilter"
        static productName = "ProductName"
        static tzUpdDate = "tzUpdDate"
    }
}

module.exports.InputMessage = InputMessage;





/*
Receive settings:
[
  {
    Key: 'GetHardDiskUsage',
    Value: 'True',
    ServerSaved: 'true',
    Description: '',
    Group: '',
    Visible: 'true',
    ValueIsPrivate: 'false'
  },
  {
    Key: 'GetVDIClientTotals',
    Value: 'True',
    ServerSaved: 'true',
    Description: '',
    Group: '',
    Visible: 'true',
    ValueIsPrivate: 'false'
  },
  {
    Key: 'GetFileVersions',
    Value: 'True',
    ServerSaved: 'true',
    Description: '',
    Group: '',
    Visible: 'true',
    ValueIsPrivate: 'false'
  },
  {
    Key: 'GetBandWidth',
    Value: 'True',
    ServerSaved: 'true',
    Description: '',
    Group: '',
    Visible: 'true',
    ValueIsPrivate: 'false'
  },
  {
    Key: 'ClientListenerUpdateTime',
    Value: '10000',
    ServerSaved: 'true',
    Description: '',
    Group: '',
    Visible: 'true',
    ValueIsPrivate: 'false'
  },
  {
    Key: 'RequestVMInfoInterval',
    Value: '720',
    ServerSaved: 'true',
    Description: '',
    Group: '',
    Visible: 'true',
    ValueIsPrivate: 'false'
  },
  {
    Key: 'GetLastWindowsUpdateDate',
    Value: 'True',
    ServerSaved: 'true',
    Description: '',
    Group: '',
    Visible: 'true',
    ValueIsPrivate: 'false'
  },
  {
    Key: 'CheckAutomaticRestart',
    Value: 'True',
    ServerSaved: 'true',
    Description: '',
    Group: '',
    Visible: 'true',
    ValueIsPrivate: 'false'
  },
  {
    Key: 'EventLogIdsToReadDomain',
    Value: '',
    ServerSaved: 'true',
    Description: '',
    Group: '',
    Visible: 'true',
    ValueIsPrivate: 'false'
  },
  {
    Key: 'GetServices',
    Value: 'True',
    ServerSaved: 'true',
    Description: '',
    Group: '',
    Visible: 'true',
    ValueIsPrivate: 'false'
  },
  {
    Key: 'MinHoursForErrorLogRepeat',
    Value: '24',
    ServerSaved: 'true',
    Description: '',
    Group: '',
    Visible: 'true',
    ValueIsPrivate: 'false'
  },
  {
    Key: 'FileVersions',
    Value: '',
    ServerSaved: 'true',
    Description: '',
    Group: '',
    Visible: 'true',
    ValueIsPrivate: 'false'
  },
  {
    Key: 'VDIClientDataLocalFolder',
    Value: 'Environment.SpecialFolder.CommonApplicationDataFlexxible',
    ServerSaved: 'true',
    Description: '',
    Group: '',
    Visible: 'true',
    ValueIsPrivate: 'false'
  },
  {
    Key: 'GetGlobalCPUConsumption',
    Value: 'True',
    ServerSaved: 'true',
    Description: '',
    Group: '',
    Visible: 'true',
    ValueIsPrivate: 'false'
  },
  {
    Key: 'GetEventLogs',
    Value: 'True',
    ServerSaved: 'true',
    Description: '',
    Group: '',
    Visible: 'true',
    ValueIsPrivate: 'false'
  },
  {
    Key: 'SendEventLogsInterval',
    Value: '10',
    ServerSaved: 'true',
    Description: '',
    Group: '',
    Visible: 'true',
    ValueIsPrivate: 'false'
  },
  {
    Key: 'UserProfileStorageUseMinutes',
    Value: '1',
    ServerSaved: 'true',
    Description: '',
    Group: '',
    Visible: 'true',
    ValueIsPrivate: 'false'
  },
  {
    Key: 'GetGlobalRAMConsumption',
    Value: 'True',
    ServerSaved: 'true',
    Description: '',
    Group: '',
    Visible: 'true',
    ValueIsPrivate: 'false'
  },
  {
    Key: 'GetSessionLatency',
    Value: 'True',
    ServerSaved: 'true',
    Description: '',
    Group: '',
    Visible: 'true',
    ValueIsPrivate: 'false'
  },
  {
    Key: 'EventLogIdsToRead',
    Value: '',
    ServerSaved: 'true',
    Description: '',
    Group: '',
    Visible: 'true',
    ValueIsPrivate: 'false'
  },
  {
    Key: 'Current client refresh time',
    Value: '61',
    ServerSaved: 'true',
    Description: '',
    Group: '',
    Visible: 'true',
    ValueIsPrivate: 'false'
  },
  {
    Key: 'EventLogFilter',
    Value: "(NOT Message LIKE 'Error del Servicio de instantáneas de volumen%') AND(NOT Message LIKE 'The Citrix Desktop Service failed to obtain a list of delivery controllers with which to register.%') AND(NOT Message LIKE 'Antimalware de Microsoft ha encontrado un error al intentar actualizar las firmas.%') AND(NOT Message LIKE 'Windows cannot perform an online backup of this system%') AND(NOT Message LIKE 'Unexpected failure. Error code: 48F@01000003%') AND(NOT Message LIKE 'The initiator could not send an iSCSI PDU.%') AND(NOT Message LIKE 'Target failed to respond in time for a login request%') AND(SourceName != 'VSS')",
    ServerSaved: 'true',
    Description: '',
    Group: '',
    Visible: 'true',
    ValueIsPrivate: 'false'
  },
  {
    Key: 'ProductName',
    Value: 'flexxible|desktop',
    ServerSaved: 'true',
    Description: '',
    Group: '',
    Visible: 'true',
    ValueIsPrivate: 'false'
  },
  {
    Key: 'tzUpdDate',
    Value: '2022/01/26_14:45:22_903',
    ServerSaved: 'false',
    Visible: 'true',
    ValueIsPrivate: 'false'
  }
] */



/*
// short version

{
  GetHardDiskUsage: 'True',
  GetVDIClientTotals: 'True',
  GetFileVersions: 'True',
  GetBandWidth: 'True',
  ClientListenerUpdateTime: '10000',
  RequestVMInfoInterval: '720',
  GetLastWindowsUpdateDate: 'True',
  CheckAutomaticRestart: 'True',
  EventLogIdsToReadDomain: '',
  GetServices: 'True',
  MinHoursForErrorLogRepeat: '24',
  FileVersions: '',
  VDIClientDataLocalFolder: 'Environment.SpecialFolder.CommonApplicationDataFlexxible',
  GetGlobalCPUConsumption: 'True',
  GetEventLogs: 'True',
  SendEventLogsInterval: '10',
  UserProfileStorageUseMinutes: '1',
  GetGlobalRAMConsumption: 'True',
  GetSessionLatency: 'True',
  EventLogIdsToRead: '',
  'Current client refresh time': '61',
  EventLogFilter: "(NOT Message LIKE 'Error del Servicio de instantáneas de volumen%') AND(NOT Message LIKE 'The Citrix Desktop Service failed to obtain a list of delivery controllers with which to register.%') AND(NOT Message LIKE 'Antimalware de Microsoft ha encontrado un error al intentar actualizar las firmas.%') AND(NOT Message LIKE 'Windows cannot perform an online backup of this system%') AND(NOT Message LIKE 'Unexpected failure. Error code: 48F@01000003%') AND(NOT Message LIKE 'The initiator could not send an iSCSI PDU.%') AND(NOT Message LIKE 'Target failed to respond in time for a login request%') AND(SourceName != 'VSS')",
  ProductName: 'flexxible|desktop',
  tzUpdDate: '2022/01/26_14:45:22_903'
}
*/
