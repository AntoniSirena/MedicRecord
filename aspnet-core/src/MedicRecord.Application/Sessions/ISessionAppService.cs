using Abp.Application.Services;
using MedicRecord.Sessions.Dto;
using System.Threading.Tasks;

namespace MedicRecord.Sessions;

public interface ISessionAppService : IApplicationService
{
    Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();
}
