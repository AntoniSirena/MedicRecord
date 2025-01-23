using Abp.Application.Services;
using MedicRecord.Authorization.Accounts.Dto;
using System.Threading.Tasks;

namespace MedicRecord.Authorization.Accounts;

public interface IAccountAppService : IApplicationService
{
    Task<IsTenantAvailableOutput> IsTenantAvailable(IsTenantAvailableInput input);

    Task<RegisterOutput> Register(RegisterInput input);
}
