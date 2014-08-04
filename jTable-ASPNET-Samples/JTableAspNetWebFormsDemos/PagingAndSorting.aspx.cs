using System;
using System.Web.Services;
using Hik.JTable.Models;

namespace jTableWithAspNetWebForms
{
    public partial class PagingAndSorting : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        #region Student methods

        [WebMethod(EnableSession = true)]
        public static object StudentList(int jtStartIndex = 0, int jtPageSize = 0, string jtSorting = null)
        {
            return DemoMethods.StudentList(jtStartIndex, jtPageSize, jtSorting);
        }

        [WebMethod(EnableSession = true)]
        public static object CreateStudent(Student record)
        {
            return DemoMethods.CreateStudent(record);
        }

        [WebMethod(EnableSession = true)]
        public static object UpdateStudent(Student record)
        {
            return DemoMethods.UpdateStudent(record);
        }

        [WebMethod(EnableSession = true)]
        public static object DeleteStudent(int StudentId)
        {
            return DemoMethods.DeleteStudent(StudentId);
        }
        
        #endregion

        #region City methods

        [WebMethod(EnableSession = true)]
        public static object GetCityOptions()
        {
            return DemoMethods.GetCityOptions();
        }

        #endregion
    }
}