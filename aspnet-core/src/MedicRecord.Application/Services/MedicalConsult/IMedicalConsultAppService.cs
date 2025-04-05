using Abp.Application.Services;
using MedicRecord.Services.MedicalCenter.Dto;
using MedicRecord.Services.MedicalConsult.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MedicRecord.Services.MedicalConsult
{
    public interface IMedicalConsultAppService : IAsyncCrudAppService<MedicalConsultDto, int, PagedMedicalConsultResultRequestDto>
    {
       MedicalConsultDto GetData(int id);
       void ClosedConsult(int id);
    }
}
