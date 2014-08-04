<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Filtering.aspx.cs" Inherits="jTableWithAspNetWebForms.Filtering" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title>Filtering With jTable and ASP.NET Web Forms</title>
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
        div.filtering
        {
            border: 1px solid #999;
            margin-bottom: 5px;
            padding: 10px;
            background-color: #EEE;
        }
    </style>
</head>
<body>
    <div class="site-container">
        <div class="filtering">
            <form runat="server">
            <label>
                Name:
                <input type="text" name="name" id="name" /></label>
            <label>
                City:
                <asp:DropDownList ID="ddlCities" runat="server">
                </asp:DropDownList>
            </label>
            <button type="submit" id="LoadRecordsButton">
                Load records</button>
            </form>
        </div>
        <div id="StudentTableContainer">
        </div>
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
                    listAction: '/Filtering.aspx/StudentListByFilter',
                    createAction: '/Filtering.aspx/CreateStudent',
                    updateAction: '/Filtering.aspx/UpdateStudent',
                    deleteAction: '/Filtering.aspx/DeleteStudent'
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
                        options: '/Filtering.aspx/GetCityOptions'
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
                        displayFormat: 'dd.mm.yy',
                        create: false,
                        edit: false,
                        sorting: false //This column is not sortable!
                    }
                }
            });

            //Re-load records when user click 'load records' button.
            $('#LoadRecordsButton').click(function (e) {
                e.preventDefault();
                $('#StudentTableContainer').jtable('load', {
                    name: $('#name').val(),
                    cityId: $('#<% = ddlCities.ClientID %>').val()
                });
            });

            //Load all records when page is first shown
            $('#LoadRecordsButton').click();
        });

    </script>
</body>
</html>
