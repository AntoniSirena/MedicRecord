using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.Runtime.Session;
using MedicRecord.MultiTenancy.Dto;
using MedicRecord.MultiTenancy;
using MedicRecord.Services.MedicalCenter.Dto;
using System;
using System.Linq;
using System.Threading.Tasks;
using Abp.Extensions;
using Abp.Collections.Extensions;
using MedicRecord.Authorization.Users;
using MedicRecord.Users.Dto;

namespace MedicRecord.Services.MedicalCenter
{
    public class MedicalCenterAppService : AsyncCrudAppService<Domain.MedicalCenter, MedicalCenterDto, int, PagedMedicalCenterResultRequestDto>, IMedicalCenterAppService
    {
        private readonly IAbpSession _session;

        public MedicalCenterAppService(IRepository<Domain.MedicalCenter, int> repository, IAbpSession session) : base(repository)
        {
            _session = session;
        }

        public override Task<MedicalCenterDto> CreateAsync(MedicalCenterDto input)
        {
            input.CreationTime = DateTime.UtcNow;
            input.CreatorUserId = _session.UserId;
            input.TenantId = _session.TenantId;
            return base.CreateAsync(input);
        }

        public override Task<MedicalCenterDto> UpdateAsync(MedicalCenterDto input)
        {
            input.LastModificationTime = DateTime.UtcNow;
            input.LastModifierUserId = _session.UserId;
            return base.UpdateAsync(input);
        }

        protected override IQueryable<Domain.MedicalCenter> CreateFilteredQuery(PagedMedicalCenterResultRequestDto input)
        {
            if (!input.Keyword.IsNullOrEmpty())
            {
                return Repository.GetAll().Where(x => x.Name.Contains(input.Keyword) || x.Address.Contains(input.Keyword));
            }
            else
            {
                return Repository.GetAll();
            }
        }
    }
}
