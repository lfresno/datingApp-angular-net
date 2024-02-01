using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Photos")]
    public class Photo
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public bool IsMain { get; set; }
        public string PublicId { get; set; }

        //queremos asegurarnos de que las fotos están relacionadas a un usuario en concreto
        //esto nos asegura que las fotos están relacionadas con un usuario y que, si se borra un usuario, tmbn se borran
        //sus fotos en cascada
        public int AppUserId { get; set; }  
        public AppUser AppUser { get; set; }
    }
}