

using API.Data;
using API.Interfaces;
using API.Services;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    //si una clase es static, se pueden usar los métodos que hay en ella sin necesidad de hacer una instancia de la clase
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddDbContext<DataContext>(opt =>
            {
                opt.UseSqlite(config.GetConnectionString("DefaultConnection"));
            });

            services.AddCors();

            services.AddScoped<ITokenService, TokenService>();  //hay más tipos de Add y se usan dependiendo de las necesidades. Este suele ser el más usado

            services.AddScoped<IUserRepository, UserRepository>();

            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
            return services;
        }

    }
}