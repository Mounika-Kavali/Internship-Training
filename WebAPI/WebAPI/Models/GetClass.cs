namespace WebAPI.Models
{
    public class GetClass
    {
        public int ID { get; set; }
        public string? NAME { get; set; }
        public int PARENT_ID { get; set; }
        public string? PARENT_NAME { get; set; }
        public string? EMAIL { get; set; }
        public string? ADDRESS { get; set; }
    }
}
