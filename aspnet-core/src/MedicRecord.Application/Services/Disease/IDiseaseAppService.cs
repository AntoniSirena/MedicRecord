using Abp.Application.Services;
using MedicRecord.Services.Disease.Dto;

namespace MedicRecord.Services.Disease
{
    public interface IDiseaseAppService : IAsyncCrudAppService<DiseaseDto, int, PagedDiseaseResultRequestDto>
    {
    }
}
