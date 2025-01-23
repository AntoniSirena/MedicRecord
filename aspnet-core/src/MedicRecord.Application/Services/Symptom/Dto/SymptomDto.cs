using Abp.Domain.Entities.Auditing;
using Abp.Domain.Entities;
using Abp.AutoMapper;
using Abp.Application.Services.Dto;

namespace MedicRecord.Services.Symptom.Dto
{
    [AutoMapFrom(typeof(Domain.Symptom))]
    public class SymptomDto : FullAuditedEntityDto, IMayHaveTenant
    {
        public string Code { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool IsActive { get; set; }
        public int? TenantId { get; set; }
    }
}
