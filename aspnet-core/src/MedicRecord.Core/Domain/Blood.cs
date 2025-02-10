using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MedicRecord.Domain
{
    public class BloodType : FullAuditedEntity
    {
        public string Code { get; set; }
        public string Name { get; set; }
    }
}
