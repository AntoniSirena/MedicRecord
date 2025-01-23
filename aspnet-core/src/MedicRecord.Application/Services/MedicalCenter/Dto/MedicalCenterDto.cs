using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Abp.Domain.Entities;

namespace MedicRecord.Services.MedicalCenter.Dto
{
    [AutoMapFrom(typeof(Domain.MedicalCenter))]
    public class MedicalCenterDto : FullAuditedEntityDto, IMayHaveTenant
    {
        public string Name { get; set; }
        public string PhoneNumber { get; set; }
        public string Schedule { get; set; }
        public string Address { get; set; }
        public int? TenantId { get; set; }
    }
}
