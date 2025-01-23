using Abp.Application.Services;
using MedicRecord.Services.Disease.Dto;
using Abp.Domain.Repositories;
using Abp.Runtime.Session;
using System.Linq;
using System.Threading.Tasks;
using System;
using Abp.Collections.Extensions;

namespace MedicRecord.Services.Disease
{
    public class DiseaseAppService : AsyncCrudAppService<Domain.Disease, DiseaseDto, int, PagedDiseaseResultRequestDto>, IDiseaseAppService
    {
        private readonly IAbpSession _session;
        public DiseaseAppService(IRepository<Domain.Disease, int> repository, IAbpSession session) : base(repository)
        {
            _session = session;
        }

        public override Task<DiseaseDto> CreateAsync(DiseaseDto input)
        {
            input.CreationTime = DateTime.UtcNow;
            input.CreatorUserId = _session.UserId;
            input.TenantId = _session.TenantId;
            input.IsActive = true;
            return base.CreateAsync(input);
        }

        public override Task<DiseaseDto> UpdateAsync(DiseaseDto input)
        {
            input.LastModificationTime = DateTime.UtcNow;
            input.LastModifierUserId = _session.UserId;
            return base.UpdateAsync(input);
        }

        protected override IQueryable<Domain.Disease> CreateFilteredQuery(PagedDiseaseResultRequestDto input)
        {
            if (!input.Keyword.IsNullOrEmpty())
            {
                return Repository.GetAll().Where(x => x.Code.Contains(input.Keyword) || x.Name.Contains(input.Keyword) || x.Description.Contains(input.Keyword));
            }
            else
            {
                return Repository.GetAll();
            }
        }

    }
}
