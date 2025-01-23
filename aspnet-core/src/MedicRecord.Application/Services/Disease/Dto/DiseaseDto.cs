using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MedicRecord.Services.Disease.Dto
{
    [AutoMapFrom(typeof(Domain.Disease))]
    public class DiseaseDto : FullAuditedEntityDto, IMayHaveTenant
    {
        public string Code { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool IsActive { get; set; }
        public int? TenantId { get; set; }
    }
}
