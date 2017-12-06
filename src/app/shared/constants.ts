export class Constants {

    /** Context URL  **/
    public static BASE_URL = 'http://localhost:9000/alertautojob/';

    /** Service URLS **/
    public static LOGIN_SERVICE_URL = 'authCont/authUser';

    public static FTP_SAVE_SERVICE_URL = 'ftp/saveFtp';
    public static FTP_UPDATE_SERVICE_URL = 'ftp/updateFtp';
    public static FTP_DELETE_SERVICE_URL = 'ftp/deleteFtp';
    public static FTP_LIST_SERVICE_URL = 'ftp/listFtps';

    /** Alert Services */
    public static ALERT_SEARCH_SERVICE_URL  ='alert/searchAlerts';
    public static ALERT_SAVE_SERVICE_URL  ='alert/saveAlert';
    public static ALERT_DELETE_SERVICE_URL  ='alert/deleteAlert';
    public static ALERT_UPDATE_SERVICE_URL  ='alert/updateAlert';
    public static ALERT_RUN_SERVICE_URL  ='api/generateReport';
    
    

    /** Notify Types */
    public static SUCCESS_NOTIFY='success';
    public static INFO_NOTIFY='info';
    public static WARN_NOTIFY='warning';
    public static ERROR_NOTIFY='danger';
    
    
    

}