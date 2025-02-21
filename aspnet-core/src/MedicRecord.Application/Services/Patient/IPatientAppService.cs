using Abp.Application.Services;
using MedicRecord.Services.Patient.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MedicRecord.Services.Patient
{
     interface IPatientAppService : IAsyncCrudAppService<PatientDto, int, PagedPatientResultPatientDto>
    {
    }
}
