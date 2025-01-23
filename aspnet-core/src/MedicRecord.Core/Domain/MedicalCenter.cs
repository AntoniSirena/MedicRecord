using Abp.Domain.Entities.Auditing;
using Abp.Domain.Entities;

namespace MedicRecord.Domain
{
    public class MedicalCenter : FullAuditedEntity, IMayHaveTenant
    {
        public string Name { get; set; }
        public string PhoneNumber { get; set; }
        public string Schedule { get; set; }
        public string Address { get; set; }
        public int? TenantId { get; set; }
    }
}
