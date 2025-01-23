using Abp.Application.Services;
using System;
using System.Linq;
using System.Threading.Tasks;
using MedicRecord.Services.Symptom.Dto;
using Abp.Domain.Repositories;
using Abp.Runtime.Session;
using Abp.Collections.Extensions;

namespace MedicRecord.Services.Symptom
{
    public class SymptomAppService : AsyncCrudAppService<Domain.Symptom, SymptomDto, int, PagedSymptomResultRequestDto>, ISymptomAppService
    {
        private readonly IAbpSession _session;
        public SymptomAppService(IRepository<Domain.Symptom, int> repository, IAbpSession session) : base(repository)
        {
            _session = session;
        }


        public override Task<SymptomDto> CreateAsync(SymptomDto input)
        {
            input.CreationTime = DateTime.UtcNow;
            input.CreatorUserId = _session.UserId;
            input.TenantId = _session.TenantId;
            input.IsActive = true;
            return base.CreateAsync(input);
        }

        public override Task<SymptomDto> UpdateAsync(SymptomDto input)
        {
            input.LastModificationTime = DateTime.UtcNow;
            input.LastModifierUserId = _session.UserId;
            return base.UpdateAsync(input);
        }

        protected override IQueryable<Domain.Symptom> CreateFilteredQuery(PagedSymptomResultRequestDto input)
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
