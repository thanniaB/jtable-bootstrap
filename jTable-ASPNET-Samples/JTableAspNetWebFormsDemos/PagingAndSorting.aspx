<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="PagingAndSorting.aspx.cs"
    Inherits="jTableWithAspNetWebForms.PagingAndSorting" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Paging And Sorting With jTable and ASP.NET Web Forms</title>

    <link href="/Content/Site.css" rel="stylesheet" type="text/css" />
    <link href="/Content/themes/metroblue/jquery-ui.css" rel="stylesheet" type="text/css" />

    <!-- jTable style file -->
    <link href="/Scripts/jtable/themes/metro/blue/jtable.css" rel="stylesheet" type="text/css" />

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
</head>
<body>
    <div class="site-container">
        <div id="StudentTableContainer"></div>
    </div>
    <script type="text/javascript">

        $(document).ready(function () {

            //Prepare jtable plugin
            $('#StudentTableContainer').jtable({
                title: 'The Student List',
                paging: true,
                pageSize: 10,
                sorting: true,
                defaultSorting: 'Name ASC',
                actions: {
                    listAction: '/PagingAndSorting.aspx/StudentList',
                    createAction: '/PagingAndSorting.aspx/CreateStudent',
                    updateAction: '/PagingAndSorting.aspx/UpdateStudent',
                    deleteAction: '/PagingAndSorting.aspx/DeleteStudent'
                },
                fields: {
                    StudentId: {
                        key: true,
                        create: false,
                        edit: false,
                        list: false
                    },
                    Name: {
                        title: 'Name',
                        width: '23%'
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
                        width: '13%',
                        options: { 'M': 'Male', 'F': 'Female' }
                    },
                    CityId: {
                        title: 'City',
                        width: '12%',
                        options: '/PagingAndSorting.aspx/GetCityOptions'
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

            //Load student list from server
            $('#StudentTableContainer').jtable('load');
        });

    </script>
</body>
</html>
