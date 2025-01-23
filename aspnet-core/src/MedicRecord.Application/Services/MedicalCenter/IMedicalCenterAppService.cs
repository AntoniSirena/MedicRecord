using Abp.Application.Services;
using MedicRecord.Services.MedicalCenter.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MedicRecord.Services.MedicalCenter
{
    public interface IMedicalCenterAppService : IAsyncCrudAppService<MedicalCenterDto, int, PagedMedicalCenterResultRequestDto>
    {

    }
}
