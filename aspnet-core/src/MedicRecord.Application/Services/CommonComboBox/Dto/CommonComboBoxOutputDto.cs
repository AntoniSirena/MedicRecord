using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MedicRecord.Services.CommonComboBox.Dto
{

    /// <summary>
    /// Clase para para Devolver el Dto con la Info de los DropDawn
    /// </summary>
    public class CommonComboBoxOutputDto
    {
        /// <summary>
        /// 
        /// </summary>
        public CommonComboBoxOutputDto()
        {
            BloodTypes = new List<ComboboxItemDto>();
            MedicalCenters = new List<ComboboxItemDto>();
        }
        /// <summary>
        /// 
        /// </summary>
        public List<ComboboxItemDto> BloodTypes { get; set; }
        public List<ComboboxItemDto> MedicalCenters { get; set; }
    }
}
