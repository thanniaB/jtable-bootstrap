using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using Hik.JTable.Models;

namespace jTableWithAspNetWebForms
{
    public partial class SimplePeopleList : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod(EnableSession = true)]
        public static object PersonList()
        {
            return DemoMethods.PersonList();
        }

        [WebMethod(EnableSession = true)]
        public static object CreatePerson(Person record)
        {
            return DemoMethods.CreatePerson(record);
        }

        [WebMethod(EnableSession = true)]
        public static object UpdatePerson(Person record)
        {
            return DemoMethods.UpdatePerson(record);
        }

        [WebMethod(EnableSession = true)]
        public static object DeletePerson(int PersonId)
        {
            return DemoMethods.DeletePerson(PersonId);
        }
    }
}