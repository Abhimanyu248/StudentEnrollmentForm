$("#stdrollNo").focus();

var connToken ="90931829|-31949307156508130|90960656";
var dbName ="SCHOOL-DB";
var relName ="STUDENT-TABLE";

function validateAndGetFormData() {
    var stdrollNoVar = $("#stdrollNo").val();
    if (stdrollNoVar === "") {
        alert("Roll No. is Required Value");
        $("#stdrollNo").focus();
        return "";
    }
    var stdNameVar = $("#stdName").val();
    if (stdNameVar === "") {
        alert("Student Name is Required Value");
        $("#stdName").focus();
        return "";
    }
    var stdClassVar = $("#stdClass").val();
    if (stdClassVar === "") {
        alert("Class is Required Value");
        $("#stdClass").focus();
        return "";
    }
    var stdDOBVar = $("#stdDOB").val();
    if (stdDOBVar === "") {
        alert("DOB is Required Value");
        $("#stdDOB").focusstdAddress
        return "";
    }
    var stdAddressVar = $("#stdAddress").val();
    if (stdAddressVar === "") {
        alert("Address is Required Value");
        $("#stdAddress").focus();
        return "";
    }
    var stdEnrDateVar = $("#stdEnrDate").val();
    if (stdEnrDateVar === "") {
        alert("Enrollment Date is Required Value");
        $("#stdEnrDate").focus();
        return "";
    }
    var jsonStrObj = {
        stdrollNo: stdrollNoVar,
        stdName: stdNameVar,
        stdClass: stdClassVar,
        stdDOB: stdDOBVar,
        stdAddress: stdAddressVar,
        stdEnrDate: stdEnrDateVar
    };
    return JSON.stringify(jsonStrObj);
}

function getrollNoJson() {
    var stdrollNoVar = $("#stdrollNo").val();
    var jsonStr = {
       stdrollNo: stdrollNoVar
    };
    return JSON.stringify(jsonStr);

}

function savetolocalStorage(jsonObj) {
    var recordData = JSON.parse(jsonObj.data);
    localStorage.setItem("recordno", recordData.rec_no);
}

function fillData(jsonObj) {
    savetolocalStorage(jsonObj);
    var recordData = JSON.parse(jsonObj.data).record;
    $("#stdName").val(recordData.stdName);
    $("#stdClass").val(recordData.stdClass);
    $("#stdDOB").val(recordData.stdDOB);
    $("#stdAddress").val(recordData.stdAddress);
    $("#stdEnrDate").val(recordData.stdEnrDate);
}

function getData() {
    var stdRollNoJsonObj = getrollNoJson();
    console.log(stdRollNoJsonObj);
    var getReqStr = createGETRequest(connToken,dbName, relName, stdRollNoJsonObj);
    jQuery.ajaxSetup({ async: false });
    var resultObj = executeCommandAtGivenBaseUrl(getReqStr, "http://api.login2explore.com:5577", "/api/irl");
    jQuery.ajaxSetup({ async: true });
    console.log(resultObj);
     console.log("failed");
    if (resultObj.status === 400 ) {
        $("#Save").prop("disabled", false);
        $("#Reset").prop("disabled", false);
        $("#stdName").focus();
    }
    else if (resultObj.status === 200) {
        $("#stdrollNo").prop("disabled", true);
        fillData(resultObj);
        $("#Change").prop("disabled", false);
        $("#Reset").prop("disabled", false);
        $("#stdName").focus();
    }
    console.log("end");

}


function resetForm() {
    $("#stdrollNo").val("");
    $("#stdName").val("");
    $("#stdClass").val("");
    $("#stdDOB").val("");
    $("#stdAddress").val("");
    $("#stdEnrDate").val("");
    $("#Save").prop("disabled", true);
    $("#Change").prop("disabled", true);
    $("#Reset").prop("disabled", true);
    $("#stdName").prop("disabled", true);
    $("#stdClass").prop("disabled", true);
    $("#stdDOB").prop("disabled", true);
    $("#stdAddress").prop("disabled", true);
    $("#stdEnrDate").prop("disabled", true);
    $("#stdrollNo").focus();
}

function saveData() {
    var jsonStr = validateAndGetFormData();
    if (jsonStr === "") {
        return;
    }
    var putReqStr = createPUTRequest(connToken, jsonStr, dbName, relName);
    jQuery.ajaxSetup({ async: false });
    var resultObj = executeCommand(putReqStr, "http://api.login2explore.com:5577", "/api/iml");
    jQuery.ajaxSetup({ async: true });
    resetForm();
    $("#stdrollNo").focus();
}
function changeData() {
    $("#Change").prop("disabled", true);
    jsonChange = validateAndGetFormData();
    var putReqStr = createPUTRequest(connToken, jsonChange, dbName, relName, localStorage.getItem("recordno"));
    jQuery.ajaxSetup({ async: false });
    var resultObj = executeCommand(putReqStr, "http://api.login2explore.com:5577", "/api/iml");
    jQuery.ajaxSetup({ async: true });
    resetForm();
    $("#stdrollNo").focus();
}
