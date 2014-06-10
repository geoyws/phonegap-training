$(function () {
    temporary();
});

var serverURL = "http://175.139.183.94:76/PhoneGap_Training";


function addStudentFields() {
    var html =
        "<tr>" +
            "<td>" + "<input type='text'>" + "</td>" +
            "<td>" + "<input type='text'>" + "</td>" +
            "<td>" + "<input type='text'>" + "</td>" +
            "<td>" + "<input type='text'>" + "</td>" +
            "<td>" + "<input type='text'>" + "</td>" +
        "</tr>";
    var button = "<button onclick='addStudent()'>Confirm</button>";
    $("div#studentTable table").append(html);
    $("div#studentTable").append(button);
    $(".crudButton").toggle();
};

function addStudent() {
    // DATA
    var studentID, name, icno, sex, classroomID;
    studentID = $("div#studentTable table tr td input").eq(0).val();
    name = $("div#studentTable table tr td input").eq(1).val();
    icno = $("div#studentTable table tr td input").eq(2).val();
    sex = $("div#studentTable table tr td input").eq(3).val();
    classroomID = $("div#studentTable table tr td input").eq(4).val();
    // AJAX
    $.ajax({
        url: serverURL + "/api/student",
        type: "POST",
        crossDomain: true,
        data: {
            "StudentID": studentID,
            "Name": name,
            "ICNo": icno,
            "Sex": sex,
            "ClassroomID": classroomID
        },
        async: false,
        success: function (data, status) {
            //status = "SUCCESS" || "";
            alert(status);
        }
    });
    $("div#studentTable").html("");
    populateStudentTable();
    $(".crudButton").toggle();
};

function getStudent() {
    var res;
    $.ajax({
        url: serverURL + "/api/student",
        type: "GET",
        crossDomain: true,
        async: false,
        success: function (data) { 
            res = data; // res = result data
        }
    });
    return res;
};

function updateStudentFields() {
    $(".crudButton").toggle();
    $("td").each(function () {
        var value = $(this).html();
        $(this).html("<input value='" + value + "'>");
    });
    var button = "<button onclick='updateStudent()'>Confirm Update</button>";
    $("div#studentTable").append(button);
}

function updateStudent() {
    var alertArray = [];
    $(".datarows").each(function () {
        // Data
        var studentID, name, icno, sex, classroomID;
        studentID = $(this).find("td").eq(0).find("input").val();
        name = $(this).find("td").eq(1).find("input").val();
        icno = $(this).find("td").eq(2).find("input").val();
        sex = $(this).find("td").eq(3).find("input").val();
        classroomID = $(this).find("td").eq(4).find("input").val();
        // AJAX
        $.ajax({
            url: serverURL + "/api/student" + studentID,
            type: "PUT",
            crossDomain: "true",
            data: {
                //"StudentID": studentID,
                "Name": name,
                "ICNo": icno//,
                //"Sex": sex,
                //"ClassroomID": classroomID
            },
            async: true//,
            //success: function (data, status) {
            //    //status = "NO SERVER RESPONSE" || "";
            //    alertArray.push(studentID);
            //}
        });
    });
    //var finalAlertArray = alertArray.join(", ");
    //alert(finalAlertArray);
    alert("Success!");
    
    $("div#studentTable").html("");
    populateStudentTable();
    $(".crudButton").toggle();
};

function deleteStudentsFields() {
    $(".crudButton").toggle();
    $(".tableHeaders").append("<th>Delete</th>");
    $(".datarows").each(function () {
        $(this).append("<td><input type='checkbox'></td>");
    });
    var button = "<button onclick='deleteStudent()'>Confirm Deletion</button>";
    $("div#studentTable").append(button);
};

function deleteStudent() {
    $("input[type=checkbox]:checked").each(function () {
        var studentID = $(this).parent().parent().find("td:eq(0)").html();
        $.ajax({
            url: serverURL + "/api/student" + studentID,
            type: "DELETE",
            crossDomain: "true",
            data: {
                "StudentID": studentID
            },
            async: false//,
            //success: function (data, status) {
            //    alert("Success: " + status);
            //}
        });
    });
    alert("Success!");

    $("div#studentTable").html("");
    populateStudentTable();
    $(".crudButton").toggle();
};

function populateStudentTable() {
    var res = getStudent(); // res = result
    //res.ClassroomID = classroomID;
    //res.ICNo = icno;
    //res.Name = name;
    //res.Sex = sex;
    //res.StudentID = studentID;
    //var injectionLoop =
    //        "<tr>" +
    //            "<td>" + studentID + "</td>" +
    //            "<td>" + name + "</td>" +
    //            "<td>" + icno + "</td>" +
    //            "<td>" + sex + "</td>" +
    //            "<td>" + classroomID + "</td>" +
    //        "</tr>";
    var injectionArray =[];
    $.each(res, function (index) {
        result =
            "<tr class='datarows'>" +
                "<td>" + res[index].StudentID + "</td>" +
                "<td>" + res[index].Name + "</td>" +
                "<td>" + res[index].ICNo + "</td>" +
                "<td>" + res[index].Sex + "</td>" +
                "<td>" + res[index].ClassroomID + "</td>" +
            "</tr>";
        injectionArray.push(result)
    });
    var finalInjection = injectionArray.join("");
    $("div#studentTable").append(
        "<table>" +
            "<tr class='tableHeaders'>" +
                "<th>" + "Student ID" + "</th>" +
                "<th>" + "Name" + "</th>" +
                "<th>" + "IC No" + "</th>" +
                "<th>" + "Sex" + "</th>" +
                "<th>" + "Classroom ID" + "</th>" +
            "</tr>" +
            finalInjection +
        "</table>");
    // Use it afterwards to append into students.html
};

// No longer in use
//function clickStudentTable() {
//    $("div#studentTable").on(click, function (event) {
//        target = event.target;
//        if (target.is("td")) {
//            var placeholder = $(target).html();
//            var parent = $(target).parent(); // to obtain the parent to ascertain the rest of the variables
//            var studentID = $(parent + ":eq(1)").html();
//            var name = $(parent + ":eq(2)").html();
//            var icno = $(parent + ":eq(3)").html();
//            var sex = $(parent + ":eq(4)").html();
//            var classroomID = $(parent + ":eq(5)").html();
//            $(target).html("<input type='text' placeholder='" + placeholder + "' />" + "<a onclick='" + updateStudent(classroomID, icno, name, sex, studentID) + "'>Save</a>");
//        };
//    });
//};

function temporary() {
    populateStudentTable();
};

//function test() {
//    var studentID, name, icno, sex, classroomID;
//    studentID = "1";
//    name = "George Yong Wen Soong";
//    icno = "870101-14-5321TESTTEST";
//    sex = "M";
//    classroomID = "1";
//    $.ajax({
//        url: serverURL + "/api/student" + studentID,
//        type: "PUT",
//        data: {
//            //"StudentID": studentID,
//            "Name": name,
//            "ICNo": icno//,
//            //"Sex": sex,
//            //"ClassroomID": classroomID
//        },
//        async: false,
//        success: function (data, status) {
//            alert("Success!");
//        }
//    });
//}