using Abp.Domain.Entities.Auditing;
using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace MedicRecord.Domain
{
    public class MedicalConsultDisease : AuditedEntity, IMayHaveTenant
    {
        public int MedicalConsultId { get; set; }
        public int DiseaseId { get; set; }
        public bool IsActive { get; set; }
        public int? TenantId { get; set; }


        [ForeignKey("MedicalConsultId")]
        public virtual MedicalConsult MedicalConsult { get; set; }

        [ForeignKey("DiseaseId")]
        public virtual Disease Disease { get; set; }
    }
}
