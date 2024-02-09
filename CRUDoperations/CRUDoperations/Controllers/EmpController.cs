using CRUDoperations.models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Runtime.InteropServices;

namespace CRUDoperations.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmpController : ControllerBase
    {
        public readonly Context _configuration;
        public EmpController(Context configuration)
        {
            _configuration = configuration;
        }
        [HttpGet("{Id}")]
        public async Task<ActionResult<Emp>>GetEmp(int Id)
        {
            if(_configuration.Parent_Child==null)
            {
                return NotFound();
            }
            var empl = await _configuration.Parent_Child.FindAsync(Id);
            if(empl == null)
            {
                return NotFound();
            }
            return empl;
        }
//        [HttpGet]
//        public async Task<ActionResult<IEnumerable<Emp>>> GetEmps()
//        {
//            if (_configuration.Parent_Child == null)
 //           {
 //               return NotFound();
 //           }
 //           return await _configuration.Parent_Child.ToListAsync();
          
 //       }

        [HttpPost]
        public async Task<ActionResult<Emp>> PostEmp(Emp empl)
        {
            _configuration.Parent_Child.Add(empl);
            await _configuration.SaveChangesAsync();
            return CreatedAtAction(nameof(GetEmp),new {Id=empl.id},empl);
        }

      
        [HttpPut]
        public async Task<IActionResult> PutEmp(int id, Emp st)
        {
            if (id != st.id)
            {
                return BadRequest();
            }
            _configuration.Entry(st).State = EntityState.Modified;
            try
            {
                await _configuration.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (id != st.id)
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return Ok();
        }
        private bool StudentAvailable(int id)
        {
            return (_configuration.Parent_Child?.Any(x => x.id == id)).GetValueOrDefault();
        }


       



        [HttpGet]
        [Route("GetAllEmp")]
        public IEnumerable<GetClass> GetEmployees()
        {
            var query = (from child in _configuration.Parent_Child
                         join parent in _configuration.Parent_Child on child.P_id equals parent.id
                         into joinedTable1
                         from jt in joinedTable1.DefaultIfEmpty()
                         
                         join i in _configuration.Parent_Child on jt.P_id equals i.id
                         into jointedTable2
                         from k in jointedTable2.DefaultIfEmpty()
                         
                         select new GetClass()
                         {
                             ID = child.id,
                             NAME = child.Name,
                             PARENT_ID = jt == null ? "-" : Convert.ToString( child.P_id),
                             PARENT_NAME = jt==null?"":jt.Name,

                             //join Gparent in _configuration.Parent_Child on parent.P_id equals Gparent.id
                              GPARENT_ID = jt == null ? "-" : Convert.ToString(jt.P_id),
                              GPARENT_NAME = k == null ? "" : k.Name,
                             EMAIL = child.Email,
                             ADDRESS = child.Address

                         }).ToList();
            return query;
        }

        [HttpDelete("{Id}")]
        public async Task<IActionResult> DeleteEmp(int Id)
        {
            if (_configuration.Parent_Child == null)
            {
                return NotFound();
            }
            var empl = await _configuration.Parent_Child.FindAsync(Id);
            if(empl==null)
            {
                return NotFound();
            }
            _configuration.Parent_Child.Remove(empl);
            await _configuration.SaveChangesAsync();
            return Ok();
        }

    }
}
