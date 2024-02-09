using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Data;
using System.Data.SqlClient;

namespace CoreWebApp.Pages.DETAILS
{
    
    public class IndexModel : PageModel
    {
        public List<studentDetails> listDetails = new List<studentDetails>();
        public void OnGet()
        {
            try
            {
                String connectionString = "Data Source=.\\sqlexpress;Initial Catalog=corewebapp;Integrated Security=True";

                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    connection.Open();
                    String sql = " SELECT * FROM details";
                    using (SqlCommand command = new SqlCommand(sql, connection))
                    {
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                studentDetails studentDetails = new studentDetails();
                                studentDetails.id = "" + reader.GetInt32(0);
                                studentDetails.name = reader.GetString(1);
                                studentDetails.email = reader.GetString(2);
                                studentDetails.phone = reader.GetString(3);
                                studentDetails.address = reader.GetString(4);
                                studentDetails.created_at = reader.GetDateTime(5).ToString();

                                listDetails.Add(studentDetails);
                            }


                        }
                    }
                }
            }

            catch (Exception ex)
            {
                Console.WriteLine("EXCEPTION:"+ex.ToString());
            }
        }
    }
    public class studentDetails {

        public String id;
        public String name;
        public String email;
        public String phone;
        public String address;
        public String created_at;

    }
}
