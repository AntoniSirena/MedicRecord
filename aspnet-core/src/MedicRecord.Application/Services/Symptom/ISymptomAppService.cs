using Abp.Application.Services;
using MedicRecord.Services.MedicalCenter.Dto;
using MedicRecord.Services.Symptom.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MedicRecord.Services.Symptom
{
    internal interface ISymptomAppService : IAsyncCrudAppService<SymptomDto, int, PagedSymptomResultRequestDto>
    {
    }
}
