using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Abp.Domain.Entities;
using MedicRecord.Domain;
using System;
using System.Collections.Generic;

namespace MedicRecord.Services.MedicalConsult.Dto
{
    [AutoMapFrom(typeof(Domain.MedicalConsult))]
    public class MedicalConsultDto : FullAuditedEntityDto, IMayHaveTenant
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

        public List<int> Diseases { get; set; }
        public List<int> Symptoms { get; set; }
        public virtual Domain.Patient Patient { get; set; }
        public virtual StateMedicalConsult State { get; set; }

    }
}
