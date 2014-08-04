using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using Hik.JTable.Models;
using Hik.JTable.Repositories;
using Hik.JTable.Sessions;

namespace jTableWithAspNetWebForms
{
    public static class DemoMethods
    {
        private static IRepositoryContainer _repository { get { return RepositorySesssion.GetRepository(); } }

        #region Student methods

        public static object StudentList(int jtStartIndex, int jtPageSize, string jtSorting)
        {
            try
            {
                //Get data from database
                int studentCount = _repository.StudentRepository.GetStudentCount();
                List<Student> students = _repository.StudentRepository.GetStudents(jtStartIndex, jtPageSize, jtSorting);

                //Return result to jTable
                return new { Result = "OK", Records = students, TotalRecordCount = studentCount };
            }
            catch (Exception ex)
            {
                return new { Result = "ERROR", Message = ex.Message };
            }
        }

        public static object StudentListByFilter(string name, int cityId, int jtStartIndex, int jtPageSize, string jtSorting)
        {
            try
            {
                //Get data from database
                int studentCount = _repository.StudentRepository.GetStudentCountByFilter(name, cityId);
                List<Student> students = _repository.StudentRepository.GetStudentsByFilter(name, cityId, jtStartIndex, jtPageSize, jtSorting);

                //Return result to jTable
                return new { Result = "OK", Records = students, TotalRecordCount = studentCount };
            }
            catch (Exception ex)
            {
                return new { Result = "ERROR", Message = ex.Message };
            }
        }

        public static object CreateStudent(Student record)
        {
            try
            {
                var addedStudent = _repository.StudentRepository.AddStudent(record);
                return new { Result = "OK", Record = addedStudent };
            }
            catch (Exception ex)
            {
                return new { Result = "ERROR", Message = ex.Message };
            }
        }

        public static object UpdateStudent(Student record)
        {
            try
            {
                _repository.StudentRepository.UpdateStudent(record);
                return new { Result = "OK" };
            }
            catch (Exception ex)
            {
                return new { Result = "ERROR", Message = ex.Message };
            }
        }

        public static object DeleteStudent(int StudentId)
        {
            try
            {
                _repository.StudentRepository.DeleteStudent(StudentId);
                return new { Result = "OK" };
            }
            catch (Exception ex)
            {
                return new { Result = "ERROR", Message = ex.Message };
            }
        }

        #endregion

        #region City methods

        public static object GetCityOptions()
        {
            try
            {
                var cities = _repository.CityRepository.GetAllCities().Select(c => new { DisplayText = c.CityName, Value = c.CityId });
                return new { Result = "OK", Options = cities };
            }
            catch (Exception ex)
            {
                return new { Result = "ERROR", Message = ex.Message };
            }
        }

        #endregion

        #region Phone methods

        public static object PhoneList(int studentId)
        {
            try
            {
                var phones = _repository.PhoneRepository.GetPhonesOfStudent(studentId);
                return new { Result = "OK", Records = phones };
            }
            catch (Exception ex)
            {
                return new { Result = "ERROR", Message = ex.Message };
            }
        }

        public static object DeletePhone(int phoneId)
        {
            try
            {
                _repository.PhoneRepository.DeletePhone(phoneId);
                return new { Result = "OK" };
            }
            catch (Exception ex)
            {
                return new { Result = "ERROR", Message = ex.Message };
            }
        }

        public static object UpdatePhone(Phone phone)
        {
            try
            {
                _repository.PhoneRepository.UpdatePhone(phone);
                return new { Result = "OK" };
            }
            catch (Exception ex)
            {
                return new { Result = "ERROR", Message = ex.Message };
            }
        }

        public static object CreatePhone(Phone phone)
        {
            try
            {
                var addedPhone = _repository.PhoneRepository.AddPhone(phone);
                return new { Result = "OK", Record = addedPhone };
            }
            catch (Exception ex)
            {
                return new { Result = "ERROR", Message = ex.Message };
            }
        }

        #endregion

        #region Exam methods

        public static object ExamList(int studentId)
        {
            try
            {
                Thread.Sleep(200);
                var exams = _repository.ExamRepository.GetExamsOfStudent(studentId).OrderBy(e => e.ExamDate).ToList();
                return new { Result = "OK", Records = exams };
            }
            catch (Exception ex)
            {
                return new { Result = "ERROR", Message = ex.Message };
            }
        }

        public static object DeleteExam(int studentExamId)
        {
            try
            {
                Thread.Sleep(50);
                _repository.ExamRepository.DeleteExam(studentExamId);
                return new { Result = "OK" };
            }
            catch (Exception ex)
            {
                return new { Result = "ERROR", Message = ex.Message };
            }
        }

        public static object UpdateExam(StudentExam exam)
        {
            try
            {
                _repository.ExamRepository.UpdateExam(exam);
                return new { Result = "OK" };
            }
            catch (Exception ex)
            {
                return new { Result = "ERROR", Message = ex.Message };
            }
        }

        public static object CreateExam(StudentExam exam)
        {
            try
            {
                var addedExam = _repository.ExamRepository.AddExam(exam);
                return new { Result = "OK", Record = addedExam };
            }
            catch (Exception ex)
            {
                return new { Result = "ERROR", Message = ex.Message };
            }
        }

        #endregion

        #region Person methods

        public static object PersonList()
        {
            try
            {
                List<Person> peopleList = _repository.PersonRepository.GetAllPeople();
                return new { Result = "OK", Records = peopleList };
            }
            catch (Exception ex)
            {
                return new { Result = "ERROR", Message = ex.Message };
            }
        }

        public static object CreatePerson(Person record)
        {
            try
            {
                var addedPerson = _repository.PersonRepository.AddPerson(record);
                return new { Result = "OK", Record = addedPerson };
            }
            catch (Exception ex)
            {
                return new { Result = "ERROR", Message = ex.Message };
            }
        }

        public static object UpdatePerson(Person record)
        {
            try
            {
                _repository.PersonRepository.UpdatePerson(record);
                return new { Result = "OK" };
            }
            catch (Exception ex)
            {
                return new { Result = "ERROR", Message = ex.Message };
            }
        }

        public static object DeletePerson(int PersonId)
        {
            try
            {
                _repository.PersonRepository.DeletePerson(PersonId);
                return new { Result = "OK" };
            }
            catch (Exception ex)
            {
                return new { Result = "ERROR", Message = ex.Message };
            }
        }

        #endregion
    }
}