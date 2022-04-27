'use strict';

class OutputMessage {
	
	static Type = class {
        static UpdateAgentActionInformation = "UpdateAgentActionInformation"
        static RemoteOperationExecutingStatus = "RemoteOperationExecutingStatus"
        static ForceLogOffResult = "ForceLogOffResult"
        static ClientConsumption = "QueueClientConsumption"
        static EventLog = "EventLog"
        static RequestRemoteAssistanceInvitationResult = "RequestRemoteAssistanceInvitationResult"
        static ServiceAction = "ServiceAction"
        static RequestRemoteAssistanceInvitation = "RequestRemoteAssistanceInvitation"
		
		constructor(name) {
			this.name = name
		}
	}
    
    //<QueueClientConsumption xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    static ClientConsumptionKey = class {
        
        static MachineName = "N" //Texto. Nombre fqdn de la máquina
        static ComputerDomain = "CD" //Texto. Nombre del dominio
        static CPU = "C" //double. Porcentaje medio de consumo de CPU desde el último envío.
        static RAM = "R" //double: Consumo de RAM en MB actual.
        static TotalRAM = "TR" //double. Cantidad total de RAM de la máquina en MB.
        static Latency = "L" //int. Envía el valor del contador de rendimiento “User input delay”, creo que este valor no tiene sentido fuera de Windows.
        static BandwidthInput = "BI" //int. Media de consumo de datos de entrada desde el último envío en kb.

        static BandwidthOutput = "BO" //int. Media de consumo de datos de salida desde el último envío en kb.
        static TotalHardDisk = "TH" //int. Suma del espacio total de todos los discos en MB.
        static FeeHardDisk = "FH" //int. Suma del espacio libre de todos los discos en MB.
        static CurrentClientOid = "O" //Guid. Oid identificador de esta máquina
        static ClientVersion = "CV" //Texto. Versión actual del agente.
        static SessionIdleTime = "SI" //Datetime?. Fecha y hora de la última interacción del usuario con la máquina
        static LastWindowsUpdate = "WU" //Datetime?. Fecha y hora de la última actualización aplicada al S.O.
        static SessionUser = "SU" //Texto. Nombre del usuario logeado = "si es que solo hay 1)
        static UserIP = "IP" //Texto. IP de la máquina
        static UserIPMask = "IPM" //Texto. Maskara de subnet de la tarjeta de red.
        static UserIPRangeBegin = "IPRB" //Texto. IP inicial del rango disponible
        static UserIPRangeEnd = "IPRE" //Texto. IP final del rango disponible
        static OperatingSystem = "OS" //Texto. Nombre y versión del sistema operativo
        static CPUName = "CPN" //Texto. Name and features of the CPU
        static CPUNumberOfCores = "NOC" //int. Number of cores of the CPU.
        static ProcessorSpeed = "PS" //Texto. Velocidad del procesador en MHz = "con las unidades en texto).
        static CitrixReceiverVersion = "CR" //Texto. Versión del citrix receiver en caso de que esté instalado
        static StartTime = "ST" //DateTime?. Fecha de inicio del S.O. en formato UTC
        static PingTime = "CF" //long. Media de tiempo de ping contra la web definida = "si hay alguna) en el setting “PingDestination”.
        static ConnectedFrom = "CF" //Texto. Nombre del equipo desde el que estás conectado en caso de ser una VM.
        static RemoteAssistanceEnabled = "RA" //bool. Indica si la asistencia remota de Windows está configurada y lista para usarse.
        static QueueEngine = "QE" //int. Indica el tipo de cola que utiliza para enviar los menajes, en caso de OS no Windows solo está la opción de IoTHub = "2)
        static LastSettingsSync = "LS" //Texto. Valor del setting “tzUpdDate”. 0 en caso de que no exista el setting.
        static AgentStatus = "STA" //int. Valor que indica el estado del agente. Los valores disponibles son 1 = Working, 10 = Updating, 11 = UpdateError.
        static IsPhysical = "PH" //bool. Inidica si la máquina es física o virtual.
        static IoTHubKeys = "IHKeys" //Texto. Info de IoTHub y service bus que tiene el agente en el siguiente formato: DevicePrimaryConnectionStringSharedAccessKey + <|> + DeviceSecondaryConnectionStringSharedAccessKey + <|> + ServiceBusQueueSendPrimaryConnectionStringSharedAccessKey + <|> + ServiceBusQueueSendSecondaryConnectionStringSharedAccessKey + <|> + ServiceBusQueueName
        static Hypervisor = "Hyp" //Texto. Hypervisor sobre el que se está ejecutando la máquina, Physical en caso de ser una máquina física.
        static Broker = "BK" //Texto. Broker con el que se accede la máquina. Unknown en caso de que no haya bróker.
        static Laptop = "LP" //bool. Inidica si la máquina es un portátil o no.
        static Site_Farm = "STF" //Texto. Vacío si no es una VM citrix
          
        static Catalog_pool_HostPool = "CPHP" //Texto. Vacío si no es una VM virtual
        static DeliveryGroup = "DG" //Texto. Vacío si no es una VM virtual
        static ResourceGroup = "RG" //Texto. Vacío si no es una VM virtual en Azure
        static SubscriptionId = "SPD" //Texto. Vacío si no es una VM virtual en Azure
        static VMid = "VMID" //Texto. Vacío si no es una VM virtual en Azure
        static VMSize = "SZ" //Texto. Vacío si no es una VM virtual en Azure
        static Location = "LCT" //Texto. Vacío si no es una VM virtual en Azure
        static azEnvironment = "AEN" //Texto. Vacío si no es una VM virtual en Azure
        
        
        static Disks = "D" //List<QueueClientDisk>. Info detallada de todas las unidades.
        // Campos de la clase “QueueClientDisk”:
        static ClientDiskKey = class {
            static Name = "N" //Texto. Letra o nombre de la unidad
            static VolumeLabel = "V" //Texto. Etiqueta de la unidad
            static TotalSize = "T" //int. Tamaño en MB de la unidad
            static UsedSize = "U" //int: Tamaño ocupado en MB de la unidad
        }
        
        static Services = "SVD" //List<QueueClientServices" //Listado diferencial de todos los servicios de Windows de la VM (o equivalente en otros S.O.). Una vez a la hora se envía la info completa de todos los servicios.
        // Campos de la clase “QueueClientServices”:
        static ClientServicesKey = class {
            static Name = "N" //Texto. Nombre del servicio
            static DisplayName = "DN" //Texto. Nombre completo del servicio
            static Description = "D" //Texto. Descripción del servicio
            static Status = "S" //Texto. Estado del servicio = "started, Stopped, ...)
            static StartupType = "ST" //Texto. Tipo de arranque del servicio
            static LogOnAs = "L" //Texto. Identidad con la que arranca el servicio
            static Path = "P" //Ruta al ejecutable del servicio
            static AcceptStop = "SP" //int. 1 = Yes, 0 = No
        }
        
        static WindowsSessions = "WSI" //List<QueueClientWindowsSession>. Listado de las sesiones de usuario activas en la máquina
        // Campos de la clase “QueueClientWindowsSession”:
        static WindowsSessionKey = class {
            static UserSID = "SID" //Texto. SID del usuario
            static LogonServer = "LS" //Texto. Nombre del servidor DC donde se ha hecho el login.
            static UserDNSDomain = "UDD" //Texto. Nombre del dominio
            static UserDomain = "UD" //Texto. Nombre netbios del dominio
            static UserName = "UN" //Texto. Nombre de usuario
            static SessionId = "ID" //int. Id de la session en el SO
            static ClientName = "CN" //Texto. Nombre del dispositivo desde el que se ha abierto al sesión (en caso de ser una conexión remota).
            static SessionName = "SN" //Texto. Indica el tipo de sesión = "normalmente = Console)
            static TotalUserInputDelayAvg = "UID" //int. Media del Contador de rendimiento User Input Delay para ese usuario desde el último envío.
            static RAM = "RAM" //int. Total de MB de RAM utilizada por esa sesión del usuario
            static CPU = "CPU" //double. Porcentaje de uso de CPU utilizada por esa sesión de usuario.
            static ConnectionState = "CS" //String. Valores disponibles = "Active, Connected, ConnectQuery, Shadowing, Disconnected, Idle, Listening, Reset, Down, Initializing)
            static ConnectionTime = "CNT" //Datetime?. Fecha de la última conexión del usuario a la sesión en formato UTC ("coincide con LoginTime en al primera conexión).
            static LastInputTime = "LIT" //Datetime?. Fecha de la última interacción de este usuario con la máquina en formato UTC.
            static LoginTime = "LGT" //Datetime?. Fecha de inicio de sesión del usuario en formato UTC.
            static TotalUserInputDelayAggregated = "TotalUserInputDelayAggregated"
            static TotalUserInputDelayTicks = "TotalUserInputDelayTicks"
        }
    }

}

module.exports.OutputMessage = OutputMessage;






/*

<?xml version="1.0" encoding="utf-16"?>
<QueueClientConsumption xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <BK>CitrixOnPremises</BK>
  <LP>false</LP>
  <STF>Flexxible</STF>
  <CPHP>VDIDev-00 VDT-VDIDev-001</CPHP>
  <DG>Group - 896f9710-3683-4460-b247-f1b12672697b</DG>
  <RG />
  <SPD />
  <VMID />
  <SZ />
  <LCT />
  <AEN />
  <N>VDIDev-001-0005.sd.local</N>
  <CD>sd.local</CD>
  <C>1.27</C>
  <R>5724.5</R>
  <TR>12288</TR>
  <L>0</L>
  <BI>0</BI>
  <BO>0</BO>
  <TH>163730</TH>
  <FH>15761</FH>
  <O>4af17e8d-6827-49fe-860b-98904c325ea0</O>
  <D>
    <N>C:</N>
    <V />
    <T>122774</T>
    <U>115877</U>
  </D>
  <D>
    <N>E:</N>
    <V>New Volume</V>
    <T>40956</T>
    <U>32092</U>
  </D>
  <CV>22.1.0.0</CV>
  <SI xsi:nil="true" />
  <WU>2018-06-16T03:00:45+02:00</WU>
  <SU>SD\jesuss</SU>
  <IP>172.16.0.53</IP>
  <IPM>255.255.0.0</IPM>
  <IPRB>172.16.0.1</IPRB>
  <IPRE>172.16.255.254</IPRE>
  <OS>Microsoft Windows Server 2008 R2 Enterprise </OS>
  <CPN>Intel(R) Xeon(R) CPU           E5540  @ 2.53GHz</CPN>
  <NOC>4</NOC>
  <PS>2.527 MHz</PS>
  <CR>4.3.100.10167</CR>
  <ST>2021-11-04T13:52:24.642993Z</ST>
  <PNG>0</PNG>
  <CF>DEV-2019-02-03</CF>
  <SVD>false</SVD>
  <WSI>
    <TotalUserInputDelayAggregated>0</TotalUserInputDelayAggregated>
    <TotalUserInputDelayTicks>0</TotalUserInputDelayTicks>
    <SID>S-1-5-21-2683639278-845796391-3296914753-2110</SID>
    <LS>SDDC02</LS>
    <UDD>SD.LOCAL</UDD>
    <UD>SD</UD>
    <UN>jesuss</UN>
    <ID>3</ID>
    <CN>DEV-2019-02-03</CN>
    <SN>RDP-Tcp#0</SN>
    <UID>0</UID>
    <RAM>818</RAM>
    <CPU>0</CPU>
    <CS>Active</CS>
    <CNT>2021-11-19T11:13:46.668Z</CNT>
    <DCT>2021-11-19T11:13:46.59Z</DCT>
    <LIT>2022-01-26T07:04:44.203Z</LIT>
    <LGT>2021-11-16T14:44:10.154Z</LGT>
  </WSI>
  <RA>false</RA>
  <QE>IOTHub</QE>
  <LS>2022/01/26_14:45:22_903</LS>
  <STA>1</STA>
  <PH>false</PH>
  <IHKeys>Au3gQZI3ZXAb30pgw2EMPDv4zqpv+T0E70UGLBrVJKk=&lt;|&gt;AV6iZXfJpWzVR3MG0TKwnZ0pZPldAZ9yojg8ngPyJlw=&lt;|&gt;3VprGQXMHCivVpDfIF9h0AB6gEh1YsvAq5rAkQm+r6k=&lt;|&gt;C53qJcxfoF2RoYhr2zu2rD4lqNvKEW2D6KqXccHu+3E=&lt;|&gt;flxdevqueue</IHKeys>
  <Hyp>Hyper-V</Hyp>
</QueueClientConsumption>


*/
                




