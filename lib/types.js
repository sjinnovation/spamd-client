"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Header;
(function (Header) {
    Header["Compress"] = "Compress";
    Header["ContentLength"] = "Content-length";
    Header["DidRemove"] = "DidRemove";
    Header["DidSet"] = "DidSet";
    Header["MessageClass"] = "Message-class";
    Header["Remove"] = "Remove";
    Header["Set"] = "Set";
    Header["Spam"] = "Spam";
    Header["User"] = "User";
})(Header = exports.Header || (exports.Header = {}));
var StatusCode;
(function (StatusCode) {
    StatusCode[StatusCode["EX_OK"] = 0] = "EX_OK";
    StatusCode[StatusCode["EX_USAGE"] = 64] = "EX_USAGE";
    StatusCode[StatusCode["EX_DATAERR"] = 65] = "EX_DATAERR";
    StatusCode[StatusCode["EX_NOINPUT"] = 66] = "EX_NOINPUT";
    StatusCode[StatusCode["EX_NOUSER"] = 67] = "EX_NOUSER";
    StatusCode[StatusCode["EX_NOHOST"] = 68] = "EX_NOHOST";
    StatusCode[StatusCode["EX_UNAVAILABLE"] = 69] = "EX_UNAVAILABLE";
    StatusCode[StatusCode["EX_SOFTWARE"] = 70] = "EX_SOFTWARE";
    StatusCode[StatusCode["EX_OSERR"] = 71] = "EX_OSERR";
    StatusCode[StatusCode["EX_OSFILE"] = 72] = "EX_OSFILE";
    StatusCode[StatusCode["EX_CANTCREAT"] = 73] = "EX_CANTCREAT";
    StatusCode[StatusCode["EX_IOERR"] = 74] = "EX_IOERR";
    StatusCode[StatusCode["EX_TEMPFAIL"] = 75] = "EX_TEMPFAIL";
    StatusCode[StatusCode["EX_PROTOCOL"] = 76] = "EX_PROTOCOL";
    StatusCode[StatusCode["EX_NOPERM"] = 77] = "EX_NOPERM";
    StatusCode[StatusCode["EX_CONFIG"] = 78] = "EX_CONFIG";
    StatusCode[StatusCode["EX_TIMEOUT"] = 79] = "EX_TIMEOUT";
})(StatusCode = exports.StatusCode || (exports.StatusCode = {}));
exports.ErrorMessage = {
    [StatusCode.EX_USAGE]: 'Command line usage error',
    [StatusCode.EX_DATAERR]: 'Data format error',
    [StatusCode.EX_NOINPUT]: 'Cannot open input',
    [StatusCode.EX_NOUSER]: 'Addressee unknown',
    [StatusCode.EX_NOHOST]: 'Hostname unknown.',
    [StatusCode.EX_UNAVAILABLE]: 'Service unavailable',
    [StatusCode.EX_SOFTWARE]: 'Internal software error',
    [StatusCode.EX_OSERR]: 'System error',
    [StatusCode.EX_OSFILE]: 'Critical operating system file missing',
    [StatusCode.EX_CANTCREAT]: 'Can’t create user output file',
    [StatusCode.EX_IOERR]: 'Input/output error',
    [StatusCode.EX_TEMPFAIL]: 'Temporary failure',
    [StatusCode.EX_PROTOCOL]: 'Remote error in protocol',
    [StatusCode.EX_NOPERM]: 'Permission denied',
    [StatusCode.EX_CONFIG]: 'Configuration error',
    [StatusCode.EX_TIMEOUT]: 'Read timeout',
};
var Method;
(function (Method) {
    Method["CHECK"] = "CHECK";
    Method["HEADERS"] = "HEADERS";
    Method["PING"] = "PING";
    Method["PROCESS"] = "PROCESS";
    Method["REPORT"] = "REPORT";
    Method["REPORT_IFSPAM"] = "REPORT_IFSPAM";
    Method["SKIP"] = "SKIP";
    Method["SYMBOLS"] = "SYMBOLS";
    Method["TELL"] = "TELL";
})(Method = exports.Method || (exports.Method = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdHlwZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFZLE1BVVg7QUFWRCxXQUFZLE1BQU07SUFDaEIsK0JBQXFCLENBQUE7SUFDckIsMENBQWdDLENBQUE7SUFDaEMsaUNBQXVCLENBQUE7SUFDdkIsMkJBQWlCLENBQUE7SUFDakIsd0NBQThCLENBQUE7SUFDOUIsMkJBQWlCLENBQUE7SUFDakIscUJBQVcsQ0FBQTtJQUNYLHVCQUFhLENBQUE7SUFDYix1QkFBYSxDQUFBO0FBQ2YsQ0FBQyxFQVZXLE1BQU0sR0FBTixjQUFNLEtBQU4sY0FBTSxRQVVqQjtBQUlELElBQVksVUFrQlg7QUFsQkQsV0FBWSxVQUFVO0lBQ3BCLDZDQUFTLENBQUE7SUFDVCxvREFBYSxDQUFBO0lBQ2Isd0RBQWUsQ0FBQTtJQUNmLHdEQUFlLENBQUE7SUFDZixzREFBYyxDQUFBO0lBQ2Qsc0RBQWMsQ0FBQTtJQUNkLGdFQUFtQixDQUFBO0lBQ25CLDBEQUFnQixDQUFBO0lBQ2hCLG9EQUFhLENBQUE7SUFDYixzREFBYyxDQUFBO0lBQ2QsNERBQWlCLENBQUE7SUFDakIsb0RBQWEsQ0FBQTtJQUNiLDBEQUFnQixDQUFBO0lBQ2hCLDBEQUFnQixDQUFBO0lBQ2hCLHNEQUFjLENBQUE7SUFDZCxzREFBYyxDQUFBO0lBQ2Qsd0RBQWUsQ0FBQTtBQUNqQixDQUFDLEVBbEJXLFVBQVUsR0FBVixrQkFBVSxLQUFWLGtCQUFVLFFBa0JyQjtBQUVZLFFBQUEsWUFBWSxHQUFHO0lBQzFCLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFLDBCQUEwQjtJQUNqRCxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsRUFBRSxtQkFBbUI7SUFDNUMsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLEVBQUUsbUJBQW1CO0lBQzVDLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxFQUFFLG1CQUFtQjtJQUMzQyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsRUFBRSxtQkFBbUI7SUFDM0MsQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLEVBQUUscUJBQXFCO0lBQ2xELENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxFQUFFLHlCQUF5QjtJQUNuRCxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFBRSxjQUFjO0lBQ3JDLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxFQUFFLHdDQUF3QztJQUNoRSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsRUFBRSwrQkFBK0I7SUFDMUQsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUUsb0JBQW9CO0lBQzNDLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxFQUFFLG1CQUFtQjtJQUM3QyxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsRUFBRSwwQkFBMEI7SUFDcEQsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEVBQUUsbUJBQW1CO0lBQzNDLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxFQUFFLHFCQUFxQjtJQUM3QyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsRUFBRSxjQUFjO0NBQ3hDLENBQUE7QUFFRCxJQUFrQixNQVVqQjtBQVZELFdBQWtCLE1BQU07SUFDdEIseUJBQWUsQ0FBQTtJQUNmLDZCQUFtQixDQUFBO0lBQ25CLHVCQUFhLENBQUE7SUFDYiw2QkFBbUIsQ0FBQTtJQUNuQiwyQkFBaUIsQ0FBQTtJQUNqQix5Q0FBK0IsQ0FBQTtJQUMvQix1QkFBYSxDQUFBO0lBQ2IsNkJBQW1CLENBQUE7SUFDbkIsdUJBQWEsQ0FBQTtBQUNmLENBQUMsRUFWaUIsTUFBTSxHQUFOLGNBQU0sS0FBTixjQUFNLFFBVXZCIn0=