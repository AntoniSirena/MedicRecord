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
    public class MedicalConsult : FullAuditedEntity, IMayHaveTenant
    {
        public int PatientId { get; set; }
        public int? MedicalAgeId { get; set; }
        public int? StateId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public DateTime? NextDate { get; set; }
        public decimal? Size { get; set; }
        public decimal? Weight { get; set; }
        public decimal? HeadCircumference { get; set; }
        public bool IsActive { get; set; }
        public int? TenantId { get; set; }
        public string Note { get; set; }
        public string ReasonConsult { get; set; }
        public bool IsClosed { get; set; }


        [ForeignKey("PatientId")]
        public virtual Patient Patient { get; set; }

        [ForeignKey("MedicalAgeId")]
        public virtual MedicalAge MedicalAge { get; set; }

        [ForeignKey("StateId")]
        public virtual StateMedicalConsult State { get; set; }

    }
}
