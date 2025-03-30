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
    public class Patient : FullAuditedEntity, IMayHaveTenant
    {
        public string RecordNumber { get; set; }
        public string FirstName { get; set; }
        public string SecondName { get; set; }
        public string FirstSurname { get; set; }
        public string SecondSurname { get; set; }
        public string MotherNames { get; set; }
        public string MotherSurnames {  get; set; }
        public string FatherNames { get; set; }
        public string FatherSurnames { get; set; }
        public string MotherIDNumber { get; set; }
        public DateTime BirthDate {  get; set; }
        public decimal Size { get; set; }
        public  decimal Weight { get; set; }
        public decimal HeadCircumference { get; set; }
        public bool IsActive { get; set; }
        public int? TenantId { get; set; }

        public int? BloodTypeId { get; set; }
        public int? MedicalCenterId { get; set; }

        [ForeignKey("BloodTypeId")]
        public virtual BloodType BloodType { get; set; }

        [ForeignKey("MedicalCenterId")]
        public virtual MedicalCenter MedicalCenter { get; set; }

    }
}
