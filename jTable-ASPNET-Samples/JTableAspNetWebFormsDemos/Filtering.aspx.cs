using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using Hik.JTable.Models;
using Hik.JTable.Repositories;
using Hik.JTable.Sessions;

namespace jTableWithAspNetWebForms
{
    public partial class Filtering : System.Web.UI.Page
    {
        private static IRepositoryContainer _repository { get { return RepositorySesssion.GetRepository(); } }

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                var cities = _repository.CityRepository.GetAllCities();
                cities.Insert(0, new City {CityId = 0, CityName = "All cities"});

                ddlCities.DataTextField = "CityName";
                ddlCities.DataValueField = "CityId";
                ddlCities.DataSource = cities;
                ddlCities.DataBind();
            }
        }

        #region Student methods

        [WebMethod(EnableSession = true)]
        public static object StudentListByFilter(string name, int cityId, int jtStartIndex, int jtPageSize, string jtSorting)
        {
            return DemoMethods.StudentListByFilter(name, cityId, jtStartIndex, jtPageSize, jtSorting);
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