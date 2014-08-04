using System;
using System.Web.Services;
using Hik.JTable.Models;

namespace jTableWithAspNetWebForms
{
    public partial class MasterChild : System.Web.UI.Page
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

        #region Phone methods

        [WebMethod(EnableSession = true)]
        public static object PhoneList(int StudentId)
        {
            return DemoMethods.PhoneList(StudentId);
        }

        [WebMethod(EnableSession = true)]
        public static object DeletePhone(int PhoneId)
        {
            return DemoMethods.DeletePhone(PhoneId);
        }

        [WebMethod(EnableSession = true)]
        public static object UpdatePhone(Phone record)
        {
            return DemoMethods.UpdatePhone(record);
        }

        [WebMethod(EnableSession = true)]
        public static object CreatePhone(Phone record)
        {
            return DemoMethods.CreatePhone(record);
        }

        #endregion

        #region Exam actions

        [WebMethod(EnableSession = true)]
        public static object ExamList(int StudentId)
        {
            return DemoMethods.ExamList(StudentId);
        }

        [WebMethod(EnableSession = true)]
        public static object DeleteExam(int StudentExamId)
        {
            return DemoMethods.DeleteExam(StudentExamId);
        }

        [WebMethod(EnableSession = true)]
        public static object UpdateExam(StudentExam record)
        {
            return DemoMethods.UpdateExam(record);
        }

        [WebMethod(EnableSession = true)]
        public static object CreateExam(StudentExam record)
        {
            return DemoMethods.CreateExam(record);
        }

        #endregion
    }
}