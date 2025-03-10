using Abp.Application.Services;
using MedicRecord.Services.CommonComboBox.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MedicRecord.Services.CommonComboBox
{
    interface ICommonComboBoxAppService: IApplicationService
    {
        Task<CommonComboBoxOutputDto> GetComboBoxes();
    }
}
