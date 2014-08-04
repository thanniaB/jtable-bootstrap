<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="MasterChild.aspx.cs" Inherits="jTableWithAspNetWebForms.MasterChild" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Master/Child Tables With jTable and ASP.NET Web Forms</title>
    <link href="/Content/Site.css" rel="stylesheet" type="text/css" />
    <link href="/Content/themes/metroblue/jquery-ui.css" rel="stylesheet"
        type="text/css" />
    <!-- jTable style file -->
    <link href="/Scripts/jtable/themes/metro/blue/jtable.css" rel="stylesheet"
        type="text/css" />
    <script src="/Scripts/modernizr-2.6.2.js" type="text/javascript"></script>
    <script src="/Scripts/jquery-1.9.0.min.js" type="text/javascript"></script>
    <script src="/Scripts/jquery-ui-1.9.2.min.js" type="text/javascript"></script>

    <script src="/Scripts/jtablesite.js" type="text/javascript"></script>
    <!-- A helper library for JSON serialization -->
    <script type="text/javascript" src="/Scripts/jtable/external/json2.js"></script>
    <!-- Core jTable script file -->
    <script type="text/javascript" src="/Scripts/jtable/jquery.jtable.js"></script>
    <!-- ASP.NET Web Forms extension for jTable -->
    <script type="text/javascript" src="/Scripts/jtable/extensions/jquery.jtable.aspnetpagemethods.js"></script>

    <style>
        .child-opener-image
        {
            cursor: pointer;
        }
        .child-opener-image-column
        {
            text-align: center;
        }
        .jtable-dialog-form
        {
            min-width: 220px;
        }
        .jtable-dialog-form input[type="text"]
        {
            min-width: 200px;
        }
    </style>

</head>
<body>
    <div class="site-container">
        <div id="StudentTableContainer">
        </div>
    </div>
    <script type="text/javascript">

        $(document).ready(function () {

            $('#StudentTableContainer').jtable({
                title: 'Student List',
                paging: true, //Enable paging
                sorting: true, //Enable sorting
                defaultSorting: 'Name ASC',
                //openChildAsAccordion: true, //Enable this line to show child tabes as accordion style
                actions: {
                    listAction: '/MasterChild.aspx/StudentList',
                    deleteAction: '/MasterChild.aspx/DeleteStudent',
                    updateAction: '/MasterChild.aspx/UpdateStudent',
                    createAction: '/MasterChild.aspx/CreateStudent'
                },
                fields: {
                    StudentId: {
                        key: true,
                        create: false,
                        edit: false,
                        list: false
                    },
                    //CHILD TABLE DEFINITION FOR "PHONE NUMBERS"
                    Phones: {
                        title: '',
                        width: '5%',
                        sorting: false,
                        edit: false,
                        create: false,
                        listClass: 'child-opener-image-column',
                        display: function (studentData) {
                            //Create an image that will be used to open child table
                            var $img = $('<img class="child-opener-image" src="/Content/images/Misc/phone.png" title="Edit phone numbers" />');
                            //Open child table when user clicks the image
                            $img.click(function () {
                                $('#StudentTableContainer').jtable('openChildTable',
                                    $img.closest('tr'),
                                    {
                                        title: studentData.record.Name + ' - Phone numbers',
                                        actions: {
                                            listAction: '/MasterChild.aspx/PhoneList?StudentId=' + studentData.record.StudentId,
                                            deleteAction: '/MasterChild.aspx/DeletePhone',
                                            updateAction: '/MasterChild.aspx/UpdatePhone',
                                            createAction: '/MasterChild.aspx/CreatePhone'
                                        },
                                        fields: {
                                            StudentId: {
                                                type: 'hidden',
                                                defaultValue: studentData.record.StudentId
                                            },
                                            PhoneId: {
                                                key: true,
                                                create: false,
                                                edit: false,
                                                list: false
                                            },
                                            PhoneType: {
                                                title: 'Phone type',
                                                width: '30%',
                                                options: { '1': 'Home phone', '2': 'Office phone', '3': 'Cell phone' }
                                            },
                                            Number: {
                                                title: 'Phone Number',
                                                width: '30%'
                                            },
                                            RecordDate: {
                                                title: 'Record date',
                                                width: '20%',
                                                type: 'date',
                                                displayFormat: 'yy-mm-dd',
                                                create: false,
                                                edit: false
                                            }
                                        }
                                    }, function (data) { //opened handler
                                        data.childTable.jtable('load');
                                    });
                            });
                            //Return image to show on the person row
                            return $img;
                        }
                    },
                    //CHILD TABLE DEFINITION FOR "EXAMS"
                    Exams: {
                        title: '',
                        width: '5%',
                        sorting: false,
                        edit: false,
                        create: false,
                        listClass: 'child-opener-image-column',
                        display: function (studentData) {
                            //Create an image that will be used to open child table
                            var $img = $('<img class="child-opener-image" src="/Content/images/Misc/note.png" title="Edit exam results" />');
                            //Open child table when user clicks the image
                            $img.click(function () {
                                $('#StudentTableContainer').jtable('openChildTable',
                                    $img.closest('tr'), //Parent row
                                    {
                                    title: studentData.record.Name + ' - Exam Results',
                                    actions: {
                                        listAction: '/MasterChild.aspx/ExamList?StudentId=' + studentData.record.StudentId,
                                        deleteAction: '/MasterChild.aspx/DeleteExam',
                                        updateAction: '/MasterChild.aspx/UpdateExam',
                                        createAction: '/MasterChild.aspx/CreateExam'
                                    },
                                    fields: {
                                        StudentId: {
                                            type: 'hidden',
                                            defaultValue: studentData.record.StudentId
                                        },
                                        StudentExamId: {
                                            key: true,
                                            create: false,
                                            edit: false,
                                            list: false
                                        },
                                        CourseName: {
                                            title: 'Course name',
                                            width: '40%'
                                        },
                                        ExamDate: {
                                            title: 'Exam date',
                                            width: '30%',
                                            type: 'date',
                                            displayFormat: 'yy-mm-dd'
                                        },
                                        Degree: {
                                            title: 'Degree',
                                            width: '10%',
                                            options: ["AA", "BA", "BB", "CB", "CC", "DC", "DD", "FF"]
                                        }
                                    }
                                }, function (data) { //opened handler
                                    data.childTable.jtable('load');
                                });
                            });
                            //Return image to show on the person row
                            return $img;
                        }
                    },
                    Name: {
                        title: 'Name',
                        width: '20%'
                    },
                    EmailAddress: {
                        title: 'Email address',
                        list: false
                    },
                    Password: {
                        title: 'User Password',
                        type: 'password',
                        list: false
                    },
                    Gender: {
                        title: 'Gender',
                        width: '11%',
                        options: { 'M': 'Male', 'F': 'Female' }
                    },
                    CityId: {
                        title: 'City',
                        width: '12%',
                        options: '/MasterChild.aspx/GetCityOptions'
                    },
                    BirthDate: {
                        title: 'Birth date',
                        width: '15%',
                        type: 'date',
                        displayFormat: 'yy-mm-dd'
                    },
                    Education: {
                        title: 'Education',
                        list: false,
                        type: 'radiobutton',
                        options: { '1': 'Primary school', '2': 'High school', '3': 'University' }
                    },
                    About: {
                        title: 'About this person',
                        type: 'textarea',
                        list: false
                    },
                    IsActive: {
                        title: 'Status',
                        width: '12%',
                        type: 'checkbox',
                        values: { 'false': 'Passive', 'true': 'Active' },
                        defaultValue: 'true'
                    },
                    RecordDate: {
                        title: 'Record date',
                        width: '15%',
                        type: 'date',
                        displayFormat: 'yy-mm-dd',
                        create: false,
                        edit: false,
                        sorting: false //This column is not sortable!
                    }
                }
            });

            //Load person list from server
            $('#StudentTableContainer').jtable('load');

        });

    </script>
</body>
</html>
