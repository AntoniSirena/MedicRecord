using Abp.Application.Services;
using MedicRecord.MultiTenancy.Dto;

namespace MedicRecord.MultiTenancy;

public interface ITenantAppService : IAsyncCrudAppService<TenantDto, int, PagedTenantResultRequestDto, CreateTenantDto, TenantDto>
{
}

