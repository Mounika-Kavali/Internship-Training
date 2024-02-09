using Microsoft.EntityFrameworkCore;

namespace WebAPI.Models
{
    public class DetailsContext : DbContext
    {
       public DetailsContext() { }
        public DetailsContext(DbContextOptions<DetailsContext>options) : base(options) { }
        public DbSet<Employee> Parent_Child{ get; set; }
    }
}
