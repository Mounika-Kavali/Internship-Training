using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace CRUDoperations.models
{
    public class Context: DbContext
    {
        public Context() { }
        public Context(DbContextOptions<Context> options) : base(options) { }
        public DbSet<Emp> Parent_Child { get; set; }

    }
}
