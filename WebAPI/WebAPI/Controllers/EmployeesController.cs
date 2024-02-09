using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System.Data;
using System.Data.SqlClient;
using System.Security.Cryptography.X509Certificates;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        public readonly DetailsContext _configuration;
        public EmployeesController(DetailsContext configuration)
        {
            _configuration = configuration;
        }


        //        public  string GetEmployees() 
        //      {
        //         SqlConnection con = new SqlConnection(_configuration.GetConnectionString("EmployeesAppCon").ToString());
        //         SqlDataAdapter da = new SqlDataAdapter("SELECT A.id,A.Name,A.P_id AS PARENT_ID ,B.P_id AS GPARENT_ID\r\nFROM Parent_Child AS A\r\nLEFT JOIN Parent_Child  AS B ON A.P_id=B.id\r\n", con);
        //           DataTable dt = new DataTable();
        //          da.Fill(dt);
        //          List<Employee>empList= new List<Employee>();
        //          Response res= new Response();
        //          if(dt.Rows.Count > 0)
        //          {
        //              for(int i=0; i<dt.Rows.Count; i++)
        //              {
        //                  Employee emp = new Employee();
        //                  emp.ID = Convert.ToInt32(dt.Rows[i]["id"]);
        //                  emp.NAME = Convert.ToString(dt.Rows[i]["Name"]);
        //                  emp.PARENT_ID = Convert.ToString(dt.Rows[i]["PARENT_id"]);
        //                  emp.GPARENT_ID = Convert.ToString(dt.Rows[i]["GPARENT_id"]);
        //                  empList.Add(emp);
        //
        //              }
        //          }
        //          if(empList.Count > 0)
        //         {
        //              return JsonConvert.SerializeObject(empList);
        //          }
        //          else
        //          {
        //              res.StatusCode = 500;
        //              res.ErrorMessage = "No Data Found";
        //              return JsonConvert.SerializeObject(res);
        //          }
        //      }


        [HttpGet]
        [Route("GetAllEmployees")]
        public IEnumerable<GetClass> GetEmployees() 
        {   
            var query=(from child in _configuration.Parent_Child
                       join parent in _configuration.Parent_Child on child.P_id equals parent.id
                       select new GetClass()
                       {
                           ID=child.id,
                           NAME=child.Name,
                           PARENT_ID=parent.id,
                           PARENT_NAME=parent.Name,
                           EMAIL=child.Email,
                           ADDRESS=child.Address

                       }).ToList();
            return query;
        }
        
    }
}
