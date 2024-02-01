
using API.DTOs;
using API.Entities;
using API.Extensions;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        //mapea las propiedades de la entidad a la del dto.
        public AutoMapperProfiles()
        {   
            CreateMap<AppUser, MemberDto>()
                .ForMember(dest => dest.PhotoUrl,   //para coger las fotos
                    opt => opt.MapFrom(src => src.Photos.FirstOrDefault( x => x.IsMain).Url))
                .ForMember( dest => dest.Age,   //calcular la edad aquí y no en appUser (es más eficiente)
                    opt => opt.MapFrom(src => src.DateOfBirth.CalculateAge()));

            CreateMap<Photo, PhotoDto>();
        }
    }
}